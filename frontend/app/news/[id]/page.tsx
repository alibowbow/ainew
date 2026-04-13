import Link from "next/link";

import { Pill } from "@/components/pill";
import { formatPublishedAt } from "@/lib/format";
import { fetchArticle } from "@/lib/api";

export const revalidate = 300;

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await fetchArticle(id);
  const title = article.title_ko || article.title_original;

  return (
    <article className="rounded-3xl border border-border bg-white p-6 shadow-card">
      <div className="mb-4 flex flex-wrap gap-2">
        <Pill tone={article.is_service_update ? "accent" : "soft"}>
          {article.is_service_update ? "서비스 업데이트" : article.category}
        </Pill>
        <Pill>{article.source.display_name}</Pill>
        {article.services.map((service) => (
          <Pill key={service.slug} tone="soft">
            {service.display_name}
          </Pill>
        ))}
      </div>

      <h1 className="text-3xl font-semibold tracking-tight text-ink">{title}</h1>
      <p className="mt-3 text-sm text-muted">
        {formatPublishedAt(article.published_at)} · {article.author || "작성자 정보 없음"}
      </p>

      {article.summary_ko ? (
        <div className="mt-6 rounded-2xl bg-surface p-4 text-sm leading-7 text-ink">
          <div className="mb-2 text-xs font-medium uppercase tracking-widest text-indigo-600">요약</div>
          <p className="whitespace-pre-line">{article.summary_ko}</p>
        </div>
      ) : null}

      <div className="prose prose-slate mt-8 max-w-none whitespace-pre-line text-sm leading-7">
        {article.body_text || "본문이 아직 수집되지 않았습니다."}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <Pill key={tag.id}>#{tag.name}</Pill>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href={article.url}
          target="_blank"
          className="rounded-full border border-border px-4 py-2 text-sm text-ink transition hover:bg-surface"
        >
          원문 보기
        </Link>
      </div>
    </article>
  );
}
