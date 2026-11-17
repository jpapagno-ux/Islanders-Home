import Link from "next/link";
import { PageContextScript } from "@/components/PageContextScript";
import { InquiryForm } from "@/components/site/InquiryForm";
import { BrokerageLine } from "@/components/site/BrokerageLine";
import { SITE } from "@/lib/content/sample";

export const metadata = {
  title: "Sell Your Island Home",
  description: "Sell a Florida Keys island or waterfront home with James Papagno of Brown Harris Stevens: pricing strategy, presentation and a private Island Value Report™.",
  alternates: { canonical: "/sell" },
};

const STEPS = [
  { title: "A private conversation", text: "Your goals, your timeline and the property — nothing is listed or shared until you decide." },
  { title: "Island Value Report™", text: "Comparable sales, market trends and the available property record, prepared and reviewed by hand." },
  { title: "Presentation and reach", text: "Photography, copy and placement designed for buyers who are searching for island living specifically." },
  { title: "Negotiation to closing", text: "Thirty-six years representing sellers, buyers and investors, including complex and waterfront transactions." },
];

export default function Page() {
  return (
    <main>
      <PageContextScript page_type="sell" journey="seller" />
      <section className="bg-sand">
        <div className="wrap py-[clamp(56px,8vw,112px)]">
          <div className="eyebrow">For Sellers</div>
          <div className="rule" />
          <h1 className="display !text-[clamp(42px,6.4vw,84px)]">
            Sell with someone
            <br />
            who knows <em>the water.</em>
          </h1>
          <p className="mt-5 max-w-[620px] text-[17px]">
            Island and waterfront homes are bought for reasons a spreadsheet misses. James prices, presents and negotiates them accordingly.
          </p>
        </div>
      </section>

      <section className="wrap section">
        <div className="eyebrow">How it works</div>
        <div className="rule" />
        <ol className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="border-t border-ocean/30 py-6">
              <div className="text-[12px] font-semibold tracking-[0.16em]">0{i + 1}</div>
              <div className="my-2 font-serif text-[28px] leading-tight text-ocean">{s.title}</div>
              <p className="text-[15px]">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="seller-inquiry" className="bg-sand">
        <div className="wrap section flex flex-wrap gap-[clamp(32px,6vw,88px)]">
          <div className="min-w-0 flex-[1_1_360px]">
            <div className="eyebrow">Start here</div>
            <div className="rule" />
            <h2 className="display mb-4">
              Thinking of selling? <em>Tell James about the home.</em>
            </h2>
            <p className="max-w-[520px] text-[15px]">
              Choose a private Island Value Report™ if you want a number first, or a conversation if you want to talk through timing and
              options. Either way, nothing is public until you say so.
            </p>
            <p className="mt-6 text-[14px]">
              Prefer to talk?{" "}
              <a href={SITE.phoneHref} className="underline underline-offset-4">
                Call {SITE.phoneDisplay}
              </a>
            </p>
            <div className="mt-8">
              <BrokerageLine compact />
            </div>
          </div>
          <div className="min-w-0 flex-[1_1_440px]">
            <InquiryForm
              types={["seller_inquiry", "request_value_report"]}
              askAddress
              messageLabel="About the property, your timing and what matters most to you"
            />
          </div>
        </div>
      </section>

      <section className="wrap section">
        <p className="text-[15px]">
          Already working with James?{" "}
          <Link href="/work-with-james" className="underline underline-offset-4">
            Your seller desk
          </Link>{" "}
          holds your documents, timeline and reports.
        </p>
      </section>
    </main>
  );
}
