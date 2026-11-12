/**
 * Islanders Home — Canonical event dictionary as code (S1_03 v0.1)
 *
 * The 22 canonical events, their trigger source, key-event tier, and the
 * parameter allow-list (S1_06). `track()` refuses any parameter not on the
 * allow-list for that event, so PII and private data cannot be sent even by
 * accident. Event NAMES are pending validation against governing doc 01.
 *
 * Trigger sources:
 *   WEB — public site front end (views, Island Match, newsletter/SMS if synchronous)
 *   B44 — Base44 backend on record creation (inquiry family, save, compare, consultation)
 *   RAG — Ask the Islander service
 * Front-end code must NOT emit B44- or RAG-sourced events; those arrive via
 * the GA4 Measurement Protocol from the server (Stage 3).
 */

import type { PageContext } from "./context";
import { readPageContext } from "./context";
import * as V from "./vocab";

export type TriggerSource = "WEB" | "B44" | "RAG";
export type KeyEventTier = "primary" | "secondary" | "none";

/** Parameters any event may carry (from the page context). */
const CONTEXT_PARAMS = [
  "page_type",
  "journey",
  "property_id",
  "island_id",
  "community_id",
  "collection_id",
  "article_id",
] as const;

export const EVENTS = {
  // ---- Discovery / exploration (WEB)
  property_view: { source: "WEB", tier: "none", required: ["property_id", "island_id"], optional: ["source_context", "property_type", "price_band"] },
  island_guide_view: { source: "WEB", tier: "none", required: ["island_id"], optional: ["source_context"] },
  community_view: { source: "WEB", tier: "none", required: ["community_id", "island_id"], optional: ["source_context"] },
  collection_view: { source: "WEB", tier: "none", required: ["collection_id"], optional: ["source_context"] },

  // ---- Engagement
  save_property: { source: "B44", tier: "secondary", required: ["property_id", "island_id", "source_context"], optional: [] },
  compare_property: { source: "B44", tier: "none", required: ["property_id", "property_id_secondary"], optional: ["island_id_secondary", "source_context"] },
  ask_islander: { source: "RAG", tier: "none", required: ["ask_topic", "entity_context_type", "retrieval_status", "ask_session_key"], optional: ["escalation_type", "turn_index", "answer_sources_count"] },
  island_match_started: { source: "WEB", tier: "none", required: ["match_id"], optional: ["source_context"] },
  island_match_completed: { source: "WEB", tier: "secondary", required: ["match_id", "result_island_id"], optional: ["result_island_id_2", "result_island_id_3"] },

  // ---- Identification / inquiry / consultation (B44 unless noted)
  request_showing: { source: "B44", tier: "primary", required: ["inquiry_type", "property_id", "island_id", "source_context"], optional: ["purchase_purpose"] },
  request_island_home_brief: { source: "B44", tier: "primary", required: ["property_id", "island_id"], optional: ["source_context", "purchase_purpose"] },
  request_value_report: { source: "B44", tier: "primary", required: ["inquiry_type", "island_id", "source_context"], optional: ["property_type"] },
  finance_interest: { source: "B44", tier: "secondary", required: ["inquiry_type", "source_context"], optional: ["purchase_purpose"] },
  build_interest: { source: "B44", tier: "secondary", required: ["inquiry_type", "source_context", "island_id"], optional: [] },
  renovation_interest: { source: "B44", tier: "secondary", required: ["inquiry_type", "source_context", "island_id"], optional: [] },
  investor_inquiry: { source: "B44", tier: "primary", required: ["inquiry_type", "source_context"], optional: ["purchase_purpose"] },
  seller_inquiry: { source: "B44", tier: "primary", required: ["inquiry_type", "source_context", "island_id"], optional: ["property_type"] },
  consultation_requested: { source: "B44", tier: "primary", required: ["consultation_id", "source_context"], optional: ["inquiry_type", "ask_session_key"] },
  consultation_scheduled: { source: "B44", tier: "secondary", required: ["consultation_id", "channel"], optional: ["days_to_schedule"] },
  newsletter_signup: { source: "WEB", tier: "secondary", required: ["source_context"], optional: [] },
  sms_opt_in: { source: "WEB", tier: "secondary", required: ["source_context"], optional: [] },
  partner_inquiry: { source: "B44", tier: "secondary", required: ["inquiry_type", "source_context"], optional: ["partner_type"] },
} as const satisfies Record<string, { source: TriggerSource; tier: KeyEventTier; required: readonly string[]; optional: readonly string[] }>;

export type EventName = keyof typeof EVENTS;

/** Allowed parameter value shapes (S1_06 §1). Enum params validate against vocab. */
const PARAM_VALIDATORS: Record<string, (v: unknown) => boolean> = {
  page_type: (v) => (V.PAGE_TYPES as readonly string[]).includes(String(v)),
  journey: (v) => (V.JOURNEYS as readonly string[]).includes(String(v)),
  property_id: isId,
  island_id: isId,
  community_id: isId,
  collection_id: isId,
  article_id: isId,
  property_id_secondary: isId,
  island_id_secondary: isId,
  result_island_id: isId,
  result_island_id_2: isId,
  result_island_id_3: isId,
  inquiry_type: (v) => (V.INQUIRY_TYPES as readonly string[]).includes(String(v)),
  source_context: (v) => (V.SOURCE_CONTEXTS as readonly string[]).includes(String(v)),
  ask_topic: (v) => (V.ASK_TOPICS as readonly string[]).includes(String(v)),
  entity_context_type: (v) => (V.ENTITY_CONTEXT_TYPES as readonly string[]).includes(String(v)),
  retrieval_status: (v) => (V.RETRIEVAL_STATUSES as readonly string[]).includes(String(v)),
  escalation_type: (v) => (V.ESCALATION_TYPES as readonly string[]).includes(String(v)),
  purchase_purpose: (v) => (V.PURCHASE_PURPOSES as readonly string[]).includes(String(v)),
  property_type: (v) => (V.PROPERTY_TYPES as readonly string[]).includes(String(v)),
  price_band: (v) => (V.PRICE_BANDS as readonly string[]).includes(String(v)),
  channel: (v) => (V.CONSULTATION_CHANNELS as readonly string[]).includes(String(v)),
  partner_type: (v) => (V.PARTNER_TYPES as readonly string[]).includes(String(v)),
  ask_session_key: isOpaque,
  match_id: isOpaque,
  consultation_id: isOpaque,
  turn_index: isInt,
  answer_sources_count: isInt,
  days_to_schedule: isInt,
};

function isId(v: unknown): boolean {
  return typeof v === "string" && /^[a-z0-9][a-z0-9_-]{0,80}$/i.test(v);
}
function isOpaque(v: unknown): boolean {
  return typeof v === "string" && v.length >= 8 && v.length <= 64 && !v.includes("@");
}
function isInt(v: unknown): boolean {
  return Number.isInteger(v);
}

export type EventParams = Record<string, string | number>;

export interface TrackResult {
  ok: boolean;
  event: EventName;
  params: EventParams;
  dropped: string[];
  missing: string[];
}

/**
 * Validate and (when a tag is configured) send a canonical event.
 * - Merges the page context.
 * - Drops any parameter not allowed for the event.
 * - Reports missing required parameters.
 * - Never sends free text.
 */
export function buildEvent(name: EventName, params: EventParams = {}, context?: PageContext | null): TrackResult {
  const def = EVENTS[name];
  const allowed = new Set<string>([...CONTEXT_PARAMS, ...def.required, ...def.optional]);
  const ctx = context ?? readPageContext() ?? undefined;
  const merged: EventParams = { ...(ctx as unknown as EventParams), ...params };

  const clean: EventParams = {};
  const dropped: string[] = [];
  for (const [k, v] of Object.entries(merged)) {
    const validator = PARAM_VALIDATORS[k];
    if (!allowed.has(k) || !validator || !validator(v)) {
      dropped.push(k);
      continue;
    }
    clean[k] = v;
  }
  const missing = def.required.filter((r) => !(r in clean));
  return { ok: missing.length === 0, event: name, params: clean, dropped, missing };
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Client-side send. Only WEB-sourced events may be sent from the browser. */
export function track(name: EventName, params: EventParams = {}): TrackResult {
  const result = buildEvent(name, params);
  if (EVENTS[name].source !== "WEB") {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[ih-measurement] ${name} is ${EVENTS[name].source}-sourced; not sent from the browser.`);
    }
    return { ...result, ok: false };
  }
  if (!result.ok) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[ih-measurement] ${name} missing required params:`, result.missing);
    }
    return result;
  }
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, result.params);
  }
  return result;
}

/** Key-event tiers for GA4 configuration (S1_03 §5). */
export const KEY_EVENTS = {
  primary: (Object.keys(EVENTS) as EventName[]).filter((e) => EVENTS[e].tier === "primary"),
  secondary: (Object.keys(EVENTS) as EventName[]).filter((e) => EVENTS[e].tier === "secondary"),
};
