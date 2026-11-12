import { buildPageContext, PAGE_CONTEXT_ELEMENT_ID, type PageContext } from "@/lib/measurement/context";

/**
 * Renders the single page-context object the measurement layer reads.
 * Place once per page. Only allow-listed keys are serialized.
 */
export function PageContextScript(props: PageContext) {
  const ctx = buildPageContext(props);
  return (
    <script
      id={PAGE_CONTEXT_ELEMENT_ID}
      type="application/json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ctx) }}
    />
  );
}
