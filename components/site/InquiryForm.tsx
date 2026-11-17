"use client";

import { useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import {
  CONSENT_TEXT,
  INQUIRY_LABELS,
  TIMELINE_BANDS,
  TIMELINE_LABELS,
  type InquiryType,
  type TimelineBand,
} from "@/lib/inquiry/types";
import { SITE } from "@/lib/content/sample";

interface Props {
  /** One type, or several the visitor can choose between (first is default). */
  types: InquiryType[];
  propertyRef?: string;
  propertyAddress?: string;
  islandRef?: string;
  /** Show an "Address" field (seller / value-report flows without a property page). */
  askAddress?: boolean;
  /** Show the timeline question. */
  askTimeline?: boolean;
  title?: string;
  intro?: string;
  tone?: "paper" | "sand" | "ocean";
  messageLabel?: string;
  submitLabel?: string;
}

const field = "w-full border border-ocean/30 bg-paper px-4 py-3 text-[15px] text-ink outline-none focus:border-ocean";
const lbl = "label mb-1.5 block text-mute";

function utm(key: string): string | undefined {
  if (typeof window === "undefined") return undefined;
  return new URLSearchParams(window.location.search).get(key) ?? undefined;
}

function gaClientId(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const m = document.cookie.match(/(?:^|;\s*)_ga=GA\d\.\d\.(\d+\.\d+)/);
  return m?.[1];
}

export function InquiryForm({
  types,
  propertyRef,
  propertyAddress,
  islandRef,
  askAddress = false,
  askTimeline = true,
  title,
  intro,
  tone = "paper",
  messageLabel = "Anything James should know",
  submitLabel = "Send to James",
}: Props) {
  const pathname = usePathname();
  const [type, setType] = useState<InquiryType>(types[0]);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string>("");

  const light = tone === "ocean";
  const textCls = light ? "text-paper" : "text-ink";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      inquiry_type: type,
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      message: fd.get("message"),
      timeline_band: fd.get("timeline_band") as TimelineBand | null,
      property_ref: propertyRef,
      property_address: propertyAddress ?? (fd.get("address") as string | null) ?? undefined,
      island_ref: islandRef,
      source_page: pathname,
      contact_consent: fd.get("contact_consent") === "on",
      utm_source: utm("utm_source"),
      utm_medium: utm("utm_medium"),
      utm_campaign: utm("utm_campaign"),
      ga_client_id: gaClientId(),
      website: fd.get("website"),
    };
    setState("sending");
    try {
      const res = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className={`border-t border-gold pt-6 ${textCls}`} role="status" aria-live="polite">
        <div className="eyebrow">Received</div>
        <p className="font-serif text-[clamp(26px,3vw,36px)] leading-tight">Thank you. James will reply personally.</p>
        <p className="mt-3 max-w-[520px] text-[15px]">
          Your {INQUIRY_LABELS[type].toLowerCase()} is in James’s private desk. If it is time-sensitive, call{" "}
          <a href={SITE.phoneHref} className={light ? "text-paper underline" : "underline"}>
            {SITE.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`${textCls}`} noValidate>
      {title && (
        <>
          <div className="eyebrow">{title}</div>
          <div className="rule" />
        </>
      )}
      {intro && <p className="mb-6 max-w-[560px] text-[15px]">{intro}</p>}

      {types.length > 1 && (
        <fieldset className="mb-5">
          <legend className={lbl}>I would like to</legend>
          <div className="flex flex-wrap gap-2">
            {types.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                aria-pressed={type === t}
                className={`btn !min-h-[44px] !px-4 !text-[11px] ${type === t ? (light ? "btn-paper" : "btn-ocean") : light ? "btn-line-light" : "btn-line"}`}
              >
                {INQUIRY_LABELS[t]}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {propertyAddress && (
        <p className="mb-5 text-[14px]">
          About <strong>{propertyAddress}</strong>
          {propertyRef ? <span className="text-mute"> · {propertyRef}</span> : null}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${type}-name`} className={lbl}>Name</label>
          <input id={`${type}-name`} name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor={`${type}-email`} className={lbl}>Email</label>
          <input id={`${type}-email`} name="email" type="email" required autoComplete="email" className={field} />
        </div>
        <div>
          <label htmlFor={`${type}-phone`} className={lbl}>Phone (optional)</label>
          <input id={`${type}-phone`} name="phone" type="tel" autoComplete="tel" className={field} />
        </div>
        {askTimeline && (
          <div>
            <label htmlFor={`${type}-timeline`} className={lbl}>Timeline</label>
            <select id={`${type}-timeline`} name="timeline_band" defaultValue="unknown" className={field}>
              {TIMELINE_BANDS.map((b) => (
                <option key={b} value={b}>
                  {TIMELINE_LABELS[b]}
                </option>
              ))}
            </select>
          </div>
        )}
        {askAddress && (
          <div className="sm:col-span-2">
            <label htmlFor={`${type}-address`} className={lbl}>Property address</label>
            <input id={`${type}-address`} name="address" autoComplete="street-address" className={field} />
          </div>
        )}
        <div className="sm:col-span-2">
          <label htmlFor={`${type}-message`} className={lbl}>{messageLabel}</label>
          <textarea id={`${type}-message`} name="message" rows={4} className={field} />
        </div>
      </div>

      {/* Honeypot — hidden from people, filled by bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={`${type}-website`}>Website</label>
        <input id={`${type}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="mt-5 flex items-start gap-3 text-[13px] leading-snug">
        <input name="contact_consent" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-ocean" />
        <span>{CONSENT_TEXT}</span>
      </label>

      {state === "error" && (
        <p role="alert" className="mt-4 border-l-2 border-gold pl-3 text-[14px]">
          {error}
        </p>
      )}

      <button type="submit" disabled={state === "sending"} className={`btn mt-6 w-full sm:w-auto ${light ? "btn-paper" : "btn-ocean"}`}>
        {state === "sending" ? "Sending…" : submitLabel}
      </button>
      <p className="mt-3 text-[12px] text-mute">
        Your details go straight to James’s private desk; nothing is stored on this website.
      </p>
    </form>
  );
}
