import { Placeholder } from "@/components/Placeholder";

export const metadata = { title: "Community" };

export default async function Page({ params }: { params: Promise<{ island: string; community: string }> }) {
  const { island, community } = await params;
  return (
    <Placeholder
      title={`Community: ${community}`}
      context={{ page_type: "community", journey: "buyer", island_id: island, community_id: community }}
    />
  );
}
