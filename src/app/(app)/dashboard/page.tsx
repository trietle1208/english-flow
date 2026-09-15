import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/PageHeader";
import { isCefrLevel, type CefrLevel } from "@/config/cefr";
import { ContinueLearningCard } from "@/features/dashboard/components/ContinueLearningCard";
import { ContinueLearningEmpty } from "@/features/dashboard/components/ContinueLearningEmpty";
import { DailyGoalCard } from "@/features/dashboard/components/DailyGoalCard";
import { DashboardOnboarding } from "@/features/dashboard/components/DashboardOnboarding";
import {
  DashboardContinueSkeleton,
  DashboardSectionSkeleton,
  DashboardSkillsSkeleton,
  DashboardStatSkeleton,
} from "@/features/dashboard/components/DashboardSkeletons";
import { GrammarToReview } from "@/features/dashboard/components/GrammarToReview";
import { RecentActivity } from "@/features/dashboard/components/RecentActivity";
import { RecommendedLessons } from "@/features/dashboard/components/RecommendedLessons";
import { SkillOverview } from "@/features/dashboard/components/SkillOverview";
import { StreakCard } from "@/features/dashboard/components/StreakCard";
import { listWeakGrammarTopics } from "@/features/grammar/queries";
import {
  getContinueLearning,
  getDailyGoal,
  getRecentActivity,
  getRecommendedLessons,
  getSkillOverview,
  getStreakData,
  isBrandNewUser,
} from "@/features/progress/queries";
import { greetingForHour, hourInTimezone } from "@/features/progress/streak";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Dashboard",
};

/**
 * Personal dashboard with real activity data (spec §9 / §42). Each block is
 * its own Suspense boundary so a slow query does not block the whole page.
 */
export default async function DashboardPage() {
  const user = await requireUser();
  const timezone = user.timezone || "Asia/Ho_Chi_Minh";
  const greeting = greetingForHour(hourInTimezone(timezone));
  const firstName = user.name?.trim().split(/\s+/)[0] || "there";

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title={`${greeting}, ${firstName} 👋`}
        description="Pick up where you left off and keep your streak going."
      />

      <Suspense fallback={<DashboardOnboardingFallback />}>
        <DashboardBody
          userId={user.id}
          timezone={timezone}
          goalMinutes={user.dailyGoalMinutes ?? 20}
          cefrLevel={user.cefrLevel}
        />
      </Suspense>
    </div>
  );
}

function DashboardOnboardingFallback() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <DashboardStatSkeleton />
        <DashboardStatSkeleton />
      </div>
      <DashboardContinueSkeleton />
      <DashboardSkillsSkeleton />
    </div>
  );
}

async function DashboardBody({
  userId,
  timezone,
  goalMinutes,
  cefrLevel,
}: {
  userId: string;
  timezone: string;
  goalMinutes: number;
  cefrLevel: string | null | undefined;
}) {
  const isNew = await isBrandNewUser(userId);

  if (isNew) {
    return <DashboardOnboarding />;
  }

  const level: CefrLevel | null =
    typeof cefrLevel === "string" && isCefrLevel(cefrLevel) ? cefrLevel : null;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Suspense fallback={<DashboardStatSkeleton />}>
          <DailyGoalSection
            userId={userId}
            timezone={timezone}
            goalMinutes={goalMinutes}
          />
        </Suspense>
        <Suspense fallback={<DashboardStatSkeleton />}>
          <StreakSection userId={userId} timezone={timezone} />
        </Suspense>
      </div>

      <Suspense fallback={<DashboardContinueSkeleton />}>
        <ContinueSection userId={userId} />
      </Suspense>

      <Suspense fallback={<DashboardSectionSkeleton />}>
        <GrammarReviewSection userId={userId} />
      </Suspense>

      <div className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground">Skill Overview</h2>
        <Suspense fallback={<DashboardSkillsSkeleton />}>
          <SkillsSection userId={userId} />
        </Suspense>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Suspense fallback={<DashboardSectionSkeleton />}>
          <RecentSection userId={userId} />
        </Suspense>
        <Suspense fallback={<DashboardSectionSkeleton />}>
          <RecommendedSection userId={userId} cefrLevel={level} />
        </Suspense>
      </div>
    </div>
  );
}

async function DailyGoalSection({
  userId,
  timezone,
  goalMinutes,
}: {
  userId: string;
  timezone: string;
  goalMinutes: number;
}) {
  const data = await getDailyGoal(userId, timezone, goalMinutes);
  return <DailyGoalCard data={data} />;
}

async function StreakSection({
  userId,
  timezone,
}: {
  userId: string;
  timezone: string;
}) {
  const data = await getStreakData(userId, timezone);
  return <StreakCard data={data} />;
}

async function ContinueSection({ userId }: { userId: string }) {
  const data = await getContinueLearning(userId);
  if (!data) {
    return <ContinueLearningEmpty />;
  }
  return <ContinueLearningCard data={data} />;
}

async function GrammarReviewSection({ userId }: { userId: string }) {
  const topics = await listWeakGrammarTopics(userId, 3);
  return <GrammarToReview topics={topics} />;
}

async function SkillsSection({ userId }: { userId: string }) {
  const skills = await getSkillOverview(userId);
  return <SkillOverview skills={skills} />;
}

async function RecentSection({ userId }: { userId: string }) {
  const items = await getRecentActivity(userId);
  return <RecentActivity items={items} />;
}

async function RecommendedSection({
  userId,
  cefrLevel,
}: {
  userId: string;
  cefrLevel: CefrLevel | null;
}) {
  const lessons = await getRecommendedLessons(userId, cefrLevel);
  return <RecommendedLessons lessons={lessons} />;
}
