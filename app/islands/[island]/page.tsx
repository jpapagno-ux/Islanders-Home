import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageContextScript } from "@/components/PageContextScript";
import { PlaceJsonLd } from "@/components/PlaceJsonLd";
import { Crumbs, PlaceGuide } from "@/components/site/PlaceGuide";
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
  return (
    <PlaceGuide
      place={place}
      trail={region ? [region] : []}
      communities={children}
      homes={homes}
      context={{ page_type: "island_guide", journey: "buyer", island_id: place.slug }}
    />
  );
}
