/**
 * Islanders Home — Route → page_type / journey map (S1_01 §2, S1_02 §5)
 *
 * URL patterns follow the Stage 01 sitemap approved 16 Nov 2026. Keep this as the single map the sitemap, the page
 * context, and GSC page grouping all derive from.
 */

import type { Journey, PageType } from "./vocab";

export interface RouteDef {
  pattern: string; // Next.js app-router path
  page_type: PageType;
  journey: Journey;
  indexable: boolean; // D-09: property pages index only while active (handled per page)
  title: string;
}

export const ROUTES: RouteDef[] = [
  { pattern: "/", page_type: "home", journey: "brand", indexable: true, title: "The Islanders Home" },
  { pattern: "/islands", page_type: "island_index", journey: "buyer", indexable: true, title: "Islands" },
  { pattern: "/islands/[island]", page_type: "island_guide", journey: "buyer", indexable: true, title: "Island Guide" },
  { pattern: "/islands/[island]/[community]", page_type: "community", journey: "buyer", indexable: true, title: "Community" },
  { pattern: "/properties", page_type: "property_search", journey: "buyer", indexable: true, title: "Properties" },
  { pattern: "/properties/[island]/[property]", page_type: "property", journey: "buyer", indexable: true, title: "Property" },
  { pattern: "/properties/collection", page_type: "collection_index", journey: "buyer", indexable: true, title: "The Islanders Collection" },
  { pattern: "/island-intelligence", page_type: "journal_index", journey: "brand", indexable: true, title: "Island Intelligence" },
  { pattern: "/tools", page_type: "other", journey: "buyer", indexable: true, title: "Tools of Trade" },
  { pattern: "/work-with-james", page_type: "about", journey: "brand", indexable: true, title: "Work With James" },
  { pattern: "/island-match", page_type: "island_match", journey: "buyer", indexable: true, title: "Island Match" },
  { pattern: "/buy", page_type: "buy", journey: "buyer", indexable: true, title: "Buy" },
  { pattern: "/sell", page_type: "sell", journey: "seller", indexable: true, title: "Sell" },
  { pattern: "/invest", page_type: "invest", journey: "investor", indexable: true, title: "Invest" },
  { pattern: "/build", page_type: "build", journey: "build", indexable: true, title: "Build" },
  { pattern: "/renovate", page_type: "renovate", journey: "renovate", indexable: true, title: "Renovate" },
  { pattern: "/finance", page_type: "finance", journey: "finance", indexable: true, title: "Finance" },
  { pattern: "/ask", page_type: "ask_islander", journey: "brand", indexable: false, title: "Ask the Islander" },
  { pattern: "/partners", page_type: "partner", journey: "partner", indexable: true, title: "Partners" },
  { pattern: "/about", page_type: "about", journey: "brand", indexable: true, title: "About" },
  { pattern: "/inquire", page_type: "contact", journey: "brand", indexable: true, title: "Inquire" },
  { pattern: "/privacy", page_type: "legal", journey: "brand", indexable: true, title: "Privacy" },
  { pattern: "/terms", page_type: "legal", journey: "brand", indexable: true, title: "Terms" },
];

/** Static (non-parameterized) routes for the sitemap scaffold. */
export const STATIC_ROUTES = ROUTES.filter((r) => !r.pattern.includes("["));
