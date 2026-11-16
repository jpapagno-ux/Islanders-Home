import { TypeListing } from "@/components/site/TypeListing";

export const revalidate = 300;
export const metadata = { title: "New Developments in the Florida Keys", alternates: { canonical: "/properties/new-developments" } };

export default function Page() {
  return (
    <TypeListing
      type="New Development"
      eyebrow="New Developments"
      title="New island communities and residences"
      lede="New waterfront communities and residence collections, with James’s reading of each developer, site and timeline."
      empty="New developments are being reviewed. Call James for current and upcoming projects."
    />
  );
}
