import type { MetadataRoute } from "next";
import { STATIC_ROUTES } from "@/lib/measurement/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://islanders-home.vercel.app";
  const now = new Date();
  // Dynamic entity routes (islands, communities, homes, collections, articles) are
  // added in Stage 3 from the content source with real lastmod values.
  return STATIC_ROUTES.filter((r) => r.indexable).map((r) => ({
    url: `${base}${r.pattern}`,
    lastModified: now,
  }));
}
