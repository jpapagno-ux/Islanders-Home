import { Placeholder } from "@/components/Placeholder";

export const metadata = { title: "About James Papagno", alternates: { canonical: "/about" } };

export default function Page() {
  return (
    <Placeholder
      title="Meet James"
      eyebrow="About · Brown Harris Stevens"
      lede="James Papagno is a Real Estate Advisor with Brown Harris Stevens. His story, experience and approach to island living are being prepared for this page."
      points={["Meet James", "Experience", "Island Lifestyle", "Brown Harris Stevens"]}
      context={{ page_type: "about", journey: "brand" }}
    />
  );
}
