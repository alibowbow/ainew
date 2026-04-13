from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from news_portal.api.deps import get_db
from news_portal.models import DailyBriefing
from news_portal.schemas import BriefingOut

router = APIRouter(prefix="/api", tags=["briefings"])


@router.get("/briefings/latest", response_model=BriefingOut)
def latest_briefing(db: Session = Depends(get_db)) -> BriefingOut:
    briefing = db.scalar(select(DailyBriefing).order_by(DailyBriefing.briefing_date.desc()))
    if not briefing:
        raise HTTPException(status_code=404, detail="Briefing not found")
    return briefing
