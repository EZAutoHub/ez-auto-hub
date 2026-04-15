"use client";

const summaryCards = [
  { title: "Bookings - Today", value: "8", href: "/bookings?filter=today" },
  { title: "Work Orders - Open", value: "12", href: "/work-orders?filter=open" },
  { title: "Parts - Awaiting Order", value: "4", href: "/parts?filter=awaiting-order" },
  { title: "Parts - Awaiting Arrival", value: "6", href: "/parts?filter=awaiting-arrival" },
  { title: "Parts - Received", value: "3", href: "/parts?filter=received" },
  { title: "Sales - In Prep", value: "2", href: "/sales?filter=in-prep" },
  { title: "Sales - Published", value: "5", href: "/sales?filter=published" },
  { title: "Sales - Reserved", value: "1", href: "/sales?filter=reserved" },
];

const modules = [
  {
    title: "Bookings",
    description: "Schedule planned work, assign technicians, and manage the workshop calendar.",
    href: "/bookings",
  },
  {
    title: "Work Orders",
    description: "Manage active jobs, inspections, and workshop progress.",
    href: "/work-orders",
  },
  {
    title: "Vehicles",
    description: "Search vehicle history, ownership, and linked work orders.",
    href: "/vehicles",
  },
  {
    title: "Parts",
    description: "Track requested, ordered, arriving, and received parts.",
    href: "/parts",
  },
  {
    title: "Sales",
    description: "Prepare stock, manage listings, and control publishing.",
    href: "/sales",
  },
  {
    title: "Settings",
    description: "Control users, roles, permissions, and business setup.",
    href: "/settings",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <header className="mb-8 border-b border-zinc-800 pb-6">
          <h1 className="text-3xl font-bold tracking-tight">EZ Auto Hub</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Garage workflow platform with optional vehicle sales tools
          </p>
        </header>

        <section className="mb-8">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-8">
            {summaryCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition hover:border-zinc-700 hover:bg-zinc-800/70"
              >
                <p className="text-xs leading-5 text-zinc-400">{card.title}</p>
                <p className="mt-2 text-2xl font-bold">{card.value}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          {modules.map((module) => (
            <a
              key={module.title}
              href={module.href}
              className="block rounded-3xl border border-zinc-800 bg-zinc-900 p-10 transition hover:border-zinc-700 hover:bg-zinc-800/70"
            >
              <h2 className="text-3xl font-semibold">{module.title}</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-400">
                {module.description}
              </p>
            </a>
          ))}
        </section>
      </div>
    </main>
  );
}