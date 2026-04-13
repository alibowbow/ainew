from __future__ import annotations

from contextlib import contextmanager
from functools import lru_cache
from typing import Iterator

from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from news_portal.config import get_settings

try:
    from google.cloud.sql.connector import Connector, IPTypes
except Exception:  # pragma: no cover - optional dependency at import time
    Connector = None
    IPTypes = None


class Base(DeclarativeBase):
    pass


def _direct_engine(database_url: str) -> Engine:
    return create_engine(
        database_url,
        pool_pre_ping=True,
        pool_recycle=1800,
        future=True,
    )


def _cloud_sql_engine() -> Engine:
    settings = get_settings()
    if not Connector or not IPTypes:
        raise RuntimeError("cloud-sql-python-connector is not available")
    required = [
        settings.instance_connection_name,
        settings.db_user,
        settings.db_password,
        settings.db_name,
    ]
    if not all(required):
        raise RuntimeError("Cloud SQL connector mode requires instance/user/password/db name")

    connector = Connector(refresh_strategy="LAZY")
    ip_type = IPTypes.PRIVATE if settings.db_ip_type.upper() == "PRIVATE" else IPTypes.PUBLIC

    def getconn():
        return connector.connect(
            settings.instance_connection_name,
            "pg8000",
            user=settings.db_user,
            password=settings.db_password,
            db=settings.db_name,
            ip_type=ip_type,
        )

    return create_engine(
        "postgresql+pg8000://",
        creator=getconn,
        pool_pre_ping=True,
        pool_recycle=1800,
        future=True,
    )


@lru_cache(maxsize=1)
def get_engine() -> Engine:
    settings = get_settings()
    if settings.use_cloud_sql_connector:
        return _cloud_sql_engine()
    if settings.database_url:
        return _direct_engine(settings.database_url)
    raise RuntimeError("DATABASE_URL or Cloud SQL connector settings are required")


@lru_cache(maxsize=1)
def get_session_factory() -> sessionmaker[Session]:
    return sessionmaker(bind=get_engine(), autoflush=False, autocommit=False, expire_on_commit=False)


def init_db() -> None:
    from news_portal.models import Article, DailyBriefing, JobRun, Service, Source, Tag  # noqa: F401

    Base.metadata.create_all(bind=get_engine())


@contextmanager
def session_scope() -> Iterator[Session]:
    session = get_session_factory()()
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()
