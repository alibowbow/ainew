import { notFound } from "next/navigation";

import { NewsCard } from "@/components/news-card";
import { SectionTitle } from "@/components/section-title";
import { CATEGORY_LABELS } from "@/lib/constants";
import { fetchNews } from "@/lib/api";
import { Category } from "@/lib/types";

export const revalidate = 300;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: Category }>;
}) {
  const { slug } = await params;
  if (!Object.prototype.hasOwnProperty.call(CATEGORY_LABELS, slug)) {
    notFound();
  }

  const payload = await fetchNews({ category: slug, limit: 30 });
  return (
    <div className="space-y-6">
      <SectionTitle title={CATEGORY_LABELS[slug]} description={`${CATEGORY_LABELS[slug]} 관련 뉴스 모음`} />
      <div className="grid gap-4 lg:grid-cols-2">
        {payload.items.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
