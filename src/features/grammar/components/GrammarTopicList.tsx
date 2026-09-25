import { getTranslations } from "next-intl/server";
import { SpellCheck } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { CEFR_LEVELS, type CefrLevel } from "@/config/cefr";
import { listGrammarTopics } from "../queries";
import type { GrammarListFilters } from "../types";
import { GrammarTopicCard } from "./GrammarTopicCard";

type GrammarTopicListProps = {
  userId: string;
  filters?: GrammarListFilters;
};

/**
 * Grammar catalog grouped by CEFR level, honouring URL filters (Phase 15 + Prompt 3).
 */
export async function GrammarTopicList({
  userId,
  filters = {},
}: GrammarTopicListProps) {
  const t = await getTranslations("grammar");
  const tCefr = await getTranslations("cefr");
  const topics = await listGrammarTopics(userId, filters);
  const hasActiveFilters = Boolean(
    filters.search?.trim() ||
      (filters.level && filters.level !== "all") ||
      (filters.status && filters.status !== "all") ||
      (filters.category && filters.category !== "all"),
  );

  if (topics.length === 0) {
    return (
      <EmptyState
        icon={SpellCheck}
        title={hasActiveFilters ? t("emptyFilters") : t("emptyAll")}
        description={
          hasActiveFilters ? t("emptyFiltersDescription") : t("emptyAllDescription")
        }
      />
    );
  }

  const byLevel = new Map<CefrLevel, typeof topics>();
  for (const level of CEFR_LEVELS) {
    byLevel.set(level, []);
  }
  for (const topic of topics) {
    byLevel.get(topic.level)?.push(topic);
  }

  return (
    <div className="flex flex-col gap-10">
      {CEFR_LEVELS.map((level) => {
        const group = byLevel.get(level) ?? [];
        if (group.length === 0) {
          return null;
        }
        return (
          <section key={level} aria-labelledby={`grammar-level-${level}`} className="space-y-4">
            <h2
              id={`grammar-level-${level}`}
              className="text-sm font-semibold tracking-tight text-muted-foreground"
            >
              {tCefr(level)}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.map((topic) => (
                <GrammarTopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
