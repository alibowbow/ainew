from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session

from news_portal.models import Service, Source
from news_portal.source_catalog import SERVICE_SEED, SOURCE_CATALOG


def sync_seed_data(session: Session) -> None:
    existing_sources = {row.slug: row for row in session.scalars(select(Source)).all()}
    for source_def in SOURCE_CATALOG:
        if source_def.slug in existing_sources:
            source = existing_sources[source_def.slug]
            source.display_name = source_def.display_name
            source.list_url = source_def.list_url
            source.source_kind = source_def.source_kind
            source.language = source_def.language
            source.country = source_def.country
            source.crawl_interval_minutes = source_def.crawl_interval_minutes
            source.service_hint = source_def.service_hint
            source.meta_json = {
                "adapter": source_def.adapter,
                "allow_domains": list(source_def.allow_domains),
                "article_url_patterns": list(source_def.article_url_patterns),
                "exclude_url_patterns": list(source_def.exclude_url_patterns),
                **(source_def.meta or {}),
            }
            continue
        session.add(
            Source(
                slug=source_def.slug,
                display_name=source_def.display_name,
                list_url=source_def.list_url,
                source_kind=source_def.source_kind,
                language=source_def.language,
                country=source_def.country,
                crawl_interval_minutes=source_def.crawl_interval_minutes,
                service_hint=source_def.service_hint,
                meta_json={
                    "adapter": source_def.adapter,
                    "allow_domains": list(source_def.allow_domains),
                    "article_url_patterns": list(source_def.article_url_patterns),
                    "exclude_url_patterns": list(source_def.exclude_url_patterns),
                    **(source_def.meta or {}),
                },
            )
        )

    existing_services = {row.slug: row for row in session.scalars(select(Service)).all()}
    for row in SERVICE_SEED:
        if row["slug"] in existing_services:
            service = existing_services[row["slug"]]
            service.display_name = row["display_name"]
            service.company_name = row["company_name"]
            service.official_url = row["official_url"]
            service.description = row["description"]
            continue
        session.add(Service(**row))

    session.flush()
