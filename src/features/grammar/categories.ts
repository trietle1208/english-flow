import {
  GRAMMAR_TOPIC_CATEGORIES,
  type GrammarTopicCategory,
} from "@/db/schema/grammar";

/** Keys under `grammar.categories.*` in locale messages. */
export const GRAMMAR_CATEGORY_I18N_KEY: Record<
  GrammarTopicCategory,
  "tenses" | "articles" | "clauses" | "modals" | "prepositions" | "other"
> = {
  verb_tenses: "tenses",
  articles: "articles",
  clauses: "clauses",
  modals: "modals",
  prepositions: "prepositions",
  other: "other",
};

export function isGrammarTopicCategory(
  value: string,
): value is GrammarTopicCategory {
  return (GRAMMAR_TOPIC_CATEGORIES as readonly string[]).includes(value);
}

export { GRAMMAR_TOPIC_CATEGORIES };
