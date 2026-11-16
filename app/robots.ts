import type { MetadataRoute } from "next";

/**
 * PREVIEW BUILD: the whole site is disallowed until content, brokerage
 * disclosures and listing data are approved. Replace with the Stage 01
 * crawl rules (allow all; disallow /api/, form steps, compare, match results)
 * at the production-readiness gate.
 */
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", disallow: "/" }] };
}
