#!/usr/bin/env node
/**
 * Apply pending Drizzle SQL migrations, then optionally start the app.
 *
 * Used on deploy so schema changes (e.g. drizzle/0009_feedbacks.sql) land
 * before the new process serves traffic. Idempotent: already-applied
 * migrations are skipped.
 *
 *   npm run db:migrate:deploy
 *   npm run db:migrate:deploy -- --and-start   # migrate, then server.js / next start
 *
 * Requires DATABASE_URL. Does not seed. Does not generate new migrations.
 */
import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, "..");

const RETRY_ATTEMPTS = Number.parseInt(process.env.MIGRATE_RETRY_ATTEMPTS ?? "30", 10);
const RETRY_MS = Number.parseInt(process.env.MIGRATE_RETRY_MS ?? "2000", 10);
const AND_START = process.argv.includes("--and-start");

function loadDotEnv() {
  const envPath = join(repoRoot, ".env");
  if (!existsSync(envPath)) return;
  const text = readFileSync(envPath, "utf8");
  for (const line of text.split("\n")) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match && process.env[match[1]] === undefined) {
      process.env[match[1]] = match[2];
    }
  }
}

function resolveMigrationsFolder() {
  const candidates = [join(process.cwd(), "drizzle"), join(repoRoot, "drizzle")];
  for (const dir of candidates) {
    if (existsSync(join(dir, "meta", "_journal.json"))) {
      return dir;
    }
  }
  throw new Error(
    "Cannot find drizzle/meta/_journal.json. Run this from the repo (or copy drizzle/ next to the process).",
  );
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForDatabase(url) {
  const attempts = Number.isFinite(RETRY_ATTEMPTS) && RETRY_ATTEMPTS > 0 ? RETRY_ATTEMPTS : 30;
  const delay = Number.isFinite(RETRY_MS) && RETRY_MS > 0 ? RETRY_MS : 2000;

  let lastError;
  for (let i = 1; i <= attempts; i += 1) {
    const sql = postgres(url, { max: 1, connect_timeout: 5 });
    try {
      await sql`select 1`;
      await sql.end({ timeout: 5 });
      return;
    } catch (error) {
      lastError = error;
      await sql.end({ timeout: 1 }).catch(() => undefined);
      console.log(`→ Waiting for database (${i}/${attempts})...`);
      if (i < attempts) {
        await sleep(delay);
      }
    }
  }

  throw lastError ?? new Error("Database did not become ready.");
}

function startApp() {
  const standaloneServer = join(process.cwd(), "server.js");
  const child = existsSync(standaloneServer)
    ? spawn(process.execPath, [standaloneServer], { stdio: "inherit" })
    : spawn("npx", ["next", "start"], { stdio: "inherit", shell: false });

  const forward = (signal) => {
    if (!child.killed) child.kill(signal);
  };
  process.on("SIGTERM", () => forward("SIGTERM"));
  process.on("SIGINT", () => forward("SIGINT"));

  child.on("exit", (code, signal) => {
    if (signal) {
      process.exit(1);
      return;
    }
    process.exit(code ?? 1);
  });
}

async function main() {
  loadDotEnv();

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required. Set it in the environment or .env.");
  }

  const migrationsFolder = resolveMigrationsFolder();
  console.log(`→ Migrating from ${migrationsFolder}`);

  await waitForDatabase(databaseUrl);

  const client = postgres(databaseUrl, { max: 1 });
  try {
    await migrate(drizzle(client), { migrationsFolder });
  } finally {
    await client.end({ timeout: 5 });
  }

  console.log("✓ Migrations applied.");

  if (AND_START) {
    startApp();
  }
}

main().catch((error) => {
  console.error("✗ Migration failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
