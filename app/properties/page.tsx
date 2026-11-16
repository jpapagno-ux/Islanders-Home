import type { Metadata } from "next";
import Link from "next/link";
import { PageContextScript } from "@/components/PageContextScript";
import { PropertyCard, ReservedCard } from "@/components/site/PropertyCard";
import { getProperties } from "@/lib/content";
import { SAMPLE_NOTICE } from "@/lib/content/sample";

export const metadata: Metadata = {
  title: "Properties",
  description: "Curated waterfront residences across the Florida Keys, selected by James Papagno.",
  alternates: { canonical: "/properties" },
};

export const revalidate = 300;

export default async function Page() {
  const properties = await getProperties();
  return (
    <main>
      <PageContextScript page_type="property_search" journey="buyer" />
      <section className="bg-sand">
        <div className="wrap py-[clamp(56px,8vw,112px)]">
          <div className="eyebrow">Properties</div>
          <div className="rule" />
          <h1 className="display !text-[clamp(42px,6.4vw,84px)]">Exceptional Island Homes</h1>
          <p className="mt-5 max-w-[620px] text-[17px]">
            A small number of homes, chosen rather than listed. Search by island, type and price arrives with the live listing feed.
          </p>
        </div>
      </section>
      <section className="wrap section">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
          <ReservedCard tone="seaglass">More curated homes are being selected</ReservedCard>
          <ReservedCard>The Islanders Collection™ opens with its first five categories</ReservedCard>
        </div>
        {properties.some((p) => p.sample) && <p className="mt-8 text-[13px]">{SAMPLE_NOTICE}</p>}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/properties/collection" className="btn btn-line">
            The Islanders Collection™
          </Link>
          <Link href="/island-match" className="btn btn-ocean">
            Begin The Island Match
          </Link>
        </div>
      </section>
    </main>
  );
}
