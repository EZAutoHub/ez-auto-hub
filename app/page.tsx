export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-10 flex items-center justify-between border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">EZ Auto Hub</h1>
            <p className="mt-2 text-sm text-zinc-400">
              Multi-tenant garage workflow and vehicle sales platform
            </p>
          </div>
          <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black">
            Add Car
          </button>
        </header>

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

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="text-sm text-zinc-400">Registration</p>
                <h2 className="text-2xl font-bold">AB12 CDE</h2>
              </div>
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                Purchased
              </span>
            </div>

            <div className="space-y-2 text-sm text-zinc-300">
              <p>2016 BMW 320D</p>
              <p>Total invested: £4,250</p>
              <p>Projected sale: £5,995</p>
              <p>Projected profit: £1,745</p>
            </div>

            <div className="mt-5 flex gap-2">
              <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black">
                Open Car
              </button>
              <button className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300">
                Add Work
              </button>
            </div>
          </article>

          <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="text-sm text-zinc-400">Registration</p>
                <h2 className="text-2xl font-bold">YX19 FGH</h2>
              </div>
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                In Repair
              </span>
            </div>

            <div className="space-y-2 text-sm text-zinc-300">
              <p>2019 Ford Transit Custom</p>
              <p>Total invested: £7,980</p>
              <p>Projected sale: £10,250</p>
              <p>Projected profit: £2,270</p>
            </div>

            <div className="mt-5 flex gap-2">
              <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black">
                Open Car
              </button>
              <button className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300">
                Add Work
              </button>
            </div>
          </article>

          <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="text-sm text-zinc-400">Registration</p>
                <h2 className="text-2xl font-bold">LM22 JKL</h2>
              </div>
              <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                Ready for Sale
              </span>
            </div>

            <div className="space-y-2 text-sm text-zinc-300">
              <p>2022 Audi A4</p>
              <p>Total invested: £12,400</p>
              <p>Asking price: £15,995</p>
              <p>Projected profit: £3,595</p>
            </div>

            <div className="mt-5 flex gap-2">
              <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black">
                Open Car
              </button>
              <button className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300">
                Publish
              </button>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}