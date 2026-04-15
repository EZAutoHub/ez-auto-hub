import TopBar from "../components/topbar";

export default function SalesPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <TopBar
          title="Sales"
          subtitle="Manage stock preparation, listings, and publishing"
          simple
        />

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">In Prep</p>
            <p className="mt-2 text-3xl font-bold">2</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Published</p>
            <p className="mt-2 text-3xl font-bold">5</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Reserved</p>
            <p className="mt-2 text-3xl font-bold">1</p>
          </div>
        </section>

        <section className="mb-6">
          <input
            type="text"
            placeholder="Search stock by registration, make, model..."
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none"
          />
        </section>

        <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950 text-zinc-400">
              <tr>
                <th className="px-4 py-3">Registration</th>
                <th className="px-4 py-3">Vehicle</th>
                <th className="px-4 py-3">Listing Status</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Public State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-200">
              <tr>
                <td className="px-4 py-4">YX19 FGH</td>
                <td className="px-4 py-4">2019 Ford Transit Custom</td>
                <td className="px-4 py-4">In Prep</td>
                <td className="px-4 py-4">£10,250</td>
                <td className="px-4 py-4">Hidden</td>
              </tr>
              <tr>
                <td className="px-4 py-4">LM22 JKL</td>
                <td className="px-4 py-4">2022 Audi A4</td>
                <td className="px-4 py-4">Published</td>
                <td className="px-4 py-4">£15,995</td>
                <td className="px-4 py-4">Live</td>
              </tr>
              <tr>
                <td className="px-4 py-4">VX70 AAA</td>
                <td className="px-4 py-4">2020 Volkswagen Golf</td>
                <td className="px-4 py-4">Reserved</td>
                <td className="px-4 py-4">£14,495</td>
                <td className="px-4 py-4">Reserved</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}