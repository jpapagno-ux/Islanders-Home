import Link from "next/link";
import { PageContextScript } from "@/components/PageContextScript";
import { PlaceJsonLd, placePath } from "@/components/PlaceJsonLd";
import { PropertyCard } from "@/components/site/PropertyCard";
import type { Place } from "@/lib/content";
import type { Property } from "@/lib/content/sample";
import type { PageContext } from "@/lib/measurement/context";

export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
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

/**
 * Guide page shared by islands and communities: heading, summary, overview, sourced
 * facts, child communities, homes, questions and answers. `trail` is the chain of
 * parents from the region down, used for the breadcrumb and the structured data.
 */
export function PlaceGuide({
  place,
  trail,
  communities,
  homes,
  context,
}: {
  place: Place;
  trail: Place[];
  communities: Place[];
  homes: Property[];
  context: PageContext;
}) {
  const children = communities;
  const hasGuide = Boolean(place.overview);
  const kind = place.type === "community" ? "community" : "island";
  const island = place.type === "community" ? trail[trail.length - 1] : place;
  const islandSlug = island?.slug ?? place.slug;
  const islandName = island?.name ?? place.name;
  return (
    <main>
      <PageContextScript {...context} />
      <PlaceJsonLd place={place} trail={trail} />
      <section className="bg-sand">
        <div className="wrap py-[clamp(56px,8vw,112px)]">
          <Crumbs items={[{ label: "Islands", href: "/islands" }, ...trail.map((t) => ({ label: t.name, href: placePath(t) })), { label: place.name }]} />
          <div className="rule" />
          <h1 className="display !text-[clamp(42px,6.4vw,84px)]">{place.name}</h1>
          {place.area && <div className="label mt-3 text-mute">{place.area}</div>}
          {place.summary && <p className="mt-5 max-w-[680px] text-[19px] leading-relaxed">{place.summary}</p>}
          {!hasGuide && !place.summary && (
            <p className="mt-5 max-w-[620px] text-[17px]">
              The {place.name} {kind} guide is being written from first-hand knowledge and verified sources.
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
        <Link href={`/properties?island=${islandSlug}`} className="btn btn-line">
          View homes on {islandName}
        </Link>
      </section>
    </main>
  );
}
