import {
  BookMarked,
  BookOpenCheck,
  Clock,
  Percent,
  Sparkles,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { StatCard } from "@/components/shared/StatCard";
import { formatDuration } from "@/lib/format";
import type { OverallStats } from "../types";

type OverallStatsProps = {
  stats: OverallStats;
};

/** Aggregate counters for `/progress` (spec §21). */
export async function OverallStatsCards({ stats }: OverallStatsProps) {
  const t = await getTranslations("progress");
  const accuracy =
    stats.quizAccuracy === null ? "—" : `${stats.quizAccuracy}%`;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <StatCard
        label={t("lessonsCompleted")}
        value={stats.lessonsCompleted}
        icon={BookOpenCheck}
      />
      <StatCard
        label={t("learningTime")}
        value={formatDuration(stats.learningMinutes)}
        icon={Clock}
      />
      <StatCard
        label={t("vocabSaved")}
        value={stats.vocabularySaved}
        icon={BookMarked}
      />
      <StatCard
        label={t("vocabLearned")}
        value={stats.vocabularyLearned}
        icon={Sparkles}
      />
      <StatCard
        label={t("quizAccuracy")}
        value={accuracy}
        subtext={
          stats.quizAttempts === 0
            ? t("noQuizzes")
            : t("attempts", { count: stats.quizAttempts })
        }
        icon={Percent}
      />
    </div>
  );
}
