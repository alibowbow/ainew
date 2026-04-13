#!/usr/bin/env bash
set -euo pipefail

PROJECT_ID="${1:?PROJECT_ID required}"
REGION="${2:?REGION required}"
SERVICE_NAME="${3:-ai-news-api}"
REPOSITORY="${4:-ai-news-portal}"

IMAGE="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY}/${SERVICE_NAME}:latest"

gcloud builds submit .   --project "${PROJECT_ID}"   --config infra/cloudbuild.api.yaml   --substitutions _IMAGE="${IMAGE}"

gcloud run deploy "${SERVICE_NAME}"   --image "${IMAGE}"   --project "${PROJECT_ID}"   --region "${REGION}"   --platform managed   --allow-unauthenticated   --port 8080   --set-env-vars APP_ENV=production   --set-secrets GEMINI_API_KEY=gemini-api-key:latest
