import Link from "next/link";
import { PageContextScript } from "@/components/PageContextScript";
import { Estimator } from "@/components/site/Estimator";

export const metadata = {
  title: "Tools of Trade™: Monthly Ownership Estimator",
  description: "Estimate principal and interest, real estate taxes and insurance for an island home in the Florida Keys.",
  alternates: { canonical: "/tools" },
};

const RESOURCES = ["Compare Properties", "Real Estate Tax Estimator", "Homeowners, Windstorm and Flood Insurance", "Buyer and Seller Resources"];

export default function Page() {
  return (
    <main>
      <PageContextScript page_type="other" journey="buyer" />
      <section className="bg-sand">
        <div className="wrap py-[clamp(56px,8vw,112px)]">
          <div className="eyebrow">Tools of Trade™</div>
          <div className="rule" />
          <h1 className="display !text-[clamp(42px,6.4vw,84px)]">Plan. Evaluate. Move Forward.</h1>
          <p className="mt-5 max-w-[620px] text-[17px]">Tools for smarter island decisions, starting with what a home may cost to own each month.</p>
        </div>
      </section>
      <section id="estimator" className="bg-sand pb-[clamp(64px,9vw,120px)]">
        <div className="wrap">
          <Estimator />
        </div>
      </section>
      <section id="resources" className="wrap section">
        <div className="eyebrow">In preparation</div>
        <div className="rule" />
        <ul className="mb-10 grid gap-x-10 sm:grid-cols-2">
          {RESOURCES.map((r) => (
            <li key={r} className="border-t border-ocean/30 py-5 font-serif text-[26px] leading-tight text-ocean">
              {r}
            </li>
          ))}
        </ul>
        <Link href="/inquire" className="btn btn-ocean">
          Speak with James
        </Link>
      </section>
    </main>
  );
}
