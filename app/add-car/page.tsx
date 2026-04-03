import TopBar from "../components/topbar";
export default function AddCarPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-10">
     <TopBar
  title="Add Car"
  subtitle="Create a new vehicle record for EZ Auto Hub"
  simple
/>

        <form className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-zinc-300">Registration</label>
              <input
                type="text"
                placeholder="AB12 CDE"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Make</label>
              <input
                type="text"
                placeholder="BMW"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Model</label>
              <input
                type="text"
                placeholder="320D"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Year</label>
              <input
                type="text"
                placeholder="2016"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Fuel Type</label>
              <input
                type="text"
                placeholder="Diesel"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Engine</label>
              <input
                type="text"
                placeholder="2.0"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Transmission</label>
              <input
                type="text"
                placeholder="Automatic"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Colour</label>
              <input
                type="text"
                placeholder="Black"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Mileage</label>
              <input
                type="text"
                placeholder="120000"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-zinc-300">VIN (optional)</label>
              <input
                type="text"
                placeholder="Vehicle identification number"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Purchase Price</label>
              <input
                type="text"
                placeholder="4500"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Recovery / Transport Cost</label>
              <input
                type="text"
                placeholder="150"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-zinc-300">Initial Notes</label>
              <textarea
                placeholder="Optional starting notes"
                rows={4}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"
            >
              Save Car
            </button>
            <button
              type="button"
              className="rounded-xl border border-zinc-700 px-5 py-3 text-sm text-zinc-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}