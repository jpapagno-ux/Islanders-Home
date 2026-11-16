/**
 * Content source for the public site.
 *
 * Reads approved properties from the Airtable base "The Islanders Home — Public
 * Content" when AIRTABLE_TOKEN is set (server-side only; never sent to the browser).
 * Falls back to the labelled sample data otherwise, or if Airtable cannot be reached.
 *
 * Publication gate: only Properties with Publication Status = Approved, and only
 * Property Media with Rights Cleared ticked, are ever returned.
 */
import { ISLANDS, SAMPLE_PROPERTIES, type Photo, type Property } from "@/lib/content/sample";

const BASE = process.env.AIRTABLE_BASE_ID ?? "appJNZcT05lithwCl";
const TOKEN = process.env.AIRTABLE_TOKEN;
const REVALIDATE_SECONDS = 300;

type Fields = Record<string, unknown>;
interface AirtableRecord {
  id: string;
  fields: Fields;
}

async function list(table: string, formula: string): Promise<AirtableRecord[]> {
  const out: AirtableRecord[] = [];
  let offset: string | undefined;
  do {
    const url = new URL(`https://api.airtable.com/v0/${BASE}/${encodeURIComponent(table)}`);
    url.searchParams.set("filterByFormula", formula);
    url.searchParams.set("pageSize", "100");
    if (offset) url.searchParams.set("offset", offset);
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) throw new Error(`Airtable ${table}: ${res.status}`);
    const json = (await res.json()) as { records: AirtableRecord[]; offset?: string };
    out.push(...json.records);
    offset = json.offset;
  } while (offset);
  return out;
}

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const num = (v: unknown) => (typeof v === "number" ? v : undefined);
const fmt = (n: number) => n.toLocaleString("en-US");

function toProperty(rec: AirtableRecord, islandsById: Map<string, AirtableRecord>, media: AirtableRecord[]): Property | null {
  const f = rec.fields;
  const address = str(f["Address"]);
  const slug = str(f["Slug"]);
  const islandRec = islandsById.get(((f["Island"] as string[] | undefined) ?? [])[0] ?? "");
  const island = islandRec ? str(islandRec.fields["Slug"]) : "";
  if (!address || !slug || !island) return null;

  const price = num(f["Price"]) ?? 0;
  const facts: { label: string; value: string }[] = [];
  const add = (label: string, value: string | undefined) => value && facts.push({ label, value });
  add("Price", price ? `$${fmt(price)}` : undefined);
  add("Bedrooms", num(f["Bedrooms"])?.toString());
  add("Bathrooms", num(f["Bathrooms"])?.toString());
  add("Sq ft", num(f["Sq Ft"]) ? fmt(num(f["Sq Ft"])!) : undefined);
  add("Acres", num(f["Acres"])?.toString());
  add("Waterfront", num(f["Waterfront Ft"]) ? `${fmt(num(f["Waterfront Ft"])!)} ft` : undefined);

  const mls = str(f["MLS Number"]);
  const brokerage = str(f["Listing Brokerage"]);
  const agent = str(f["Listing Agent"]);
  const keyFacts = [
    mls && `MLS ${mls}`,
    ...facts.filter((x) => x.label !== "Price").map((x) => `${x.value} ${x.label.toLowerCase()}`),
    num(f["Year Built"]) && `Built ${num(f["Year Built"])}`,
  ].filter(Boolean) as string[];

  const photos: Photo[] = media
    .filter((m) => ((m.fields["Property"] as string[] | undefined) ?? []).includes(rec.id))
    .sort((a, b) => (num(a.fields["Sort Order"]) ?? 999) - (num(b.fields["Sort Order"]) ?? 999))
    .map((m) => ({
      publicId: str(m.fields["Cloudinary Public ID"]),
      alt: str(m.fields["Alt Text"]) || `${address} photograph`,
      category: str(m.fields["Category"]) || "Exterior",
      hero: m.fields["Hero"] === true,
    }))
    .filter((ph) => ph.publicId);
  photos.sort((a, b) => Number(b.hero ?? false) - Number(a.hero ?? false));

  return {
    id: str(f["Property ID"]) || rec.id,
    slug,
    island,
    islandName: islandRec ? str(islandRec.fields["Name"]) : "",
    region: "Florida Keys",
    address,
    headline: str(f["Headline"]),
    description: str(f["Description"]),
    price,
    facts,
    features: str(f["Features"]).split("\n").map((s) => s.trim()).filter(Boolean).slice(0, 6),
    keyFacts,
    perspective: f["Perspective Approved"] === true ? str(f["James's Perspective"]) : "",
    listingAttribution: brokerage
      ? `Listing courtesy of ${agent ? `${agent}, ` : ""}${brokerage}.${mls ? ` MLS #${mls}.` : ""} Information is deemed reliable but is not guaranteed.`
      : "",
    sample: str(f["Listing Status"]) === "Sample",
    type: str(f["Property Type"]) || "Residence",
    photos,
  };
}

export async function getProperties(): Promise<Property[]> {
  if (!TOKEN) return SAMPLE_PROPERTIES;
  try {
    const [props, islands, media] = await Promise.all([
      list("Properties", `{Publication Status} = 'Approved'`),
      list("Islands & Communities", `{Type} = 'Island'`),
      list("Property Media", `{Rights Cleared} = 1`),
    ]);
    const islandsById = new Map(islands.map((i) => [i.id, i]));
    const live = props
      .map((r) => toProperty(r, islandsById, media))
      .filter((x): x is Property => x !== null && x.photos.length > 0);
    return live.length > 0 ? live : SAMPLE_PROPERTIES;
  } catch (err) {
    console.error("Airtable unavailable, serving sample content:", err);
    return SAMPLE_PROPERTIES;
  }
}

export async function getProperty(island: string, slug: string) {
  return (await getProperties()).find((x) => x.island === island && x.slug === slug);
}

/** Fill a photo slot: first unused photo in one of the preferred categories, else any unused photo, else the first. */
export function pickPhoto(photos: Photo[], used: Set<string>, prefer: string[] = []): Photo {
  const free = photos.filter((ph) => !used.has(ph.publicId));
  const chosen = free.find((ph) => prefer.includes(ph.category)) ?? free[0] ?? photos[0];
  used.add(chosen.publicId);
  return chosen;
}

export { ISLANDS };
