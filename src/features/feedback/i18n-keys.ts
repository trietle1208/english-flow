import type { FeedbackCategory, FeedbackStatus } from "./constants";

export type FeedbackCategoryMessageKey =
  | "idea"
  | "bug"
  | "content"
  | "review"
  | "other";

export type FeedbackStatusMessageKey =
  | "received"
  | "reviewing"
  | "planned"
  | "done"
  | "closed";

export function feedbackCategoryMessageKey(
  category: FeedbackCategory,
): FeedbackCategoryMessageKey {
  if (category === "suggestion") {
    return "idea";
  }
  return category;
}

export function feedbackStatusMessageKey(
  status: FeedbackStatus,
): FeedbackStatusMessageKey {
  const map: Record<FeedbackStatus, FeedbackStatusMessageKey> = {
    new: "received",
    reviewing: "reviewing",
    planned: "planned",
    resolved: "done",
    declined: "closed",
  };
  return map[status];
}
