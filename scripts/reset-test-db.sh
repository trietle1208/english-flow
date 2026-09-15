#!/usr/bin/env bash
# Prepare english_learning_test: drop → create → migrate → seed.
# Requires Postgres reachable (docker compose up -d postgres).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

ADMIN_URL="${DATABASE_ADMIN_URL:-postgresql://postgres:postgres@localhost:5432/postgres}"
TEST_DB="${TEST_DATABASE_NAME:-english_learning_test}"
TEST_URL="${TEST_DATABASE_URL:-postgresql://postgres:postgres@localhost:5432/${TEST_DB}}"

echo "→ Resetting database ${TEST_DB}"
psql "$ADMIN_URL" -v ON_ERROR_STOP=1 <<SQL
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = '${TEST_DB}' AND pid <> pg_backend_pid();
DROP DATABASE IF EXISTS ${TEST_DB};
CREATE DATABASE ${TEST_DB};
SQL

export DATABASE_URL="$TEST_URL"
echo "→ Migrating ${TEST_DB}"
npm run db:migrate
echo "→ Seeding ${TEST_DB}"
npm run db:seed
echo "✓ Test database ready: ${TEST_URL}"
