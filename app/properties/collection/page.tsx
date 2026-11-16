import { Placeholder } from "@/components/Placeholder";
import { COLLECTIONS } from "@/lib/content/sample";

export const metadata = { title: "The Islanders Collection™", alternates: { canonical: "/properties/collection" } };

export default function Page() {
  return (
    <Placeholder
      title="The Islanders Collection™"
      eyebrow="Properties"
      lede="Homes selected by James, each with a written note on why it made the list. The first selections are being prepared."
      points={COLLECTIONS}
      context={{ page_type: "collection_index", journey: "buyer" }}
    />
  );
}
