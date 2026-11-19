import { SITE } from "@/lib/content/sample";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://islanders-home.vercel.app";

/**
 * Site-wide identification of the advisor and brokerage of record (AD-32). It repeats
 * only what the footer already shows: name, brokerage, office address, phone, email.
 * No licence numbers, awards or lending details. Wording is subject to brokerage
 * compliance review before public launch.
 */
export function AgentJsonLd() {
  const [street, cityStateZip = ""] = SITE.officeAddress.split(/,\s*(?=[^,]+,\s*[A-Z]{2}\s+\d{5}$)/);
  const m = cityStateZip.match(/^(.+),\s*([A-Z]{2})\s+(\d{5})$/);
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${BASE}/#website`, name: SITE.name, url: BASE },
      {
        "@type": "RealEstateAgent",
        "@id": `${BASE}/#agent`,
        name: SITE.advisor,
        url: BASE,
        telephone: SITE.phoneHref.replace("tel:", ""),
        email: SITE.email,
        brand: { "@type": "Brand", name: SITE.name },
        parentOrganization: { "@type": "Organization", name: SITE.brokerage },
        ...(m
          ? { address: { "@type": "PostalAddress", streetAddress: street, addressLocality: m[1], addressRegion: m[2], postalCode: m[3], addressCountry: "US" } }
          : {}),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}
