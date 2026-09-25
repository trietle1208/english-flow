import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "@/env";
import * as schema from "@/db/schema";

/**
 * Singleton Postgres pool + Drizzle instance.
 *
 * Driver is `pg` (node-postgres), not `postgres` (postgres-js): Drizzle runs
 * every query through postgres-js's `unsafe()`, which disables statement
 * preparation, so each parameterized query costs two network round trips
 * (Parse/Describe, then Bind/Execute). `pg` sends the whole extended-protocol
 * sequence in one write — one round trip per query, which halves DB wait
 * time whenever the database isn't on the same host (measured: 125ms → 62ms
 * per query at 50ms RTT). The standalone scripts in `scripts/` still use
 * postgres-js; they run a handful of statements and don't need this.
 *
 * In dev, Next.js HMR re-evaluates this module on every edit. Without
 * caching on `globalThis`, that would open a fresh connection pool each
 * time and eventually exhaust Postgres' `max_connections`. Production runs
 * the module once per process, so the cache is a no-op there.
 */
const globalForDb = globalThis as unknown as {
  postgresPool: Pool | undefined;
};

const pool = globalForDb.postgresPool ?? new Pool({ connectionString: env.DATABASE_URL });

if (process.env.NODE_ENV !== "production") {
  globalForDb.postgresPool = pool;
}

export const db = drizzle(pool, { schema });
