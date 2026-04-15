"use client";

import { useState } from "react";
import TopBar from "../../components/topbar";

export default function AddVehiclePage() {
  const [registration, setRegistration] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [ownershipType, setOwnershipType] = useState("");
  const [salesEligible, setSalesEligible] = useState("");

  const salesModuleActive = true;

  function formatRegistration(value: string) {
    return value
      .toUpperCase()
      .replace(/[^A-Z0-9\s]/g, "")
      .replace(/\s+/g, " ")
      .trimStart();
  }

  const showOwnershipType = vehicleType === "Customer Vehicle";
  const showCustomerDetails = vehicleType === "Customer Vehicle" && ownershipType !== "";
  const showSalesEligible =
    salesModuleActive &&
    (vehicleType === "Customer Vehicle" || vehicleType === "Stock Vehicle");
  const showStockChecks = vehicleType === "Stock Vehicle";

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <TopBar
          title="Add Vehicle"
          subtitle="Create a permanent vehicle record for workshop or sales use"
          simple
        />

        <form className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <section>
            <h2 className="mb-4 text-xl font-semibold">Vehicle Identity</h2>

            <div className="grid gap-4">
              <div>
                <label className="mb-2 block text-sm text-zinc-300">Registration *</label>

                <div className="flex flex-col gap-3 md:flex-row md:items-stretch">
                  <div className="flex min-h-[88px] flex-1 overflow-hidden rounded-xl border-2 border-blue-800 bg-[#f2cf2f]">
                    <div className="flex w-20 flex-col items-center justify-center bg-[#1146a6] px-2 text-white">
                      <div className="text-xl leading-none">🇬🇧</div>
                      <div className="mt-1 text-[11px] font-semibold tracking-wide">GB</div>
                    </div>

                    <input
                      type="text"
                      value={registration}
                      onChange={(e) => setRegistration(formatRegistration(e.target.value))}
                      placeholder="YOUR REG"
                      maxLength={10}
                      className="flex-1 bg-[#f2cf2f] px-6 text-center text-3xl font-semibold uppercase tracking-[0.12em] text-slate-700 outline-none placeholder:text-slate-500"
                    />
                  </div>

                  <button
                    type="button"
                    className="rounded-xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-blue-500 md:min-w-[240px]"
                  >
                    Search Registration
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-zinc-300">VIN (optional)</label>
                <input
                  type="text"
                  placeholder="Vehicle identification number"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">Make *</label>
                <input
                  type="text"
                  placeholder="BMW"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">Model *</label>
                <input
                  type="text"
                  placeholder="320D"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">Year *</label>
                <input
                  type="number"
                  placeholder="2016"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">Mileage *</label>
                <input
                  type="number"
                  placeholder="120000"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">Fuel Type *</label>
                <select className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none">
                  <option value="">Please select</option>
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Hybrid</option>
                  <option>Electric</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">Transmission *</label>
                <select className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none">
                  <option value="">Please select</option>
                  <option>Manual</option>
                  <option>Automatic</option>
                  <option>Semi-Automatic</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">Engine *</label>
                <input
                  type="text"
                  placeholder="2.0"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">Colour *</label>
                <input
                  type="text"
                  placeholder="Black"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">Vehicle Classification</h2>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm text-zinc-300">Vehicle Type *</label>
                <select
                  value={vehicleType}
                  onChange={(e) => {
                    const nextType = e.target.value;
                    setVehicleType(nextType);

                    if (nextType !== "Customer Vehicle") {
                      setOwnershipType("");
                    }

                    if (nextType === "Stock Vehicle") {
                      setSalesEligible("Yes");
                    } else if (nextType === "Internal Vehicle") {
                      setSalesEligible("");
                    } else {
                      setSalesEligible("");
                    }
                  }}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                >
                  <option value="">Please select</option>
                  <option>Customer Vehicle</option>
                  {salesModuleActive ? <option>Stock Vehicle</option> : null}
                  <option>Internal Vehicle</option>
                </select>
              </div>

              {showOwnershipType ? (
                <div>
                  <label className="mb-2 block text-sm text-zinc-300">Ownership Type *</label>
                  <select
                    value={ownershipType}
                    onChange={(e) => setOwnershipType(e.target.value)}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                  >
                    <option value="">Please select</option>
                    <option>Customer Owned</option>
                    <option>Business Owned</option>
                  </select>
                </div>
              ) : null}

              {showSalesEligible ? (
                <div>
                  <label className="mb-2 block text-sm text-zinc-300">Sales Eligible *</label>
                  <select
                    value={salesEligible}
                    onChange={(e) => setSalesEligible(e.target.value)}
                    disabled={vehicleType === "Stock Vehicle"}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none disabled:opacity-70"
                  >
                    <option value="">Please select</option>
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>
              ) : null}
            </div>

            {showStockChecks ? (
              <div className="mt-6 flex flex-col gap-3 md:flex-row">
                <button
                  type="button"
                  className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800"
                >
                  Run MOT History Search
                </button>

                <button
                  type="button"
                  className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800"
                >
                  Run VDI Search
                </button>
              </div>
            ) : null}
          </section>

          {showCustomerDetails ? (
            <section>
              <h2 className="mb-4 text-xl font-semibold">Customer / Ownership Details</h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-zinc-300">Customer Name *</label>
                  <input
                    type="text"
                    placeholder="Customer name"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-300">Phone</label>
                  <input
                    type="text"
                    placeholder="07123 456789"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-300">Email</label>
                  <input
                    type="email"
                    placeholder="name@email.com"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-zinc-300">Ownership Notes</label>
                  <input
                    type="text"
                    placeholder="Optional ownership notes"
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                  />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="mb-4 text-lg font-semibold">Address Details</h3>

                <div className="grid gap-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-end">
                    <div className="w-full md:max-w-xs">
                      <label className="mb-2 block text-sm text-zinc-300">Postcode</label>
                      <input
                        type="text"
                        placeholder="LE12 3AB"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 uppercase text-white outline-none"
                      />
                    </div>

                    <button
                      type="button"
                      className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800"
                    >
                      Search Address
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm text-zinc-300">Address Line 1</label>
                      <input
                        type="text"
                        placeholder="House number and street"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-zinc-300">Address Line 2</label>
                      <input
                        type="text"
                        placeholder="Optional"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-zinc-300">Town / City</label>
                      <input
                        type="text"
                        placeholder="Town or city"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-zinc-300">County</label>
                      <input
                        type="text"
                        placeholder="County"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          <section>
            <h2 className="mb-4 text-xl font-semibold">Internal Notes</h2>

            <textarea
              rows={4}
              placeholder="Optional internal notes about this vehicle record"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none"
            />
          </section>

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"
            >
              Save Vehicle
            </button>

            <a
              href="/vehicles"
              className="rounded-xl border border-zinc-700 px-5 py-3 text-sm text-zinc-300"
            >
              Cancel
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}