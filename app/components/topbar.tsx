type TopBarProps = {
  title: string;
  subtitle?: string;
  simple?: boolean;
};

export default function TopBar({ title, subtitle, simple = false }: TopBarProps) {
  return (
    <header className="mb-8 flex items-start justify-between border-b border-zinc-800 pb-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {subtitle ? (
          <p className="mt-2 text-sm text-zinc-400">{subtitle}</p>
        ) : null}
      </div>

      {simple ? (
        <a
          href="/"
          className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300"
        >
          Home
        </a>
      ) : (
        <div className="flex gap-3">
          <a
            href="/"
            className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300"
          >
            My Cars
          </a>
          <a
            href="/parts"
            className="rounded-xl border border-zinc-700 px-4 py-2 text-sm text-zinc-300"
          >
            Parts
          </a>
          <a
            href="/add-car"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black"
          >
            Add Car
          </a>
        </div>
      )}
    </header>
  );
}