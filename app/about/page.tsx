import { Placeholder } from "@/components/Placeholder";

export const metadata = { title: "About" };

export default function Page() {
  return <Placeholder title="About" context={{ page_type: "about", journey: "brand" }} />;
}
