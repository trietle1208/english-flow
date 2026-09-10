import { betterAuth, APIError } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { hashPassword, verifyPassword } from "better-auth/crypto";
import { db } from "@/db";
import { accounts, sessions, users, verifications } from "@/db/schema";
import { env } from "@/env";
import { generateId } from "@/lib/id";
import { isPasswordComplexEnough, PASSWORD_COMPLEXITY_MESSAGE } from "@/lib/password";

/**
 * better-auth server instance (AD-01).
 *
 * `usePlural: true` tells the Drizzle adapter our tables are named
 * `users`/`sessions`/`accounts`/`verifications` (see `src/db/schema/auth.ts`)
 * instead of the singular defaults; the business `users` table from Phase 03
 * is what better-auth reads/writes as its `user` model, so there is no
 * second identity table.
 *
 * The `schema` map below carries both the singular keys (`user`, `session`,
 * ...) — what the adapter actually looks up by, since better-auth's internal
 * model names stay singular even with `usePlural` — and the plural keys
 * pointing at the exact same tables, which is what its build-time
 * `validateSchema` check reads (it introspects this object's own keys as
 * table names, not the underlying Postgres tables). Without the plural
 * aliases every `auth.api.*` call throws a false "missing table" error.
 */
export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema: {
      user: users,
      session: sessions,
      account: accounts,
      verification: verifications,
      users,
      sessions,
      accounts,
      verifications,
    },
  }),
  // Ids for rows better-auth creates itself follow the same UUID v7
  // convention as the rest of the app (AD-02).
  advanced: {
    database: {
      generateId: () => generateId(),
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    // `registerSchema` (Zod) already enforces "8+ chars, a letter, a
    // number" for requests that go through our Server Action — this hook
    // enforces the same rule at the one place every sign-up/password-change
    // passes through no matter the entry point, so a request straight to
    // `/api/auth/sign-up/email` can't bypass it. `hashPassword`/`verifyPassword`
    // are better-auth's own scrypt implementation, unchanged (AD-01).
    password: {
      hash: async (password) => {
        if (!isPasswordComplexEnough(password)) {
          throw new APIError("BAD_REQUEST", { message: PASSWORD_COMPLEXITY_MESSAGE });
        }
        return hashPassword(password);
      },
      verify: ({ hash, password }) => verifyPassword({ hash, password }),
    },
  },
  user: {
    // The business columns bolted onto `users` in Phase 03 (AD-01). None are
    // settable through the auth API itself (`input: false`) — they're read
    // through the session and written by their own features later (settings,
    // placement test), never by sign-up/sign-in payloads.
    additionalFields: {
      cefrLevel: { type: "string", required: false, input: false },
      dailyGoalMinutes: { type: "number", required: false, input: false },
      preferredLearningTime: { type: "string", required: false, input: false },
      timezone: { type: "string", required: false, input: false },
      onboardedAt: { type: "date", required: false, input: false },
    },
  },
  // Must be the last plugin (see better-auth docs) — makes calling
  // `auth.api.*` from Server Actions/Route Handlers automatically apply the
  // resulting `Set-Cookie` via `next/headers` instead of us wiring it up by hand.
  plugins: [nextCookies()],
});
