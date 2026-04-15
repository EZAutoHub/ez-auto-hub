import TopBar from "../components/topbar";

export default function VehiclesPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <TopBar
          title="Vehicles"
          subtitle="Search permanent vehicle records, ownership, and history"
          simple
        />

        <section className="mb-6 flex items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Search by registration, VIN, make, model, or customer..."
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none"
          />

          <a
            href="/vehicles/add"
            className="whitespace-nowrap rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"
          >
            Add Vehicle
          </a>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Total Vehicles</p>
            <p className="mt-2 text-3xl font-bold">128</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Customer Vehicles</p>
            <p className="mt-2 text-3xl font-bold">97</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Stock Vehicles</p>
            <p className="mt-2 text-3xl font-bold">21</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Internal Vehicles</p>
            <p className="mt-2 text-3xl font-bold">10</p>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950 text-zinc-400">
              <tr>
                <th className="px-4 py-3">Registration</th>
                <th className="px-4 py-3">Vehicle</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">Last Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-200">
              <tr>
                <td className="px-4 py-4">AB12 CDE</td>
                <td className="px-4 py-4">2016 BMW 320D</td>
                <td className="px-4 py-4">Customer Vehicle</td>
                <td className="px-4 py-4">John Smith</td>
                <td className="px-4 py-4">Work Order WO-1001</td>
              </tr>
              <tr>
                <td className="px-4 py-4">YX19 FGH</td>
                <td className="px-4 py-4">2019 Ford Transit Custom</td>
                <td className="px-4 py-4">Stock Vehicle</td>
                <td className="px-4 py-4">Business Owned</td>
                <td className="px-4 py-4">Sale Prep</td>
              </tr>
              <tr>
                <td className="px-4 py-4">LM22 JKL</td>
                <td className="px-4 py-4">2022 Audi A4</td>
                <td className="px-4 py-4">Internal Vehicle</td>
                <td className="px-4 py-4">Garage Fleet</td>
                <td className="px-4 py-4">Inspection Logged</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}