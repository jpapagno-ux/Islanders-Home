import { Placeholder } from "@/components/Placeholder";

export const metadata = { title: "Home" };

export default async function Page({ params }: { params: Promise<{ property: string }> }) {
  const { property } = await params;
  return (
    <Placeholder
      title={`Home: ${property}`}
      context={{ page_type: "property", journey: "buyer", property_id: property }}
    />
  );
}
