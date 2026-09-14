import type { Metadata } from "next";
import { Settings as SettingsIcon } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";

export const metadata: Metadata = {
  title: "Settings",
};

/**
 * Phase 05 placeholder — reachable from `UserMenu`/`AppHeader`'s drawer so
 * that link isn't dead. Phase 13 builds the real settings (profile, daily
 * goal, theme, retake placement test).
 */
export default function SettingsPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader title="Settings" description="Manage your profile, goals and preferences." />
      <EmptyState
        icon={SettingsIcon}
        title="Coming in the next phase"
        description="Profile settings, daily goal, theme and retaking the placement test arrive in Phase 13."
      />
    </div>
  );
}
