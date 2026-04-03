export default function PartsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Parts</h1>
            <p className="mt-2 text-sm text-zinc-400">
              Track ordered, received, and fitted parts across all vehicles
            </p>
          </div>
          <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black">
            Add Part
          </button>
        </div>

        <section className="mb-8">
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black">
              All
            </button>
            <button className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300">
              Needed
            </button>
            <button className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300">
              Ordered
            </button>
            <button className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300">
              Received
            </button>
            <button className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300">
              Fitted
            </button>
          </div>
        </section>

        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950 text-zinc-400">
              <tr>
                <th className="px-4 py-3">Part</th>
                <th className="px-4 py-3">Car</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Expected</th>
                <th className="px-4 py-3">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-200">
              <tr>
                <td className="px-4 py-4">Battery</td>
                <td className="px-4 py-4">AB12 CDE</td>
                <td className="px-4 py-4">Fitted</td>
                <td className="px-4 py-4">—</td>
                <td className="px-4 py-4">£95</td>
              </tr>
              <tr>
                <td className="px-4 py-4">Wishbone / Control Arm</td>
                <td className="px-4 py-4">AB12 CDE</td>
                <td className="px-4 py-4">Ordered</td>
                <td className="px-4 py-4">12 Apr 2026</td>
                <td className="px-4 py-4">£120</td>
              </tr>
              <tr>
                <td className="px-4 py-4">Brake Pads</td>
                <td className="px-4 py-4">YX19 FGH</td>
                <td className="px-4 py-4">Received</td>
                <td className="px-4 py-4">10 Apr 2026</td>
                <td className="px-4 py-4">£68</td>
              </tr>
              <tr>
                <td className="px-4 py-4">Headlight</td>
                <td className="px-4 py-4">LM22 JKL</td>
                <td className="px-4 py-4">Needed</td>
                <td className="px-4 py-4">—</td>
                <td className="px-4 py-4">£0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}