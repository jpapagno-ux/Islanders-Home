import { ISLANDS } from "@/lib/content/sample";
import { signInUrl, signUpUrl } from "@/lib/desk";

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
      { label: "New Construction", href: "/properties/new-construction" },
      { label: "New Developments", href: "/properties/new-developments" },
      { label: "Lots and Land", href: "/properties/lots-and-land" },
      { label: "Build Your Island Dream Home", href: "/build" },
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

/** Private buyer, seller and admin desk (Base44, published app). Sign-up and sign-in happen there, not on the public site. */
export const ACCOUNT = { signIn: signInUrl(), signUp: signUpUrl() };
