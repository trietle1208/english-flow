import { BookMarked, CheckCircle2, Circle } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import type { VocabularyStats as VocabularyStatsType } from "../types";

type VocabularyStatsProps = {
  stats: VocabularyStatsType;
};

/** Header stats for My Vocabulary: Total / Learned / Not learned (spec §14). */
export function VocabularyStats({ stats }: VocabularyStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard label="Total saved" value={stats.totalSaved} icon={BookMarked} />
      <StatCard label="Learned" value={stats.learned} icon={CheckCircle2} />
      <StatCard label="Not learned" value={stats.notLearned} icon={Circle} />
    </div>
  );
}
