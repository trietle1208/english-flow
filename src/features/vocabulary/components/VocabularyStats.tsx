import { BookMarked, CheckCircle2, Circle, PenLine, Star } from "lucide-react";
import { StatCard } from "@/components/shared/StatCard";
import type { VocabularyStats as VocabularyStatsType } from "../types";

type VocabularyStatsProps = {
  stats: VocabularyStatsType;
};

/** Header stats for My Vocabulary. */
export function VocabularyStats({ stats }: VocabularyStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <StatCard label="Total saved" value={stats.totalSaved} icon={BookMarked} />
      <StatCard label="Learned" value={stats.learned} icon={CheckCircle2} />
      <StatCard label="Not learned" value={stats.notLearned} icon={Circle} />
      <StatCard label="Pinned" value={stats.pinned} icon={Star} />
      <StatCard label="Added by you" value={stats.manual} icon={PenLine} />
    </div>
  );
}
