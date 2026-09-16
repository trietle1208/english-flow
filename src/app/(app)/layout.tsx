import type { ReactNode } from "react";
import { requireUser } from "@/lib/session";
import { Sidebar } from "@/components/layout/Sidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { MobileNav } from "@/components/layout/MobileNav";
import { AddVocabularyFab } from "@/features/vocabulary/components/AddVocabularyFab";

/**
 * Shared shell for every authenticated route (spec §4). `requireUser()` here
 * is the page-level half of the auth gate — `middleware.ts` bounces
 * obviously signed-out visitors at the edge, this is the real (DB-backed)
 * check every nested page relies on.
 *
 * Layout: a fixed `Sidebar` from 768px up (icon-only until 1024px, then
 * icon+label), matched by `md:pl-[72px] lg:pl-64` on `<main>`. Below 768px
 * the sidebar is hidden in favor of `AppHeader` (compact header + drawer)
 * and a fixed `MobileNav` bottom tab bar, with `pb-16` on `<main>` so
 * content never sits under it.
 */
export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await requireUser();

  return (
    <div className="min-h-screen">
      <Sidebar user={user} />
      <AppHeader user={user} />
      <main className="min-h-screen pb-16 md:pb-0 md:pl-[72px] lg:pl-64">{children}</main>
      <MobileNav />
      <AddVocabularyFab />
    </div>
  );
}
