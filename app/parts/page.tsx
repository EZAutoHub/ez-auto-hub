import TopBar from "../components/topbar";

export default function PartsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <TopBar
          title="Parts"
          subtitle="Track requested, ordered, arriving, and received parts across all work orders"
          simple
        />

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Awaiting Order</p>
            <p className="mt-2 text-3xl font-bold">4</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Awaiting Arrival</p>
            <p className="mt-2 text-3xl font-bold">6</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Received</p>
            <p className="mt-2 text-3xl font-bold">3</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Fitted</p>
            <p className="mt-2 text-3xl font-bold">8</p>
          </div>
        </section>

        <section className="mb-6">
          <input
            type="text"
            placeholder="Search by part, supplier, work order, or registration..."
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none"
          />
        </section>

        <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950 text-zinc-400">
              <tr>
                <th className="px-4 py-3">Part</th>
                <th className="px-4 py-3">Work Order</th>
                <th className="px-4 py-3">Vehicle</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Supplier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-200">
              <tr>
                <td className="px-4 py-4">Front brake pads</td>
                <td className="px-4 py-4">WO-1002</td>
                <td className="px-4 py-4">YX19 FGH</td>
                <td className="px-4 py-4">Awaiting Order</td>
                <td className="px-4 py-4">Euro Car Parts</td>
              </tr>
              <tr>
                <td className="px-4 py-4">Clutch kit</td>
                <td className="px-4 py-4">WO-1003</td>
                <td className="px-4 py-4">LM22 JKL</td>
                <td className="px-4 py-4">Awaiting Arrival</td>
                <td className="px-4 py-4">GSF</td>
              </tr>
              <tr>
                <td className="px-4 py-4">Battery</td>
                <td className="px-4 py-4">WO-1001</td>
                <td className="px-4 py-4">AB12 CDE</td>
                <td className="px-4 py-4">Received</td>
                <td className="px-4 py-4">Local Supplier</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}