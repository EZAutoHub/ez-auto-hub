import TopBar from "../components/topbar";

export default function WorkOrdersPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <TopBar
          title="Work Orders"
          subtitle="Manage active jobs, inspections, and workshop progress"
          simple
        />

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Open</p>
            <p className="mt-2 text-3xl font-bold">12</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Awaiting Inspection</p>
            <p className="mt-2 text-3xl font-bold">3</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">In Progress</p>
            <p className="mt-2 text-3xl font-bold">7</p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-400">Urgent</p>
            <p className="mt-2 text-3xl font-bold">2</p>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950 text-zinc-400">
              <tr>
                <th className="px-4 py-3">Work Order</th>
                <th className="px-4 py-3">Vehicle</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Assigned To</th>
                <th className="px-4 py-3">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-200">
              <tr>
                <td className="px-4 py-4">WO-1001</td>
                <td className="px-4 py-4">AB12 CDE</td>
                <td className="px-4 py-4">Open</td>
                <td className="px-4 py-4">Unassigned</td>
                <td className="px-4 py-4">Normal</td>
              </tr>
              <tr>
                <td className="px-4 py-4">WO-1002</td>
                <td className="px-4 py-4">YX19 FGH</td>
                <td className="px-4 py-4">Awaiting Inspection</td>
                <td className="px-4 py-4">Shop Foreman</td>
                <td className="px-4 py-4">High</td>
              </tr>
              <tr>
                <td className="px-4 py-4">WO-1003</td>
                <td className="px-4 py-4">LM22 JKL</td>
                <td className="px-4 py-4">In Progress</td>
                <td className="px-4 py-4">Mechanic 1</td>
                <td className="px-4 py-4">Urgent</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}