import type { LessonBlock } from "@/db/schema/lesson-content";
import type { partOfSpeechEnum, skillEnum } from "@/db/schema/enums";

export type Skill = (typeof skillEnum.enumValues)[number];
export type PartOfSpeech = (typeof partOfSpeechEnum.enumValues)[number];

export type VocabularySummary = {
  id: string;
  word: string;
  pronunciation: string;
  phonetic: string;
  partOfSpeech: PartOfSpeech;
  meaning: string;
  exampleSentence: string;
  audioUrl: string | null;
  /** True when the learner created this word themselves. */
  isManual?: boolean;
};

export type LessonDetail = {
  id: string;
  title: string;
  slug: string;
  skill: Skill;
  estimatedMinutes: number;
  orderIndex: number;
  /** 1-based position in the course ("Lesson 3 of 12"). */
  lessonNumber: number;
  lessonCount: number;
  courseId: string;
  courseTitle: string;
  blocks: LessonBlock[];
  vocabulariesById: Record<string, VocabularySummary>;
  /** Which of `vocabulariesById` the learner has already saved. */
  savedVocabularyIds: Set<string>;
  listeningTitlesById: Record<string, string>;
  previousLessonId: string | null;
  nextLessonId: string | null;
  progressStatus: "not_started" | "in_progress" | "completed";
  progressPercent: number;
};
