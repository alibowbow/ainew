import { NewsCard } from "@/components/news-card";
import { SectionTitle } from "@/components/section-title";
import { fetchNews } from "@/lib/api";

export const revalidate = 60;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const payload = q
    ? await fetchNews({ q, limit: 30 })
    : { items: [], total: 0, limit: 0, offset: 0 };

  return (
    <div className="space-y-6">
      <SectionTitle title="검색" description="기사 제목, 요약, 서비스 키워드 기준으로 검색합니다." />
      <form className="rounded-2xl border border-border bg-white p-4 shadow-card">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="예: OpenAI API, Claude, Gemini 3"
          className="w-full rounded-xl border border-border px-4 py-3 outline-none ring-0"
        />
      </form>

      {q ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {payload.items.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-sm text-muted">검색어를 입력하면 결과가 표시됩니다.</div>
      )}
    </div>
  );
}
