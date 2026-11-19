import { cld } from "@/lib/cloudinary";
import { SITE, type Photo, type Property } from "@/lib/content/sample";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://islanders-home.vercel.app";

/**
 * Structured data for a property page: the listing, its price and its breadcrumb.
 * Sample listings are never marked up, so search and answer engines cannot read a
 * sample as a home that is for sale. Only details shown on the page are included.
 */
export function ListingJsonLd({ property: p, hero }: { property: Property; hero?: Photo }) {
  if (p.sample) return null;
  const url = `${BASE}/properties/${p.island}/${p.slug}`;
  const listing = {
    "@type": "RealEstateListing",
    "@id": `${url}#listing`,
    name: `${p.address}, ${p.islandName}`,
    url,
    ...(p.headline || p.description ? { description: p.headline || p.description } : {}),
    ...(hero ? { image: cld(hero.publicId, 1600) } : {}),
    ...(p.price > 0
      ? { offers: { "@type": "Offer", price: p.price, priceCurrency: "USD", availability: "https://schema.org/InStock" } }
      : {}),
    about: {
      "@type": "Residence",
      name: p.address,
      address: { "@type": "PostalAddress", streetAddress: p.address, addressLocality: p.islandName, addressRegion: "FL", addressCountry: "US" },
      ...(p.facts.length ? { additionalProperty: p.facts.map((f) => ({ "@type": "PropertyValue", name: f.label, value: f.value })) } : {}),
    },
    provider: { "@type": "RealEstateAgent", name: SITE.advisor, "@id": `${BASE}/#agent` },
  };
  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { name: "Properties", item: `${BASE}/properties` },
      { name: p.islandName, item: `${BASE}/islands/${p.island}` },
      { name: p.address, item: url },
    ].map((c, n) => ({ "@type": "ListItem", position: n + 1, ...c })),
  };
  const graph = { "@context": "https://schema.org", "@graph": [listing, breadcrumb] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />;
}
