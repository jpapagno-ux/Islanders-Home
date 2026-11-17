import "server-only";
import type { InquiryPayload } from "@/lib/inquiry/types";
import { CONSENT_TEXT } from "@/lib/inquiry/types";

/**
 * Server-side client for the Base44 desk's data API. The API key lives only in
 * the Vercel environment (BASE44_API_KEY); nothing here is ever imported by
 * browser code (enforced by "server-only").
 *
 * Base44 entity REST: POST {BASE44_API_URL}/api/apps/{appId}/entities/{Entity}
 * with header `api_key`.
 */
const APP_ID = process.env.BASE44_APP_ID ?? "6a607f956dd4d6379540f0f3";
const API_URL = (process.env.BASE44_API_URL ?? "https://app.base44.com").replace(/\/$/, "");

export function base44Configured(): boolean {
  return Boolean(process.env.BASE44_API_KEY);
}

export interface CreatedInquiry {
  id: string;
}

/** Creates one Inquiry record in the desk. Throws on any non-2xx response. */
export async function createInquiry(p: InquiryPayload): Promise<CreatedInquiry> {
  const key = process.env.BASE44_API_KEY;
  if (!key) throw new Error("BASE44_API_KEY is not configured");

  const now = new Date().toISOString();
  const record = {
    inquiry_type: p.inquiry_type,
    name: p.name,
    email: p.email,
    phone: p.phone,
    message: p.message,
    timeline_band: p.timeline_band,
    property_ref: p.property_ref,
    property_address: p.property_address,
    island_ref: p.island_ref,
    source_page: p.source_page,
    contact_consent: "yes",
    consent_at: now,
    consent_text: CONSENT_TEXT,
    utm_source: p.utm_source,
    utm_medium: p.utm_medium,
    utm_campaign: p.utm_campaign,
    status: "new",
    created_at: now,
  };

  const res = await fetch(`${API_URL}/api/apps/${APP_ID}/entities/Inquiry`, {
    method: "POST",
    headers: { "Content-Type": "application/json", api_key: key },
    body: JSON.stringify(record),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Base44 ${res.status}: ${text.slice(0, 300)}`);
  }
  const json = (await res.json().catch(() => ({}))) as { id?: string; _id?: string };
  return { id: json.id ?? json._id ?? "" };
}
