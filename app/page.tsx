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

type FilterKey = "Purchased" | "In Work" | "For Sale" | "Sold";

const FILTER_GROUPS: Record<FilterKey, string[]> = {
  Purchased: ["Purchased", "Initial Diagnosis"],
  "In Work": ["In Repair", "Running / Road Test", "Cosmetic Prep"],
  "For Sale": ["Ready for Sale", "Published"],
  Sold: ["Sold"],
};

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("Purchased");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadCars() {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setErrorMessage(error.message);
        setCars([]);
        setLoading(false);
        return;
      }

      setCars((data as Car[]) ?? []);
      setLoading(false);
    }

    loadCars();
  }, []);

  const filteredCars = useMemo(() => {
    const allowedStatuses = FILTER_GROUPS[activeFilter];
    return cars.filter((car) => allowedStatuses.includes(car.status ?? "Purchased"));
  }, [cars, activeFilter]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <TopBar
          title="EZ Auto Hub"
          subtitle="Multi-tenant garage workflow and vehicle sales platform"
        />

        <section className="mb-8">
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

        {loading ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
            <h2 className="text-2xl font-semibold">Loading cars...</h2>
          </div>
        ) : errorMessage ? (
          <div className="rounded-2xl border border-red-800 bg-red-950 p-5 text-red-300">
            Failed to load cars: {errorMessage}
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
            <h2 className="text-2xl font-semibold">No cars in {activeFilter}</h2>
            <p className="mt-2 text-zinc-400">Try another filter or add a new vehicle.</p>
          </div>
        ) : (
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredCars.map((car) => {
              const invested =
                Number(car.purchase_price ?? 0) + Number(car.recovery_transport_cost ?? 0);

              return (
                <article
                  key={car.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-sm"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <p className="text-sm text-zinc-400">Registration</p>
                      <h2 className="text-2xl font-bold">{car.registration}</h2>
                    </div>
                    <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                      {car.status ?? "Purchased"}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-zinc-300">
                    <p>{[car.year, car.make, car.model].filter(Boolean).join(" ") || "—"}</p>
                    <p>Total invested: £{invested.toFixed(2)}</p>
                    <p>Fuel: {car.fuel_type || "—"}</p>
                    <p>Mileage: {car.mileage ?? "—"}</p>
                  </div>

                  <div className="mt-5 flex gap-2">
                    <a
                      href={`/cars/${car.id}`}
                      className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black"
                    >
                      Open Car
                    </a>
                    <a
                      href="/work-log"
                      className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300"
                    >
                      Add Work
                    </a>
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