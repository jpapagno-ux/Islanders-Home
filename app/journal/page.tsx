import { Placeholder } from "@/components/Placeholder";

export const metadata = { title: "Journal" };

export default function Page() {
  return <Placeholder title="Journal" context={{ page_type: "journal_index", journey: "brand" }} />;
}
