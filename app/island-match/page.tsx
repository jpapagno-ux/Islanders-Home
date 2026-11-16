import { Placeholder } from "@/components/Placeholder";

export const metadata = { title: "The Island Match™", alternates: { canonical: "/island-match" } };

export default function Page() {
  return (
    <Placeholder
      title="Tell us how you want to live. We’ll help find where."
      eyebrow="The Island Match™"
      lede="Seven short questions lead to a shortlist from our curated homes, or to a personally reviewed search. The questionnaire opens in a later build stage; until then, James will take you through it personally."
      points={[
        "Islands and communities",
        "How you want to live",
        "Boating and dockage",
        "Budget",
        "The home itself",
        "Intended use",
        "Timing",
      ]}
      context={{ page_type: "island_match", journey: "buyer" }}
    />
  );
}
