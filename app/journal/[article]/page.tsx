import { Placeholder } from "@/components/Placeholder";

export const metadata = { title: "Article" };

export default async function Page({ params }: { params: Promise<{ article: string }> }) {
  const { article } = await params;
  return (
    <Placeholder
      title={`Article: ${article}`}
      context={{ page_type: "article", journey: "brand", article_id: article }}
    />
  );
}
