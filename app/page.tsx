import TopBar from "./components/topbar";
import { supabase } from "./lib/supabase";

export default async function Home() {
  const { data: cars = [], error } = await supabase
    .from("cars")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <TopBar
          title="EZ Auto Hub"
          subtitle="Multi-tenant garage workflow and vehicle sales platform"
        />

        <section className="mb-8">
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black">
              Purchased
            </button>
            <button className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300">
              In Work
            </button>
            <button className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300">
              For Sale
            </button>
            <button className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300">
              Sold
            </button>
          </div>
        </section>

        {error ? (
          <div className="rounded-2xl border border-red-800 bg-red-950 p-5 text-red-300">
            Failed to load cars: {error.message}
          </div>
        ) : cars.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
            <h2 className="text-2xl font-semibold">No cars yet</h2>
            <p className="mt-2 text-zinc-400">Add your first vehicle to get started.</p>
          </div>
        ) : (
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {cars.map((car) => {
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
                      {car.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-zinc-300">
                    <p>
                      {[car.year, car.make, car.model].filter(Boolean).join(" ")}
                    </p>
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