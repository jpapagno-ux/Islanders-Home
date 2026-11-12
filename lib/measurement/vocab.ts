/**
 * Islanders Home — Canonical vocabularies (S1_01, v1.0-draft)
 *
 * Every value that travels as an analytics parameter must come from one of
 * these lists. Values are lowercase snake_case ASCII. Names are pending
 * validation against governing doc 01 — Master Ecosystem Architecture.
 */

export const JOURNEYS = [
  "buyer",
  "seller",
  "investor",
  "build",
  "renovate",
  "finance",
  "partner",
  "brand",
] as const;
export type Journey = (typeof JOURNEYS)[number];

export const PAGE_TYPES = [
  "home",
  "island_guide",
  "island_index",
  "community",
  "property",
  "property_search",
  "collection",
  "collection_index",
  "article",
  "journal_index",
  "island_match",
  "buy",
  "sell",
  "invest",
  "build",
  "renovate",
  "finance",
  "ask_islander",
  "desk",
  "partner",
  "about",
  "contact",
  "legal",
  "other",
] as const;
export type PageType = (typeof PAGE_TYPES)[number];

export const INQUIRY_TYPES = [
  "showing",
  "home_brief",
  "offer_strategy",
  "general",
  "value_report",
  "seller",
  "investor",
  "finance",
  "build",
  "renovation",
  "partner",
  "consultation",
] as const;
export type InquiryType = (typeof INQUIRY_TYPES)[number];

export const SOURCE_CONTEXTS = [
  "island_guide",
  "community",
  "property",
  "property_search",
  "collection",
  "article",
  "home",
  "island_match",
  "ask_islander",
  "map",
  "saved_list",
  "compare_view",
  "email",
  "sms",
  "desk",
  "nav",
  "footer",
  "exit_prompt",
  "other",
] as const;
export type SourceContext = (typeof SOURCE_CONTEXTS)[number];

export const ASK_TOPICS = [
  "financing",
  "insurance",
  "rental",
  "lifestyle",
  "access_travel",
  "schools_medical",
  "construction",
  "taxes_hoa",
  "market_value",
  "process",
  "property_specific",
  "island_compare",
  "other",
] as const;
export type AskTopic = (typeof ASK_TOPICS)[number];

export const RETRIEVAL_STATUSES = ["grounded", "partial", "none", "declined"] as const;
export type RetrievalStatus = (typeof RETRIEVAL_STATUSES)[number];

export const ESCALATION_TYPES = ["consultation", "email", "phone", "desk_handoff", "none"] as const;
export type EscalationType = (typeof ESCALATION_TYPES)[number];

export const ENTITY_CONTEXT_TYPES = [
  "property",
  "island",
  "community",
  "collection",
  "article",
  "none",
] as const;
export type EntityContextType = (typeof ENTITY_CONTEXT_TYPES)[number];

export const PURCHASE_PURPOSES = ["primary", "second_home", "investment", "mixed", "undecided"] as const;
export type PurchasePurpose = (typeof PURCHASE_PURPOSES)[number];

export const PROPERTY_TYPES = [
  "single_family",
  "condo",
  "townhome",
  "land",
  "multi_family",
  "mixed_use",
  "other",
] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const PRICE_BANDS = ["band_1", "band_2", "band_3", "band_4", "band_5"] as const;
export type PriceBand = (typeof PRICE_BANDS)[number];

export const CONSULTATION_CHANNELS = ["video", "phone", "in_person"] as const;
export type ConsultationChannel = (typeof CONSULTATION_CHANNELS)[number];

export const PARTNER_TYPES = ["agent", "lender", "builder", "other"] as const;
export type PartnerType = (typeof PARTNER_TYPES)[number];

export const USER_ROLES = ["visitor", "client", "partner", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

/** Coarse lifecycle stages — user-scoped in GA4 ONLY if D-07 is approved. */
export const LIFECYCLE_STAGES = [
  "visitor",
  "subscriber",
  "prospect",
  "consulting",
  "active_client",
  "past_client",
] as const;
export type LifecycleStage = (typeof LIFECYCLE_STAGES)[number];
