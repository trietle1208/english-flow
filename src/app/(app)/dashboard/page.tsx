import { Suspense } from "react";
import type { Metadata } from "next";
import { isCefrLevel, type CefrLevel } from "@/config/cefr";
import { ContinueLearningCard } from "@/features/dashboard/components/ContinueLearningCard";
import { ContinueLearningEmpty } from "@/features/dashboard/components/ContinueLearningEmpty";
import { DailyGoalCard } from "@/features/dashboard/components/DailyGoalCard";
import { DashboardGreeting } from "@/features/dashboard/components/DashboardGreeting";
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
    <div className="flex w-full flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <DashboardGreeting
        greeting={greeting}
        firstName={firstName}
        timezone={timezone}
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
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DashboardContinueSkeleton />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <DashboardStatSkeleton />
          <DashboardStatSkeleton />
        </div>
      </div>
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
      <div className="grid items-start gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Suspense fallback={<DashboardContinueSkeleton />}>
            <ContinueSection userId={userId} />
          </Suspense>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
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
      </div>

      <Suspense fallback={<DashboardSectionSkeleton />}>
        <GrammarReviewSection userId={userId} />
      </Suspense>

      <section className="space-y-3" aria-labelledby="skill-overview-heading">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2
              id="skill-overview-heading"
              className="text-base font-semibold tracking-tight"
            >
              Skill Overview
            </h2>
            <p className="text-sm text-muted-foreground">
              Progress across vocabulary, grammar, listening, and reading.
            </p>
          </div>
        </div>
        <Suspense fallback={<DashboardSkillsSkeleton />}>
          <SkillsSection userId={userId} />
        </Suspense>
      </section>

      <div className="grid items-start gap-6 lg:grid-cols-2">
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
