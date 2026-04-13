from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict

from news_portal.enums import Category, ServiceSlug, SourceKind


class TagOut(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(from_attributes=True)


class ServiceOut(BaseModel):
    id: int
    slug: ServiceSlug
    display_name: str
    company_name: str
    official_url: str
    description: str

    model_config = ConfigDict(from_attributes=True)


class SourceOut(BaseModel):
    id: int
    slug: str
    display_name: str
    list_url: str
    source_kind: SourceKind
    language: str
    country: str | None = None

    model_config = ConfigDict(from_attributes=True)


class ArticleCardOut(BaseModel):
    id: int
    title_original: str
    title_ko: str | None = None
    summary_ko: str | None = None
    url: str
    canonical_url: str
    image_url: str | None = None
    language: str
    category: Category
    is_service_update: bool
    importance_score: float
    published_at: datetime | None = None
    fetched_at: datetime
    source: SourceOut
    services: list[ServiceOut] = []
    tags: list[TagOut] = []

    model_config = ConfigDict(from_attributes=True)


class ArticleDetailOut(ArticleCardOut):
    body_text: str | None = None
    author: str | None = None
    raw_json: dict | None = None


class BriefingOut(BaseModel):
    id: int
    briefing_date: datetime
    title: str
    content_md: str

    model_config = ConfigDict(from_attributes=True)


class CategoryOut(BaseModel):
    slug: Category
    label: str


class NewsListOut(BaseModel):
    items: list[ArticleCardOut]
    total: int
    limit: int
    offset: int


class ServicesListOut(BaseModel):
    items: list[ServiceOut]


class SourceSeedIn(BaseModel):
    slug: str
    display_name: str
    list_url: str
    source_kind: SourceKind
    language: str = "en"
    country: str | None = None
    crawl_interval_minutes: int = 30
    service_hint: ServiceSlug | None = None
    meta_json: dict | None = None
