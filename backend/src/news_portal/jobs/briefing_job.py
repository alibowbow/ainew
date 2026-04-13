from __future__ import annotations

import logging

from news_portal.db import init_db, session_scope
from news_portal.services.briefing import generate_daily_briefing
from news_portal.services.ingestion import record_job_end, record_job_start

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s - %(message)s")
logger = logging.getLogger(__name__)


def main() -> None:
    init_db()
    with session_scope() as session:
        run = record_job_start(session, "briefing")
        try:
            briefing = generate_daily_briefing(session)
            record_job_end(
                session,
                run,
                "success",
                detail="Briefing created",
                meta_json={"briefing_id": briefing.id, "title": briefing.title},
            )
            logger.info("Generated briefing %s", briefing.id)
        except Exception as exc:
            record_job_end(session, run, "failed", detail=str(exc), meta_json={})
            logger.exception("Briefing job failed")
            raise


if __name__ == "__main__":
    main()
