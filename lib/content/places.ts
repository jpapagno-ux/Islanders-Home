/**
 * Places: regions, islands and communities.
 *
 * Source of record is the Airtable table "Islands & Communities" (one table, Type =
 * Region | Island | Community, hierarchy by the parent's slug). Read server-side when
 * AIRTABLE_TOKEN is set; otherwise the FALLBACK list below is used. The fallback
 * mirrors the table's names and order as of 19 Nov 2026 and carries no guide content.
 *
 * Publication gate: when the site is PUBLISHED only Approved places are returned.
 * In PREVIEW, Draft and Review places are returned too (never Archived) and are
 * flagged so pages can say the guide is in preparation.
 */
import { PREVIEW } from "@/lib/content/mode";

export type PlaceType = "region" | "island" | "community";

export interface Fact {
  label: string;
  value: string;
  source: string;
  asOf: string;
}

export interface QA {
  q: string;
  a: string;
  source: string;
  asOf: string;
}

export interface Place {
  slug: string;
  name: string;
  type: PlaceType;
  /** Slug of the parent: a region for an island, an island for a community. */
  parent: string;
  area: string;
  sort: number;
  approved: boolean;
  overview: string;
  facts: Fact[];
  qa: QA[];
}

const BASE = process.env.AIRTABLE_BASE_ID ?? "appJNZcT05lithwCl";
const TOKEN = process.env.AIRTABLE_TOKEN;
const REVALIDATE_SECONDS = 300;
const TABLE = "Islands & Communities";
/** Only these fields are requested. Internal fields never leave Airtable. */
const FIELDS = ["Name", "Slug", "Type", "Area", "Parent", "Sort Order", "Overview", "At a Glance", "Questions and Answers", "Publication Status"];

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** "Label | Value | Source | YYYY-MM-DD", one per line. Lines without a source and a date are dropped. */
export function parseFacts(text: string): Fact[] {
  return text
    .split("\n")
    .map((line) => line.split("|").map((s) => s.trim()))
    .filter((p) => p.length >= 4 && p[0] && p[1] && p[2] && /^\d{4}-\d{2}-\d{2}$/.test(p[3]))
    .map(([label, value, source, asOf]) => ({ label, value, source, asOf }));
}

/** Blocks separated by a blank line: "Q:", "A:", then optional "Source:" and "As of:". */
export function parseQA(text: string): QA[] {
  return text
    .split(/\n\s*\n/)
    .map((block) => {
      const get = (key: string) => {
        const m = block.match(new RegExp(`^${key}:\\s*(.+)$`, "mi"));
        return m ? m[1].trim() : "";
      };
      return { q: get("Q"), a: get("A"), source: get("Source"), asOf: get("As of") };
    })
    // Unfinished answers written as "[...]" placeholders are never shown.
    .filter((x) => x.q && x.a && !x.a.startsWith("["));
}

function r(name: string, slug: string, sort: number): Place {
  return { slug, name, type: "region", parent: "", area: "", sort, approved: false, overview: "", facts: [], qa: [] };
}
function i(name: string, parent: string, sort: number, area = ""): Place {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return { slug, name, type: "island", parent, area, sort, approved: false, overview: "", facts: [], qa: [] };
}

export const FALLBACK_PLACES: Place[] = [
  r("Florida Keys", "florida-keys", 1000),
  i("Key Largo", "florida-keys", 1010, "Upper Keys"),
  { ...i("Ocean Reef", "key-largo", 1015), type: "community" },
  i("Tavernier", "florida-keys", 1020, "Upper Keys"),
  i("Islamorada", "florida-keys", 1030, "Upper Keys"),
  i("Duck Key", "florida-keys", 1040, "Middle Keys"),
  i("Key Colony Beach", "florida-keys", 1050, "Middle Keys"),
  i("Marathon", "florida-keys", 1060, "Middle Keys"),
  i("Big Pine Key", "florida-keys", 1070, "Lower Keys"),
  i("Little Torch Key", "florida-keys", 1080, "Lower Keys"),
  i("Ramrod Key", "florida-keys", 1090, "Lower Keys"),
  i("Summerland Key", "florida-keys", 1100, "Lower Keys"),
  i("Cudjoe Key", "florida-keys", 1110, "Lower Keys"),
  i("Sugarloaf Key", "florida-keys", 1120, "Lower Keys"),
  i("Big Coppitt Key", "florida-keys", 1130, "Lower Keys"),
  i("Stock Island", "florida-keys", 1140, "Lower Keys"),
  i("Key West", "florida-keys", 1150, "Lower Keys"),
  r("Miami-Dade", "miami-dade", 2000),
  i("Key Biscayne", "miami-dade", 2010),
  i("Fisher Island", "miami-dade", 2020),
  i("Grove Isle", "miami-dade", 2030),
  i("Brickell Key", "miami-dade", 2040),
  i("Star Island", "miami-dade", 2050),
  i("Palm Island", "miami-dade", 2060),
  i("Hibiscus Island", "miami-dade", 2070),
  i("Venetian Islands", "miami-dade", 2080),
  i("Sunset Islands", "miami-dade", 2090),
  i("Miami Beach", "miami-dade", 2100),
  i("La Gorce Island", "miami-dade", 2110),
  i("Allison Island", "miami-dade", 2120),
  i("Normandy Isles", "miami-dade", 2130),
  i("North Bay Village", "miami-dade", 2140),
  i("Indian Creek", "miami-dade", 2150),
  i("Bay Harbor Islands", "miami-dade", 2160),
  r("Greater Fort Lauderdale", "greater-fort-lauderdale", 3000),
  i("Harbor Beach", "greater-fort-lauderdale", 3010),
  i("Rio Vista Isles", "greater-fort-lauderdale", 3020),
  i("Las Olas Isles", "greater-fort-lauderdale", 3030),
  i("Nurmi Isles", "greater-fort-lauderdale", 3040),
  i("Seven Isles", "greater-fort-lauderdale", 3050),
  i("Sunrise Key", "greater-fort-lauderdale", 3060),
  i("Fort Lauderdale Beach", "greater-fort-lauderdale", 3070),
  i("Hillsboro Mile", "greater-fort-lauderdale", 3080),
  r("Gulf Coast", "gulf-coast", 4000),
  i("Useppa Island", "gulf-coast", 4005),
  i("North Captiva", "gulf-coast", 4010),
  i("Captiva", "gulf-coast", 4020),
  i("Sanibel", "gulf-coast", 4030),
  i("Marco Island", "gulf-coast", 4040),
];

async function fetchPlaces(): Promise<Place[]> {
  const out: Place[] = [];
  let offset: string | undefined;
  do {
    const url = new URL(`https://api.airtable.com/v0/${BASE}/${encodeURIComponent(TABLE)}`);
    url.searchParams.set("pageSize", "100");
    url.searchParams.set("filterByFormula", PREVIEW ? `{Publication Status} != 'Archived'` : `{Publication Status} = 'Approved'`);
    for (const f of FIELDS) url.searchParams.append("fields[]", f);
    if (offset) url.searchParams.set("offset", offset);
    const res = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` }, next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) throw new Error(`Airtable ${TABLE}: ${res.status}`);
    const json = (await res.json()) as { records: { fields: Record<string, unknown> }[]; offset?: string };
    for (const rec of json.records) {
      const f = rec.fields;
      const type = str(f["Type"]).toLowerCase() as PlaceType;
      const slug = str(f["Slug"]);
      const name = str(f["Name"]);
      if (!slug || !name || !["region", "island", "community"].includes(type)) continue;
      out.push({
        slug,
        name,
        type,
        parent: str(f["Parent"]),
        area: str(f["Area"]),
        sort: typeof f["Sort Order"] === "number" ? (f["Sort Order"] as number) : 99999,
        approved: str(f["Publication Status"]) === "Approved",
        overview: str(f["Overview"]),
        facts: parseFacts(str(f["At a Glance"])),
        qa: parseQA(str(f["Questions and Answers"])),
      });
    }
    offset = json.offset;
  } while (offset);
  return out;
}

/** Drop places whose parent is missing, so a hidden region never leaves orphaned islands on show. */
function withParents(places: Place[]): Place[] {
  const slugs = new Set(places.map((p) => p.slug));
  const regions = places.filter((p) => p.type === "region");
  const islands = places.filter((p) => p.type === "island" && slugs.has(p.parent));
  const islandSlugs = new Set(islands.map((p) => p.slug));
  const communities = places.filter((p) => p.type === "community" && islandSlugs.has(p.parent));
  return [...regions, ...islands, ...communities].sort((a, b) => a.sort - b.sort || a.name.localeCompare(b.name));
}

export async function getPlaces(): Promise<Place[]> {
  if (!TOKEN) return PREVIEW ? withParents(FALLBACK_PLACES) : [];
  try {
    return withParents(await fetchPlaces());
  } catch (err) {
    console.error("Airtable unavailable for places:", err);
    return PREVIEW ? withParents(FALLBACK_PLACES) : [];
  }
}

export interface RegionGroup {
  region: Place;
  islands: Place[];
}

export async function getRegionGroups(): Promise<RegionGroup[]> {
  const places = await getPlaces();
  return places
    .filter((p) => p.type === "region")
    .map((region) => ({ region, islands: places.filter((p) => p.type === "island" && p.parent === region.slug) }))
    .filter((g) => g.islands.length > 0);
}

export async function getPlace(slug: string): Promise<Place | undefined> {
  return (await getPlaces()).find((p) => p.slug === slug);
}

export async function getChildren(slug: string): Promise<Place[]> {
  return (await getPlaces()).filter((p) => p.parent === slug);
}
