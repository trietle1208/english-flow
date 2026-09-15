import {
  GRAMMAR_TOPIC_CATEGORIES,
  type GrammarTopicCategory,
} from "@/db/schema/grammar";

/** Vietnamese labels for topic category filter / badges (Prompt 3). */
export const GRAMMAR_CATEGORY_LABELS: Record<GrammarTopicCategory, string> = {
  verb_tenses: "Thì động từ",
  articles: "Mạo từ",
  clauses: "Mệnh đề",
  modals: "Động từ khuyết thiếu",
  prepositions: "Giới từ",
  other: "Khác",
};

export function isGrammarTopicCategory(
  value: string,
): value is GrammarTopicCategory {
  return (GRAMMAR_TOPIC_CATEGORIES as readonly string[]).includes(value);
}

export { GRAMMAR_TOPIC_CATEGORIES };
