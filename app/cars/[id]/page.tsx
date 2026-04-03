export default function CarDetailsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-start justify-between border-b border-zinc-800 pb-6">
          <div>
            <p className="text-sm text-zinc-400">Registration</p>
            <h1 className="text-4xl font-bold">AB12 CDE</h1>
            <p className="mt-2 text-zinc-400">2016 BMW 320D · Purchased</p>
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
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <h2 className="mb-4 text-xl font-semibold">Vehicle Details</h2>
              <div className="grid gap-3 text-sm text-zinc-300 md:grid-cols-2">
                <p>Make: BMW</p>
                <p>Model: 320D</p>
                <p>Year: 2016</p>
                <p>Fuel: Diesel</p>
                <p>Engine: 2.0</p>
                <p>Transmission: Automatic</p>
                <p>Colour: Black</p>
                <p>Mileage: 120,000</p>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Diagnostic Findings</h2>
                <button className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300">
                  Add Finding
                </button>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="font-medium">Non-runner - battery flat</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Vehicle arrived non-starting. Battery discharged.
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="font-medium">Front suspension noise</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Suspected drop link or wishbone issue.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Work Log</h2>
                <button className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300">
                  Add Work
                </button>
              </div>

              <div className="space-y-3 text-sm text-zinc-300">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="font-medium">Battery replaced</p>
                  <p className="mt-1 text-zinc-400">2.0 hours · £50/hr · £100</p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                  <p className="font-medium">Initial engine inspection</p>
                  <p className="mt-1 text-zinc-400">1.5 hours · £50/hr · £75</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
              <h2 className="mb-4 text-xl font-semibold">Financial Summary</h2>
              <div className="space-y-2 text-sm text-zinc-300">
                <p>Purchase price: £4,500</p>
                <p>Recovery cost: £150</p>
                <p>Parts total: £0</p>
                <p>Labour total: £175</p>
                <p className="font-semibold text-white">Total invested: £4,825</p>
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
                <button className="w-full rounded-xl border border-zinc-700 px-4 py-3 text-sm text-zinc-300">
                  Open Sale Prep
                </button>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}