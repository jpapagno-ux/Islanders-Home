import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageContextScript } from "@/components/PageContextScript";
import { PlaceJsonLd } from "@/components/PlaceJsonLd";
import { PropertyCard } from "@/components/site/PropertyCard";
import { getChildren, getPlace, getPlaces, getProperties, type Place } from "@/lib/content";

type Params = Promise<{ island: string }>;

export const revalidate = 300;

/** Regions and islands share this route: /islands/florida-keys and /islands/sugarloaf-key. */
export async function generateStaticParams() {
  return (await getPlaces()).filter((p) => p.type !== "community").map((p) => ({ island: p.slug }));
}

async function load(slug: string): Promise<Place | undefined> {
  const place = await getPlace(slug);
  return place && place.type !== "community" ? place : undefined;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { island } = await params;
  const place = await load(island);
  if (!place) return {};
  const description = place.seoDescription || place.summary;
  return {
    // An SEO title from the content source already carries the brand, so it is used as written.
    title: place.seoTitle ? { absolute: place.seoTitle } : place.type === "region" ? `Islands of ${place.name}` : `Living on ${place.name}`,
    ...(description ? { description } : {}),
    alternates: { canonical: `/islands/${place.slug}` },
  };
}

function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="label mb-4 flex flex-wrap gap-x-2 text-mute">
      {items.map((it, n) => (
        <span key={it.label}>
          {it.href ? (
            <Link href={it.href} className="text-mute no-underline hover:text-teal">
              {it.label}
            </Link>
          ) : (
            <span className="text-ink">{it.label}</span>
          )}
          {n < items.length - 1 && <span aria-hidden> / </span>}
        </span>
      ))}
    </nav>
  );
}

const GUIDE_SECTIONS = ["Boating and access", "Living here", "Ownership and insurance", "Homes on the island", "Questions and answers", "James’s note"];

export default async function Page({ params }: { params: Params }) {
  const { island } = await params;
  const place = await load(island);
  if (!place) notFound();
  const children = await getChildren(place.slug);

  if (place.type === "region") {
    return (
      <main>
        <PageContextScript page_type="island_index" journey="buyer" />
        <PlaceJsonLd place={place} trail={[]} />
        <section className="bg-sand">
          <div className="wrap py-[clamp(56px,8vw,112px)]">
            <Crumbs items={[{ label: "Islands", href: "/islands" }, { label: place.name }]} />
            <div className="rule" />
            <h1 className="display !text-[clamp(42px,6.4vw,84px)]">{place.name}</h1>
            <p className="mt-5 max-w-[680px] whitespace-pre-line text-[17px]">
              {place.overview || place.summary || `The ${place.name} guide is being written from first-hand knowledge and verified sources.`}
            </p>
          </div>
        </section>
        <section className="wrap section">
          <div className="eyebrow">
            {children.length} {children.length === 1 ? "island" : "islands"}
          </div>
          <div className="rule" />
          <div className="grid gap-x-10 md:grid-cols-2">
            {children.map((isl) => (
              <Link key={isl.slug} href={`/islands/${isl.slug}`} className="flex items-baseline justify-between gap-5 border-t border-ocean/25 py-5 no-underline">
                <span className="font-serif text-[clamp(26px,2.8vw,36px)] leading-tight text-ocean">{isl.name}</span>
                {isl.area && <span className="label text-mute">{isl.area}</span>}
              </Link>
            ))}
          </div>
        </section>
      </main>
    );
  }

  const region = await getPlace(place.parent);
  const homes = (await getProperties()).filter((p) => p.island === place.slug);
  const hasGuide = Boolean(place.overview);

  return (
    <main>
      <PageContextScript page_type="island_guide" journey="buyer" island_id={place.slug} />
      <PlaceJsonLd place={place} trail={region ? [region] : []} />
      <section className="bg-sand">
        <div className="wrap py-[clamp(56px,8vw,112px)]">
          <Crumbs
            items={[
              { label: "Islands", href: "/islands" },
              ...(region ? [{ label: region.name, href: `/islands/${region.slug}` }] : []),
              { label: place.name },
            ]}
          />
          <div className="rule" />
          <h1 className="display !text-[clamp(42px,6.4vw,84px)]">{place.name}</h1>
          {place.area && <div className="label mt-3 text-mute">{place.area}</div>}
          {place.summary && <p className="mt-5 max-w-[680px] text-[19px] leading-relaxed">{place.summary}</p>}
          {!hasGuide && !place.summary && (
            <p className="mt-5 max-w-[620px] text-[17px]">
              The {place.name} island guide is being written from first-hand knowledge and verified sources.
            </p>
          )}
        </div>
      </section>

      {hasGuide ? (
        <section className="wrap section">
          <div className="max-w-[720px] whitespace-pre-line text-[17px] leading-relaxed">{place.overview}</div>
        </section>
      ) : (
        <section className="wrap section">
          <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDE_SECTIONS.map((s) => (
              <li key={s} className="border-t border-ocean/30 py-5 font-serif text-[26px] leading-tight text-ocean">
                {s}
              </li>
            ))}
          </ul>
        </section>
      )}

      {place.facts.length > 0 && (
        <section className="bg-sand">
          <div className="wrap section">
            <div className="eyebrow">At a glance</div>
            <div className="rule" />
            <dl className="grid gap-x-10 md:grid-cols-2">
              {place.facts.map((f) => (
                <div key={f.label} className="border-t border-ocean/25 py-4">
                  <dt className="label text-mute">{f.label}</dt>
                  <dd className="mt-1 text-[17px]">{f.value}</dd>
                  <dd className="mt-1 text-[12px] text-mute">
                    Source: {f.source} · as of {f.asOf}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {children.length > 0 && (
        <section className="wrap section">
          <div className="eyebrow">Communities</div>
          <div className="rule" />
          <div className="grid gap-x-10 md:grid-cols-2">
            {children.map((c) => (
              <Link key={c.slug} href={`/islands/${place.slug}/${c.slug}`} className="block border-t border-ocean/25 py-5 font-serif text-[clamp(24px,2.6vw,32px)] leading-tight text-ocean no-underline">
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {homes.length > 0 && (
        <section className="wrap section">
          <div className="eyebrow">Homes on {place.name}</div>
          <div className="rule" />
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {homes.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}

      {place.qa.length > 0 && (
        <section className="bg-sand">
          <div className="wrap section">
            <div className="eyebrow">Questions and answers</div>
            <div className="rule" />
            <div className="max-w-[820px]">
              {place.qa.map((x) => (
                <div key={x.q} className="border-t border-ocean/25 py-5">
                  <h3 className="font-serif text-[26px] leading-tight text-ocean">{x.q}</h3>
                  <p className="mt-2 text-[17px]">{x.a}</p>
                  {x.source && (
                    <p className="mt-1 text-[12px] text-mute">
                      Source: {x.source}
                      {x.asOf && ` · as of ${x.asOf}`}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="wrap section flex flex-wrap gap-3">
        <Link href="/inquire" className="btn btn-ocean">
          Speak with James
        </Link>
        <Link href={`/properties?island=${place.slug}`} className="btn btn-line">
          View homes on {place.name}
        </Link>
      </section>
    </main>
  );
}
