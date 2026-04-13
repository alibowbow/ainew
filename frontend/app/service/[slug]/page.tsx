import Link from "next/link";

import { NewsCard } from "@/components/news-card";
import { SectionTitle } from "@/components/section-title";
import { fetchService, fetchServiceNews } from "@/lib/api";

export const revalidate = 300;

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, payload] = await Promise.all([fetchService(slug), fetchServiceNews(slug, 25)]);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-border bg-white p-6 shadow-card">
        <div className="text-sm font-medium text-indigo-700">{service.company_name}</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">{service.display_name}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">{service.description}</p>
        <div className="mt-4">
          <Link
            href={service.official_url}
            target="_blank"
            className="rounded-full border border-border px-4 py-2 text-sm text-ink transition hover:bg-surface"
          >
            공식 페이지 열기
          </Link>
        </div>
      </section>

      <SectionTitle
        title="업데이트 타임라인"
        description={`${service.display_name} 관련 최신 기사와 공식 변경사항`}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {payload.items.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
