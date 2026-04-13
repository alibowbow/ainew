from __future__ import annotations

import json
import re
from dataclasses import dataclass

from news_portal.enums import Category, ServiceSlug
from news_portal.services.parser import RawArticle


SERVICE_KEYWORDS: dict[ServiceSlug, tuple[str, ...]] = {
    ServiceSlug.OPENAI: ("openai", "chatgpt", "gpt-5", "gpt-4", "o3", "codex"),
    ServiceSlug.CLAUDE: ("anthropic", "claude", "claude code"),
    ServiceSlug.GEMINI: ("gemini", "google deepmind", "gemma", "ai studio"),
}

CATEGORY_RULES: dict[Category, tuple[str, ...]] = {
    Category.SERVICE_UPDATES: (
        "release notes",
        "launch",
        "rollout",
        "available now",
        "pricing",
        "subscription",
        "update",
        "changelog",
        "feature",
        "beta",
    ),
    Category.MODEL_TECH: (
        "model",
        "reasoning",
        "multimodal",
        "benchmark",
        "training",
        "research",
        "agent",
        "token",
        "inference",
    ),
    Category.DEV_INFRA: (
        "api",
        "sdk",
        "cloud",
        "gpu",
        "data center",
        "infra",
        "deployment",
        "developer",
    ),
    Category.BUSINESS: (
        "investment",
        "funding",
        "revenue",
        "partnership",
        "enterprise",
        "price",
        "market",
        "acquisition",
    ),
    Category.POLICY_RISK: (
        "policy",
        "regulation",
        "lawsuit",
        "copyright",
        "safety",
        "security",
        "breach",
        "risk",
        "outage",
    ),
}


@dataclass
class EnrichmentResult:
    summary_ko: str
    category: Category
    is_service_update: bool
    services: list[ServiceSlug]
    importance_score: float
    tags: list[str]
    raw_model_json: dict


def heuristic_enrich(article: RawArticle, service_hint: ServiceSlug | None = None) -> EnrichmentResult:
    text = f"{article.title_original}\n{article.body_text}".lower()
    services: list[ServiceSlug] = []
    if service_hint:
        services.append(service_hint)

    for slug, keywords in SERVICE_KEYWORDS.items():
        if any(keyword in text for keyword in keywords) and slug not in services:
            services.append(slug)

    scores: dict[Category, int] = {category: 0 for category in Category}
    for category, keywords in CATEGORY_RULES.items():
        for keyword in keywords:
            if keyword in text:
                scores[category] += 1

    category = max(scores, key=scores.get) if any(scores.values()) else Category.MODEL_TECH
    is_service_update = bool(services) and (
        category == Category.SERVICE_UPDATES
        or any(word in text for word in ("release notes", "rollout", "pricing", "launch", "beta", "update"))
    )

    score = 55.0
    if is_service_update:
        score += 20
    if service_hint:
        score += 10
    if article.title_original.isupper():
        score -= 5

    top_words = []
    for token in re.findall(r"[A-Za-z가-힣0-9\-]{3,}", article.title_original):
        token_l = token.lower()
        if token_l in {"the", "and", "with", "from", "that", "this"}:
            continue
        if token not in top_words:
            top_words.append(token)
    tags = top_words[:5]
    summary = article.body_text.split("\n")[0].strip()
    if len(summary) > 180:
        summary = summary[:177].rstrip() + "..."
    summary_ko = f"{article.title_original}\n{summary}\n핵심 변화와 맥락을 빠르게 확인하세요."
    return EnrichmentResult(
        summary_ko=summary_ko,
        category=category,
        is_service_update=is_service_update,
        services=services,
        importance_score=max(10.0, min(score, 95.0)),
        tags=tags,
        raw_model_json={"mode": "heuristic"},
    )


def parse_json_response(text: str) -> dict:
    candidate = text.strip()
    if candidate.startswith("```"):
        candidate = re.sub(r"^```(?:json)?", "", candidate).strip()
        candidate = re.sub(r"```$", "", candidate).strip()
    return json.loads(candidate)
