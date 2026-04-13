from __future__ import annotations

from functools import lru_cache
from typing import Literal

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
    )

    app_name: str = Field(default="AI Pulse Korea API", alias="APP_NAME")
    app_env: Literal["development", "staging", "production"] = Field(
        default="development",
        alias="APP_ENV",
    )
    api_host: str = Field(default="0.0.0.0", alias="API_HOST")
    api_port: int = Field(default=8080, alias="API_PORT")
    allowed_origins: str = Field(default="*", alias="ALLOWED_ORIGINS")

    database_url: str | None = Field(default=None, alias="DATABASE_URL")

    use_cloud_sql_connector: bool = Field(default=False, alias="USE_CLOUD_SQL_CONNECTOR")
    instance_connection_name: str | None = Field(default=None, alias="INSTANCE_CONNECTION_NAME")
    db_user: str | None = Field(default=None, alias="DB_USER")
    db_password: str | None = Field(default=None, alias="DB_PASSWORD")
    db_name: str | None = Field(default=None, alias="DB_NAME")
    db_ip_type: Literal["PUBLIC", "PRIVATE"] = Field(default="PUBLIC", alias="DB_IP_TYPE")

    gemini_api_key: str | None = Field(default=None, alias="GEMINI_API_KEY")
    gemini_model: str = Field(default="gemini-3-flash-preview", alias="GEMINI_MODEL")

    http_timeout_seconds: int = Field(default=20, alias="HTTP_TIMEOUT_SECONDS")
    user_agent: str = Field(default="AI-Pulse-Korea/0.1 (+https://example.com)", alias="USER_AGENT")
    default_fetch_limit: int = Field(default=12, alias="DEFAULT_FETCH_LIMIT")

    frontend_base_url: str = Field(default="http://localhost:3000", alias="FRONTEND_BASE_URL")
    admin_token: str = Field(default="change-me", alias="ADMIN_TOKEN")

    @property
    def origins_list(self) -> list[str]:
        raw = self.allowed_origins.strip()
        if raw == "*":
            return ["*"]
        return [item.strip() for item in raw.split(",") if item.strip()]


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
