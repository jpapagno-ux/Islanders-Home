import Link from "next/link";
import { InquiryForm } from "@/components/site/InquiryForm";
import { PageContextScript } from "@/components/PageContextScript";
import { CldImg } from "@/components/site/CldImg";
import { SITE, SITE_PHOTOS } from "@/lib/content/sample";

export const metadata = {
  title: "Build Your Island Dream Home in the Florida Keys",
  description:
    "From finding the lot to moving in: James Papagno guides buyers through land acquisition and the building process in the Florida Keys.",
  alternates: { canonical: "/build" },
};

const STEPS = [
  { title: "Find the land", text: "Waterfront and island lots, weighed for access, depth, elevation and what can be built." },
  { title: "Understand the site", text: "Flood zone, setbacks, permits and utilities, checked before you commit." },
  { title: "Plan the acquisition", text: "Offer strategy, due diligence and closing on the lot." },
  { title: "Assemble the team", text: "Introductions to architects and builders who work on the islands." },
  { title: "Finance the build", text: "A conversation about how land and construction are typically financed." },
  { title: "Build and move in", text: "A guide at your side from groundbreaking to the first night at home." },
];

export default function Page() {
  return (
    <main>
      <PageContextScript page_type="build" journey="build" />
      <section className="relative flex min-h-[clamp(420px,60vh,640px)] items-end bg-ocean">
        <CldImg photo={SITE_PHOTOS.band} priority />
        <div aria-hidden className="absolute inset-0 bg-[rgba(20,56,66,0.6)]" />
        <div className="wrap relative w-full pb-12 text-paper">
          <div className="label mb-3 tracking-[0.26em]">Lots · New construction · New developments</div>
          <h1 className="font-serif text-[clamp(44px,7vw,92px)] leading-none">
            Build Your Island
            <br />
            Dream Home.
          </h1>
          <p className="mb-7 mt-5 max-w-[560px] text-[17px]">
            Call us first. We guide you through finding the land, acquiring it and building on it, step by step.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={SITE.phoneHref} className="btn btn-paper">
              Call James · {SITE.phoneDisplay}
            </a>
            <Link href="/properties/lots-and-land" className="btn btn-line-light">
              View lots and land
            </Link>
          </div>
        </div>
      </section>
      <section className="wrap section">
        <div className="eyebrow">How we guide you</div>
        <div className="rule" />
        <ol className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="border-t border-ocean/30 py-6">
              <div className="text-[12px] font-semibold tracking-[0.16em]">0{i + 1}</div>
              <div className="my-2 font-serif text-[30px] leading-tight text-ocean">{s.title}</div>
              <p className="text-[15px]">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/properties/new-construction" className="btn btn-line">
            New construction
          </Link>
          <Link href="/properties/new-developments" className="btn btn-line">
            New developments
          </Link>
          <a href="#build-inquiry" className="btn btn-ocean">
            Start the conversation
          </a>
        </div>
      </section>
      <section id="build-inquiry" className="bg-sand">
        <div className="wrap section flex flex-wrap gap-[clamp(32px,6vw,88px)]">
          <div className="min-w-0 flex-[1_1_380px]">
            <div className="eyebrow">Build or renovate</div>
            <div className="rule" />
            <h2 className="display mb-4">
              Tell James about <em>the home you have in mind.</em>
            </h2>
            <p className="max-w-[520px] text-[15px]">
              Land you are considering, a lot you already own, or a renovation of an existing home — James will reply with a first read on
              feasibility, permitting and the right partners.
            </p>
          </div>
          <div className="min-w-0 flex-[1_1_420px]">
            <InquiryForm types={["build_interest"]} askAddress messageLabel="The lot, home or idea you have in mind" />
          </div>
        </div>
      </section>
    </main>
  );
}
