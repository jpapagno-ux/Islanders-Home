import { PageContextScript } from "@/components/PageContextScript";
import type { PageContext } from "@/lib/measurement/context";

/** Temporary page body until governing doc 03 defines the real templates. */
export function Placeholder({ title, context }: { title: string; context: PageContext }) {
  return (
    <main style={{ fontFamily: "system-ui, sans-serif", maxWidth: 720, margin: "4rem auto", padding: "0 1rem" }}>
      <PageContextScript {...context} />
      <p style={{ letterSpacing: "0.2em", textTransform: "uppercase", fontSize: 12, color: "#666" }}>Islanders Home</p>
      <h1 style={{ fontWeight: 500 }}>{title}</h1>
      <p style={{ color: "#666" }}>Portal build 2026 — page template pending.</p>
      <p style={{ fontSize: 12, color: "#999" }}>
        page_type: <code>{context.page_type}</code> · journey: <code>{context.journey}</code>
      </p>
    </main>
  );
}
