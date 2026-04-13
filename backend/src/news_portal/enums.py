from __future__ import annotations

from enum import Enum


class SourceKind(str, Enum):
    OFFICIAL = "official"
    MEDIA = "media"
    DOMESTIC = "domestic"


class Category(str, Enum):
    SERVICE_UPDATES = "service-updates"
    MODEL_TECH = "model-tech"
    DEV_INFRA = "dev-infra"
    BUSINESS = "business"
    POLICY_RISK = "policy-risk"


class ServiceSlug(str, Enum):
    OPENAI = "openai"
    CLAUDE = "claude"
    GEMINI = "gemini"


CATEGORY_LABELS: dict[Category, str] = {
    Category.SERVICE_UPDATES: "서비스 업데이트",
    Category.MODEL_TECH: "모델·기술",
    Category.DEV_INFRA: "개발·인프라",
    Category.BUSINESS: "비즈니스",
    Category.POLICY_RISK: "정책·리스크",
}
