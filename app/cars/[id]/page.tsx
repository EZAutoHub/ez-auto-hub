import TopBar from "../../components/topbar";
import { supabase } from "../../lib/supabase";

type CarPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CarDetailsPage({ params }: CarPageProps) {
  const { id } = await params;

  const { data: car, error } = await supabase
    .from("cars")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !car) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <TopBar title="Car Details" subtitle="Vehicle overview, findings, work, and costs" simple />

          <div className="rounded-2xl border border-red-800 bg-red-950 p-6 text-red-300">
            Car not found.
          </div>
        </div>
      </main>
    );
  }

  const invested =
    Number(car.purchase_price ?? 0) + Number(car.recovery_transport_cost ?? 0);

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
            <button className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300">
              Change Status
            </button>
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
                  href="/work-log"
                  className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300"
                >
                  Add Work
                </a>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-400">
                Work log entries will appear here next.
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <h2 className="mb-4 text-xl font-semibold">Financial Summary</h2>
              <div className="space-y-2 text-sm text-zinc-300">
                <p>Purchase price: £{Number(car.purchase_price ?? 0).toFixed(2)}</p>
                <p>Recovery cost: £{Number(car.recovery_transport_cost ?? 0).toFixed(2)}</p>
                <p>Parts total: £0.00</p>
                <p>Labour total: £0.00</p>
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