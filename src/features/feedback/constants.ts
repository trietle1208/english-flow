export const FEEDBACK_CATEGORIES = [
  "suggestion",
  "bug",
  "content",
  "review",
  "other",
] as const;

export type FeedbackCategory = (typeof FEEDBACK_CATEGORIES)[number];

export const FEEDBACK_CATEGORY_LABELS: Record<FeedbackCategory, string> = {
  suggestion: "Ý tưởng",
  bug: "Lỗi",
  content: "Nội dung",
  review: "Đánh giá",
  other: "Khác",
};

export const FEEDBACK_STATUSES = [
  "new",
  "reviewing",
  "planned",
  "resolved",
  "declined",
] as const;

export type FeedbackStatus = (typeof FEEDBACK_STATUSES)[number];

export const FEEDBACK_STATUS_LABELS: Record<FeedbackStatus, string> = {
  new: "Đã nhận",
  reviewing: "Đang xem",
  planned: "Dự kiến làm",
  resolved: "Đã xử lý",
  declined: "Đóng",
};

export const PUBLIC_REVIEW_LIMIT = 12;
export const MY_FEEDBACK_LIMIT = 50;
