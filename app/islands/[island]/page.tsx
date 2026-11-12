import { Placeholder } from "@/components/Placeholder";

export const metadata = { title: "Island Guide" };

export default async function Page({ params }: { params: Promise<{ island: string }> }) {
  const { island } = await params;
  return (
    <Placeholder
      title={`Island Guide: ${island}`}
      context={{ page_type: "island_guide", journey: "buyer", island_id: island }}
    />
  );
}
