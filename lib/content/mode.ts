/**
 * Site stage.
 *
 * PREVIEW (default): the site is behind sign-in and marked "Preview build". Draft and
 * Review places are shown so the structure can be seen while content is written, and
 * the labelled sample listing fills in when no property is Approved.
 *
 * PUBLISHED: set NEXT_PUBLIC_SITE_STAGE=published in Vercel at the production-readiness
 * gate. From then on only records with Publication Status = Approved are ever shown,
 * and no sample content is served.
 */
export const PREVIEW = process.env.NEXT_PUBLIC_SITE_STAGE !== "published";
