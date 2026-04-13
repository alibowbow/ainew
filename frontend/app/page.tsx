import Link from "next/link";

import { BriefingCard } from "@/components/briefing-card";
import { Hero } from "@/components/hero";
import { NewsCard } from "@/components/news-card";
import { SectionTitle } from "@/components/section-title";
import { ServiceLinks } from "@/components/service-links";
import { fetchBriefing, fetchNews, fetchServices } from "@/lib/api";

export const revalidate = 300;

export default async function HomePage() {
  const [topNews, serviceUpdates, services, briefing] = await Promise.all([
    fetchNews({ limit: 8 }),
    fetchNews({ updates_only: true, limit: 6 }),
    fetchServices(),
    fetchBriefing().catch(() => null),
  ]);

  return (
    <div className="space-y-8">
      <Hero />

      <section>
        <SectionTitle
          title="공식 서비스 업데이트"
          description="OpenAI · Claude · Gemini 공식 업데이트를 우선 노출합니다."
          action={
            <Link href="/updates" className="text-sm font-medium text-indigo-700">
              전체 보기 →
            </Link>
          }
        />
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {serviceUpdates.items.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle
          title="서비스별 타임라인"
          description="서비스 페이지에서는 해당 축의 업데이트만 따로 추적할 수 있습니다."
        />
        <ServiceLinks services={services} />
      </section>

      {briefing ? <BriefingCard briefing={briefing} /> : null}

      <section>
        <SectionTitle
          title="전체 AI 뉴스"
          description="해외 주요 기사와 국내 AI 뉴스를 함께 보여줍니다."
        />
        <div className="grid gap-4 lg:grid-cols-2">
          {topNews.items.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
