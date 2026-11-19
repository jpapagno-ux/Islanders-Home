import Image from "next/image";
import Link from "next/link";
import { PageContextScript } from "@/components/PageContextScript";
import { getRegionGroups } from "@/lib/content";
import islandsImg from "@/public/preview/islands.jpg";

export const metadata = {
  title: "Islands of South Florida",
  description:
    "Island guides for the Florida Keys, Miami-Dade, Greater Fort Lauderdale and the Gulf Coast, from Key Largo to Marco Island.",
  alternates: { canonical: "/islands" },
};

export const revalidate = 300;

export default async function Page() {
  const groups = await getRegionGroups();
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

      {groups.length > 1 && (
        <nav aria-label="Regions" className="border-b border-sand bg-paper">
          <div className="wrap flex flex-wrap gap-x-7 gap-y-1 py-4">
            {groups.map((g) => (
              <a key={g.region.slug} href={`#${g.region.slug}`} className="label py-2 text-ocean no-underline hover:text-teal">
                {g.region.name}
              </a>
            ))}
          </div>
        </nav>
      )}

      {groups.map((g) => (
        <section key={g.region.slug} id={g.region.slug} className="wrap section scroll-mt-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="eyebrow">
                {g.islands.length} {g.islands.length === 1 ? "island" : "islands"}
              </div>
              <div className="rule" />
              <h2 className="display">{g.region.name}</h2>
            </div>
            <Link href={`/islands/${g.region.slug}`} className="label border-b border-gold pb-1.5 text-ocean no-underline">
              About {g.region.name} →
            </Link>
          </div>
          <div className="mt-8 grid gap-x-10 md:grid-cols-2">
            {g.islands.map((isl) => (
              <Link key={isl.slug} href={`/islands/${isl.slug}`} className="flex items-baseline justify-between gap-5 border-t border-ocean/25 py-5 no-underline">
                <span className="font-serif text-[clamp(26px,2.8vw,36px)] leading-tight text-ocean">{isl.name}</span>
                {isl.area && <span className="label text-mute">{isl.area}</span>}
              </Link>
            ))}
          </div>
        </section>
      ))}

      {groups.length === 0 && (
        <section className="wrap section">
          <p className="max-w-[620px]">Island guides are in preparation.</p>
        </section>
      )}
    </main>
  );
}
