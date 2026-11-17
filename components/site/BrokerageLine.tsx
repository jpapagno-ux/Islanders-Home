import { SITE } from "@/lib/content/sample";

/**
 * Brokerage identification (AD-32: brokerage of record = Brown Harris Stevens).
 * Shown in the footer, About, Work With James and Inquire. The logo is a typographic
 * placeholder until the BHS file is supplied. No mortgage company name anywhere;
 * NMLS #461234 appears only where lending is discussed.
 */
export function BrokerageLine({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  const text = light ? "text-paper" : "text-ink";
  return (
    <div className={`${text} text-[14px] leading-relaxed`}>
      <div
        aria-label="Brown Harris Stevens"
        className={`mb-2 inline-block border px-3 py-1.5 font-serif text-[13px] uppercase tracking-[0.22em] ${light ? "border-paper/50 text-paper" : "border-[#1b3a6b] text-[#1b3a6b]"}`}
      >
        Brown Harris Stevens
      </div>
      <div>
        <strong>{SITE.advisor}</strong>, Real Estate Advisor · {SITE.brokerage}
      </div>
      {!compact && (
        <div>
          {SITE.officeAddress} ·{" "}
          <a href={SITE.phoneHref} className={`${light ? "text-paper" : ""} underline underline-offset-4`}>
            {SITE.phoneDisplay}
          </a>
        </div>
      )}
    </div>
  );
}
