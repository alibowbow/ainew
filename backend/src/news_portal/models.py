from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from sqlalchemy import (
    JSON,
    Boolean,
    Column,
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Integer,
    String,
    Table,
    Text,
    UniqueConstraint,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from news_portal.db import Base
from news_portal.enums import Category, ServiceSlug, SourceKind


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


article_tags = Table(
    "article_tags",
    Base.metadata,
    Column("article_id", ForeignKey("articles.id", ondelete="CASCADE"), primary_key=True),
    Column("tag_id", ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True),
)


article_services = Table(
    "article_services",
    Base.metadata,
    Column("article_id", ForeignKey("articles.id", ondelete="CASCADE"), primary_key=True),
    Column("service_id", ForeignKey("services.id", ondelete="CASCADE"), primary_key=True),
)


class Source(Base):
    __tablename__ = "sources"
    __table_args__ = (UniqueConstraint("slug"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    slug: Mapped[str] = mapped_column(String(120), nullable=False)
    display_name: Mapped[str] = mapped_column(String(255), nullable=False)
    list_url: Mapped[str] = mapped_column(String(1000), nullable=False)
    source_kind: Mapped[SourceKind] = mapped_column(Enum(SourceKind), nullable=False)
    language: Mapped[str] = mapped_column(String(10), default="en", nullable=False)
    country: Mapped[str | None] = mapped_column(String(50))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    crawl_interval_minutes: Mapped[int] = mapped_column(Integer, default=30, nullable=False)
    service_hint: Mapped[ServiceSlug | None] = mapped_column(Enum(ServiceSlug))
    meta_json: Mapped[dict[str, Any] | None] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=utcnow,
        onupdate=utcnow,
        nullable=False,
    )

    articles: Mapped[list["Article"]] = relationship(back_populates="source")


class Service(Base):
    __tablename__ = "services"
    __table_args__ = (UniqueConstraint("slug"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    slug: Mapped[ServiceSlug] = mapped_column(Enum(ServiceSlug), nullable=False)
    display_name: Mapped[str] = mapped_column(String(120), nullable=False)
    company_name: Mapped[str] = mapped_column(String(120), nullable=False)
    official_url: Mapped[str] = mapped_column(String(500), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)

    articles: Mapped[list["Article"]] = relationship(
        secondary=article_services,
        back_populates="services",
    )


class Tag(Base):
    __tablename__ = "tags"
    __table_args__ = (UniqueConstraint("name"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(80), nullable=False)

    articles: Mapped[list["Article"]] = relationship(
        secondary=article_tags,
        back_populates="tags",
    )


class Article(Base):
    __tablename__ = "articles"
    __table_args__ = (UniqueConstraint("content_hash"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    source_id: Mapped[int] = mapped_column(ForeignKey("sources.id"), nullable=False)
    title_original: Mapped[str] = mapped_column(Text, nullable=False)
    title_ko: Mapped[str | None] = mapped_column(Text)
    summary_ko: Mapped[str | None] = mapped_column(Text)
    body_text: Mapped[str | None] = mapped_column(Text)
    url: Mapped[str] = mapped_column(String(1500), nullable=False)
    canonical_url: Mapped[str] = mapped_column(String(1500), nullable=False)
    image_url: Mapped[str | None] = mapped_column(String(1500))
    author: Mapped[str | None] = mapped_column(String(255))
    language: Mapped[str] = mapped_column(String(10), default="en", nullable=False)
    category: Mapped[Category] = mapped_column(Enum(Category), nullable=False)
    is_service_update: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    importance_score: Mapped[float] = mapped_column(Float, default=50.0, nullable=False)
    company_hint: Mapped[str | None] = mapped_column(String(80))
    published_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    fetched_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)
    content_hash: Mapped[str] = mapped_column(String(64), nullable=False)
    raw_json: Mapped[dict[str, Any] | None] = mapped_column(JSON)

    source: Mapped[Source] = relationship(back_populates="articles")
    services: Mapped[list[Service]] = relationship(
        secondary=article_services,
        back_populates="articles",
    )
    tags: Mapped[list[Tag]] = relationship(
        secondary=article_tags,
        back_populates="articles",
    )


class DailyBriefing(Base):
    __tablename__ = "daily_briefings"
    __table_args__ = (UniqueConstraint("briefing_date"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    briefing_date: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    content_md: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)


class JobRun(Base):
    __tablename__ = "job_runs"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    job_name: Mapped[str] = mapped_column(String(120), nullable=False)
    status: Mapped[str] = mapped_column(String(40), nullable=False)
    started_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)
    ended_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    detail: Mapped[str | None] = mapped_column(Text)
    meta_json: Mapped[dict[str, Any] | None] = mapped_column(JSON)
