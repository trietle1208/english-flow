import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/env";
import * as schema from "@/db/schema";

/**
 * Singleton Postgres client + Drizzle instance.
 *
 * In dev, Next.js HMR re-evaluates this module on every edit. Without
 * caching on `globalThis`, that would open a fresh connection pool each
 * time and eventually exhaust Postgres' `max_connections`. Production runs
 * the module once per process, so the cache is a no-op there.
 */
const globalForDb = globalThis as unknown as {
  postgresClient: ReturnType<typeof postgres> | undefined;
};

const client = globalForDb.postgresClient ?? postgres(env.DATABASE_URL);

if (process.env.NODE_ENV !== "production") {
  globalForDb.postgresClient = client;
}

export const db = drizzle(client, { schema });
