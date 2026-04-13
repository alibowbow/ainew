from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session, joinedload

from news_portal.api.deps import get_db
from news_portal.enums import Category, ServiceSlug
from news_portal.models import Article, Service, Source
from news_portal.schemas import ArticleDetailOut, NewsListOut

router = APIRouter(prefix="/api", tags=["news"])


@router.get("/news", response_model=NewsListOut)
def list_news(
    category: Category | None = None,
    service: ServiceSlug | None = None,
    q: str | None = Query(default=None, description="Search term"),
    limit: int = Query(default=20, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    updates_only: bool = False,
    db: Session = Depends(get_db),
) -> NewsListOut:
    stmt = (
        select(Article)
        .options(joinedload(Article.source), joinedload(Article.tags), joinedload(Article.services))
        .order_by(Article.published_at.desc().nullslast(), Article.importance_score.desc(), Article.id.desc())
    )

    count_stmt = select(func.count(Article.id))

    if category:
        stmt = stmt.where(Article.category == category)
        count_stmt = count_stmt.where(Article.category == category)

    if updates_only:
        stmt = stmt.where(Article.is_service_update.is_(True))
        count_stmt = count_stmt.where(Article.is_service_update.is_(True))

    if service:
        stmt = stmt.join(Article.services).where(Service.slug == service)
        count_stmt = count_stmt.join(Article.services).where(Service.slug == service)

    if q:
        pattern = f"%{q.strip()}%"
        stmt = stmt.where(
            or_(
                Article.title_original.ilike(pattern),
                Article.title_ko.ilike(pattern),
                Article.summary_ko.ilike(pattern),
            )
        )
        count_stmt = count_stmt.where(
            or_(
                Article.title_original.ilike(pattern),
                Article.title_ko.ilike(pattern),
                Article.summary_ko.ilike(pattern),
            )
        )

    total = db.scalar(count_stmt) or 0
    items = db.scalars(stmt.limit(limit).offset(offset)).unique().all()
    return NewsListOut(items=items, total=total, limit=limit, offset=offset)


@router.get("/news/{article_id}", response_model=ArticleDetailOut)
def get_article(article_id: int, db: Session = Depends(get_db)) -> ArticleDetailOut:
    stmt = (
        select(Article)
        .options(joinedload(Article.source), joinedload(Article.tags), joinedload(Article.services))
        .where(Article.id == article_id)
    )
    article = db.scalar(stmt)
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article
