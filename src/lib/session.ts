import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";

export type CurrentUser = (typeof auth.$Infer.Session)["user"];

/**
 * The current signed-in user, or `null`. Wrapped in `React.cache` so
 * multiple Server Components/Actions rendering in the same request share one
 * session lookup instead of each re-querying the `sessions`/`users` tables.
 */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user ?? null;
});

/**
 * Same as `getCurrentUser()`, but redirects to `/login` when there is no
 * session. Every Server Action and every page under `(app)` that needs to
 * know "who is the current user" calls this — never the client-supplied
 * value — per the "never trust the client for identity" convention.
 */
export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

/**
 * Re-reads the session from the DB and rewrites the signed session cookie
 * cache (`session.cookieCache` in `src/lib/auth.ts`). Call it from a Server
 * Action right after updating the current user's `users` row — otherwise
 * `requireUser()` keeps returning the old profile fields (daily goal, CEFR
 * level, ...) until the cache expires. Only works in Server Actions / Route
 * Handlers, where cookies can be set. A failure here is logged, not thrown:
 * the DB write already succeeded, and the cache expires on its own.
 */
export async function refreshSessionCache(): Promise<void> {
  try {
    await auth.api.getSession({
      headers: await headers(),
      query: { disableCookieCache: true },
    });
  } catch (error) {
    logger.error("refreshSessionCache failed:", error);
  }
}
