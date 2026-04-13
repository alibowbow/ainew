#!/usr/bin/env bash
set -euo pipefail

PROJECT_ID="${1:?PROJECT_ID required}"
REGION="${2:?REGION required}"
REPOSITORY="${3:-ai-news-portal}"
IMAGE_NAME="${4:-ai-news-worker}"

IMAGE="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY}/${IMAGE_NAME}:latest"

gcloud builds submit .   --project "${PROJECT_ID}"   --config infra/cloudbuild.worker.yaml   --substitutions _IMAGE="${IMAGE}"

gcloud run jobs deploy ai-news-ingest   --image "${IMAGE}"   --project "${PROJECT_ID}"   --region "${REGION}"   --task-timeout 1800   --max-retries 1   --set-env-vars APP_ENV=production   --set-secrets GEMINI_API_KEY=gemini-api-key:latest   --command python   --args -m,news_portal.jobs.ingest_job

gcloud run jobs deploy ai-news-briefing   --image "${IMAGE}"   --project "${PROJECT_ID}"   --region "${REGION}"   --task-timeout 900   --max-retries 1   --set-env-vars APP_ENV=production   --set-secrets GEMINI_API_KEY=gemini-api-key:latest   --command python   --args -m,news_portal.jobs.briefing_job
