from __future__ import annotations

import argparse
import json
import logging

from news_portal.config import get_settings
from news_portal.db import init_db, session_scope
from news_portal.services.ingestion import record_job_end, record_job_start, run_ingest

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s - %(message)s")
logger = logging.getLogger(__name__)


def main() -> None:
    parser = argparse.ArgumentParser(description="Run ingest job")
    parser.add_argument("--limit-per-source", type=int, default=get_settings().default_fetch_limit)
    args = parser.parse_args()

    init_db()
    with session_scope() as session:
        run = record_job_start(session, "ingest")
        try:
            result = run_ingest(session, limit_per_source=args.limit_per_source)
            record_job_end(session, run, "success", detail="Ingest completed", meta_json=result)
            logger.info(json.dumps(result, ensure_ascii=False))
        except Exception as exc:
            record_job_end(session, run, "failed", detail=str(exc), meta_json={})
            logger.exception("Ingest job failed")
            raise


if __name__ == "__main__":
    main()
