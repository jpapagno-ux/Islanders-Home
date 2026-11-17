import "server-only";
import type { EventName } from "./events";
import { EVENTS } from "./events";

/**
 * Server-side GA4 Measurement Protocol sender for B44-sourced events
 * (inquiry family). Fires only after Base44 has confirmed the record.
 * Sends only allow-listed, non-PII parameters. Silent no-op when GA4 is not
 * configured (NEXT_PUBLIC_GA4_MEASUREMENT_ID + GA4_API_SECRET).
 */
export async function sendServerEvent(name: EventName, params: Record<string, string | number>, clientId?: string): Promise<boolean> {
  const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  const secret = process.env.GA4_API_SECRET;
  if (!measurementId || !secret) return false;

  const def = EVENTS[name];
  const allowed = new Set<string>([...def.required, ...def.optional, "page_type", "journey", "property_id", "island_id"]);
  const clean: Record<string, string | number> = {};
  for (const [k, v] of Object.entries(params)) if (allowed.has(k) && v !== undefined && v !== "") clean[k] = v;

  const body = {
    client_id: clientId && /^[0-9.]{5,40}$/.test(clientId) ? clientId : `${Date.now()}.${Math.floor(Math.random() * 1e9)}`,
    non_personalized_ads: true,
    events: [{ name, params: clean }],
  };

  try {
    const res = await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(secret)}`, {
      method: "POST",
      body: JSON.stringify(body),
      cache: "no-store",
    });
    return res.ok;
  } catch {
    return false;
  }
}
