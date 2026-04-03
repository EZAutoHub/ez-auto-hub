"use client";

import { useEffect, useMemo, useState } from "react";
import TopBar from "./components/topbar";
import { supabase } from "./lib/supabase";

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
  hours: number;
  hourly_rate: number;
};

type FilterKey = "Purchased" | "In Work" | "For Sale" | "Sold";

const FILTER_GROUPS: Record<FilterKey, string[]> = {
  Purchased: ["Purchased", "Initial Diagnosis"],
  "In Work": ["In Repair", "Running / Road Test", "Cosmetic Prep"],
  "For Sale": ["Ready for Sale", "Published"],
  Sold: ["Sold"],
};

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [workLogs, setWorkLogs] = useState<WorkLog[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("Purchased");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setErrorMessage("");

      const { data: carsData, error: carsError } = await supabase
        .from("cars")
        .select("*")
        .order("created_at", { ascending: false });

      if (carsError) {
        setErrorMessage(carsError.message);
        setCars([]);
        setWorkLogs([]);
        setLoading(false);
        return;
      }

      const { data: workLogsData, error: workLogsError } = await supabase
        .from("work_logs")
        .select("id, car_id, hours, hourly_rate");

      if (workLogsError) {
        setErrorMessage(workLogsError.message);
        setCars([]);
        setWorkLogs([]);
        setLoading(false);
        return;
      }

      setCars((carsData as Car[]) ?? []);
      setWorkLogs((workLogsData as WorkLog[]) ?? []);
      setLoading(false);
    }

    loadData();
  }, []);

  const labourTotalsByCar = useMemo(() => {
    const totals: Record<string, number> = {};

    for (const entry of workLogs) {
      const total = Number(entry.hours ?? 0) * Number(entry.hourly_rate ?? 0);
      totals[entry.car_id] = (totals[entry.car_id] ?? 0) + total;
    }

    return totals;
  }, [workLogs]);

  const filteredCars = useMemo(() => {
    const allowedStatuses = FILTER_GROUPS[activeFilter];
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return cars.filter((car) => {
      const statusMatch = allowedStatuses.includes(car.status ?? "Purchased");
      const regMatch =
        normalizedSearch === "" ||
        (car.registration ?? "").toLowerCase().includes(normalizedSearch);

      return statusMatch && regMatch;
    });
  }, [cars, activeFilter, searchTerm]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <TopBar
          title="EZ Auto Hub"
          subtitle="Multi-tenant garage workflow and vehicle sales platform"
        />

        <section className="mb-6">
          <div className="flex flex-wrap gap-3">
            {(["Purchased", "In Work", "For Sale", "Sold"] as FilterKey[]).map((filter) => {
              const active = activeFilter === filter;

              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={
                    active
                      ? "rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
                      : "rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300"
                  }
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mb-8">
          <input
            type="text"
            placeholder="Search by registration..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none"
          />
        </section>

        {loading ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
            <h2 className="text-2xl font-semibold">Loading cars...</h2>
          </div>
        ) : errorMessage ? (
          <div className="rounded-2xl border border-red-800 bg-red-950 p-5 text-red-300">
            Failed to load dashboard: {errorMessage}
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
            <h2 className="text-2xl font-semibold">No cars in {activeFilter}</h2>
            <p className="mt-2 text-zinc-400">Try another filter or search term.</p>
          </div>
        ) : (
          <section className="space-y-4">
            {filteredCars.map((car) => {
              const labourTotal = labourTotalsByCar[car.id] ?? 0;
              const invested =
                Number(car.purchase_price ?? 0) +
                Number(car.recovery_transport_cost ?? 0) +
                labourTotal;

              return (
                <article
                  key={car.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm"
                >
                  <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
                    <div className="flex-1">
                      <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm text-zinc-400">Registration</p>
                          <h2 className="text-4xl font-bold">{car.registration}</h2>
                        </div>

                        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                          {car.status ?? "Purchased"}
                        </span>
                      </div>

                      <div className="grid gap-3 text-sm text-zinc-300 md:grid-cols-2">
                        <p>{[car.year, car.make, car.model].filter(Boolean).join(" ") || "—"}</p>
                        <p>Fuel: {car.fuel_type || "—"}</p>
                        <p>Mileage: {car.mileage ?? "—"}</p>
                      </div>
                    </div>

                    <div className="border-t border-zinc-800 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                      <div className="space-y-3 text-sm text-zinc-300">
                        <p>Labour total: £{labourTotal.toFixed(2)}</p>
                        <p>Purchase: £{Number(car.purchase_price ?? 0).toFixed(2)}</p>
                        <p>Recovery: £{Number(car.recovery_transport_cost ?? 0).toFixed(2)}</p>
                        <p className="font-semibold text-white">
                          Total invested: £{invested.toFixed(2)}
                        </p>
                      </div>

                      <div className="mt-5 flex gap-2">
                        <a
                          href={`/cars/${car.id}`}
                          className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black"
                        >
                          Open Car
                        </a>
                        <a
                          href={`/work-log?carId=${car.id}`}
                          className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300"
                        >
                          Add Work
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}