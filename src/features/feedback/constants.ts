export const FEEDBACK_CATEGORIES = [
  "suggestion",
  "bug",
  "content",
  "review",
  "other",
] as const;

export type FeedbackCategory = (typeof FEEDBACK_CATEGORIES)[number];

export const FEEDBACK_STATUSES = [
  "new",
  "reviewing",
  "planned",
  "resolved",
  "declined",
] as const;

export type FeedbackStatus = (typeof FEEDBACK_STATUSES)[number];

export const PUBLIC_REVIEW_LIMIT = 12;
export const MY_FEEDBACK_LIMIT = 50;
