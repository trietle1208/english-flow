import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { PageHeader } from "@/components/shared/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { AchievementList } from "@/features/progress/components/AchievementList";
import { OverallStatsCards } from "@/features/progress/components/OverallStats";
import { StreakCalendar } from "@/features/progress/components/StreakCalendar";
import {
  getAchievementProgress,
  getOverallStats,
  getSkillOverview,
  getStreakData,
  getWeeklyActivityMinutes,
} from "@/features/progress/queries";
import { requireUser } from "@/lib/session";

function ChartSkeleton() {
  return <Skeleton className="h-[280px] w-full rounded-xl" />;
}

const SkillPerformanceChart = dynamic(
  () =>
    import("@/features/progress/components/SkillPerformanceChart").then(
      (m) => m.SkillPerformanceChart,
    ),
  { loading: () => <ChartSkeleton /> },
);

const WeeklyActivityChart = dynamic(
  () =>
    import("@/features/progress/components/WeeklyActivityChart").then(
      (m) => m.WeeklyActivityChart,
    ),
  { loading: () => <ChartSkeleton /> },
);

export const metadata: Metadata = {
  title: "Progress",
};

/**
 * Learning analytics: overall stats, skill/weekly charts, streak, achievements
 * (spec §21). Charts are client components behind Suspense.
 */
export default async function ProgressPage() {
  const user = await requireUser();
  const timezone = user.timezone || "Asia/Ho_Chi_Minh";

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Progress"
        description="Your streak, skill performance and activity over time."
      />

      <Suspense fallback={<StatsSkeleton />}>
        <OverallSection userId={user.id} />
      </Suspense>

      <div className="grid gap-8 lg:grid-cols-2">
        <Suspense fallback={<ChartSkeleton />}>
          <SkillChartSection userId={user.id} />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <WeeklySection userId={user.id} timezone={timezone} />
        </Suspense>
      </div>

      <Suspense fallback={<ChartSkeleton />}>
        <StreakSection userId={user.id} timezone={timezone} />
      </Suspense>

      <Suspense fallback={<ChartSkeleton />}>
        <AchievementsSection userId={user.id} timezone={timezone} />
      </Suspense>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-[112px] w-full rounded-xl" />
      ))}
    </div>
  );
}

async function OverallSection({ userId }: { userId: string }) {
  const stats = await getOverallStats(userId);
  return <OverallStatsCards stats={stats} />;
}

async function SkillChartSection({ userId }: { userId: string }) {
  const skills = await getSkillOverview(userId);
  return <SkillPerformanceChart skills={skills} />;
}

async function WeeklySection({
  userId,
  timezone,
}: {
  userId: string;
  timezone: string;
}) {
  const days = await getWeeklyActivityMinutes(userId, timezone);
  return <WeeklyActivityChart days={days} />;
}

async function StreakSection({
  userId,
  timezone,
}: {
  userId: string;
  timezone: string;
}) {
  const data = await getStreakData(userId, timezone);
  return <StreakCalendar data={data} />;
}

async function AchievementsSection({
  userId,
  timezone,
}: {
  userId: string;
  timezone: string;
}) {
  const achievements = await getAchievementProgress(userId, timezone);
  return <AchievementList achievements={achievements} />;
}
