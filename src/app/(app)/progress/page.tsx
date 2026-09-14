import type { Metadata } from "next";
import { LineChart } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";

export const metadata: Metadata = {
  title: "Progress",
};

/**
 * Phase 05 placeholder so the sidebar/mobile nav has no dead link. Phase 12
 * builds the real charts (streak, skill performance, weekly activity).
 */
export default function ProgressPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Progress"
        description="Your streak, skill performance and activity over time."
      />
      <EmptyState
        icon={LineChart}
        title="Coming in the next phase"
        description="Streak history, skill performance charts and weekly activity arrive in Phase 12."
      />
    </div>
  );
}
