/**
 * Reset `english_learning_test`: drop → create → migrate → seed.
 * Usage: `npm run test:e2e:prepare` (requires Postgres on localhost:5432).
 */
import { execSync } from "node:child_process";
import postgres from "postgres";

const ADMIN_URL =
  process.env.DATABASE_ADMIN_URL ??
  "postgresql://postgres:postgres@localhost:5432/postgres";
const TEST_DB = process.env.TEST_DATABASE_NAME ?? "english_learning_test";
const TEST_URL =
  process.env.TEST_DATABASE_URL ??
  `postgresql://postgres:postgres@localhost:5432/${TEST_DB}`;

async function main() {
  console.log(`→ Resetting database ${TEST_DB}`);
  const sql = postgres(ADMIN_URL, { max: 1 });

  await sql.unsafe(`
    SELECT pg_terminate_backend(pid)
    FROM pg_stat_activity
    WHERE datname = '${TEST_DB}' AND pid <> pg_backend_pid()
  `);
  await sql.unsafe(`DROP DATABASE IF EXISTS ${TEST_DB}`);
  await sql.unsafe(`CREATE DATABASE ${TEST_DB}`);
  await sql.end({ timeout: 5 });

  const env = {
    ...process.env,
    DATABASE_URL: TEST_URL,
  };
  // Ensure secrets from .env are visible to child processes even when this
  // script wasn't started via `node --env-file=.env`.
  try {
    const { readFileSync } = await import("node:fs");
    const dotenv = readFileSync(new URL("../.env", import.meta.url), "utf8");
    for (const line of dotenv.split("\n")) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && env[m[1]] === undefined) {
        env[m[1]] = m[2];
      }
    }
  } catch {
    // .env optional when CI injects vars
  }
  if (!env.BETTER_AUTH_SECRET) {
    env.BETTER_AUTH_SECRET = "e2e-test-secret-must-be-at-least-32-chars";
  }
  if (!env.NEXT_PUBLIC_APP_URL) {
    env.NEXT_PUBLIC_APP_URL = "http://localhost:3000";
  }
  if (!env.BETTER_AUTH_URL) {
    env.BETTER_AUTH_URL = "http://localhost:3000";
  }

  console.log(`→ Migrating ${TEST_DB}`);
  execSync("npm run db:migrate", { stdio: "inherit", env });
  console.log(`→ Seeding ${TEST_DB}`);
  execSync("npm run db:seed", { stdio: "inherit", env });
  console.log(`✓ Test database ready: ${TEST_URL}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
