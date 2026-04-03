"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import TopBar from "../../components/topbar";
import { supabase } from "../../lib/supabase";

type Car = {
  id: string;
  registration: string;
  make: string | null;
  model: string | null;
  year: number | null;
  fuel_type: string | null;
  engine: string | null;
  transmission: string | null;
  colour: string | null;
  mileage: number | null;
  vin: string | null;
  purchase_price: number | null;
  recovery_transport_cost: number | null;
  initial_notes: string | null;
  status: string | null;
  created_at: string;
};

type WorkLog = {
  id: string;
  car_id: string;
  work_title: string;
  hours: number;
  hourly_rate: number;
  notes: string | null;
  created_at: string;
};

const STATUS_OPTIONS = [
  "Purchased",
  "Initial Diagnosis",
  "In Repair",
  "Running / Road Test",
  "Cosmetic Prep",
  "Ready for Sale",
  "Published",
  "Sold",
];

export default function CarDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [car, setCar] = useState<Car | null>(null);
  const [workLogs, setWorkLogs] = useState<WorkLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Purchased");
  const [savingStatus, setSavingStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    async function loadCarData() {
      setLoading(true);
      setErrorMessage("");

      const { data: carData, error: carError } = await supabase
        .from("cars")
        .select("*")
        .eq("id", id)
        .single();

      if (carError || !carData) {
        setErrorMessage(carError?.message || "Car not found.");
        setCar(null);
        setLoading(false);
        return;
      }

      const { data: workLogData, error: workLogError } = await supabase
        .from("work_logs")
        .select("*")
        .eq("car_id", id)
        .order("created_at", { ascending: false });

      if (workLogError) {
        setErrorMessage(workLogError.message);
        setLoading(false);
        return;
      }

      setCar(carData as Car);
      setWorkLogs((workLogData as WorkLog[]) ?? []);
      setSelectedStatus(carData.status || "Purchased");
      setLoading(false);
    }

    loadCarData();
  }, [id]);

  async function handleStatusUpdate() {
    if (!car) return;

    setSavingStatus(true);
    setStatusMessage("");

    const { error } = await supabase
      .from("cars")
      .update({ status: selectedStatus })
      .eq("id", car.id);

    if (error) {
      setStatusMessage(`Failed to update status: ${error.message}`);
      setSavingStatus(false);
      return;
    }

    setCar({ ...car, status: selectedStatus });
    setStatusMessage("Status updated successfully.");
    setSavingStatus(false);
    router.refresh();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <TopBar title="Car Details" subtitle="Vehicle overview, findings, work, and costs" simple />
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            Loading car...
          </div>
        </div>
      </main>
    );
  }

  if (errorMessage || !car) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <TopBar title="Car Details" subtitle="Vehicle overview, findings, work, and costs" simple />
          <div className="rounded-2xl border border-red-800 bg-red-950 p-6 text-red-300">
            {errorMessage || "Car not found."}
          </div>
        </div>
      </main>
    );
  }

  const labourTotal = workLogs.reduce((sum, entry) => {
    return sum + Number(entry.hours ?? 0) * Number(entry.hourly_rate ?? 0);
  }, 0);

  const invested =
    Number(car.purchase_price ?? 0) +
    Number(car.recovery_transport_cost ?? 0) +
    labourTotal;

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <TopBar title="Car Details" subtitle="Vehicle overview, findings, work, and costs" simple />

        <div className="mb-8 flex items-start justify-between border-b border-zinc-800 pb-6">
          <div>
            <p className="text-sm text-zinc-400">Registration</p>
            <h1 className="text-4xl font-bold">{car.registration}</h1>
            <p className="mt-2 text-zinc-400">
              {[car.year, car.make, car.model].filter(Boolean).join(" ") || "Vehicle"} ·{" "}
              {car.status ?? "Purchased"}
            </p>
          </div>

          <div className="flex gap-3">
            <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black">
              Add Diagnostic
            </button>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <h2 className="mb-4 text-xl font-semibold">Vehicle Details</h2>
              <div className="grid gap-3 text-sm text-zinc-300 md:grid-cols-2">
                <p>Make: {car.make || "—"}</p>
                <p>Model: {car.model || "—"}</p>
                <p>Year: {car.year ?? "—"}</p>
                <p>Fuel: {car.fuel_type || "—"}</p>
                <p>Engine: {car.engine || "—"}</p>
                <p>Transmission: {car.transmission || "—"}</p>
                <p>Colour: {car.colour || "—"}</p>
                <p>Mileage: {car.mileage ?? "—"}</p>
                <p>VIN: {car.vin || "—"}</p>
                <p>Status: {car.status || "Purchased"}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Initial Notes</h2>
                <button className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300">
                  Add Finding
                </button>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="text-sm text-zinc-300">
                  {car.initial_notes || "No notes added yet."}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Work Log</h2>
                <a
                  href={`/work-log?carId=${car.id}`}
                  className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300"
                >
                  Add Work
                </a>
              </div>

              <div className="space-y-3 text-sm text-zinc-300">
                {workLogs.length === 0 ? (
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-zinc-400">
                    No work entries yet.
                  </div>
                ) : (
                  workLogs.map((entry) => {
                    const total =
                      Number(entry.hours ?? 0) * Number(entry.hourly_rate ?? 0);

                    return (
                      <div
                        key={entry.id}
                        className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
                      >
                        <p className="font-medium">{entry.work_title}</p>
                        <p className="mt-1 text-zinc-400">
                          {Number(entry.hours).toFixed(2)} hours · £
                          {Number(entry.hourly_rate).toFixed(2)}/hr · £
                          {total.toFixed(2)}
                        </p>
                        <p className="mt-1 text-zinc-500">
                          {new Date(entry.created_at).toLocaleString()}
                        </p>
                        {entry.notes ? (
                          <p className="mt-2 text-zinc-400">{entry.notes}</p>
                        ) : null}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <h2 className="mb-4 text-xl font-semibold">Status Update</h2>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-zinc-300">Change Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleStatusUpdate}
                  disabled={savingStatus}
                  className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black disabled:opacity-60"
                >
                  {savingStatus ? "Updating..." : "Save Status"}
                </button>

                {statusMessage ? (
                  <p className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300">
                    {statusMessage}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <h2 className="mb-4 text-xl font-semibold">Financial Summary</h2>
              <div className="space-y-2 text-sm text-zinc-300">
                <p>Purchase price: £{Number(car.purchase_price ?? 0).toFixed(2)}</p>
                <p>Recovery cost: £{Number(car.recovery_transport_cost ?? 0).toFixed(2)}</p>
                <p>Parts total: £0.00</p>
                <p>Labour total: £{labourTotal.toFixed(2)}</p>
                <p className="font-semibold text-white">Total invested: £{invested.toFixed(2)}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full rounded-xl border border-zinc-700 px-4 py-3 text-sm text-zinc-300">
                  Add Part
                </button>
                <button className="w-full rounded-xl border border-zinc-700 px-4 py-3 text-sm text-zinc-300">
                  Upload Photos
                </button>
                <a
                  href="/sale-prep"
                  className="block w-full rounded-xl border border-zinc-700 px-4 py-3 text-center text-sm text-zinc-300"
                >
                  Open Sale Prep
                </a>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}