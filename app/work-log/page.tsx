import TopBar from "../components/topbar";

export default function WorkLogPage() {
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

            <form className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-zinc-300">Car</label>
                <select className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none">
                  <option>AB12 CDE - 2016 BMW 320D</option>
                  <option>YX19 FGH - 2019 Ford Transit Custom</option>
                  <option>LM22 JKL - 2022 Audi A4</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">Work Carried Out</label>
                <input
                  type="text"
                  placeholder="Battery replaced"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-zinc-300">Hours</label>
                  <input
                    type="text"
                    placeholder="2"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-300">Hourly Rate</label>
                  <input
                    type="text"
                    placeholder="50"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">Notes</label>
                <textarea
                  rows={4}
                  placeholder="Optional notes"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                />
              </div>

              <button className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black">
                Save Work Entry
              </button>
            </form>
          </section>

          <aside className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-4 text-xl font-semibold">Recent Entries</h2>

            <div className="space-y-3 text-sm text-zinc-300">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="font-medium">Battery replaced</p>
                <p className="mt-1 text-zinc-400">AB12 CDE</p>
                <p className="mt-1 text-zinc-400">2.0 hours · £50/hr · £100</p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="font-medium">Initial engine inspection</p>
                <p className="mt-1 text-zinc-400">AB12 CDE</p>
                <p className="mt-1 text-zinc-400">1.5 hours · £50/hr · £75</p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="font-medium">Brake service</p>
                <p className="mt-1 text-zinc-400">YX19 FGH</p>
                <p className="mt-1 text-zinc-400">2.5 hours · £50/hr · £125</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}