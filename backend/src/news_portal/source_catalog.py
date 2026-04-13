from __future__ import annotations

from dataclasses import dataclass, field
from typing import Pattern

from news_portal.enums import ServiceSlug, SourceKind


@dataclass(frozen=True)
class SourceDefinition:
    slug: str
    display_name: str
    list_url: str
    source_kind: SourceKind
    adapter: str
    language: str = "en"
    country: str | None = None
    crawl_interval_minutes: int = 30
    service_hint: ServiceSlug | None = None
    allow_domains: tuple[str, ...] = ()
    article_url_patterns: tuple[str, ...] = ()
    exclude_url_patterns: tuple[str, ...] = ()
    meta: dict = field(default_factory=dict)


SOURCE_CATALOG: tuple[SourceDefinition, ...] = (
    SourceDefinition(
        slug="openai-product-releases",
        display_name="OpenAI Product Releases",
        list_url="https://openai.com/news/product-releases/",
        source_kind=SourceKind.OFFICIAL,
        adapter="generic_listing",
        language="en",
        service_hint=ServiceSlug.OPENAI,
        allow_domains=("openai.com",),
        article_url_patterns=(r"openai\.com/news/",),
        exclude_url_patterns=(r"/news/$", r"/news/product-releases/?$"),
        crawl_interval_minutes=10,
    ),
    SourceDefinition(
        slug="chatgpt-release-notes",
        display_name="ChatGPT Release Notes",
        list_url="https://help.openai.com/en/articles/6825453-chatgpt-release-notes",
        source_kind=SourceKind.OFFICIAL,
        adapter="dated_sections",
        language="en",
        service_hint=ServiceSlug.OPENAI,
        allow_domains=("help.openai.com",),
        crawl_interval_minutes=10,
    ),
    SourceDefinition(
        slug="openai-model-release-notes",
        display_name="OpenAI Model Release Notes",
        list_url="https://help.openai.com/en/articles/9624314-model-release-notes",
        source_kind=SourceKind.OFFICIAL,
        adapter="dated_sections",
        language="en",
        service_hint=ServiceSlug.OPENAI,
        allow_domains=("help.openai.com",),
        crawl_interval_minutes=20,
    ),
    SourceDefinition(
        slug="anthropic-newsroom",
        display_name="Anthropic Newsroom",
        list_url="https://www.anthropic.com/news",
        source_kind=SourceKind.OFFICIAL,
        adapter="generic_listing",
        language="en",
        service_hint=ServiceSlug.CLAUDE,
        allow_domains=("www.anthropic.com", "anthropic.com"),
        article_url_patterns=(r"anthropic\.com/news/",),
        exclude_url_patterns=(r"/news/?$",),
        crawl_interval_minutes=15,
    ),
    SourceDefinition(
        slug="claude-platform-release-notes",
        display_name="Claude Platform Release Notes",
        list_url="https://docs.anthropic.com/en/release-notes/api",
        source_kind=SourceKind.OFFICIAL,
        adapter="dated_sections",
        language="en",
        service_hint=ServiceSlug.CLAUDE,
        allow_domains=("docs.anthropic.com",),
        crawl_interval_minutes=10,
    ),
    SourceDefinition(
        slug="gemini-official-updates",
        display_name="Official Gemini News and Updates",
        list_url="https://blog.google/products-and-platforms/products/gemini/",
        source_kind=SourceKind.OFFICIAL,
        adapter="generic_listing",
        language="en",
        service_hint=ServiceSlug.GEMINI,
        allow_domains=("blog.google",),
        article_url_patterns=(r"blog\.google/products-and-platforms/products/gemini/",),
        exclude_url_patterns=(r"/products-and-platforms/products/gemini/?$",),
        crawl_interval_minutes=15,
    ),
    SourceDefinition(
        slug="gemini-api-release-notes",
        display_name="Gemini API Release Notes",
        list_url="https://ai.google.dev/gemini-api/docs/changelog",
        source_kind=SourceKind.OFFICIAL,
        adapter="dated_sections",
        language="en",
        service_hint=ServiceSlug.GEMINI,
        allow_domains=("ai.google.dev",),
        crawl_interval_minutes=10,
    ),
    SourceDefinition(
        slug="reuters-ai",
        display_name="Reuters AI",
        list_url="https://www.reuters.com/technology/artificial-intelligence/",
        source_kind=SourceKind.MEDIA,
        adapter="generic_listing",
        language="en",
        allow_domains=("www.reuters.com", "reuters.com"),
        article_url_patterns=(r"reuters\.com/.+?/\d{4}-\d{2}-\d{2}/?$",),
        exclude_url_patterns=(r"/technology/artificial-intelligence/?$",),
        crawl_interval_minutes=20,
    ),
    SourceDefinition(
        slug="techcrunch-ai",
        display_name="TechCrunch AI",
        list_url="https://techcrunch.com/category/artificial-intelligence/",
        source_kind=SourceKind.MEDIA,
        adapter="generic_listing",
        language="en",
        allow_domains=("techcrunch.com",),
        article_url_patterns=(r"techcrunch\.com/\d{4}/\d{2}/\d{2}/",),
        exclude_url_patterns=(r"/category/artificial-intelligence/",),
        crawl_interval_minutes=20,
    ),
    SourceDefinition(
        slug="the-verge-ai",
        display_name="The Verge AI",
        list_url="https://www.theverge.com/ai-artificial-intelligence",
        source_kind=SourceKind.MEDIA,
        adapter="generic_listing",
        language="en",
        allow_domains=("www.theverge.com", "theverge.com"),
        article_url_patterns=(r"theverge\.com/ai-artificial-intelligence/",),
        exclude_url_patterns=(r"/ai-artificial-intelligence/?$",),
        crawl_interval_minutes=20,
    ),
    SourceDefinition(
        slug="wired-ai",
        display_name="WIRED AI",
        list_url="https://www.wired.com/tag/artificial-intelligence/",
        source_kind=SourceKind.MEDIA,
        adapter="generic_listing",
        language="en",
        allow_domains=("www.wired.com", "wired.com"),
        article_url_patterns=(r"wired\.com/story/",),
        exclude_url_patterns=(r"/tag/artificial-intelligence/",),
        crawl_interval_minutes=30,
    ),
    SourceDefinition(
        slug="ars-ai",
        display_name="Ars Technica AI",
        list_url="https://arstechnica.com/ai/",
        source_kind=SourceKind.MEDIA,
        adapter="generic_listing",
        language="en",
        allow_domains=("arstechnica.com",),
        article_url_patterns=(r"arstechnica\.com/ai/\d{4}/\d{2}/",),
        exclude_url_patterns=(r"arstechnica\.com/ai/?$",),
        crawl_interval_minutes=30,
    ),
    SourceDefinition(
        slug="the-decoder-ai",
        display_name="The Decoder AI",
        list_url="https://the-decoder.com/artificial-intelligence-news/",
        source_kind=SourceKind.MEDIA,
        adapter="generic_listing",
        language="en",
        allow_domains=("the-decoder.com",),
        article_url_patterns=(r"the-decoder\.com/.+/",),
        exclude_url_patterns=(r"artificial-intelligence-news/?$",),
        crawl_interval_minutes=30,
    ),
    SourceDefinition(
        slug="axios-ai",
        display_name="Axios Automation & AI",
        list_url="https://www.axios.com/technology/automation-and-ai",
        source_kind=SourceKind.MEDIA,
        adapter="generic_listing",
        language="en",
        allow_domains=("www.axios.com", "axios.com"),
        article_url_patterns=(r"axios\.com/\d{4}/\d{2}/\d{2}/",),
        exclude_url_patterns=(r"/technology/automation-and-ai/?$",),
        crawl_interval_minutes=30,
    ),
    SourceDefinition(
        slug="mit-news-ai",
        display_name="MIT News AI",
        list_url="https://news.mit.edu/topic/artificial-intelligence2",
        source_kind=SourceKind.MEDIA,
        adapter="generic_listing",
        language="en",
        allow_domains=("news.mit.edu",),
        article_url_patterns=(r"news\.mit\.edu/\d{4}/",),
        exclude_url_patterns=(r"/topic/artificial-intelligence2",),
        crawl_interval_minutes=60,
    ),
    SourceDefinition(
        slug="ai-times",
        display_name="AI타임스",
        list_url="https://www.aitimes.com/news/articleList.html",
        source_kind=SourceKind.DOMESTIC,
        adapter="generic_listing",
        language="ko",
        country="KR",
        allow_domains=("www.aitimes.com", "aitimes.com"),
        article_url_patterns=(r"aitimes\.com/news/articleView\.html\?idxno=",),
        exclude_url_patterns=(r"articleList\.html",),
        crawl_interval_minutes=30,
    ),
)


SERVICE_SEED = (
    {
        "slug": ServiceSlug.OPENAI,
        "display_name": "OpenAI / ChatGPT",
        "company_name": "OpenAI",
        "official_url": "https://openai.com/",
        "description": "OpenAI와 ChatGPT 관련 공식 업데이트를 묶는 서비스 축입니다.",
    },
    {
        "slug": ServiceSlug.CLAUDE,
        "display_name": "Claude",
        "company_name": "Anthropic",
        "official_url": "https://www.anthropic.com/claude",
        "description": "Anthropic Claude 제품과 API 업데이트를 묶는 서비스 축입니다.",
    },
    {
        "slug": ServiceSlug.GEMINI,
        "display_name": "Gemini",
        "company_name": "Google",
        "official_url": "https://gemini.google.com/",
        "description": "Google Gemini 앱과 Gemini API 업데이트를 묶는 서비스 축입니다.",
    },
)
