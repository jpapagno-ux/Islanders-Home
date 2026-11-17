/**
 * The private desk (Base44 App A — "The Islanders Home™ Intelligence").
 *
 * Always the PUBLISHED app address, never the editor preview. Override with
 * NEXT_PUBLIC_DESK_URL in Vercel. Page paths below are the desk's routes; if a
 * page is renamed in Base44, change it here once.
 */
export const DESK_URL = (process.env.NEXT_PUBLIC_DESK_URL ?? process.env.NEXT_PUBLIC_WORKSPACE_URL ?? "https://vivacious-island-home-intel.base44.app").replace(/\/$/, "");

const PAGES = {
  welcome: "/Welcome",
  dashboard: "/Dashboard",
};

/** Sign in → the desk's dashboard (Base44 shows its login first when signed out, then returns here). */
export const signInUrl = () => `${DESK_URL}${PAGES.dashboard}`;

/** Create account → the Welcome step (Buyer / Seller / Investor, contact preferences, consent). */
export const signUpUrl = () => `${DESK_URL}${PAGES.welcome}`;

/** Save a home → desk login carrying the website Property ID so the desk can create the SavedProperty. */
export const saveUrl = (propertyRef: string) => `${DESK_URL}${PAGES.dashboard}?save=${encodeURIComponent(propertyRef)}`;
