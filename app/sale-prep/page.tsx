import TopBar from "../components/topbar";

export default function SalePrepPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <TopBar
          title="Sale Prep"
          subtitle="Prepare a vehicle listing and control what becomes public"
          simple
        />

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-4 text-xl font-semibold">Listing Details</h2>

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
                <label className="mb-2 block text-sm text-zinc-300">Public Title</label>
                <input
                  type="text"
                  placeholder="2016 BMW 320D Auto"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">Asking Price</label>
                <input
                  type="text"
                  placeholder="5995"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">Public Description</label>
                <textarea
                  rows={5}
                  placeholder="Write the public advert description here"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-300">
                  <input type="checkbox" className="mr-2" />
                  Show selected diagnostics publicly
                </label>

                <label className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-300">
                  <input type="checkbox" className="mr-2" />
                  Show selected work log items publicly
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <button className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black">
                  Save Sale Prep
                </button>

                <button
                  type="button"
                  className="rounded-xl border border-zinc-700 px-5 py-3 text-sm text-zinc-300"
                >
                  Mark Ready for Sale
                </button>
              </div>
            </form>
          </section>

          <aside className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-4 text-xl font-semibold">Public Listing Status</h2>

            <div className="space-y-3 text-sm text-zinc-300">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="font-medium">Status</p>
                <p className="mt-1 text-zinc-400">Draft</p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="font-medium">Featured Photo</p>
                <p className="mt-1 text-zinc-400">Not selected</p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                <p className="font-medium">Visibility</p>
                <p className="mt-1 text-zinc-400">Hidden from public website</p>
              </div>

              <button className="w-full rounded-xl border border-zinc-700 px-4 py-3 text-sm text-zinc-300">
                Hide from Public
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}