import type { CefrLevel } from "@/config/cefr";
import type { GrammarContent } from "@/db/schema/grammar";
import type { QuizForAttempt } from "@/features/quiz/types";

export type GrammarTopicListItem = {
  id: string;
  slug: string;
  title: string;
  level: CefrLevel;
  summary: string;
  sortOrder: number;
  /** True when the user has at least one completed attempt on this topic's quiz. */
  isCompleted: boolean;
};

export type GrammarTopicDetail = {
  id: string;
  slug: string;
  title: string;
  level: CefrLevel;
  summary: string;
  content: GrammarContent;
  sortOrder: number;
  quizId: string | null;
  quiz: QuizForAttempt | null;
  isCompleted: boolean;
  previousTopicId: string | null;
  nextTopicId: string | null;
};
