/**
 * Islanders Home — Inquiry contract shared by the public site and the Base44 desk.
 *
 * Values are the EXACT stored values in the Base44 `Inquiry` entity (App A
 * 6a607f956dd4d6379540f0f3) and the exact event names in the merged event
 * dictionary (Project 01 doc 31 / AD-22). Do not add synonyms here.
 */

export const INQUIRY_TYPES = [
  "request_showing",
  "request_island_home_brief",
  "request_value_report",
  "seller_inquiry",
  "investor_inquiry",
  "finance_interest",
  "build_interest",
  "partner_inquiry",
  "consultation",
  "general",
] as const;
export type InquiryType = (typeof INQUIRY_TYPES)[number];

export const TIMELINE_BANDS = ["0_3_months", "3_6_months", "6_12_months", "12_plus_months", "unknown"] as const;
export type TimelineBand = (typeof TIMELINE_BANDS)[number];

export const TIMELINE_LABELS: Record<TimelineBand, string> = {
  "0_3_months": "Within 3 months",
  "3_6_months": "3 – 6 months",
  "6_12_months": "6 – 12 months",
  "12_plus_months": "12 months or more",
  unknown: "Not sure yet",
};

export const INQUIRY_LABELS: Record<InquiryType, string> = {
  request_showing: "Request a showing",
  request_island_home_brief: "Request an Island Home Brief™",
  request_value_report: "Request an Island Value Report™",
  seller_inquiry: "Talk about selling",
  investor_inquiry: "Investment inquiry",
  finance_interest: "Financing conversation",
  build_interest: "Build or renovate",
  partner_inquiry: "Partner inquiry",
  consultation: "Private consultation",
  general: "General inquiry",
};

/** Exact consent wording stored with every inquiry (TCPA / FTSA). Change only via Project 01. */
export const CONSENT_TEXT =
  "I agree that James Papagno (Brown Harris Stevens) may contact me by email, phone or text about my inquiry. Consent is not a condition of purchase; message and data rates may apply; reply STOP to end texts.";

export interface InquiryPayload {
  inquiry_type: InquiryType;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  timeline_band?: TimelineBand;
  property_ref?: string;
  property_address?: string;
  island_ref?: string;
  source_page: string;
  contact_consent: true;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  /** GA4 client id from the _ga cookie, if analytics consent allowed it. Opaque, no PII. */
  ga_client_id?: string;
  /** Honeypot — must be empty. */
  website?: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REF = /^[A-Z0-9][A-Z0-9-]{1,40}$/i;
const SHORT = 160;

export type Validation = { ok: true; data: InquiryPayload } | { ok: false; error: string };

/** Validates and normalises an untrusted request body. Never trusts enum values from the client. */
export function validateInquiry(body: unknown): Validation {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid request." };
  const b = body as Record<string, unknown>;
  const s = (k: string, max = SHORT) => (typeof b[k] === "string" ? (b[k] as string).trim().slice(0, max) : "");

  if (s("website")) return { ok: false, error: "Invalid request." }; // honeypot

  const inquiry_type = s("inquiry_type") as InquiryType;
  if (!INQUIRY_TYPES.includes(inquiry_type)) return { ok: false, error: "Please choose what you would like to ask about." };

  const name = s("name", 120);
  const email = s("email", 160).toLowerCase();
  if (name.length < 2) return { ok: false, error: "Please enter your name." };
  if (!EMAIL.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (b.contact_consent !== true) return { ok: false, error: "Please tick the consent box so James may reply." };

  const phone = s("phone", 40).replace(/[^\d+()\-.\s]/g, "");
  const tb = s("timeline_band") as TimelineBand;
  const timeline_band = TIMELINE_BANDS.includes(tb) ? tb : undefined;
  const property_ref = s("property_ref", 40);
  const island_ref = s("island_ref", 80);

  return {
    ok: true,
    data: {
      inquiry_type,
      name,
      email,
      phone: phone || undefined,
      message: s("message", 3000) || undefined,
      timeline_band,
      property_ref: property_ref && REF.test(property_ref) ? property_ref : undefined,
      property_address: s("property_address", 200) || undefined,
      island_ref: island_ref || undefined,
      source_page: s("source_page", 200) || "/",
      contact_consent: true,
      utm_source: s("utm_source", 80) || undefined,
      utm_medium: s("utm_medium", 80) || undefined,
      utm_campaign: s("utm_campaign", 120) || undefined,
      ga_client_id: /^[0-9.]{5,40}$/.test(s("ga_client_id", 40)) ? s("ga_client_id", 40) : undefined,
    },
  };
}
