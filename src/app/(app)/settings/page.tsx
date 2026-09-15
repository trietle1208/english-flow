import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { isCefrLevel } from "@/config/cefr";
import { SettingsPageContent } from "@/features/settings/components/SettingsPageContent";
import {
  isDailyGoalMinutes,
  isPreferredLearningTime,
} from "@/features/settings/constants";
import type { SettingsUser } from "@/features/settings/types";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Settings",
};

/**
 * Settings — profile, learning prefs, appearance, logout (spec §22).
 */
export default async function SettingsPage() {
  const user = await requireUser();

  const rawGoal = user.dailyGoalMinutes ?? 20;
  const settingsUser: SettingsUser = {
    name: user.name,
    email: user.email,
    cefrLevel:
      typeof user.cefrLevel === "string" && isCefrLevel(user.cefrLevel)
        ? user.cefrLevel
        : null,
    dailyGoalMinutes: isDailyGoalMinutes(rawGoal) ? rawGoal : 20,
    preferredLearningTime:
      typeof user.preferredLearningTime === "string" &&
      isPreferredLearningTime(user.preferredLearningTime)
        ? user.preferredLearningTime
        : null,
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Settings"
        description="Update your profile, learning goals, and how EnglishFlow looks."
      />
      <SettingsPageContent user={settingsUser} />
    </div>
  );
}
