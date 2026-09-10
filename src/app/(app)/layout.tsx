import type { ReactNode } from "react";
import { requireUser } from "@/lib/session";
import { LogoutButton } from "@/features/auth/components/logout-button";

/**
 * Shared layout for every authenticated route. `requireUser()` here is the
 * page-level half of the auth gate — `middleware.ts` bounces obviously
 * signed-out visitors at the edge, this is the real (DB-backed) check.
 *
 * This is a Phase 04 placeholder: Phase 05 replaces the header below with
 * the full `AppShell` (sidebar + mobile nav).
 */
export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await requireUser();

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between border-b px-6 py-3">
        <span className="text-sm text-muted-foreground">Signed in as {user.email}</span>
        <LogoutButton />
      </header>
      <main>{children}</main>
    </div>
  );
}
