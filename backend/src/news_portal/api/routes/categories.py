from __future__ import annotations

from fastapi import APIRouter

from news_portal.enums import CATEGORY_LABELS
from news_portal.schemas import CategoryOut

router = APIRouter(prefix="/api", tags=["categories"])


@router.get("/categories", response_model=list[CategoryOut])
def list_categories() -> list[CategoryOut]:
    return [CategoryOut(slug=slug, label=label) for slug, label in CATEGORY_LABELS.items()]
