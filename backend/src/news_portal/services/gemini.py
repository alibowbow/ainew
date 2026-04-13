from __future__ import annotations

from textwrap import dedent

from tenacity import retry, stop_after_attempt, wait_exponential

from news_portal.config import get_settings
from news_portal.enums import Category, ServiceSlug
from news_portal.services.classifier import EnrichmentResult, heuristic_enrich, parse_json_response
from news_portal.services.parser import RawArticle

try:
    from google import genai
except Exception:  # pragma: no cover - optional import path during static checks
    genai = None


def _prompt(article: RawArticle, service_hint: ServiceSlug | None) -> str:
    service_hint_text = service_hint.value if service_hint else "none"
    return dedent(
        f"""
        당신은 AI 뉴스 편집기입니다.
        아래 기사/업데이트를 분석해서 JSON만 반환하세요.

        반환 스키마:
        {{
          "summary_ko": "한국어 3문장 요약",
          "category": "service-updates|model-tech|dev-infra|business|policy-risk",
          "is_service_update": true,
          "services": ["openai", "claude", "gemini"],
          "importance_score": 0~100 숫자,
          "tags": ["태그1", "태그2", "태그3"]
        }}

        규칙:
        - category는 위 5개 중 하나만
        - services는 openai/claude/gemini 중 관련된 것만
        - 공식 릴리즈노트, 가격변경, API 변경, 앱/모델 출시라면 is_service_update=true 쪽으로 판단
        - 한국어 요약은 기사형 문장 3문장, 과장 금지

        service_hint: {service_hint_text}

        제목:
        {article.title_original}

        본문:
        {article.body_text[:8000]}
        """
    ).strip()


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=1, max=8))
def _call_gemini(prompt: str) -> str:
    settings = get_settings()
    if not settings.gemini_api_key or not genai:
        raise RuntimeError("Gemini API is not configured")
    client = genai.Client(api_key=settings.gemini_api_key)
    response = client.models.generate_content(
        model=settings.gemini_model,
        contents=prompt,
    )
    text = getattr(response, "text", None)
    if not text:
        raise RuntimeError("Gemini returned an empty response")
    return text


def enrich_with_gemini(article: RawArticle, service_hint: ServiceSlug | None = None) -> EnrichmentResult:
    settings = get_settings()
    if not settings.gemini_api_key or not genai:
        return heuristic_enrich(article, service_hint)

    try:
        payload = parse_json_response(_call_gemini(_prompt(article, service_hint)))
        services = [ServiceSlug(item) for item in payload.get("services", []) if item in ServiceSlug._value2member_map_]
        category = Category(payload["category"])
        return EnrichmentResult(
            summary_ko=payload.get("summary_ko") or heuristic_enrich(article, service_hint).summary_ko,
            category=category,
            is_service_update=bool(payload.get("is_service_update")),
            services=services or ([service_hint] if service_hint else []),
            importance_score=float(payload.get("importance_score", 60)),
            tags=[str(item) for item in payload.get("tags", [])][:6],
            raw_model_json=payload,
        )
    except Exception as exc:
        fallback = heuristic_enrich(article, service_hint)
        fallback.raw_model_json = {"mode": "fallback", "error": str(exc)}
        return fallback
