import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const PROTECTED_PATHS = [
  "/dashboard",
  "/courses",
  "/lessons",
  "/vocabulary",
  "/grammar",
  "/listening",
  "/quiz",
  "/progress",
  "/settings",
  "/placement-test",
];

/**
 * Redirect-only gate, run at the edge before any of these pages render.
 *
 * This only checks whether a session cookie is *present* — it can't verify
 * the session against the database from the Edge runtime. That's fine: it
 * exists purely to bounce obviously-signed-out visitors before a page render
 * starts. The authoritative check is `requireUser()` (`src/lib/session.ts`),
 * which every protected page and every Server Action calls itself — per the
 * "never trust the client for identity" convention, this middleware is a UX
 * shortcut, not the security boundary.
 *
 * Intentionally does NOT redirect `/login`|/`register` → `/dashboard` when a
 * cookie is present. A stale/orphaned cookie (expired session, deleted user,
 * DB reset) still looks signed-in at the edge while `requireUser()` fails —
 * that pair used to infinite-loop the browser. Logged-in visitors are sent
 * away from auth pages by the login/register Server Components after a real
 * `getCurrentUser()` check instead.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = !!getSessionCookie(request);

  const isProtected = PROTECTED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
  if (isProtected && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/courses/:path*",
    "/lessons/:path*",
    "/vocabulary/:path*",
    "/grammar/:path*",
    "/listening/:path*",
    "/quiz/:path*",
    "/progress/:path*",
    "/settings/:path*",
    "/placement-test/:path*",
  ],
};
