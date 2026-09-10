import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Dashboard",
};

/**
 * Phase 04 placeholder — proves the auth gate works end-to-end (register/
 * login land here, logout locks it back down). Phase 12 builds the real
 * dashboard (streak, daily goal, skill breakdown).
 */
export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Welcome, {user?.name}.</h1>
      <p className="mt-2 text-muted-foreground">
        Your dashboard is coming in Phase 12 — courses, progress and streak will live here.
      </p>
    </div>
  );
}
