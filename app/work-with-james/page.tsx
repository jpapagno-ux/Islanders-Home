import { Placeholder } from "@/components/Placeholder";
import { BrokerageLine } from "@/components/site/BrokerageLine";
import { signInUrl, signUpUrl } from "@/lib/desk";

export const metadata = { title: "Work With James Papagno", alternates: { canonical: "/work-with-james" } };

export default function Page() {
  return (
    <Placeholder
      title="Work With James"
      eyebrow="James Papagno · Brown Harris Stevens"
      lede="Personal representation for buyers and sellers of island and waterfront homes. James’s approach, in his own words, is being prepared."
      points={["For Buyers", "For Sellers", "Why Work With James", "My Approach", "Private Consultation"]}
      context={{ page_type: "about", journey: "brand" }}
    >
      <div className="mb-12 flex flex-wrap items-start justify-between gap-8">
        <BrokerageLine />
        <div className="flex flex-wrap gap-3">
          <a href={signUpUrl()} className="btn btn-ocean" rel="nofollow">Create your private desk</a>
          <a href={signInUrl()} className="btn btn-line" rel="nofollow">Sign in</a>
        </div>
      </div>
    </Placeholder>
  );
}
