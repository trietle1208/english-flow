import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

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
