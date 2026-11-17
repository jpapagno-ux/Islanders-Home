import { Placeholder } from "@/components/Placeholder";
import { SITE } from "@/lib/content/sample";
import { InquiryForm } from "@/components/site/InquiryForm";

export const metadata = {
  title: "Island Intelligence: Florida Keys Market Insight",
  alternates: { canonical: "/island-intelligence" },
};

export default function Page() {
  return (
    <Placeholder
      title="Data. Perspective. Advantage."
      eyebrow="Island Intelligence"
      lede="Market reports, comparable sales and waterfront insight for the Florida Keys. Figures will appear here only once they are sourced and dated."
      points={["Market Overview", "Market Reports", "Comparable Sales", "Waterfront Property Insights", "The Island Edit", "From James’s Dock™"]}
      context={{ page_type: "journal_index", journey: "brand" }}
    >
      <div id="value-report" className="mb-12 bg-sand p-[clamp(24px,4vw,48px)]">
        <div className="eyebrow">Island Value Report™</div>
        <div className="rule" />
        <h2 className="display mb-4">
          What was this home worth then, <em>and what could it be worth today?</em>
        </h2>
        <p className="mb-6 max-w-[560px]">
          Send the property address and the valuation date you have in mind. James prepares and reviews each report by hand.
        </p>
        <InquiryForm
          types={["request_value_report"]}
          askAddress
          askTimeline={false}
          messageLabel="Valuation date you have in mind, and anything else James should know"
          submitLabel="Request a private report"
        />
      </div>
      <div id="dock" />
    </Placeholder>
  );
}
