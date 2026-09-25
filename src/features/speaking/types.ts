import type { cefrLevelEnum, difficultyEnum } from "@/db/schema/enums";

export type SpeakingCefrLevel = (typeof cefrLevelEnum.enumValues)[number];
export type SpeakingDifficulty = (typeof difficultyEnum.enumValues)[number];

export type SpeakingPromptListItem = {
  id: string;
  slug: string;
  title: string;
  cefrLevel: SpeakingCefrLevel;
  difficulty: SpeakingDifficulty;
  lastOverlapPercent: number | null;
  attemptCount: number;
};

export type SpeakingAttemptSummary = {
  recognizedText: string;
  overlapPercent: number;
  createdAt: Date;
};

export type SpeakingPromptDetail = {
  id: string;
  slug: string;
  title: string;
  promptText: string;
  cefrLevel: SpeakingCefrLevel;
  difficulty: SpeakingDifficulty;
  audioUrl: string | null;
  lastAttempt: SpeakingAttemptSummary | null;
};
