/**
 * MOCK DATA — Stage 02 design shell.
 *
 * Everything in this file is SAMPLE content taken from the approved design
 * boards. It is not verified listing data. It will be replaced by the Airtable
 * content base and the IDX feed; no page may treat these values as facts.
 */

export const SAMPLE_NOTICE =
  "Sample listing shown for design purposes. Details are not verified and will be replaced by live listing data.";

export const SITE = {
  name: "The Islanders Home",
  advisor: "James Papagno",
  brokerage: "Brown Harris Stevens",
  email: "Jpapagno@BHSusa.com",
  phoneDisplay: "561.479.6355",
  phoneHref: "tel:+15614796355",
};

export interface Island {
  slug: string;
  name: string;
  area: string;
}

export const ISLANDS: Island[] = [
  { slug: "key-largo", name: "Key Largo", area: "Upper Keys" },
  { slug: "islamorada", name: "Islamorada", area: "Upper Keys" },
  { slug: "marathon", name: "Marathon", area: "Middle Keys" },
  { slug: "big-pine-key", name: "Big Pine Key", area: "Lower Keys" },
  { slug: "summerland-key", name: "Summerland Key", area: "Lower Keys" },
  { slug: "sugarloaf-key", name: "Sugarloaf Key", area: "Lower Keys" },
  { slug: "key-west", name: "Key West", area: "Lower Keys" },
];

export const COLLECTIONS = [
  "Legacy Homes",
  "The Boater’s Edit",
  "Architectural Finds",
  "Rare Waterfront",
  "Island Opportunities",
];

export interface SampleProperty {
  id: string;
  slug: string;
  island: string;
  islandName: string;
  region: string;
  address: string;
  headline: string;
  price: number;
  facts: { label: string; value: string }[];
  features: string[];
  keyFacts: string[];
  perspective: string;
  listingAttribution: string;
}

export const PROPERTIES: SampleProperty[] = [
  {
    id: "IH-P-0001",
    slug: "17015-w-wahoo-lane",
    island: "sugarloaf-key",
    islandName: "Sugarloaf Key",
    region: "Florida Keys",
    address: "17015 W Wahoo Lane",
    headline: "A private point on Sugarloaf Sound. 270 feet of waterfront. A lifetime of memories.",
    price: 3999999,
    facts: [
      { label: "Price", value: "$3,999,999" },
      { label: "Bedrooms", value: "3" },
      { label: "Bathrooms", value: "3.5" },
      { label: "Sq ft", value: "2,096" },
      { label: "Acres", value: "0.39" },
      { label: "Waterfront", value: "270 ft" },
    ],
    features: [
      "270 ft waterfront",
      "14,000 lb boat lift",
      "Heated pool",
      "Tropical grounds",
      "Renovated residence",
      "Open water access",
    ],
    keyFacts: ["MLS 621652", "3 bedrooms", "3.5 bathrooms", "2,096 sq ft", "0.39 acres", "Built 2018 (renovated)"],
    perspective:
      "What makes this property special isn’t just the renovation or the 270 feet of open water. It’s the way it brings people together: days on the boat, evenings by the pool, and sunsets that never get old. This is the kind of home that becomes part of your family story.",
    listingAttribution:
      "Listing courtesy of Coldwell Banker Schmitt Real Estate Co. Source: Florida Keys MLS #621652. Attribution to be confirmed against the live feed.",
  },
];

export function propertyHref(p: SampleProperty) {
  return `/properties/${p.island}/${p.slug}`;
}
