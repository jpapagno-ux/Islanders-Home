# Islanders Home

Islanders Home Portal Build 2026 — Next.js on Vercel.

## Measurement-first scaffold

This scaffold exists so the portal is built **measurable from the first commit**. It contains no analytics tag yet: `NEXT_PUBLIC_GA4_MEASUREMENT_ID` is empty, so nothing contacts Google. What it does contain:

| Path | Purpose |
|---|---|
| `lib/measurement/vocab.ts` | Canonical vocabularies (journey, page_type, inquiry_type, source_context, ask_topic, …) — Stage 1 S1_01 |
| `lib/measurement/context.ts` | The single page-context object (`#ih-context`) every page renders — S1_02 §5 |
| `lib/measurement/events.ts` | The 22 canonical events as typed code, with per-event parameter allow-lists and validation; `track()` refuses anything off-list — S1_03 / S1_06 |
| `lib/measurement/consent.ts` | Consent Mode defaults (all denied) set before any tag — S1_09 §7 |
| `lib/measurement/routes.ts` | Route → page_type / journey map; drives sitemap and GSC grouping — S1_01 §2 |
| `components/MeasurementTag.tsx` | Loads consent defaults always; loads gtag only when a measurement ID is configured |
| `components/PageContextScript.tsx` | Renders the page-context object |
| `app/**/page.tsx` | 23 placeholder routes, one per page_type, each declaring its context |
| `app/sitemap.ts`, `app/robots.ts` | Sitemap of static routes; `/desk` and `/api` disallowed |

### Rules for anyone building on this
1. Every page renders exactly one `<PageContextScript …/>` with its `page_type`, `journey`, and entity IDs.
2. Front-end code only emits **WEB-sourced** events via `track()` from `lib/measurement/events.ts`. Inquiry, save, compare, consultation, and Ask-the-Islander events are emitted **server-side** by Base44 / the RAG service via the GA4 Measurement Protocol (Stage 3).
3. Never add a parameter that is not in the allow-list. Never send names, emails, phones, message text, prices, loan figures, or document contents.
4. No UTMs on internal links.
5. Exactly one GA4 measurement ID per page.

Governing documents: 01 — Master Ecosystem Architecture · 02 — Data + Media · 03 — Public Web Experience · 04 — Client + Partner Desk · 05 — Ask the Islander / RAG · 06 — Growth + Communications. URL patterns and page templates here are placeholders pending doc 03.

## Develop

```
npm install
cp .env.example .env.local
npm run dev
```
