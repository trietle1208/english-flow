import { BookMarked, CheckCircle2, Circle, PenLine, Star } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { StatCard } from "@/components/shared/StatCard";
import type { VocabularyStats as VocabularyStatsType } from "../types";

type VocabularyStatsProps = {
  stats: VocabularyStatsType;
};

/** Header stats for My Vocabulary. */
export async function VocabularyStats({ stats }: VocabularyStatsProps) {
  const t = await getTranslations("vocabulary");

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <StatCard label={t("totalSaved")} value={stats.totalSaved} icon={BookMarked} />
      <StatCard label={t("learned")} value={stats.learned} icon={CheckCircle2} />
      <StatCard label={t("notLearned")} value={stats.notLearned} icon={Circle} />
      <StatCard label={t("pinned")} value={stats.pinned} icon={Star} />
      <StatCard label={t("addedByYou")} value={stats.manual} icon={PenLine} />
    </div>
  );
}
