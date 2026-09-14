import type { Metadata } from "next";
import { LayoutDashboard } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { getCurrentUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Dashboard",
};

/**
 * Phase 05 placeholder — proves the `AppShell` (sidebar/header/bottom nav)
 * works end-to-end for the route users land on right after login. Phase 12
 * builds the real dashboard (streak, daily goal, skill breakdown).
 */
export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title={`Welcome back${user?.name ? `, ${user.name}` : ""}.`}
        description="Here's your learning overview."
      />
      <EmptyState
        icon={LayoutDashboard}
        title="Coming in the next phase"
        description="Your streak, daily goal progress, skill breakdown and recent activity arrive in Phase 12."
      />
    </div>
  );
}
