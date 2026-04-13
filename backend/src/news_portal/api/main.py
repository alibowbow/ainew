from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from news_portal.api.routes import briefings, categories, news, services
from news_portal.config import get_settings
from news_portal.db import init_db, session_scope
from news_portal.seed import sync_seed_data

settings = get_settings()

app = FastAPI(title=settings.app_name, version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event() -> None:
    init_db()
    with session_scope() as session:
        sync_seed_data(session)


@app.get("/healthz")
def healthz() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(news.router)
app.include_router(categories.router)
app.include_router(services.router)
app.include_router(briefings.router)
