/**
 * Islanders Home — Page context data layer (S1_02 §5)
 *
 * Every page exposes exactly one machine-readable context object. The
 * analytics layer reads ONLY this object; it never scrapes the DOM or URL
 * for entity IDs. This is what makes the privacy allow-list enforceable.
 *
 * IDs: island/community/collection/article = slug; property = Base44 record id.
 */

import type { Journey, PageType } from "./vocab";

export interface PageContext {
  page_type: PageType;
  journey: Journey;
  property_id?: string | null;
  island_id?: string | null;
  community_id?: string | null;
  collection_id?: string | null;
  article_id?: string | null;
}

export const PAGE_CONTEXT_ELEMENT_ID = "ih-context";

/** Keys permitted in the serialized context object. Anything else is dropped. */
const CONTEXT_KEYS: (keyof PageContext)[] = [
  "page_type",
  "journey",
  "property_id",
  "island_id",
  "community_id",
  "collection_id",
  "article_id",
];

/** Build a clean context object containing only allowed keys with non-empty values. */
export function buildPageContext(input: PageContext): PageContext {
  const out: Partial<PageContext> = {};
  for (const key of CONTEXT_KEYS) {
    const value = input[key];
    if (value !== undefined && value !== null && value !== "") {
      (out as Record<string, unknown>)[key] = value;
    }
  }
  return out as PageContext;
}

/** Read the current page's context in the browser. Returns null if absent/invalid. */
export function readPageContext(): PageContext | null {
  if (typeof document === "undefined") return null;
  const el = document.getElementById(PAGE_CONTEXT_ELEMENT_ID);
  if (!el?.textContent) return null;
  try {
    const parsed = JSON.parse(el.textContent) as Partial<PageContext>;
    if (!parsed.page_type || !parsed.journey) return null;
    return buildPageContext(parsed as PageContext);
  } catch {
    return null;
  }
}
