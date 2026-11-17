import Link from "next/link";
import { NAV } from "@/lib/nav";
import { SITE } from "@/lib/content/sample";
import { Wordmark } from "@/components/site/Header";
import { BrokerageLine } from "@/components/site/BrokerageLine";

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Accessibility", href: "/terms#accessibility" },
  { label: "Fair Housing", href: "/terms#fair-housing" },
  { label: "Brokerage Disclosures", href: "/terms#disclosures" },
];

export function Footer() {
  return (
    <footer className="bg-ocean text-paper">
      <div className="wrap pb-9 pt-[clamp(56px,7vw,96px)]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Wordmark light />
            <div className="rule" />
            <p className="font-serif text-[22px] italic leading-snug">Island Living. Intelligent Decisions.</p>
          </div>
          <div className="text-[15px]">
            <div className="label mb-3">Contact</div>
            {SITE.advisor}
            <br />
            {SITE.brokerage}
            <br />
            <a href={`mailto:${SITE.email}`} className="text-paper underline underline-offset-4">
              {SITE.email}
            </a>
            <br />
            <a href={SITE.phoneHref} className="text-paper underline underline-offset-4">
              {SITE.phoneDisplay}
            </a>
          </div>
          <div className="text-[15px]">
            <div className="label mb-3">Explore</div>
            {NAV.map((g) => (
              <Link key={g.label} href={g.href} className="block py-1 text-paper no-underline hover:underline">
                {g.label}
              </Link>
            ))}
            <Link href="/island-match" className="block py-1 text-paper no-underline hover:underline">
              The Island Match™
            </Link>
          </div>
          <div className="text-[15px]">
            <div className="label mb-3">Legal</div>
            {LEGAL.map((l) => (
              <Link key={l.label} href={l.href} className="block py-1 text-paper no-underline hover:underline">
                {l.label}
              </Link>
            ))}
            <Link href="/sitemap.xml" className="block py-1 text-paper no-underline hover:underline">
              Site Map
            </Link>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-x-8 gap-y-2 border-t border-paper/30 pt-5 text-[13px]">
          <span>© 2026 The Islanders Home. All rights reserved.</span>
          <span>Equal Housing Opportunity. Listing information is deemed reliable but not guaranteed; see each property for listing attribution.</span>
        </div>
        <div className="mt-6">
          <BrokerageLine light />
        </div>
      </div>
    </footer>
  );
}
