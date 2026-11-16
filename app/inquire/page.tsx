import { PageContextScript } from "@/components/PageContextScript";
import { SITE } from "@/lib/content/sample";

export const metadata = {
  title: "Inquire",
  description: "Contact James Papagno of Brown Harris Stevens about island and waterfront homes in the Florida Keys.",
  alternates: { canonical: "/inquire" },
};

const REQUESTS = ["Request a Property Tour", "Request a Property Review", "Schedule a Consultation", "General Inquiry"];

export default function Page() {
  return (
    <main>
      <PageContextScript page_type="contact" journey="brand" />
      <section className="bg-sand">
        <div className="wrap py-[clamp(56px,8vw,112px)]">
          <div className="eyebrow">Inquire</div>
          <div className="rule" />
          <h1 className="display !text-[clamp(42px,6.4vw,84px)]">
            Let’s Start
            <br />a Conversation.
          </h1>
          <p className="mt-5 max-w-[620px] text-[17px]">Whether you are buying, selling or simply exploring, James will reply personally.</p>
        </div>
      </section>
      <section className="wrap section flex flex-wrap gap-[clamp(32px,6vw,88px)]">
        <div className="min-w-0 flex-[1_1_380px]">
          {REQUESTS.map((r) => (
            <a
              key={r}
              href={`mailto:${SITE.email}?subject=${encodeURIComponent(r)}`}
              className="flex items-baseline justify-between gap-4 border-t border-ocean/30 py-5 no-underline"
            >
              <span className="font-serif text-[clamp(26px,2.8vw,34px)] leading-tight text-ocean">{r}</span>
              <span aria-hidden className="text-ocean">
                →
              </span>
            </a>
          ))}
          <p className="mt-4 text-[13px]">Each option opens an email to James. An on-site inquiry form follows in the next build stage.</p>
        </div>
        <div className="min-w-0 flex-[1_1_300px] bg-ocean p-[clamp(24px,3vw,40px)] text-paper">
          <div className="label">Prefer to talk?</div>
          <div className="rule" />
          <p className="font-serif text-[30px] leading-tight">{SITE.advisor}</p>
          <p className="mb-6">{SITE.brokerage}</p>
          <a href={SITE.phoneHref} className="btn btn-paper mb-3 w-full">
            Call {SITE.phoneDisplay}
          </a>
          <a href={`mailto:${SITE.email}`} className="btn btn-line-light w-full !tracking-[0.08em] !normal-case">
            {SITE.email}
          </a>
        </div>
      </section>
    </main>
  );
}
