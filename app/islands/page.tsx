import Image from "next/image";
import Link from "next/link";
import { PageContextScript } from "@/components/PageContextScript";
import { ISLANDS } from "@/lib/content/sample";
import islandsImg from "@/public/preview/islands.jpg";

export const metadata = {
  title: "Islands of the Florida Keys",
  description: "Island guides for the Florida Keys, from Key Largo to Key West.",
  alternates: { canonical: "/islands" },
};

export default function Page() {
  return (
    <main>
      <PageContextScript page_type="island_index" journey="buyer" />
      <section className="relative flex min-h-[clamp(380px,52vh,560px)] items-end bg-ocean">
        <Image src={islandsImg} alt="Aerial of a small wooded island in clear shallow water" fill priority sizes="100vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-[rgba(20,56,66,0.55)]" />
        <div className="wrap relative w-full pb-12 text-paper">
          <h1 className="font-serif text-[clamp(44px,7vw,92px)] leading-none">
            Each Island
            <br />
            Has a Story.
          </h1>
          <p className="mt-4 max-w-[520px]">Distinctive communities. Different ways of living on the water. Find the island that feels like home.</p>
        </div>
      </section>
      <section className="wrap section">
        <div className="eyebrow">Florida Keys</div>
        <div className="rule" />
        <div className="grid gap-x-10 md:grid-cols-2">
          {ISLANDS.map((isl, i) => (
            <Link key={isl.slug} href={`/islands/${isl.slug}`} className="flex items-baseline gap-5 border-t border-ocean/25 py-5 no-underline">
              <span className="min-w-7 text-[12px] font-semibold tracking-[0.16em] text-ink">0{i + 1}</span>
              <span className="flex-1 font-serif text-[clamp(28px,3vw,38px)] leading-tight text-ocean">{isl.name}</span>
              <span className="label text-mute">{isl.area}</span>
            </Link>
          ))}
        </div>
        <p className="mt-8 max-w-[620px]">Island guides, community guides and the interactive island map are in preparation.</p>
      </section>
    </main>
  );
}
