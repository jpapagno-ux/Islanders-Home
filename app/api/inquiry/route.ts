import { NextResponse } from "next/server";
import { base44Configured, createInquiry } from "@/lib/base44";
import { validateInquiry, type InquiryType } from "@/lib/inquiry/types";
import { sendServerEvent } from "@/lib/measurement/server";
import type { EventName } from "@/lib/measurement/events";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/inquiry — the only write path from the public site.
 * Validates → honeypot → rate limit → creates an Inquiry in the Base44 desk
 * (server-side key) → fires the matching analytics event. The site stores nothing.
 */

// Best-effort per-instance rate limit (serverless instances are short-lived; this stops bursts, not determined abuse).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function limited(key: string): boolean {
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= MAX_PER_WINDOW) return true;
  arr.push(now);
  hits.set(key, arr);
  if (hits.size > 5000) hits.clear();
  return false;
}

/** inquiry_type → canonical event name (doc 31). Most are identical; the two that differ are mapped. */
const EVENT_FOR: Record<InquiryType, EventName> = {
  request_showing: "request_showing",
  request_island_home_brief: "request_island_home_brief",
  request_value_report: "request_value_report",
  seller_inquiry: "seller_inquiry",
  investor_inquiry: "investor_inquiry",
  finance_interest: "finance_interest",
  build_interest: "build_interest",
  partner_inquiry: "partner_inquiry",
  consultation: "consultation_requested",
  general: "consultation_requested",
};

function sourceContext(page: string): string {
  if (page.startsWith("/properties/") && page.split("/").length >= 4) return "property";
  if (page.startsWith("/properties")) return "property_search";
  if (page.startsWith("/islands/")) return "island_guide";
  if (page.startsWith("/island-intelligence")) return "article";
  if (page === "/") return "home";
  return "other";
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const v = validateInquiry(body);
  if (!v.ok) return NextResponse.json({ ok: false, error: v.error }, { status: 400 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(`${ip}:${v.data.email}`)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again in a few minutes or call James directly." }, { status: 429 });
  }

  if (!base44Configured()) {
    console.error("[inquiry] BASE44_API_KEY missing — inquiry not stored");
    return NextResponse.json({ ok: false, error: "The inquiry desk is not connected yet. Please email or call James." }, { status: 503 });
  }

  try {
    const created = await createInquiry(v.data);

    // Analytics after confirmation only; no name/email/phone/message ever leaves this route.
    const ev = EVENT_FOR[v.data.inquiry_type];
    const params: Record<string, string | number> = {
      inquiry_type: v.data.inquiry_type,
      source_context: sourceContext(v.data.source_page),
    };
    if (v.data.property_ref) params.property_id = v.data.property_ref;
    if (v.data.island_ref) params.island_id = v.data.island_ref;
    if (ev === "consultation_requested") params.consultation_id = created.id || `inq_${Date.now()}`;
    void sendServerEvent(ev, params, v.data.ga_client_id);

    return NextResponse.json({ ok: true, id: created.id });
  } catch (err) {
    console.error("[inquiry] Base44 create failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ ok: false, error: "We could not record your inquiry just now. Please email or call James directly." }, { status: 502 });
  }
}
