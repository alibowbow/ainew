from __future__ import annotations

import httpx

from news_portal.config import get_settings


def get_http_client() -> httpx.Client:
    settings = get_settings()
    return httpx.Client(
        timeout=settings.http_timeout_seconds,
        follow_redirects=True,
        headers={
            "User-Agent": settings.user_agent,
            "Accept-Language": "en-US,en;q=0.9,ko;q=0.8",
        },
    )
