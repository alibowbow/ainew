from __future__ import annotations

import hashlib
import json
import re
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Iterable
from urllib.parse import urljoin, urlparse

import feedparser
import trafilatura
from bs4 import BeautifulSoup
from dateutil import parser as dateparser
from slugify import slugify

from news_portal.source_catalog import SourceDefinition


DATE_PATTERNS = [
    re.compile(r"^[A-Z][a-z]+\s+\d{1,2},\s+\d{4}$"),
    re.compile(r"^[A-Z][a-z]+\s+\d{4}$"),
    re.compile(r"^\d{4}-\d{2}-\d{2}$"),
]


@dataclass
class RawArticle:
    source_slug: str
    url: str
    canonical_url: str
    title_original: str
    body_text: str
    published_at: datetime | None
    author: str | None = None
    image_url: str | None = None
    language: str = "en"
    raw_json: dict | None = None

    @property
    def content_hash(self) -> str:
        material = f"{self.title_original}\n{self.body_text[:5000]}".encode("utf-8", errors="ignore")
        return hashlib.sha256(material).hexdigest()


def normalize_url(base_url: str, href: str) -> str:
    joined = urljoin(base_url, href)
    parsed = urlparse(joined)
    clean = parsed._replace(fragment="").geturl()
    return clean.rstrip("/")


def extract_candidate_links(html: str, source_def: SourceDefinition) -> list[str]:
    soup = BeautifulSoup(html, "html.parser")
    seen: set[str] = set()
    results: list[str] = []
    domain_allow = set(source_def.allow_domains)
    allow_patterns = [re.compile(p) for p in source_def.article_url_patterns]
    exclude_patterns = [re.compile(p) for p in source_def.exclude_url_patterns]

    for anchor in soup.find_all("a", href=True):
        url = normalize_url(source_def.list_url, anchor["href"])
        parsed = urlparse(url)
        if domain_allow and parsed.netloc not in domain_allow:
            continue
        if any(pattern.search(url) for pattern in exclude_patterns):
            continue
        if allow_patterns and not any(pattern.search(url) for pattern in allow_patterns):
            continue
        if url in seen:
            continue
        seen.add(url)
        results.append(url)
    return results


def _extract_meta(soup: BeautifulSoup, *names: str) -> str | None:
    for name in names:
        tag = soup.find("meta", attrs={"property": name}) or soup.find("meta", attrs={"name": name})
        if tag and tag.get("content"):
            return str(tag["content"]).strip()
    return None


def extract_title(soup: BeautifulSoup) -> str:
    return (
        _extract_meta(soup, "og:title", "twitter:title")
        or (soup.find("h1").get_text(" ", strip=True) if soup.find("h1") else None)
        or (soup.title.get_text(" ", strip=True) if soup.title else "Untitled")
    )


def extract_published_at(soup: BeautifulSoup) -> datetime | None:
    candidates = [
        _extract_meta(
            soup,
            "article:published_time",
            "og:updated_time",
            "date",
            "publish-date",
            "parsely-pub-date",
        )
    ]
    time_tag = soup.find("time")
    if time_tag:
        candidates.append(time_tag.get("datetime") or time_tag.get_text(" ", strip=True))

    for script_tag in soup.find_all("script", attrs={"type": "application/ld+json"}):
        try:
            payload = json.loads(script_tag.get_text(strip=True))
        except Exception:
            continue
        for node in payload if isinstance(payload, list) else [payload]:
            if isinstance(node, dict):
                value = node.get("datePublished") or node.get("dateModified")
                if value:
                    candidates.append(str(value))
    for value in candidates:
        if not value:
            continue
        try:
            dt = dateparser.parse(value)
            if not dt:
                continue
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            return dt.astimezone(timezone.utc)
        except Exception:
            continue
    return None


def extract_body_text(html: str) -> str:
    extracted = trafilatura.extract(
        html,
        output_format="txt",
        include_links=False,
        include_images=False,
        favor_precision=True,
    )
    if extracted:
        return extracted.strip()
    soup = BeautifulSoup(html, "html.parser")
    paragraphs = [p.get_text(" ", strip=True) for p in soup.find_all(["p", "li"])]
    return "\n".join([p for p in paragraphs if len(p) > 30][:40]).strip()


def parse_generic_article(url: str, html: str, language_hint: str) -> RawArticle | None:
    soup = BeautifulSoup(html, "html.parser")
    title = extract_title(soup).strip()
    body = extract_body_text(html)
    if not title or not body:
        return None
    canonical = _extract_meta(soup, "og:url") or url
    image = _extract_meta(soup, "og:image", "twitter:image")
    lang = (soup.html.get("lang") if soup.html else None) or language_hint or "en"
    author = _extract_meta(soup, "author")
    return RawArticle(
        source_slug="",
        url=url,
        canonical_url=canonical.rstrip("/"),
        title_original=title,
        body_text=body,
        published_at=extract_published_at(soup),
        author=author,
        image_url=image,
        language=lang[:10],
    )


def parse_dated_sections(url: str, html: str, source_def: SourceDefinition) -> list[RawArticle]:
    soup = BeautifulSoup(html, "html.parser")
    title = extract_title(soup)
    candidates = soup.find_all(re.compile(r"^h[1-4]$"))
    sections: list[tuple[str, list[str]]] = []
    current_heading: str | None = None
    current_lines: list[str] = []

    for tag in candidates:
        text = tag.get_text(" ", strip=True)
        if not text:
            continue
        if any(pattern.match(text) for pattern in DATE_PATTERNS):
            if current_heading and current_lines:
                sections.append((current_heading, current_lines[:]))
            current_heading = text
            current_lines = []
            sibling = tag
            while sibling := sibling.find_next_sibling():
                if sibling.name and re.fullmatch(r"h[1-4]", sibling.name) and any(
                    pattern.match(sibling.get_text(" ", strip=True)) for pattern in DATE_PATTERNS
                ):
                    break
                if sibling.name in {"p", "li", "ul", "ol", "div"}:
                    line = sibling.get_text(" ", strip=True)
                    if line:
                        current_lines.append(line)
        elif current_heading and tag.name in {"h2", "h3", "h4"}:
            current_lines.append(tag.get_text(" ", strip=True))

    if current_heading and current_lines:
        sections.append((current_heading, current_lines[:]))

    items: list[RawArticle] = []
    for heading, lines in sections:
        body = "\n".join(dict.fromkeys(line for line in lines if line))
        if len(body) < 40:
            continue
        published_at = None
        try:
            published_at = dateparser.parse(heading)
            if published_at and published_at.tzinfo is None:
                published_at = published_at.replace(tzinfo=timezone.utc)
        except Exception:
            published_at = None
        section_url = f"{url}#{slugify(heading)}"
        items.append(
            RawArticle(
                source_slug=source_def.slug,
                url=section_url,
                canonical_url=section_url,
                title_original=f"{title} — {heading}",
                body_text=body,
                published_at=published_at.astimezone(timezone.utc) if published_at else None,
                language=source_def.language,
                raw_json={"section_heading": heading, "source_page": url},
            )
        )
    return items


def parse_rss_feed(source_def: SourceDefinition, feed_url: str) -> list[RawArticle]:
    feed = feedparser.parse(feed_url)
    items: list[RawArticle] = []
    for entry in feed.entries:
        url = normalize_url(feed_url, entry.link)
        published = None
        for attr in ("published", "updated"):
            value = getattr(entry, attr, None)
            if value:
                try:
                    published = dateparser.parse(value)
                    if published.tzinfo is None:
                        published = published.replace(tzinfo=timezone.utc)
                    break
                except Exception:
                    continue
        summary = BeautifulSoup(getattr(entry, "summary", ""), "html.parser").get_text(" ", strip=True)
        body = BeautifulSoup(getattr(entry, "description", ""), "html.parser").get_text(" ", strip=True)
        items.append(
            RawArticle(
                source_slug=source_def.slug,
                url=url,
                canonical_url=url,
                title_original=entry.title,
                body_text=body or summary or entry.title,
                published_at=published.astimezone(timezone.utc) if published else None,
                language=source_def.language,
                raw_json={"feed_url": feed_url},
            )
        )
    return items
