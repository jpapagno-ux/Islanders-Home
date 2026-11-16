import Image from "next/image";
import Link from "next/link";
import { PageContextScript } from "@/components/PageContextScript";
import { PropertyCard, ReservedCard } from "@/components/site/PropertyCard";
import { CldImg } from "@/components/site/CldImg";
import { getProperties } from "@/lib/content";
import { COLLECTIONS, ISLANDS, SITE, SITE_PHOTOS } from "@/lib/content/sample";
import islandsImg from "@/public/preview/islands.jpg";
import boatImg from "@/public/preview/boat.jpg";

const MATCH_STEPS = [
  "Islands and communities",
  "How you want to live",
  "Boating and dockage",
  "Budget",
  "The home itself",
  "Intended use",
  "Timing",
];

const INTEL = [
  {
    kind: "Market reports",
    title: "The Florida Keys, read quarterly",
    text: "Sourced, dated market notes for each island, written for owners and buyers.",
    href: "/island-intelligence",
  },
  {
    kind: "Private report",
    title: "Island Value Report™",
    text: "Choose an as-of date and request a private report on a property, prepared and reviewed by James.",
    href: "/island-intelligence#value-report",
  },
  {
    kind: "Editorial",
    title: "From James’s Dock™",
    text: "First-hand notes on boating access, bridges, depth and what a dock is worth on a given canal.",
    href: "/island-intelligence#dock",
  },
];

export const revalidate = 300;

export default async function Page() {
  const properties = await getProperties();
  const featured = properties.slice(0, 4);
  const selectCls = "min-h-[32px] bg-transparent py-1 text-[16px] text-ink";
  const fieldCls = "flex flex-[1_1_180px] flex-col gap-0.5 border-b border-sand px-5 py-3.5 md:border-b-0 md:border-r";

  return (
    <main>
      <PageContextScript page_type="home" journey="brand" />

      {/* 1–4 Hero, headline, subheading, search */}
      <section className="relative flex min-h-[clamp(560px,82vh,820px)] flex-col justify-end bg-ocean">
        <CldImg photo={SITE_PHOTOS.homeHero} priority />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[rgba(20,56,66,0.88)] via-[rgba(20,56,66,0.5)] to-[rgba(20,56,66,0.12)]" />
        <div className="wrap relative w-full pb-[clamp(36px,6vw,72px)] pt-16">
          <h1 className="font-serif text-[clamp(46px,8vw,104px)] leading-[0.98] text-paper">
            Exceptional
            <br />
            Island Homes.
          </h1>
          <p className="mb-8 mt-5 max-w-[520px] text-[clamp(16px,1.6vw,19px)] text-paper">
            Curated waterfront residences across the Florida Keys and beyond.
          </p>
          <form action="/properties" aria-label="Property search" className="flex max-w-[900px] flex-wrap bg-paper">
            <label className={fieldCls}>
              <span className="label text-ocean">Location</span>
              <select name="island" className={selectCls} defaultValue="">
                <option value="">Any island</option>
                {ISLANDS.map((i) => (
                  <option key={i.slug} value={i.slug}>
                    {i.name}
                  </option>
                ))}
              </select>
            </label>
            <label className={fieldCls}>
              <span className="label text-ocean">Property type</span>
              <select name="type" className={selectCls} defaultValue="">
                <option value="">All types</option>
                <option value="waterfront">Waterfront homes</option>
                <option value="luxury">Luxury residences</option>
                <option value="dock">Homes with boat docks</option>
              </select>
            </label>
            <label className={fieldCls}>
              <span className="label text-ocean">Price range</span>
              <select name="price" className={selectCls} defaultValue="">
                <option value="">Any price</option>
                <option value="0-2">Up to $2M</option>
                <option value="2-4">$2M to $4M</option>
                <option value="4-8">$4M to $8M</option>
                <option value="8-">$8M and above</option>
              </select>
            </label>
            <button type="submit" className="btn btn-ocean min-h-[56px] flex-[1_1_140px]">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* 5 Featured properties */}
      <section className="wrap section">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <h2 className="display">Featured Properties</h2>
          <Link href="/properties" className="label border-b border-gold pb-1.5 text-ocean no-underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
          {Array.from({ length: 4 - featured.length }, (_, i) => (
            <ReservedCard key={i} tone={i % 2 ? "sand" : "seaglass"}>
              A curated home, selected by James
            </ReservedCard>
          ))}
        </div>
      </section>

      {/* More than homes band */}
      <section className="relative flex min-h-[clamp(320px,44vw,520px)] items-center bg-ocean">
        <CldImg photo={SITE_PHOTOS.band} />
        <div aria-hidden className="absolute inset-0 bg-[rgba(20,56,66,0.5)]" />
        <div className="wrap relative flex w-full flex-wrap items-end justify-between gap-6">
          <h2 className="font-serif text-[clamp(36px,5.4vw,72px)] leading-[1.02] text-paper">
            More than homes.
            <br />
            <em>A way of life.</em>
          </h2>
          <Link href="/properties" className="btn btn-paper">
            Explore all properties →
          </Link>
        </div>
      </section>

      {/* 6 The Islanders Collection */}
      <section className="bg-sand">
        <div className="wrap section flex flex-wrap items-center gap-[clamp(32px,6vw,88px)]">
          <div className="zoom relative aspect-[4/5] max-h-[640px] min-w-0 flex-[1_1_360px] bg-seaglass">
            <CldImg photo={SITE_PHOTOS.collection} sizes="(max-width: 900px) 100vw, 45vw" />
          </div>
          <div className="min-w-0 flex-[1_1_420px]">
            <div className="eyebrow">The Islanders Collection™</div>
            <div className="rule" />
            <h2 className="display mb-4">
              Selected by James.
              <br />
              <em>Explained in writing.</em>
            </h2>
            <p className="mb-7 max-w-[520px]">
              Every home in the Collection carries a note on why it made the list, alongside verified listing information and approved
              photography.
            </p>
            {COLLECTIONS.map((name, i) => (
              <Link key={name} href="/properties/collection" className="flex items-baseline gap-5 border-t border-ocean/25 py-4 no-underline">
                <span className="min-w-7 text-[12px] font-semibold tracking-[0.16em] text-ink">0{i + 1}</span>
                <span className="flex-1 font-serif text-[clamp(24px,2.6vw,32px)] leading-tight text-ocean">{name}</span>
                <span aria-hidden className="text-ocean">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7 Discover the islands */}
      <section className="wrap section">
        <div className="eyebrow">Discover the Islands</div>
        <div className="rule" />
        <h2 className="display mb-9">
          Each island <em>has a story.</em>
        </h2>
        <div className="flex flex-wrap gap-[clamp(28px,5vw,72px)]">
          <div className="min-w-0 flex-[1_1_340px]">
            {ISLANDS.map((isl) => (
              <Link key={isl.slug} href={`/islands/${isl.slug}`} className="flex items-baseline justify-between gap-4 border-t border-ocean/25 py-4 no-underline">
                <span className="font-serif text-[clamp(26px,2.8vw,34px)] leading-tight text-ocean">{isl.name}</span>
                <span className="label text-mute">{isl.area}</span>
              </Link>
            ))}
          </div>
          <div className="zoom relative min-h-[320px] min-w-0 flex-[1.3_1_420px] bg-seaglass">
            <Image src={islandsImg} alt="Aerial of a small wooded island in clear shallow water" fill sizes="(max-width: 900px) 100vw, 55vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Build your island dream home */}
      <section className="wrap section flex flex-wrap items-end justify-between gap-8">
        <div className="min-w-0 flex-[1_1_520px]">
          <div className="eyebrow">Lots · New construction · New developments</div>
          <div className="rule" />
          <h2 className="display mb-4">
            Build your island <em>dream home.</em>
          </h2>
          <p className="max-w-[560px]">
            Call us first. We guide you through finding the land, acquiring it and building on it, step by step.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={SITE.phoneHref} className="btn btn-ocean">
            Call James · {SITE.phoneDisplay}
          </a>
          <Link href="/build" className="btn btn-line">
            How we guide you →
          </Link>
        </div>
      </section>

      {/* 8 Island Intelligence */}
      <section className="bg-sand">
        <div className="wrap section">
          <div className="eyebrow">Island Intelligence</div>
          <div className="rule" />
          <h2 className="display mb-10 max-w-[760px]">
            Data. Perspective. <em>Advantage.</em>
          </h2>
          <div className="grid gap-x-10 md:grid-cols-3">
            {INTEL.map((it) => (
              <Link key={it.title} href={it.href} className="block border-t border-ocean py-6 text-ink no-underline">
                <div className="label">{it.kind}</div>
                <div className="my-3 font-serif text-[30px] leading-[1.12] text-ocean">{it.title}</div>
                <p className="text-[15px]">{it.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9 The Island Match */}
      <section className="bg-ocean text-paper">
        <div className="wrap flex flex-wrap items-center gap-[clamp(32px,6vw,88px)] py-[clamp(72px,10vw,140px)]">
          <div className="min-w-0 flex-[1_1_440px]">
            <div className="eyebrow !text-paper">The Island Match™</div>
            <div className="rule" />
            <h2 className="mb-5 font-serif text-[clamp(38px,5.4vw,72px)] leading-[1.02]">
              Tell us how you want to live. <em>We’ll help find where.</em>
            </h2>
            <p className="mb-8 max-w-[480px]">
              Seven short questions. A shortlist from our curated homes, or a personally reviewed search if nothing fits yet.
            </p>
            <Link href="/island-match" className="btn btn-paper">
              Begin The Island Match
            </Link>
          </div>
          <ol className="min-w-0 flex-[1_1_320px]">
            {MATCH_STEPS.map((s, i) => (
              <li key={s} className="flex items-baseline gap-4 border-t border-paper/30 py-3.5">
                <span className="text-[12px] font-semibold tracking-[0.16em]">0{i + 1}</span>
                <span className="font-serif text-[24px] leading-tight">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 10 Work with James */}
      <section className="wrap section flex flex-wrap gap-[clamp(32px,6vw,88px)]">
        <div className="zoom relative aspect-[4/3] min-w-0 flex-[1_1_340px] bg-seaglass">
          <Image src={boatImg} alt="Bow of a boat heading toward a wooded island" fill sizes="(max-width: 900px) 100vw, 45vw" className="object-cover" />
        </div>
        <div className="min-w-0 flex-[1_1_460px]">
          <div className="eyebrow">Work With James</div>
          <div className="rule" />
          <h2 className="display mb-2">{SITE.advisor}</h2>
          <div className="label mb-7 text-mute">Real Estate Advisor · {SITE.brokerage}</div>
          <div className="grid gap-x-9 sm:grid-cols-2">
            <Link href="/buy" className="block border-t border-ocean py-5 text-ink no-underline">
              <div className="font-serif text-[30px] text-ocean">For buyers</div>
              <p className="my-2 text-[15px]">Start from how you want to live on the water, then narrow to the island and the home.</p>
              <span className="label text-ocean">Private consultation →</span>
            </Link>
            <Link href="/sell" className="block border-t border-ocean py-5 text-ink no-underline">
              <div className="font-serif text-[30px] text-ocean">For sellers</div>
              <p className="my-2 text-[15px]">Begin with a private Island Value Report™, prepared and reviewed by James.</p>
              <span className="label text-ocean">Request a property review →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 11 The Island Dispatch */}
      <section className="bg-sand">
        <div className="mx-auto max-w-[860px] px-[clamp(20px,5vw,64px)] py-[clamp(64px,9vw,112px)] text-center">
          <div className="eyebrow">The Island Dispatch</div>
          <div className="rule mx-auto" />
          <h2 className="display mb-3">
            New homes, island notes and <em>market reading.</em>
          </h2>
          <p className="mx-auto mb-7 max-w-[480px]">An occasional letter from James. The first issue is in preparation.</p>
          <a href={`mailto:${SITE.email}?subject=${encodeURIComponent("Please add me to The Island Dispatch")}`} className="btn btn-ocean">
            Ask to be added
          </a>
        </div>
      </section>
    </main>
  );
}
