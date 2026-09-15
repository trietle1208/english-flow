import {
  BookMarked,
  BookOpenCheck,
  Clock,
  Percent,
  Sparkles,
} from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import { formatDuration } from "@/lib/format";
import type { OverallStats } from "../types";

type OverallStatsProps = {
  stats: OverallStats;
};

/** Aggregate counters for `/progress` (spec §21). */
export function OverallStatsCards({ stats }: OverallStatsProps) {
  const accuracy =
    stats.quizAccuracy === null ? "—" : `${stats.quizAccuracy}%`;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <StatCard
        label="Lessons completed"
        value={stats.lessonsCompleted}
        icon={BookOpenCheck}
      />
      <StatCard
        label="Learning time"
        value={formatDuration(stats.learningMinutes)}
        icon={Clock}
      />
      <StatCard
        label="Vocabulary saved"
        value={stats.vocabularySaved}
        icon={BookMarked}
      />
      <StatCard
        label="Vocabulary learned"
        value={stats.vocabularyLearned}
        icon={Sparkles}
      />
      <StatCard
        label="Quiz accuracy"
        value={accuracy}
        subtext={
          stats.quizAttempts === 0
            ? "No quizzes yet"
            : `${stats.quizAttempts} attempt${stats.quizAttempts === 1 ? "" : "s"}`
        }
        icon={Percent}
      />
    </div>
  );
}
