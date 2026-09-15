import type { difficultyEnum } from "@/db/schema/enums";
import type { QuizForAttempt } from "@/features/quiz/types";

export type ListeningDifficulty = (typeof difficultyEnum.enumValues)[number];

export type ListeningLessonListItem = {
  id: string;
  slug: string;
  title: string;
  difficulty: ListeningDifficulty;
  durationSeconds: number;
  isCompleted: boolean;
};

export type ListeningLessonDetail = {
  id: string;
  slug: string;
  title: string;
  difficulty: ListeningDifficulty;
  durationSeconds: number;
  audioUrl: string;
  transcript: string;
  quizId: string | null;
  quiz: QuizForAttempt | null;
  isCompleted: boolean;
};

/** Optional timed transcript cue: `[mm:ss] text` or `[m:ss] text` per line. */
export type TranscriptCue = {
  startSeconds: number;
  text: string;
};
