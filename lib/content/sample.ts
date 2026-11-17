/**
 * SAMPLE DATA — used when Airtable is not connected or holds no approved property.
 *
 * 17015 W Wahoo Lane is a sample listing. Photographs are shown with permission
 * through IDX and the Florida Keys MLS (confirmed by James Papagno, 16 Nov 2026).
 * Facts come from the design boards and still need checking against the listing sheet.
 */

export const SAMPLE_NOTICE =
  "Sample listing. Details are provided for illustration and should be verified against the current MLS record.";

export const SITE = {
  name: "The Islanders Home",
  advisor: "James Papagno",
  brokerage: "Brown Harris Stevens",
  email: "Jpapagno@BHSusa.com",
  phoneDisplay: "561.479.6355",
  phoneHref: "tel:+15614796355",
  officeAddress: "7500 Red Road, Suite A, South Miami, FL 33143",
  nmls: "461234",
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

export interface Photo {
  publicId: string;
  alt: string;
  category: string;
  hero?: boolean;
}

export interface Property {
  id: string;
  slug: string;
  island: string;
  islandName: string;
  region: string;
  address: string;
  headline: string;
  description: string;
  price: number;
  facts: { label: string; value: string }[];
  features: string[];
  keyFacts: string[];
  perspective: string;
  listingAttribution: string;
  sample: boolean;
  /** Residence | New Construction | New Development | Vacant Lot */
  type: string;
  photos: Photo[];
}

const W = "islanders-home/samples/mls-621652/621652-";
const p = (n: number, category: string, alt: string, hero = false): Photo => ({
  publicId: `${W}${String(n).padStart(2, "0")}`,
  category,
  alt,
  hero,
});
const many = (nums: number[], category: string, alt: string) => nums.map((n) => p(n, category, alt));

// Order matters: the page fills its photo slots from the top of this list.
const WAHOO_PHOTOS: Photo[] = [
  p(2, "Exterior", "Aerial view of the home and its waterfront at sunset", true),
  p(44, "Pool", "Pool terrace with tiki hut beside open water"),
  p(4, "Waterfront", "Boat lift and dock on open water"),
  p(18, "Interior", "Living room with a wall of windows to the water"),
  p(11, "Interior", "Kitchen island and open living area"),
  p(6, "Lifestyle", "Pool and tiki hut at dusk"),
  p(41, "Exterior", "Aerial view of the pool, lawn and shoreline"),
  p(5, "Exterior", "Aerial view of the pool terrace and waterfront grounds"),
  p(7, "Exterior", "Front of the elevated home"),
  p(8, "Exterior", "Covered entry porch"),
  p(3, "Pool", "Pool edge with open water beyond"),
  ...many([43, 45], "Pool", "Pool terrace and open water"),
  p(40, "Waterfront", "Waterfront grounds with palms"),
  p(1, "Waterfront", "Open water view"),
  p(42, "Exterior", "Garden path through the grounds"),
  ...many([38, 39], "Exterior", "Covered ground-level terrace"),
  p(24, "Exterior", "Balcony off the main living level"),
  ...many([10, 12, 13, 14, 15], "Interior", "Kitchen and living area"),
  ...many([9, 16, 17, 19, 20], "Interior", "Open living area with water views"),
  ...many([21, 22, 23], "Interior", "Dining area with water views"),
  ...many([25, 26, 32, 33, 35], "Interior", "Bedroom"),
  ...many([27, 28, 29, 30, 34, 36], "Interior", "Bathroom"),
  ...many([31, 37], "Interior", "Interior detail"),
];

export const SAMPLE_PROPERTIES: Property[] = [
  {
    id: "IH-P-0001",
    slug: "17015-w-wahoo-lane",
    island: "sugarloaf-key",
    islandName: "Sugarloaf Key",
    region: "Florida Keys",
    address: "17015 W Wahoo Lane",
    headline: "A private point on Sugarloaf Sound. 270 feet of waterfront. A lifetime of memories.",
    description:
      "A renovated waterfront residence on Sugarloaf Key, with indoor and outdoor living that opens to a pool, a tiki hut, a private dock and a boat lift.",
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
      "Photographs and listing information shown with permission through IDX and the Florida Keys MLS. Listing courtesy of Lisa Ferringo, Coldwell Banker Schmitt Real Estate Co. MLS #621652. Information is deemed reliable but is not guaranteed.",
    sample: true,
    type: "Residence",
    photos: WAHOO_PHOTOS,
  },
];

export function propertyHref(prop: Pick<Property, "island" | "slug">) {
  return `/properties/${prop.island}/${prop.slug}`;
}

/** Sample photographs used for site-wide imagery until brand photography is supplied. */
export const SITE_PHOTOS = {
  homeHero: WAHOO_PHOTOS[10],
  band: WAHOO_PHOTOS[5],
  collection: WAHOO_PHOTOS[9],
};
