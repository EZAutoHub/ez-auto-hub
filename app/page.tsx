"use client";

import TopBar from "./components/topbar";

const summaryCards = [
  { title: "Open Work Orders", value: "12", href: "/work-orders?filter=open" },
  { title: "Awaiting Order", value: "4", href: "/parts?filter=awaiting-order" },
  { title: "Awaiting Arrival", value: "6", href: "/parts?filter=awaiting-arrival" },
  { title: "Received", value: "3", href: "/parts?filter=received" },
  { title: "In Prep", value: "2", href: "/sales?filter=in-prep" },
  { title: "Published", value: "5", href: "/sales?filter=published" },
  { title: "Reserved", value: "1", href: "/sales?filter=reserved" },
];

const modules = [
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
        <TopBar
          title="EZ Auto Hub"
          subtitle="Garage workflow platform with optional vehicle sales tools"
        />

        <section className="mb-8">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7">
            {summaryCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-700 hover:bg-zinc-800/70"
              >
                <p className="text-sm text-zinc-400">{card.title}</p>
                <p className="mt-3 text-3xl font-bold">{card.value}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => (
            <a
              key={module.title}
              href={module.href}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 transition hover:border-zinc-700 hover:bg-zinc-800/70"
            >
              <h2 className="text-2xl font-semibold">{module.title}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{module.description}</p>
            </a>
          ))}
        </section>
      </div>
    </main>
  );
}