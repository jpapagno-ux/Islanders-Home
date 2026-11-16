import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Placeholder } from "@/components/Placeholder";
import { ISLANDS } from "@/lib/content/sample";

type Params = Promise<{ island: string }>;

export function generateStaticParams() {
  return ISLANDS.map((i) => ({ island: i.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { island } = await params;
  const isl = ISLANDS.find((i) => i.slug === island);
  return isl ? { title: `Living on ${isl.name}`, alternates: { canonical: `/islands/${isl.slug}` } } : {};
}

export default async function Page({ params }: { params: Params }) {
  const { island } = await params;
  const isl = ISLANDS.find((i) => i.slug === island);
  if (!isl) notFound();
  return (
    <Placeholder
      title={isl.name}
      eyebrow={`${isl.area} · Florida Keys`}
      lede={`The ${isl.name} island guide is being written from first-hand knowledge and verified sources.`}
      points={["Boating and access", "Living here", "Ownership and insurance", "Homes on the island", "Questions and answers", "James’s note"]}
      context={{ page_type: "island_guide", journey: "buyer", island_id: isl.slug }}
    />
  );
}
