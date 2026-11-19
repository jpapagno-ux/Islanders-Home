import type { MetadataRoute } from "next";
import { getPlaces } from "@/lib/content";
import { STATIC_ROUTES } from "@/lib/measurement/routes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://islanders-home.vercel.app";
  const now = new Date();
  // Dynamic entity routes (islands, communities, homes, collections, articles) are
  // added in Stage 3 from the content source with real lastmod values.
  // Only Approved places are listed, whatever stage the site is in.
  const places = (await getPlaces()).filter((p) => p.approved);
  return [
    ...STATIC_ROUTES.filter((r) => r.indexable).map((r) => ({ url: `${base}${r.pattern}`, lastModified: now })),
    ...places.map((p) => ({
      url: `${base}${p.type === "community" ? `/islands/${p.parent}/${p.slug}` : `/islands/${p.slug}`}`,
      lastModified: now,
    })),
  ];
}
