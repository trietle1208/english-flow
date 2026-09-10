import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "./columns.helpers";
import { users } from "./users";

/**
 * better-auth's own tables (AD-01). `users` (in `./users.ts`) already covers
 * better-auth's `user` model — these three cover `session`, `account` (the
 * `emailAndPassword` provider stores the password hash here, one row per
 * user with `providerId: "credential"`) and `verification`. Phase 04 wires
 * `drizzleAdapter(db, { usePlural: true, schema: { user: users, session:
 * sessions, account: accounts, verification: verifications } })` in
 * `src/lib/auth.ts`, so the JS model names stay singular while the actual
 * Postgres tables are plural, consistent with the rest of the schema.
 */
export const sessions = pgTable("sessions", {
  id: id(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  ...timestamps,
});

export const accounts = pgTable("accounts", {
  id: id(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  /** `"credential"` for email+password; a real OAuth provider id (`"google"`, ...) later. */
  providerId: text("provider_id").notNull(),
  /** For `"credential"` this is just the user id; for OAuth it's the provider's account id. */
  accountId: text("account_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", { withTimezone: true }),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { withTimezone: true }),
  scope: text("scope"),
  /** Scrypt hash of the password — only set for `providerId: "credential"` rows (AD-01). */
  password: text("password"),
  ...timestamps,
});

export const verifications = pgTable("verifications", {
  id: id(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  ...timestamps,
});
