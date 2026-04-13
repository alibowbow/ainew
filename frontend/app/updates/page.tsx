import { NewsCard } from "@/components/news-card";
import { SectionTitle } from "@/components/section-title";
import { fetchNews } from "@/lib/api";

export const revalidate = 300;

export default async function UpdatesPage() {
  const updates = await fetchNews({ updates_only: true, limit: 30 });

  return (
    <div className="space-y-6">
      <SectionTitle
        title="서비스 업데이트"
        description="OpenAI · Claude · Gemini 공식 업데이트를 모아봅니다."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {updates.items.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
