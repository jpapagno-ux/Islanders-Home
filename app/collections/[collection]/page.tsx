import { Placeholder } from "@/components/Placeholder";

export const metadata = { title: "Collection" };

export default async function Page({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  return (
    <Placeholder
      title={`Collection: ${collection}`}
      context={{ page_type: "collection", journey: "buyer", collection_id: collection }}
    />
  );
}
