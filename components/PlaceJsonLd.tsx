import type { Place } from "@/lib/content";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://islanders-home.vercel.app";

export function placePath(place: Place): string {
  return place.type === "community" ? `/islands/${place.parent}/${place.slug}` : `/islands/${place.slug}`;
}

/**
 * Structured data for a region, island or community page: the place itself, its
 * breadcrumb trail and, when the page shows questions and answers, an FAQ block.
 * Only content that is visible on the page is described here.
 */
export function PlaceJsonLd({ place, trail }: { place: Place; trail: Place[] }) {
  const url = `${SITE}${placePath(place)}`;
  const parent = trail[trail.length - 1];
  const description = place.summary || place.seoDescription;

  const placeNode: Record<string, unknown> = {
    "@type": "Place",
    "@id": `${url}#place`,
    name: place.name,
    url,
    ...(description ? { description } : {}),
    ...(place.latitude !== undefined && place.longitude !== undefined
      ? { geo: { "@type": "GeoCoordinates", latitude: place.latitude, longitude: place.longitude } }
      : {}),
    ...(parent ? { containedInPlace: { "@type": "Place", name: parent.name, url: `${SITE}${placePath(parent)}` } } : {}),
    ...(place.facts.length
      ? { additionalProperty: place.facts.map((f) => ({ "@type": "PropertyValue", name: f.label, value: f.value })) }
      : {}),
  };

  const crumbs = [{ name: "Islands", url: `${SITE}/islands` }, ...trail.map((p) => ({ name: p.name, url: `${SITE}${placePath(p)}` })), { name: place.name, url }];
  const breadcrumbNode = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: crumbs.map((c, n) => ({ "@type": "ListItem", position: n + 1, name: c.name, item: c.url })),
  };

  const faqNode = place.qa.length
    ? {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: place.qa.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })),
      }
    : null;

  const graph = { "@context": "https://schema.org", "@graph": [placeNode, breadcrumbNode, ...(faqNode ? [faqNode] : [])] };
  // "<" is escaped so text from the content source cannot close the script element.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />;
}
