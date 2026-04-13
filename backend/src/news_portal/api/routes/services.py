from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, select
from sqlalchemy.orm import Session, joinedload

from news_portal.api.deps import get_db
from news_portal.enums import ServiceSlug
from news_portal.models import Article, Service
from news_portal.schemas import NewsListOut, ServiceOut, ServicesListOut

router = APIRouter(prefix="/api", tags=["services"])


@router.get("/services", response_model=ServicesListOut)
def list_services(db: Session = Depends(get_db)) -> ServicesListOut:
    items = db.scalars(select(Service).order_by(Service.display_name)).all()
    return ServicesListOut(items=items)


@router.get("/services/{slug}", response_model=ServiceOut)
def get_service(slug: ServiceSlug, db: Session = Depends(get_db)) -> ServiceOut:
    service = db.scalar(select(Service).where(Service.slug == slug))
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service


@router.get("/services/{slug}/news", response_model=NewsListOut)
def get_service_news(
    slug: ServiceSlug,
    limit: int = Query(default=20, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    db: Session = Depends(get_db),
) -> NewsListOut:
    count_stmt = select(func.count(Article.id)).join(Article.services).where(Service.slug == slug)
    stmt = (
        select(Article)
        .join(Article.services)
        .where(Service.slug == slug)
        .options(joinedload(Article.source), joinedload(Article.tags), joinedload(Article.services))
        .order_by(Article.published_at.desc().nullslast(), Article.importance_score.desc(), Article.id.desc())
        .limit(limit)
        .offset(offset)
    )
    total = db.scalar(count_stmt) or 0
    items = db.scalars(stmt).unique().all()
    return NewsListOut(items=items, total=total, limit=limit, offset=offset)
