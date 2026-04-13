from __future__ import annotations

import logging
from datetime import datetime, timedelta, timezone

from sqlalchemy import select
from sqlalchemy.orm import Session

from news_portal.models import Article, JobRun, Service, Source, Tag
from news_portal.seed import sync_seed_data
from news_portal.services.gemini import enrich_with_gemini
from news_portal.services.http import get_http_client
from news_portal.services.parser import (
    RawArticle,
    extract_candidate_links,
    parse_dated_sections,
    parse_generic_article,
)
from news_portal.source_catalog import SOURCE_CATALOG, SourceDefinition

logger = logging.getLogger(__name__)


def record_job_start(session: Session, job_name: str) -> JobRun:
    run = JobRun(job_name=job_name, status="running")
    session.add(run)
    session.flush()
    return run


def record_job_end(session: Session, run: JobRun, status: str, detail: str = "", meta_json: dict | None = None) -> None:
    run.status = status
    run.ended_at = datetime.now(timezone.utc)
    run.detail = detail
    run.meta_json = meta_json or {}


def _fetch_listing_articles(source_def: SourceDefinition, limit: int) -> list[RawArticle]:
    with get_http_client() as client:
        response = client.get(source_def.list_url)
        response.raise_for_status()
        listing_html = response.text
        links = extract_candidate_links(listing_html, source_def)[:limit]
        items: list[RawArticle] = []
        for link in links:
            try:
                article_response = client.get(link)
                article_response.raise_for_status()
            except Exception as exc:
                logger.warning("Failed to fetch article %s: %s", link, exc)
                continue
            raw = parse_generic_article(link, article_response.text, source_def.language)
            if not raw:
                continue
            raw.source_slug = source_def.slug
            items.append(raw)
        return items


def fetch_source_items(source_def: SourceDefinition, limit: int) -> list[RawArticle]:
    if source_def.adapter == "dated_sections":
        with get_http_client() as client:
            response = client.get(source_def.list_url)
            response.raise_for_status()
            return parse_dated_sections(source_def.list_url, response.text, source_def)[:limit]
    return _fetch_listing_articles(source_def, limit)


def get_or_create_tag(session: Session, name: str) -> Tag:
    tag = session.scalar(select(Tag).where(Tag.name == name))
    if tag:
        return tag
    tag = Tag(name=name)
    session.add(tag)
    session.flush()
    return tag


def get_services_by_slug(session: Session) -> dict[str, Service]:
    return {service.slug.value: service for service in session.scalars(select(Service)).all()}


def article_exists(session: Session, raw: RawArticle) -> bool:
    stmt = select(Article.id).where(
        (Article.canonical_url == raw.canonical_url) | (Article.content_hash == raw.content_hash)
    )
    return session.scalar(stmt) is not None


def save_article(session: Session, source: Source, raw: RawArticle) -> Article | None:
    if article_exists(session, raw):
        return None

    enrichment = enrich_with_gemini(raw, source.service_hint)
    services_by_slug = get_services_by_slug(session)
    article = Article(
        source_id=source.id,
        title_original=raw.title_original,
        title_ko=raw.title_original if raw.language.startswith("ko") else None,
        summary_ko=enrichment.summary_ko,
        body_text=raw.body_text[:20000],
        url=raw.url,
        canonical_url=raw.canonical_url,
        image_url=raw.image_url,
        author=raw.author,
        language=raw.language[:10],
        category=enrichment.category,
        is_service_update=enrichment.is_service_update,
        importance_score=enrichment.importance_score,
        company_hint=source.service_hint.value if source.service_hint else None,
        published_at=raw.published_at,
        content_hash=raw.content_hash,
        raw_json={**(raw.raw_json or {}), "enrichment": enrichment.raw_model_json},
    )
    session.add(article)
    session.flush()

    for tag_name in enrichment.tags:
        if not tag_name:
            continue
        article.tags.append(get_or_create_tag(session, tag_name[:80]))

    for service_slug in enrichment.services:
        service = services_by_slug.get(service_slug.value)
        if service and service not in article.services:
            article.services.append(service)

    return article


def run_ingest(session: Session, limit_per_source: int) -> dict:
    sync_seed_data(session)
    sources = session.scalars(
        select(Source).where(Source.is_active.is_(True)).order_by(Source.source_kind, Source.display_name)
    ).all()
    source_def_by_slug = {row.slug: row for row in SOURCE_CATALOG}

    created = 0
    per_source: dict[str, int] = {}

    for source in sources:
        source_def = source_def_by_slug.get(source.slug)
        if not source_def:
            continue
        try:
            raw_items = fetch_source_items(source_def, limit_per_source)
        except Exception as exc:
            logger.exception("Failed source %s", source.slug)
            per_source[source.slug] = -1
            continue

        inserted_for_source = 0
        for raw in raw_items:
            if raw.published_at and raw.published_at < datetime.now(timezone.utc) - timedelta(days=45):
                continue
            article = save_article(session, source, raw)
            if article:
                inserted_for_source += 1
                created += 1
        per_source[source.slug] = inserted_for_source
        session.commit()
    return {"created": created, "per_source": per_source}
