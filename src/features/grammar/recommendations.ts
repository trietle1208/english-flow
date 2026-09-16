import { CEFR_LEVELS, type CefrLevel } from "@/config/cefr";

/** Prerequisite must reach this mastery before a dependent topic is unlocked. */
export const PREREQUISITE_MASTERY_THRESHOLD = 0.8;

/** Topics at or above this are treated as done for “next topic” suggestions. */
export const RECOMMENDATION_MASTERED_THRESHOLD = 0.8;

export type RecommendableTopic = {
  id: string;
  slug: string;
  titleEn: string;
  titleVi: string;
  level: CefrLevel;
  summaryVi: string;
  orderIndex: number;
  /** 0–1 from `user_grammar_progress`; 0 when never practiced. */
  masteryScore: number;
  /** Topic ids that must be mastered first (`prerequisite` edges into this topic). */
  prerequisiteIds: string[];
};

export type GrammarRecommendationReason =
  | "weak"
  | "cefr_match"
  | "unlocked"
  | "continue";

export type GrammarRecommendation = RecommendableTopic & {
  reason: GrammarRecommendationReason;
  /** Short Vietnamese label for the UI. */
  reasonLabel: string;
};

type RankOptions = {
  userCefrLevel: CefrLevel | null;
  /** Max suggestions to return (default 4). */
  limit?: number;
};

function cefrIndex(level: CefrLevel): number {
  return CEFR_LEVELS.indexOf(level);
}

/**
 * CEFR proximity: 0 = exact match, 1 = adjacent, … higher = farther.
 * Missing user level → treat every topic equally (0).
 */
export function cefrDistance(
  topicLevel: CefrLevel,
  userLevel: CefrLevel | null,
): number {
  if (!userLevel) {
    return 0;
  }
  return Math.abs(cefrIndex(topicLevel) - cefrIndex(userLevel));
}

export function prerequisitesMet(
  topic: Pick<RecommendableTopic, "prerequisiteIds">,
  masteryByTopicId: Map<string, number>,
  threshold = PREREQUISITE_MASTERY_THRESHOLD,
): boolean {
  return topic.prerequisiteIds.every(
    (id) => (masteryByTopicId.get(id) ?? 0) >= threshold,
  );
}

function pickReason(
  topic: RecommendableTopic,
  userCefrLevel: CefrLevel | null,
): GrammarRecommendationReason {
  if (topic.masteryScore > 0 && topic.masteryScore < RECOMMENDATION_MASTERED_THRESHOLD) {
    return "weak";
  }
  if (userCefrLevel && topic.level === userCefrLevel) {
    return "cefr_match";
  }
  if (topic.prerequisiteIds.length > 0) {
    return "unlocked";
  }
  return "continue";
}

const REASON_LABELS: Record<GrammarRecommendationReason, string> = {
  weak: "Đang yếu — nên luyện lại",
  cefr_match: "Phù hợp trình độ của bạn",
  unlocked: "Đã mở khóa điều kiện tiên quyết",
  continue: "Gợi ý học tiếp",
};

/**
 * Rank unlocked, not-yet-mastered topics: prefer weak mastery, then CEFR fit,
 * then catalog order. Pure helper — no DB (Prompt 4).
 */
export function rankGrammarRecommendations(
  topics: RecommendableTopic[],
  options: RankOptions,
): GrammarRecommendation[] {
  const limit = options.limit ?? 4;
  const masteryByTopicId = new Map(
    topics.map((topic) => [topic.id, topic.masteryScore] as const),
  );

  const eligible = topics.filter(
    (topic) =>
      topic.masteryScore < RECOMMENDATION_MASTERED_THRESHOLD &&
      prerequisitesMet(topic, masteryByTopicId),
  );

  eligible.sort((a, b) => {
    // Lower mastery first (weak / not started).
    if (a.masteryScore !== b.masteryScore) {
      return a.masteryScore - b.masteryScore;
    }
    const distA = cefrDistance(a.level, options.userCefrLevel);
    const distB = cefrDistance(b.level, options.userCefrLevel);
    if (distA !== distB) {
      return distA - distB;
    }
    return a.orderIndex - b.orderIndex;
  });

  return eligible.slice(0, limit).map((topic) => {
    const reason = pickReason(topic, options.userCefrLevel);
    return {
      ...topic,
      reason,
      reasonLabel: REASON_LABELS[reason],
    };
  });
}
