import { TypeListing } from "@/components/site/TypeListing";

export const revalidate = 300;
export const metadata = { title: "Lots and Land in the Florida Keys", alternates: { canonical: "/properties/lots-and-land" } };

export default function Page() {
  return (
    <TypeListing
      type="Vacant Lot"
      eyebrow="Lots and Land"
      title="Vacant residential lots for sale"
      lede="Buildable waterfront and island lots across the Florida Keys, for owners who want to build rather than buy."
      empty="Lots will appear here as they are selected from the MLS. Call James for land that is available now."
    />
  );
}
