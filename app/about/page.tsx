import { Placeholder } from "@/components/Placeholder";
import { BrokerageLine } from "@/components/site/BrokerageLine";

export const metadata = { title: "About James Papagno", alternates: { canonical: "/about" } };

export default function Page() {
  return (
    <Placeholder
      title="Meet James"
      eyebrow="About · Brown Harris Stevens"
      lede="James Papagno is a Real Estate Advisor with Brown Harris Stevens. His story, experience and approach to island living are being prepared for this page."
      points={["Meet James", "Experience", "Island Lifestyle", "Brown Harris Stevens"]}
      context={{ page_type: "about", journey: "brand" }}
    >
      <div className="mb-12">
        <BrokerageLine />
      </div>
    </Placeholder>
  );
}
