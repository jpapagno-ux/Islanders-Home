import { Placeholder } from "@/components/Placeholder";

export const metadata = { title: "Ask the Islander" };

export default function Page() {
  return <Placeholder title="Ask the Islander" context={{ page_type: "ask_islander", journey: "brand" }} />;
}
