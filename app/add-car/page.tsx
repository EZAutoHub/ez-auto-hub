"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import TopBar from "../components/topbar";

export default function AddCarPage() {
  const router = useRouter();

  const [registration, setRegistration] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [engine, setEngine] = useState("");
  const [transmission, setTransmission] = useState("");
  const [colour, setColour] = useState("");
  const [mileage, setMileage] = useState("");
  const [vin, setVin] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [recoveryTransportCost, setRecoveryTransportCost] = useState("");
  const [initialNotes, setInitialNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErrorMessage("");

    const { error } = await supabase.from("cars").insert([
      {
        registration,
        make,
        model,
        year: year ? Number(year) : null,
        fuel_type: fuelType,
        engine,
        transmission,
        colour,
        mileage: mileage ? Number(mileage) : null,
        vin: vin || null,
        purchase_price: purchasePrice ? Number(purchasePrice) : 0,
        recovery_transport_cost: recoveryTransportCost ? Number(recoveryTransportCost) : 0,
        initial_notes: initialNotes,
      },
    ]);

    if (error) {
      setErrorMessage(error.message);
      setSaving(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <TopBar
          title="Add Car"
          subtitle="Create a new vehicle record for EZ Auto Hub"
          simple
        />

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-zinc-300">Registration</label>
              <input
                type="text"
                placeholder="AB12 CDE"
                value={registration}
                onChange={(e) => setRegistration(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Make</label>
              <input
                type="text"
                placeholder="BMW"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Model</label>
              <input
                type="text"
                placeholder="320D"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Year</label>
              <input
                type="number"
                placeholder="2016"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Fuel Type</label>
              <input
                type="text"
                placeholder="Diesel"
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Engine</label>
              <input
                type="text"
                placeholder="2.0"
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Transmission</label>
              <input
                type="text"
                placeholder="Automatic"
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Colour</label>
              <input
                type="text"
                placeholder="Black"
                value={colour}
                onChange={(e) => setColour(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Mileage</label>
              <input
                type="number"
                placeholder="120000"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-zinc-300">VIN (optional)</label>
              <input
                type="text"
                placeholder="Vehicle identification number"
                value={vin}
                onChange={(e) => setVin(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Purchase Price</label>
              <input
                type="number"
                step="0.01"
                placeholder="4500"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Recovery / Transport Cost</label>
              <input
                type="number"
                step="0.01"
                placeholder="150"
                value={recoveryTransportCost}
                onChange={(e) => setRecoveryTransportCost(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-zinc-300">Initial Notes</label>
              <textarea
                placeholder="Optional starting notes"
                rows={4}
                value={initialNotes}
                onChange={(e) => setInitialNotes(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />
            </div>
          </div>

          {errorMessage ? (
            <p className="rounded-xl border border-red-800 bg-red-950 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </p>
          ) : null}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Car"}
            </button>

            <a
              href="/"
              className="rounded-xl border border-zinc-700 px-5 py-3 text-sm text-zinc-300"
            >
              Cancel
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}