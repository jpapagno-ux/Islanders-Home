import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Placeholder } from "@/components/Placeholder";
import { getPlace } from "@/lib/content";

type Params = Promise<{ island: string; community: string }>;

export const revalidate = 300;

async function load(island: string, community: string) {
  const place = await getPlace(community);
  if (!place || place.type !== "community" || place.parent !== island) return undefined;
  return { place, parent: await getPlace(island) };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { island, community } = await params;
  const found = await load(island, community);
  return found ? { title: found.place.name, alternates: { canonical: `/islands/${island}/${community}` } } : {};
}

export default async function Page({ params }: { params: Params }) {
  const { island, community } = await params;
  const found = await load(island, community);
  if (!found) notFound();
  const { place, parent } = found;
  return (
    <Placeholder
      title={place.name}
      eyebrow={parent ? `Community · ${parent.name}` : "Community"}
      lede={place.overview || `The ${place.name} community guide is being written from first-hand knowledge and verified sources.`}
      context={{ page_type: "community", journey: "buyer", island_id: island, community_id: place.slug }}
    />
  );
}
