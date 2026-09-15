import { SpellCheck } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { CEFR_LEVELS, CEFR_LEVEL_LABELS, type CefrLevel } from "@/config/cefr";
import { listGrammarTopics } from "../queries";
import { GrammarTopicCard } from "./GrammarTopicCard";

type GrammarTopicListProps = {
  userId: string;
};

/**
 * Grammar catalog grouped by CEFR level (spec §17).
 */
export async function GrammarTopicList({ userId }: GrammarTopicListProps) {
  const topics = await listGrammarTopics(userId);

  if (topics.length === 0) {
    return (
      <EmptyState
        icon={SpellCheck}
        title="No grammar topics yet"
        description="Grammar topics will appear here once content is seeded."
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
              {CEFR_LEVEL_LABELS[level]}
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
