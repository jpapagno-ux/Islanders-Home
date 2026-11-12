/**
 * Islanders Home — Consent Mode scaffold (S1_09 §7, baseline pending D-05)
 *
 * Defaults: everything DENIED. No tag is loaded unless
 * NEXT_PUBLIC_GA4_MEASUREMENT_ID is set (Stage 3), and even then the
 * consent defaults below apply before any CMP decision.
 *
 * This file deliberately contains no CMP integration. When the consent
 * architecture is approved (D-05), the CMP calls `updateConsent()`.
 */

export type ConsentState = "granted" | "denied";

export interface ConsentSettings {
  analytics_storage: ConsentState;
  ad_storage: ConsentState;
  ad_user_data: ConsentState;
  ad_personalization: ConsentState;
  functionality_storage: ConsentState;
  security_storage: ConsentState;
}

export const DEFAULT_CONSENT: ConsentSettings = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  functionality_storage: "denied",
  security_storage: "granted",
};

/** Inline script text that sets consent defaults BEFORE any gtag loads. */
export function consentDefaultScript(): string {
  return [
    "window.dataLayer=window.dataLayer||[];",
    "function gtag(){dataLayer.push(arguments);}",
    `gtag('consent','default',${JSON.stringify({ ...DEFAULT_CONSENT, wait_for_update: 500 })});`,
  ].join("");
}

export function updateConsent(partial: Partial<ConsentSettings>): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", partial);
}
