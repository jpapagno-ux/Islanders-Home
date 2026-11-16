import Link from "next/link";
import { PageContextScript } from "@/components/PageContextScript";
import type { PageContext } from "@/lib/measurement/context";

/**
 * Branded page shell for routes whose full template is not built yet.
 * Shows an honest "in preparation" page inside the approved design system.
 */
export function Placeholder({
  title,
  context,
  eyebrow = "The Islanders Home",
  lede = "This page is in preparation.",
  points = [],
  children,
}: {
  title: string;
  context: PageContext;
  eyebrow?: string;
  lede?: string;
  points?: string[];
  children?: React.ReactNode;
}) {
  return (
    <main>
      <PageContextScript {...context} />
      <section className="bg-sand">
        <div className="wrap py-[clamp(56px,8vw,112px)]">
          <div className="eyebrow">{eyebrow}</div>
          <div className="rule" />
          <h1 className="display !text-[clamp(42px,6.4vw,84px)]">{title}</h1>
          <p className="mt-5 max-w-[620px] text-[17px]">{lede}</p>
        </div>
      </section>
      <section className="wrap section">
        {points.length > 0 && (
          <ul className="mb-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {points.map((p) => (
              <li key={p} className="border-t border-ocean/30 py-5 font-serif text-[26px] leading-tight text-ocean">
                {p}
              </li>
            ))}
          </ul>
        )}
        {children}
        <div className="flex flex-wrap gap-3">
          <Link href="/inquire" className="btn btn-ocean">
            Speak with James
          </Link>
          <Link href="/properties" className="btn btn-line">
            View properties
          </Link>
        </div>
      </section>
    </main>
  );
}
