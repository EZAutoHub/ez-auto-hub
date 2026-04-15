"use client";

import { useMemo, useState } from "react";
import TopBar from "../components/topbar";

type ViewMode = "day" | "week" | "month";

type VehicleRecord = {
  id: number;
  registration: string;
  customer: string;
  postcode: string;
  vehicle: string;
};

type BookingRecord = {
  id: number;
  date: string; // YYYY-MM-DD
  time: string;
  registration: string;
  customer: string;
  reason: string;
  assignedTo: string;
  status: string;
  estimatedHours: number;
};

const initialVehicles: VehicleRecord[] = [
  {
    id: 1,
    registration: "DU14 FML",
    customer: "John Smith",
    postcode: "LE12 3AB",
    vehicle: "2014 BMW 320D",
  },
  {
    id: 2,
    registration: "AB12 CDE",
    customer: "Sarah Jones",
    postcode: "LE67 4PQ",
    vehicle: "2016 Ford Fiesta",
  },
  {
    id: 3,
    registration: "YX19 FGH",
    customer: "Business Stock",
    postcode: "LE11 5TT",
    vehicle: "2019 Ford Transit Custom",
  },
];

const initialBookings: BookingRecord[] = [
  {
    id: 1,
    date: "2026-04-15",
    time: "08:30",
    registration: "DU14 FML",
    customer: "John Smith",
    reason: "Service & inspection",
    assignedTo: "Mechanic 1",
    status: "Booked",
    estimatedHours: 2,
  },
  {
    id: 2,
    date: "2026-04-15",
    time: "10:00",
    registration: "AB12 CDE",
    customer: "Sarah Jones",
    reason: "Brake check",
    assignedTo: "Unassigned",
    status: "Awaiting Arrival",
    estimatedHours: 1,
  },
  {
    id: 3,
    date: "2026-04-15",
    time: "13:30",
    registration: "YX19 FGH",
    customer: "Business Stock",
    reason: "Sale prep assessment",
    assignedTo: "Shop Foreman",
    status: "Booked",
    estimatedHours: 3,
  },
  {
    id: 4,
    date: "2026-04-16",
    time: "09:00",
    registration: "DU14 FML",
    customer: "John Smith",
    reason: "Follow-up diagnostics",
    assignedTo: "Mechanic 2",
    status: "Booked",
    estimatedHours: 2,
  },
  {
    id: 5,
    date: "2026-04-17",
    time: "11:00",
    registration: "AB12 CDE",
    customer: "Sarah Jones",
    reason: "Front brakes",
    assignedTo: "Mechanic 1",
    status: "Booked",
    estimatedHours: 2,
  },
  {
    id: 6,
    date: "2026-04-18",
    time: "14:00",
    registration: "YX19 FGH",
    customer: "Business Stock",
    reason: "Valet prep",
    assignedTo: "Unassigned",
    status: "Booked",
    estimatedHours: 2,
  },
];

function formatDateLabel(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function toISODate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function startOfWeek(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatShortDay(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}

export default function BookingsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("day");
  const [currentDate, setCurrentDate] = useState(new Date("2026-04-15T09:00:00"));
  const [vehicles, setVehicles] = useState<VehicleRecord[]>(initialVehicles);
  const [bookings] = useState<BookingRecord[]>(initialBookings);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showAddVehicleInline, setShowAddVehicleInline] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleRecord | null>(null);

  const [newVehicleReg, setNewVehicleReg] = useState("");
  const [newVehicleMake, setNewVehicleMake] = useState("");
  const [newVehicleModel, setNewVehicleModel] = useState("");
  const [newVehicleCustomer, setNewVehicleCustomer] = useState("");
  const [newVehiclePostcode, setNewVehiclePostcode] = useState("");

  const dayBookings = useMemo(() => {
    const iso = toISODate(currentDate);
    return bookings.filter((b) => b.date === iso);
  }, [bookings, currentDate]);

  const weekDays = useMemo(() => {
    const start = startOfWeek(currentDate);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [currentDate]);

  const weekStats = useMemo(() => {
    const dailyCapacityHours = 24;

    return weekDays.map((day) => {
      const iso = toISODate(day);
      const dayItems = bookings.filter((b) => b.date === iso);
      const totalHours = dayItems.reduce((sum, item) => sum + item.estimatedHours, 0);
      const occupancy = Math.round((totalHours / dailyCapacityHours) * 100);

      return {
        date: day,
        count: dayItems.length,
        totalHours,
        occupancy,
      };
    });
  }, [bookings, weekDays]);

  const monthStats = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dailyCapacityHours = 24;

    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = new Date(year, month, i + 1);
      const iso = toISODate(day);
      const dayItems = bookings.filter((b) => b.date === iso);
      const totalHours = dayItems.reduce((sum, item) => sum + item.estimatedHours, 0);
      const occupancy = Math.round((totalHours / dailyCapacityHours) * 100);

      return {
        date: day,
        count: dayItems.length,
        occupancy,
      };
    });
  }, [bookings, currentDate]);

  const filteredVehicles = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return vehicles;

    return vehicles.filter((v) => {
      return (
        v.registration.toLowerCase().includes(q) ||
        v.customer.toLowerCase().includes(q) ||
        v.postcode.toLowerCase().includes(q) ||
        v.vehicle.toLowerCase().includes(q)
      );
    });
  }, [searchTerm, vehicles]);

  const todayCount = bookings.filter((b) => b.date === "2026-04-15").length;
  const tomorrowCount = bookings.filter((b) => b.date === "2026-04-16").length;
  const unassignedCount = bookings.filter((b) => b.assignedTo === "Unassigned").length;
  const awaitingArrivalCount = bookings.filter((b) => b.status === "Awaiting Arrival").length;

  function shiftPeriod(direction: "prev" | "next") {
    const multiplier = direction === "prev" ? -1 : 1;
    const d = new Date(currentDate);

    if (viewMode === "day") d.setDate(d.getDate() + multiplier);
    if (viewMode === "week") d.setDate(d.getDate() + 7 * multiplier);
    if (viewMode === "month") d.setMonth(d.getMonth() + multiplier);

    setCurrentDate(d);
  }

  function resetBookingModal() {
    setSearchTerm("");
    setSelectedVehicle(null);
    setShowAddVehicleInline(false);
    setNewVehicleReg("");
    setNewVehicleMake("");
    setNewVehicleModel("");
    setNewVehicleCustomer("");
    setNewVehiclePostcode("");
  }

  function closeBookingModal() {
    setShowBookingModal(false);
    resetBookingModal();
  }

  function saveInlineVehicle() {
    if (!newVehicleReg || !newVehicleMake || !newVehicleModel) return;

    const created: VehicleRecord = {
      id: Date.now(),
      registration: newVehicleReg.toUpperCase(),
      customer: newVehicleCustomer || "New Customer",
      postcode: newVehiclePostcode.toUpperCase(),
      vehicle: `${newVehicleMake} ${newVehicleModel}`,
    };

    setVehicles((prev) => [created, ...prev]);
    setSelectedVehicle(created);
    setShowAddVehicleInline(false);
    setSearchTerm(created.registration);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <TopBar
          title="Bookings"
          subtitle="Manage planned work, technician schedules, and workshop calendar activity"
          simple
        />

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Today</p>
            <p className="mt-2 text-3xl font-bold">{todayCount}</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Tomorrow</p>
            <p className="mt-2 text-3xl font-bold">{tomorrowCount}</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Unassigned</p>
            <p className="mt-2 text-3xl font-bold">{unassignedCount}</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Awaiting Arrival</p>
            <p className="mt-2 text-3xl font-bold">{awaitingArrivalCount}</p>
          </div>
        </section>

        <section className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => shiftPeriod("prev")}
                className="rounded-xl border border-zinc-700 px-4 py-2 text-zinc-300 transition hover:bg-zinc-800"
              >
                {"<"}
              </button>

              <div className="min-w-[280px] text-lg font-semibold">
                {viewMode === "day" && formatDateLabel(currentDate)}
                {viewMode === "week" &&
                  `Week of ${formatShortDay(weekDays[0])} - ${formatShortDay(weekDays[6])}`}
                {viewMode === "month" &&
                  new Intl.DateTimeFormat("en-GB", {
                    month: "long",
                    year: "numeric",
                  }).format(currentDate)}
              </div>

              <button
                type="button"
                onClick={() => shiftPeriod("next")}
                className="rounded-xl border border-zinc-700 px-4 py-2 text-zinc-300 transition hover:bg-zinc-800"
              >
                {">"}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex overflow-hidden rounded-xl border border-zinc-700">
                {(["day", "week", "month"] as ViewMode[]).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setViewMode(mode)}
                    className={`px-4 py-2 text-sm capitalize transition ${
                      viewMode === mode
                        ? "bg-white font-semibold text-black"
                        : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowBookingModal(true)}
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"
              >
                Add Booking
              </button>
            </div>
          </div>
        </section>

        {viewMode === "day" ? (
          <section className="space-y-4">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <p className="text-sm text-zinc-400">Day occupancy</p>
              <p className="mt-2 text-3xl font-bold">
                {Math.round(
                  (dayBookings.reduce((sum, item) => sum + item.estimatedHours, 0) / 24) * 100
                )}
                %
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                {dayBookings.reduce((sum, item) => sum + item.estimatedHours, 0)} booked hours from
                24 available
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-950 text-zinc-400">
                  <tr>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Registration</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Booking Reason</th>
                    <th className="px-4 py-3">Assigned To</th>
                    <th className="px-4 py-3">Est. Hours</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-200">
                  {dayBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-4 py-4">{booking.time}</td>
                      <td className="px-4 py-4">{booking.registration}</td>
                      <td className="px-4 py-4">{booking.customer}</td>
                      <td className="px-4 py-4">{booking.reason}</td>
                      <td className="px-4 py-4">{booking.assignedTo}</td>
                      <td className="px-4 py-4">{booking.estimatedHours}</td>
                      <td className="px-4 py-4">{booking.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : null}

        {viewMode === "week" ? (
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {weekStats.map((day) => (
              <div
                key={toISODate(day.date)}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
              >
                <p className="text-sm text-zinc-400">{formatShortDay(day.date)}</p>
                <p className="mt-3 text-2xl font-bold">{day.count} bookings</p>
                <p className="mt-2 text-sm text-zinc-400">{day.totalHours} booked hours</p>
                <p className="mt-2 text-sm text-zinc-400">Occupancy: {day.occupancy}%</p>
              </div>
            ))}
          </section>
        ) : null}

        {viewMode === "month" ? (
          <section className="grid gap-3 md:grid-cols-4 xl:grid-cols-7">
            {monthStats.map((day) => (
              <div
                key={toISODate(day.date)}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
              >
                <p className="text-sm font-semibold">
                  {new Intl.DateTimeFormat("en-GB", { day: "numeric" }).format(day.date)}
                </p>
                <p className="mt-2 text-sm text-zinc-400">{day.count} bookings</p>
                <p className="mt-1 text-sm text-zinc-400">{day.occupancy}% full</p>
              </div>
            ))}
          </section>
        ) : null}

        {showBookingModal ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
            <div className="max-h-[90vh] w-full max-w-5xl overflow-auto rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">Add Booking</h2>
                  <p className="mt-2 text-sm text-zinc-400">
                    Search for an existing vehicle or customer first. Add a vehicle inline if
                    nothing exists yet.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeBookingModal}
                  className="rounded-xl border border-zinc-700 px-4 py-2 text-zinc-300"
                >
                  Close
                </button>
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                  <h3 className="mb-4 text-lg font-semibold">1. Search Vehicle / Customer</h3>

                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by registration, surname, phone, or postcode..."
                    className="mb-4 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                  />

                  <div className="space-y-3">
                    {filteredVehicles.length > 0 ? (
                      filteredVehicles.map((vehicle) => (
                        <button
                          key={vehicle.id}
                          type="button"
                          onClick={() => setSelectedVehicle(vehicle)}
                          className={`w-full rounded-2xl border p-4 text-left transition ${
                            selectedVehicle?.id === vehicle.id
                              ? "border-white bg-zinc-800"
                              : "border-zinc-800 bg-zinc-950 hover:bg-zinc-800/60"
                          }`}
                        >
                          <p className="text-lg font-semibold">{vehicle.registration}</p>
                          <p className="mt-1 text-sm text-zinc-400">{vehicle.vehicle}</p>
                          <p className="mt-1 text-sm text-zinc-400">
                            {vehicle.customer} · {vehicle.postcode}
                          </p>
                        </button>
                      ))
                    ) : (
                      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                        <p className="text-sm text-zinc-400">No saved profile found.</p>
                        <button
                          type="button"
                          onClick={() => setShowAddVehicleInline(true)}
                          className="mt-4 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black"
                        >
                          Add Vehicle
                        </button>
                      </div>
                    )}
                  </div>

                  {filteredVehicles.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => setShowAddVehicleInline(true)}
                      className="mt-4 rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300"
                    >
                      Add Vehicle Instead
                    </button>
                  ) : null}
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                  <h3 className="mb-4 text-lg font-semibold">2. Booking Draft</h3>

                  {selectedVehicle ? (
                    <div className="mb-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
                      <p className="text-lg font-semibold">{selectedVehicle.registration}</p>
                      <p className="mt-1 text-sm text-zinc-400">{selectedVehicle.vehicle}</p>
                      <p className="mt-1 text-sm text-zinc-400">{selectedVehicle.customer}</p>
                    </div>
                  ) : (
                    <div className="mb-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-400">
                      Select or create a vehicle first.
                    </div>
                  )}

                  <div className="grid gap-4">
                    <div>
                      <label className="mb-2 block text-sm text-zinc-300">Booking Date</label>
                      <input
                        type="date"
                        defaultValue={toISODate(currentDate)}
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-zinc-300">Start Time</label>
                      <input
                        type="time"
                        defaultValue="09:00"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-zinc-300">Booking Reason</label>
                      <select className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none">
                        <option>Service</option>
                        <option>Brakes replacement</option>
                        <option>Diagnostics</option>
                        <option>MOT prep</option>
                        <option>Sale prep</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-zinc-300">Estimated Hours</label>
                      <input
                        type="number"
                        defaultValue={2}
                        min={0.5}
                        step={0.5}
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-zinc-300">Assigned To</label>
                      <select className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none">
                        <option>Unassigned</option>
                        <option>Mechanic 1</option>
                        <option>Mechanic 2</option>
                        <option>Shop Foreman</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"
                    >
                      Save Booking
                    </button>
                  </div>
                </div>
              </div>

              {showAddVehicleInline ? (
                <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold">Add Vehicle Inline</h3>
                    <button
                      type="button"
                      onClick={() => setShowAddVehicleInline(false)}
                      className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300"
                    >
                      Close
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      type="text"
                      value={newVehicleReg}
                      onChange={(e) => setNewVehicleReg(e.target.value.toUpperCase())}
                      placeholder="Registration *"
                      className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                    />

                    <input
                      type="text"
                      value={newVehicleCustomer}
                      onChange={(e) => setNewVehicleCustomer(e.target.value)}
                      placeholder="Customer name"
                      className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                    />

                    <input
                      type="text"
                      value={newVehicleMake}
                      onChange={(e) => setNewVehicleMake(e.target.value)}
                      placeholder="Make *"
                      className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                    />

                    <input
                      type="text"
                      value={newVehicleModel}
                      onChange={(e) => setNewVehicleModel(e.target.value)}
                      placeholder="Model *"
                      className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                    />

                    <input
                      type="text"
                      value={newVehiclePostcode}
                      onChange={(e) => setNewVehiclePostcode(e.target.value.toUpperCase())}
                      placeholder="Postcode"
                      className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={saveInlineVehicle}
                      className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"
                    >
                      Save Vehicle And Use In Booking
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}