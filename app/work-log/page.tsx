"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import TopBar from "../components/topbar";
import { supabase } from "../lib/supabase";

type Car = {
  id: string;
  registration: string;
  make: string | null;
  model: string | null;
  year: number | null;
};

type WorkLog = {
  id: string;
  car_id: string;
  work_title: string;
  hours: number;
  hourly_rate: number;
  notes: string | null;
  created_at: string;
  cars?: {
    registration: string;
    make: string | null;
    model: string | null;
    year: number | null;
  } | null;
};

export default function WorkLogPage() {
  const searchParams = useSearchParams();
  const preselectedCarId = searchParams.get("carId");

  const [cars, setCars] = useState<Car[]>([]);
  const [workLogs, setWorkLogs] = useState<WorkLog[]>([]);
  const [carId, setCarId] = useState("");
  const [workTitle, setWorkTitle] = useState("");
  const [hours, setHours] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function loadData() {
    const { data: carsData, error: carsError } = await supabase
      .from("cars")
      .select("id, registration, make, model, year")
      .order("created_at", { ascending: false });

    if (carsError) {
      setErrorMessage(carsError.message);
      return;
    }

    const { data: logsData, error: logsError } = await supabase
      .from("work_logs")
      .select(`
        id,
        car_id,
        work_title,
        hours,
        hourly_rate,
        notes,
        created_at,
        cars (
          registration,
          make,
          model,
          year
        )
      `)
      .order("created_at", { ascending: false });

    if (logsError) {
      setErrorMessage(logsError.message);
      return;
    }

    const mappedCars = (carsData as Car[]) ?? [];
    setCars(mappedCars);
    setWorkLogs((logsData as unknown as WorkLog[]) ?? []);

    if (preselectedCarId) {
      setCarId(preselectedCarId);
    } else if (!carId && mappedCars.length > 0) {
      setCarId(mappedCars[0].id);
    }
  }

  useEffect(() => {
    loadData();
  }, [preselectedCarId]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErrorMessage("");
    setSuccessMessage("");

    const { error } = await supabase.from("work_logs").insert([
      {
        car_id: carId,
        work_title: workTitle,
        hours: hours ? Number(hours) : 0,
        hourly_rate: hourlyRate ? Number(hourlyRate) : 0,
        notes: notes || null,
      },
    ]);

    if (error) {
      setErrorMessage(error.message);
      setSaving(false);
      return;
    }

    setWorkTitle("");
    setHours("");
    setHourlyRate("");
    setNotes("");
    setSuccessMessage("Work entry saved.");
    setSaving(false);

    await loadData();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <TopBar
          title="Work Log"
          subtitle="Track labour entries and time spent across vehicles"
          simple
        />

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-4 text-xl font-semibold">Add Work Entry</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-zinc-300">Car</label>
                <select
                  value={carId}
                  onChange={(e) => setCarId(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                >
                  {cars.map((car) => (
                    <option key={car.id} value={car.id}>
                      {[car.registration, car.year, car.make, car.model].filter(Boolean).join(" - ")}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">Work Carried Out</label>
                <input
                  type="text"
                  placeholder="Battery replaced"
                  value={workTitle}
                  onChange={(e) => setWorkTitle(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-zinc-300">Hours</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="2"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-300">Hourly Rate</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="50"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">Notes</label>
                <textarea
                  rows={4}
                  placeholder="Optional notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                />
              </div>

              {errorMessage ? (
                <p className="rounded-xl border border-red-800 bg-red-950 px-4 py-3 text-sm text-red-300">
                  {errorMessage}
                </p>
              ) : null}

              {successMessage ? (
                <p className="rounded-xl border border-emerald-800 bg-emerald-950 px-4 py-3 text-sm text-emerald-300">
                  {successMessage}
                </p>
              ) : null}

              <button
                disabled={saving}
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Work Entry"}
              </button>
            </form>
          </section>

          <aside className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-4 text-xl font-semibold">Recent Entries</h2>

            <div className="space-y-3 text-sm text-zinc-300">
              {workLogs.length === 0 ? (
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-zinc-400">
                  No work entries yet.
                </div>
              ) : (
                workLogs.slice(0, 8).map((entry) => {
                  const total = Number(entry.hours ?? 0) * Number(entry.hourly_rate ?? 0);

                  return (
                    <div key={entry.id} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                      <p className="font-medium">{entry.work_title}</p>
                      <p className="mt-1 text-zinc-400">
                        {entry.cars?.registration || "Unknown car"}
                      </p>
                      <p className="mt-1 text-zinc-400">
                        {Number(entry.hours).toFixed(2)} hours · £
                        {Number(entry.hourly_rate).toFixed(2)}/hr · £{total.toFixed(2)}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}