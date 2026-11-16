import { TypeListing } from "@/components/site/TypeListing";

export const revalidate = 300;
export const metadata = { title: "New Construction in the Florida Keys", alternates: { canonical: "/properties/new-construction" } };

export default function Page() {
  return (
    <TypeListing
      type="New Construction"
      eyebrow="New Construction"
      title="Newly built and under-construction island homes"
      lede="Recently completed homes and homes under construction across the Florida Keys, selected by James."
      empty="New construction listings are being selected. Call James for homes that are under way now."
    />
  );
}
