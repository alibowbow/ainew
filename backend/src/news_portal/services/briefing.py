from __future__ import annotations

from collections import defaultdict
from datetime import datetime, timedelta, timezone
from textwrap import dedent

from sqlalchemy import delete, select
from sqlalchemy.orm import Session, joinedload

from news_portal.config import get_settings
from news_portal.models import Article, DailyBriefing
from news_portal.services.http import get_http_client

try:
    from google import genai
except Exception:  # pragma: no cover
    genai = None


def _fallback_markdown(articles: list[Article]) -> str:
    grouped: dict[str, list[Article]] = defaultdict(list)
    for article in articles:
        grouped[article.category.value].append(article)

    lines = ["# 오늘의 AI 브리핑", ""]
    for category, rows in grouped.items():
        lines.append(f"## {category}")
        for article in rows[:5]:
            lines.append(f"- **{article.title_ko or article.title_original}**")
            if article.summary_ko:
                lines.append(f"  - {article.summary_ko.splitlines()[0]}")
            lines.append(f"  - 원문: {article.url}")
        lines.append("")
    return "\n".join(lines).strip()


def _briefing_prompt(articles: list[Article]) -> str:
    bullets = []
    for article in articles[:20]:
        bullets.append(
            dedent(
                f"""
                제목: {article.title_ko or article.title_original}
                카테고리: {article.category.value}
                서비스업데이트: {article.is_service_update}
                요약: {article.summary_ko or article.body_text[:200]}
                """
            ).strip()
        )
    joined = "\n\n".join(bullets)
    return dedent(
        f"""
        아래 기사들을 기반으로 한국어 데일리 브리핑을 Markdown으로 작성하세요.
        구조:
        # 오늘의 AI 브리핑
        ## 핵심 3가지
        ## 서비스 업데이트
        ## 생태계 동향
        ## 한줄 체크포인트

        과장 없이 사실 중심으로 짧고 읽기 쉽게 작성하세요.

        기사 목록:
        {joined}
        """
    ).strip()


def generate_daily_briefing(session: Session) -> DailyBriefing:
    now = datetime.now(timezone.utc)
    since = now - timedelta(hours=24)
    articles = session.scalars(
        select(Article)
        .options(joinedload(Article.source), joinedload(Article.services))
        .where(Article.published_at >= since)
        .order_by(Article.importance_score.desc(), Article.published_at.desc())
        .limit(20)
    ).unique().all()

    if not articles:
        content_md = "# 오늘의 AI 브리핑\n\n아직 수집된 기사가 없습니다."
    else:
        settings = get_settings()
        if settings.gemini_api_key and genai:
            try:
                client = genai.Client(api_key=settings.gemini_api_key)
                response = client.models.generate_content(
                    model=settings.gemini_model,
                    contents=_briefing_prompt(articles),
                )
                content_md = response.text or _fallback_markdown(articles)
            except Exception:
                content_md = _fallback_markdown(articles)
        else:
            content_md = _fallback_markdown(articles)

    title = f"AI 데일리 브리핑 - {now.astimezone().date().isoformat()}"
    briefing_day = datetime(now.year, now.month, now.day, tzinfo=timezone.utc)

    existing = session.scalar(select(DailyBriefing).where(DailyBriefing.briefing_date == briefing_day))
    if existing:
        existing.title = title
        existing.content_md = content_md
        session.flush()
        return existing

    briefing = DailyBriefing(briefing_date=briefing_day, title=title, content_md=content_md)
    session.add(briefing)
    session.flush()
    return briefing
