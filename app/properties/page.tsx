import type { Metadata } from "next";
import Link from "next/link";
import { PageContextScript } from "@/components/PageContextScript";
import { PropertyCard, ReservedCard } from "@/components/site/PropertyCard";
import { getPlace, getProperties } from "@/lib/content";
import { SAMPLE_NOTICE } from "@/lib/content/sample";

export const metadata: Metadata = {
  title: "Properties",
  description: "Curated waterfront residences across the Florida Keys, selected by James Papagno.",
  alternates: { canonical: "/properties" },
};

export const revalidate = 300;

type Search = Promise<{ island?: string; price?: string }>;

/** "2-4" → $2M to $4M; "8-" → $8M and above. Price is a way to search, never a rule for what is listed. */
function priceRange(value: string | undefined): [number, number] | null {
  const m = value?.match(/^(\d+)-(\d*)$/);
  if (!m) return null;
  return [Number(m[1]) * 1_000_000, m[2] ? Number(m[2]) * 1_000_000 : Infinity];
}

export default async function Page({ searchParams }: { searchParams: Search }) {
  const { island, price } = await searchParams;
  const all = await getProperties();
  const place = island ? await getPlace(island) : undefined;
  const range = priceRange(price);
  const properties = all.filter(
    (p) => (!place || p.island === place.slug) && (!range || (p.price >= range[0] && p.price < range[1])),
  );
  const filtered = Boolean(place || range);
  return (
    <main>
      <PageContextScript page_type="property_search" journey="buyer" />
      <section className="bg-sand">
        <div className="wrap py-[clamp(56px,8vw,112px)]">
          <div className="eyebrow">Properties</div>
          <div className="rule" />
          <h1 className="display !text-[clamp(42px,6.4vw,84px)]">Exceptional Island Homes</h1>
          <p className="mt-5 max-w-[620px] text-[17px]">
            A small number of homes, chosen rather than listed.
          </p>
          {filtered && (
            <p className="label mt-4 text-mute">
              Showing {place ? place.name : "all islands"}
              {range && ` · ${range[1] === Infinity ? `$${range[0] / 1e6}M and above` : range[0] === 0 ? `up to $${range[1] / 1e6}M` : `$${range[0] / 1e6}M to $${range[1] / 1e6}M`}`}
            </p>
          )}
        </div>
      </section>
      <section className="wrap section">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
          {filtered && properties.length === 0 && (
            <div className="sm:col-span-2 lg:col-span-3">
              <p className="max-w-[620px] text-[17px]">
                No home in the collection matches {place ? `${place.name}` : "that search"} yet. James can search privately for you.
              </p>
              <Link href="/properties" className="label mt-4 inline-block border-b border-gold pb-1.5 text-ocean no-underline">
                See all properties →
              </Link>
            </div>
          )}
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
