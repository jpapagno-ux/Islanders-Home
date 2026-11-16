import { Placeholder } from "@/components/Placeholder";

export const metadata = { title: "Work With James Papagno", alternates: { canonical: "/work-with-james" } };

export default function Page() {
  return (
    <Placeholder
      title="Work With James"
      eyebrow="James Papagno · Brown Harris Stevens"
      lede="Personal representation for buyers and sellers of island and waterfront homes. James’s approach, in his own words, is being prepared."
      points={["For Buyers", "For Sellers", "Why Work With James", "My Approach", "Private Consultation"]}
      context={{ page_type: "about", journey: "brand" }}
    />
  );
}
