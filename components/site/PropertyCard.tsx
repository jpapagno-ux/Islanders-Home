import Link from "next/link";
import { CldImg } from "@/components/site/CldImg";
import { propertyHref, type Property } from "@/lib/content/sample";

/** Borderless, image-led property card from the approved Properties board. */
export function PropertyCard({ property }: { property: Property }) {
  const photo = property.photos.find((ph) => ph.hero) ?? property.photos[0];
  const brief = property.facts.filter((f) => ["Bedrooms", "Bathrooms", "Sq ft"].includes(f.label));
  return (
    <Link href={propertyHref(property)} className="zoom group block text-ink no-underline">
      <div className="relative aspect-[4/3] overflow-hidden bg-seaglass">
        <CldImg photo={photo} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
      </div>
      <div className="pt-4">
        <div className="font-serif text-[24px] leading-tight text-ocean">{property.address}</div>
        <div className="label mt-1 text-mute">{property.islandName}</div>
        <div className="mt-3 border-t border-sand pt-3 font-serif text-[24px]">${property.price.toLocaleString("en-US")}</div>
        <div className="mt-1 text-[13px]">{brief.map((f) => `${f.value} ${f.label.toLowerCase()}`).join(" · ")}</div>
      </div>
    </Link>
  );
}

export function ReservedCard({ tone = "sand", children }: { tone?: "sand" | "seaglass"; children: React.ReactNode }) {
  return (
    <div className={`flex aspect-[4/3] flex-col justify-between p-6 ${tone === "sand" ? "bg-sand" : "bg-seaglass"}`}>
      <div className="label text-ink">Coming to the collection</div>
      <div className="font-serif text-[24px] leading-tight text-ocean">{children}</div>
    </div>
  );
}
