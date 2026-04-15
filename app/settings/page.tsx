import TopBar from "../components/topbar";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <TopBar
          title="Settings"
          subtitle="Manage business setup, users, roles, permissions, and platform options"
          simple
        />

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">Business Profile</h2>
            <p className="mt-3 text-sm text-zinc-400">
              Company name, contact details, branding, and operating preferences.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">Users & Roles</h2>
            <p className="mt-3 text-sm text-zinc-400">
              Add staff, assign roles, and control who can access each module.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">Permissions</h2>
            <p className="mt-3 text-sm text-zinc-400">
              Fine-tune what each role can view, edit, approve, or publish.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">Workshop Tier</h2>
            <p className="mt-3 text-sm text-zinc-400">
              Review workshop plan limits, storage usage, and enabled capabilities.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">Sales Module</h2>
            <p className="mt-3 text-sm text-zinc-400">
              Manage sales tier, listing tools, and public presentation settings.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">Integrations</h2>
            <p className="mt-3 text-sm text-zinc-400">
              Future area for MOT, reg decode, labour data, storage, and billing links.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}