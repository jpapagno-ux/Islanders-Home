import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageContextScript } from "@/components/PageContextScript";
import { Estimator } from "@/components/site/Estimator";
import { CldImg } from "@/components/site/CldImg";
import { Gallery } from "@/components/site/Gallery";
import { getProperties, getProperty, pickPhoto } from "@/lib/content";
import { ReservedCard } from "@/components/site/PropertyCard";
import { SAMPLE_NOTICE, SITE } from "@/lib/content/sample";

type Params = Promise<{ island: string; property: string }>;

const ICONS: Record<string, React.ReactNode> = {
  "270 ft waterfront": <path d="M3 10c3-3 5-3 8 0s5 3 8 0M3 16c3-3 5-3 8 0s5 3 8 0" />,
  "14,000 lb boat lift": <path d="M3 15h18l-3 4H6l-3-4zM7 15v-4h8l3 4M11 11V6" />,
  "Heated pool": <path d="M3 18c3-2 5-2 8 0s5 2 8 0M7 14V6a2 2 0 014 0M13 14V6a2 2 0 014 0M7 10h6" />,
  "Tropical grounds": <path d="M12 21V10M12 10c-1-4-5-5-8-3M12 10c1-4 5-5 8-3M12 10c-3-1-6 1-7 4M12 10c3-1 6 1 7 4" />,
  "Renovated residence": <path d="M4 11l8-7 8 7M6 10v10h12V10M10 20v-6h4v6" />,
  "Open water access": <path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.5 6.5l2 2M15.5 15.5l2 2M6.5 17.5l2-2M15.5 8.5l2-2M12 9a3 3 0 100 6 3 3 0 000-6z" />,
};

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getProperties()).map((p) => ({ island: p.island, property: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { island, property } = await params;
  const p = await getProperty(island, property);
  if (!p) return {};
  return {
    title: `${p.address}, ${p.islandName}`,
    description: p.headline || p.description,
    alternates: { canonical: `/properties/${p.island}/${p.slug}` },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { island, property } = await params;
  const p = await getProperty(island, property);
  if (!p) notFound();

  const used = new Set<string>();
  const hero = pickPhoto(p.photos, used, []);
  const trioA = pickPhoto(p.photos, used, ["Pool", "Exterior"]);
  const trioB = pickPhoto(p.photos, used, ["Waterfront"]);
  const trioC = pickPhoto(p.photos, used, ["Interior"]);
  const residence = pickPhoto(p.photos, used, ["Interior"]);
  const mood = pickPhoto(p.photos, used, ["Lifestyle", "Pool", "Waterfront"]);
  const place = pickPhoto(p.photos, used, ["Exterior", "Waterfront"]);
  const band = pickPhoto(p.photos, used, ["Exterior", "Waterfront"]);

  const mail = (subject: string) => `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
  const tabCls = "label whitespace-nowrap py-[18px] text-ocean no-underline hover:text-teal";

  return (
    <main>
      <PageContextScript page_type="property" journey="buyer" property_id={p.id} island_id={p.island} />

      {/* Hero */}
      <section className="relative flex min-h-[clamp(560px,80vh,800px)] flex-col justify-end bg-ocean">
        <CldImg photo={hero} priority />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[rgba(20,56,66,0.9)] via-[rgba(20,56,66,0.6)] to-[rgba(20,56,66,0.15)]" />
        <div className="wrap relative w-full pb-[clamp(40px,6vw,72px)] pt-16 text-paper">
          <nav aria-label="Breadcrumb" className="mb-5 text-[12px] tracking-[0.08em]">
            <Link href="/" className="text-paper">Home</Link> › <Link href="/properties" className="text-paper">Properties</Link> ›{" "}
            <Link href={`/islands/${p.island}`} className="text-paper">{p.islandName}</Link> › {p.address}
          </nav>
          <div className="label mb-3 tracking-[0.26em]">
            {p.islandName} · {p.region}
          </div>
          <h1 className="font-serif text-[clamp(44px,7vw,92px)] leading-none">{p.address}</h1>
          <p className="mb-8 mt-5 max-w-[560px] font-serif text-[clamp(22px,2.6vw,32px)] leading-[1.2]">{p.headline}</p>
          <div className="flex flex-wrap gap-3">
            <a href={mail(`Private tour request: ${p.address}`)} className="btn btn-line-light">
              Schedule a private tour →
            </a>
            <a href="#gallery" className="btn btn-line-light">
              View gallery
            </a>
          </div>
        </div>
      </section>

      {/* Facts strip */}
      <section aria-label="Property facts" className="border-b border-sand">
        <div className="wrap flex flex-wrap items-center gap-x-8">
          <dl className="flex flex-[999_1_560px] flex-wrap gap-x-[clamp(24px,3.4vw,52px)]">
            {p.facts.map((f) => (
              <div key={f.label} className="py-5 md:py-6">
                <dd className="font-serif text-[clamp(26px,3vw,38px)] leading-none text-ocean">{f.value}</dd>
                <dt className="label mt-2 text-mute">{f.label}</dt>
              </div>
            ))}
          </dl>
          <a href={mail(`Request for information: ${p.address}`)} className="btn btn-gold mb-6 flex-[1_1_240px] md:mb-0">
            Request more information →
          </a>
        </div>
        {p.sample && <p className="wrap pb-4 text-[13px]">{SAMPLE_NOTICE}</p>}
      </section>

      {/* Three-image composition */}
      <section aria-label="Photographs" className="wrap flex flex-wrap gap-3 pt-[clamp(28px,4vw,48px)]">
        <div className="zoom relative aspect-[3/2] min-w-0 flex-[999_1_520px] bg-seaglass">
          <CldImg photo={trioA} sizes="(max-width: 900px) 100vw, 60vw" />
        </div>
        <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-3">
          <div className="zoom relative min-h-[160px] flex-1 bg-seaglass">
            <CldImg photo={trioB} sizes="(max-width: 900px) 100vw, 40vw" />
          </div>
          <div className="zoom relative min-h-[160px] flex-1 bg-seaglass">
            <CldImg photo={trioC} sizes="(max-width: 900px) 100vw, 40vw" />
            <a href="#gallery" className="btn btn-paper absolute bottom-3 right-3 !min-h-[44px] !px-5">
              View all {p.photos.length} photos →
            </a>
          </div>
        </div>
      </section>

      {/* The residence */}
      <section id="residence" className="wrap section flex flex-wrap gap-[clamp(32px,6vw,88px)]">
        <div className="min-w-0 flex-[1_1_460px]">
          <div className="eyebrow">The Residence</div>
          <div className="rule" />
          <h2 className="display mb-5">
            Island architecture. <em>Designed for a life well lived.</em>
          </h2>
          <p className="max-w-[600px] text-[17px]">{p.description}</p>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
            {p.features.map((f) => (
              <li key={f} className="flex flex-col gap-3">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-9 w-9 fill-none stroke-ocean" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  {ICONS[f] ?? <circle cx="12" cy="12" r="4" />}
                </svg>
                <span className="label text-ink">{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-3">
          <div className="zoom relative aspect-[5/4] bg-seaglass">
            <CldImg photo={residence} sizes="(max-width: 900px) 100vw, 40vw" />
          </div>
          <Link href={`/islands/${p.island}`} className="flex items-center justify-between bg-sand p-6 no-underline">
            <span>
              <span className="label block text-mute">Location</span>
              <span className="font-serif text-[28px] text-ocean">{p.islandName}</span>
            </span>
            <span className="label text-ocean">Island guide →</span>
          </Link>
        </div>
      </section>

      {p.perspective && (
        <>
      {/* James's Perspective */}
      <section id="perspective" className="flex flex-wrap bg-ocean">
        <div className="relative min-h-[320px] min-w-0 flex-[1_1_360px]">
          <CldImg photo={mood} sizes="(max-width: 900px) 100vw, 45vw" />
        </div>
        <div className="min-w-0 flex-[1_1_460px] px-[clamp(24px,6vw,88px)] py-[clamp(48px,7vw,96px)] text-paper">
          <div className="label tracking-[0.24em]">James’s Perspective</div>
          <div className="rule" />
          <blockquote className="font-serif text-[clamp(24px,2.8vw,36px)] leading-[1.25]">“{p.perspective}”</blockquote>
          <div className="label mt-6">— {SITE.advisor}</div>
        </div>
      </section>
        </>
      )}

      {/* Explore the details */}
      <nav aria-label="Explore the details" className="sticky top-[88px] z-30 border-b border-sand bg-paper">
        <div className="wrap flex gap-7 overflow-x-auto">
          <a href="#overview" className={tabCls}>Overview</a>
          <a href="#gallery" className={tabCls}>Gallery</a>
          <a href="#ownership" className={tabCls}>Ownership</a>
          <a href="#value" className={tabCls}>Value Report</a>
          <a href="#location" className={tabCls}>Location</a>
          <a href="#inquire" className={tabCls}>Contact</a>
        </div>
      </nav>

      <section id="overview" className="wrap section flex flex-wrap gap-[clamp(32px,6vw,88px)]">
        <div className="min-w-0 flex-[1_1_420px]">
          <h2 className="mb-4 font-serif text-[34px] text-ocean">Property Overview</h2>
          <p className="max-w-[560px]">{p.description}</p>
        </div>
        <div className="min-w-0 flex-[1_1_260px]">
          <div className="label mb-3 text-mute">Key facts</div>
          <ul>
            {p.keyFacts.map((k) => (
              <li key={k} className="border-t border-sand py-2.5 text-[15px]">
                {k}
              </li>
            ))}
          </ul>
        </div>
        <div id="location" className="zoom relative min-h-[220px] min-w-0 flex-[1_1_300px] bg-seaglass">
          <CldImg photo={place} sizes="(max-width: 900px) 100vw, 30vw" />
          <Link href={`/islands/${p.island}`} className="btn btn-paper absolute bottom-3 right-3 !min-h-[44px] !px-5">
            {p.islandName} guide →
          </Link>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="pb-[clamp(56px,8vw,112px)]">
        <Gallery photos={p.photos} />
      </section>

      {/* Ownership estimator */}
      <section id="ownership" className="bg-sand">
        <div className="wrap section">
          <div className="eyebrow">Tools of Trade™ · Monthly ownership estimator</div>
          <div className="rule" />
          <h2 className="display mb-8">
            What it may cost <em>to own.</em>
          </h2>
          <Estimator defaultPrice={p.price} />
        </div>
      </section>

      {/* Island Value Report */}
      <section id="value" className="wrap section flex flex-wrap items-center gap-[clamp(32px,6vw,88px)]">
        <div className="min-w-0 flex-[1_1_420px]">
          <div className="eyebrow">Island Value Report™</div>
          <div className="rule" />
          <h2 className="display mb-4">
            What was this home worth then, <em>and what could it be worth today?</em>
          </h2>
          <p className="max-w-[520px]">
            Name a date and James will prepare a private report: comparable sales, market trends, the available property record and his own
            reading. Reports are prepared and reviewed by hand, never generated automatically.
          </p>
        </div>
        <div className="min-w-0 flex-[1_1_300px] border-t border-ocean pt-6">
          <a href={mail(`Island Value Report request: ${p.address}`)} className="btn btn-ocean w-full">
            Request my private report
          </a>
          <p className="mt-3 text-[13px]">Opens an email to James. Include the valuation date you have in mind.</p>
        </div>
      </section>

      {/* Similar island properties */}
      <section aria-label="Similar island properties" className="bg-sand">
        <div className="wrap section">
          <div className="eyebrow">Similar Island Properties</div>
          <div className="rule" />
          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ReservedCard tone="seaglass">A curated home on Sugarloaf Key</ReservedCard>
            <div className="bg-paper"><ReservedCard>A curated home with dockage in the Lower Keys</ReservedCard></div>
            <ReservedCard tone="seaglass">A curated open-water home</ReservedCard>
          </div>
        </div>
      </section>

      {/* Inquiry */}
      <section id="inquire" className="wrap section flex flex-wrap items-end justify-between gap-8">
        <div>
          <div className="eyebrow">Inquire about this home</div>
          <div className="rule" />
          <h2 className="display mb-4">
            See it <em>from the water.</em>
          </h2>
          <p>
            {SITE.advisor} · {SITE.brokerage}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={mail(`Inquiry: ${p.address}`)} className="btn btn-ocean">
            Email James
          </a>
          <a href={SITE.phoneHref} className="btn btn-line">
            Call {SITE.phoneDisplay}
          </a>
        </div>
      </section>

      {/* Brand band */}
      <section className="relative flex min-h-[220px] items-center bg-ocean">
        <CldImg photo={band} alt="" />
        <div aria-hidden className="absolute inset-0 bg-[rgba(20,56,66,0.62)]" />
        <div className="wrap relative flex w-full flex-wrap items-center justify-between gap-6 py-12">
          <p className="font-serif text-[clamp(30px,4vw,52px)] leading-tight text-paper">Island Living, Intelligent Decisions.</p>
          <Link href="/properties" className="btn btn-paper">
            Explore more Keys properties →
          </Link>
        </div>
      </section>

      {p.listingAttribution && <p className="wrap py-6 text-[13px]">{p.listingAttribution}</p>}
    </main>
  );
}
