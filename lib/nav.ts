import { ISLANDS } from "@/lib/content/sample";

export interface NavGroup {
  label: string;
  href: string;
  items: { label: string; href: string }[];
}

/** Approved seven-item primary navigation (Stage 01, decision C-3). "Inquire" is rendered as the header button. */
export const NAV: NavGroup[] = [
  {
    label: "Properties",
    href: "/properties",
    items: [
      { label: "All Properties", href: "/properties" },
      { label: "The Islanders Collection™", href: "/properties/collection" },
      { label: "17015 W Wahoo Lane", href: "/properties/sugarloaf-key/17015-w-wahoo-lane" },
    ],
  },
  {
    label: "Islands",
    href: "/islands",
    items: [
      { label: "Florida Keys Overview", href: "/islands" },
      ...ISLANDS.map((i) => ({ label: i.name, href: `/islands/${i.slug}` })),
    ],
  },
  {
    label: "Island Intelligence",
    href: "/island-intelligence",
    items: [
      { label: "Market Overview", href: "/island-intelligence" },
      { label: "Island Value Report™", href: "/island-intelligence#value-report" },
      { label: "From James’s Dock™", href: "/island-intelligence#dock" },
    ],
  },
  {
    label: "Tools of Trade™",
    href: "/tools",
    items: [
      { label: "Monthly Ownership Estimator", href: "/tools#estimator" },
      { label: "Buyer and Seller Resources", href: "/tools#resources" },
    ],
  },
  {
    label: "Work With James",
    href: "/work-with-james",
    items: [
      { label: "For Buyers", href: "/buy" },
      { label: "For Sellers", href: "/sell" },
      { label: "The Island Match™", href: "/island-match" },
      { label: "Private Consultation", href: "/inquire" },
    ],
  },
  {
    label: "About",
    href: "/about",
    items: [{ label: "Meet James", href: "/about" }],
  },
];

export const INQUIRE = { label: "Inquire", href: "/inquire" };

/** Private buyer, seller and admin workspace (Base44). Sign-up and sign-in happen there, not on the public site. */
const WORKSPACE = process.env.NEXT_PUBLIC_WORKSPACE_URL ?? "https://vivacious-island-home-intel.base44.app";
export const ACCOUNT = { signIn: `${WORKSPACE}/dashboard`, signUp: `${WORKSPACE}/dashboard?welcome=1` };
