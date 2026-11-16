"use client";

import { useState } from "react";

const TABS = ["Mortgage", "Real Estate Taxes", "Insurance", "Property Notes"] as const;
type Tab = (typeof TABS)[number];

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
const num = (v: string, fallback: number) => {
  const n = parseFloat(v);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
};

/** Monthly ownership estimator. Illustrative only: taxes and insurance are never pre-filled. */
export function Estimator({ defaultPrice = 0 }: { defaultPrice?: number }) {
  const [tab, setTab] = useState<Tab>("Mortgage");
  const [price, setPrice] = useState(defaultPrice ? String(defaultPrice) : "");
  const [down, setDown] = useState("20");
  const [rate, setRate] = useState("6.75");
  const [term, setTerm] = useState("30");
  const [tax, setTax] = useState("");
  const [ins, setIns] = useState("");

  const loan = num(price, 0) * (1 - Math.min(num(down, 0), 100) / 100);
  const m = num(rate, 0) / 1200;
  const n = num(term, 30) * 12;
  const pi = loan === 0 ? 0 : m > 0 ? (loan * m) / (1 - Math.pow(1 + m, -n)) : loan / n;
  const taxM = num(tax, 0) / 12;
  const insM = num(ins, 0) / 12;

  const labelCls = "flex flex-col gap-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ocean";

  return (
    <div className="flex flex-wrap gap-[clamp(24px,4vw,56px)]">
      <div className="min-w-0 flex-[999_1_460px] bg-paper p-[clamp(20px,3vw,36px)]">
        <div role="tablist" aria-label="Ownership costs" className="mb-7 flex flex-wrap gap-x-7 gap-y-1 border-b border-sand">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`min-h-[48px] cursor-pointer border-b-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-ocean ${tab === t ? "border-gold" : "border-transparent"}`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Mortgage" && (
          <div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className={labelCls}>
                Purchase price ($)
                <input className="field" type="number" inputMode="numeric" value={price} onChange={(e) => setPrice(e.target.value)} />
              </label>
              <label className={labelCls}>
                Down payment (%)
                <input className="field" type="number" inputMode="decimal" value={down} onChange={(e) => setDown(e.target.value)} />
              </label>
              <label className={labelCls}>
                Interest rate (%)
                <input className="field" type="number" inputMode="decimal" step="0.125" value={rate} onChange={(e) => setRate(e.target.value)} />
              </label>
              <label className={labelCls}>
                Loan term
                <select className="field" value={term} onChange={(e) => setTerm(e.target.value)}>
                  <option value="30">30 years</option>
                  <option value="20">20 years</option>
                  <option value="15">15 years</option>
                </select>
              </label>
            </div>
            <p className="mt-4 text-[13px]">The rate shown is a starting point for illustration, not a quote. Loan amount: {usd(loan)}.</p>
          </div>
        )}

        {tab === "Real Estate Taxes" && (
          <div>
            <label className={`${labelCls} max-w-[380px]`}>
              Annual real estate taxes ($)
              <input className="field" type="number" inputMode="numeric" placeholder="Enter the annual tax bill" value={tax} onChange={(e) => setTax(e.target.value)} />
            </label>
            <p className="mt-4 max-w-[560px] text-[13px]">
              We do not pre-fill taxes. A purchase usually resets the assessed value, so the seller’s bill is not a reliable guide. Confirm
              with the county property appraiser.
            </p>
          </div>
        )}

        {tab === "Insurance" && (
          <div>
            <label className={`${labelCls} max-w-[380px]`}>
              Annual insurance: home, wind and flood ($)
              <input className="field" type="number" inputMode="numeric" placeholder="Enter quoted annual premiums" value={ins} onChange={(e) => setIns(e.target.value)} />
            </label>
            <p className="mt-4 max-w-[560px] text-[13px]">
              We do not pre-fill insurance. Premiums in the Keys depend on elevation, flood zone, roof and opening protection. Use quotes
              from a licensed insurance agent for the specific address.
            </p>
          </div>
        )}

        {tab === "Property Notes" && (
          <p className="max-w-[560px]">
            Flood zone, elevation certificate, roof year, impact openings, seawall and dock condition will appear here for each property,
            each with its source and the date it was checked.
          </p>
        )}
      </div>

      <div className="min-w-0 flex-[1_1_300px] bg-ocean p-[clamp(24px,3vw,40px)] text-paper">
        <div className="label">Estimated monthly ownership</div>
        <div aria-live="polite" className="mb-1 mt-3 font-serif text-[clamp(48px,6vw,72px)] leading-none">
          {usd(pi + taxM + insM)}
        </div>
        <div className="text-[13px]">per month</div>
        <dl className="mt-6 border-t border-paper/30 text-[15px]">
          {[
            ["Principal and interest", usd(pi)],
            ["Real estate taxes", taxM ? usd(taxM) : "Not entered"],
            ["Insurance", insM ? usd(insM) : "Not entered"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-paper/30 py-3">
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-[12px]">
          Estimates are illustrative only and require verification. Actual rates, taxes and insurance vary by lender, location and
          individual circumstances. This is not a loan offer.
        </p>
      </div>
    </div>
  );
}
