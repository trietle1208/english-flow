import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { feedbacks, users } from "@/db/schema";
import {
  MY_FEEDBACK_LIMIT,
  PUBLIC_REVIEW_LIMIT,
  type FeedbackCategory,
  type FeedbackStatus,
} from "./constants";
import type { FeedbackItem, PublicReview } from "./types";

function isFeedbackCategory(value: string): value is FeedbackCategory {
  return (
    value === "suggestion" ||
    value === "bug" ||
    value === "content" ||
    value === "review" ||
    value === "other"
  );
}

function isFeedbackStatus(value: string): value is FeedbackStatus {
  return (
    value === "new" ||
    value === "reviewing" ||
    value === "planned" ||
    value === "resolved" ||
    value === "declined"
  );
}

function toFeedbackItem(row: {
  id: string;
  category: string;
  rating: number | null;
  title: string;
  message: string;
  isPublic: boolean;
  status: string;
  createdAt: Date;
}): FeedbackItem | null {
  if (!isFeedbackCategory(row.category) || !isFeedbackStatus(row.status)) {
    return null;
  }
  return {
    id: row.id,
    category: row.category,
    rating: row.rating,
    title: row.title,
    message: row.message,
    isPublic: row.isPublic,
    status: row.status,
    createdAt: row.createdAt,
  };
}

/** The signed-in user's own submissions, newest first. */
export async function listMyFeedback(userId: string): Promise<FeedbackItem[]> {
  const rows = await db
    .select({
      id: feedbacks.id,
      category: feedbacks.category,
      rating: feedbacks.rating,
      title: feedbacks.title,
      message: feedbacks.message,
      isPublic: feedbacks.isPublic,
      status: feedbacks.status,
      createdAt: feedbacks.createdAt,
    })
    .from(feedbacks)
    .where(eq(feedbacks.userId, userId))
    .orderBy(desc(feedbacks.createdAt))
    .limit(MY_FEEDBACK_LIMIT);

  return rows.flatMap((row) => {
    const item = toFeedbackItem(row);
    return item ? [item] : [];
  });
}

/** Recent notes other learners chose to share. Never returns email. */
export async function listPublicReviews(
  limit = PUBLIC_REVIEW_LIMIT,
): Promise<PublicReview[]> {
  const safeLimit =
    Number.isFinite(limit) && limit > 0
      ? Math.min(Math.floor(limit), PUBLIC_REVIEW_LIMIT)
      : PUBLIC_REVIEW_LIMIT;

  const rows = await db
    .select({
      id: feedbacks.id,
      category: feedbacks.category,
      rating: feedbacks.rating,
      title: feedbacks.title,
      message: feedbacks.message,
      createdAt: feedbacks.createdAt,
      authorName: users.name,
    })
    .from(feedbacks)
    .innerJoin(users, eq(users.id, feedbacks.userId))
    .where(eq(feedbacks.isPublic, true))
    .orderBy(desc(feedbacks.createdAt))
    .limit(safeLimit);

  return rows.flatMap((row) => {
    if (!isFeedbackCategory(row.category)) return [];
    return [
      {
        id: row.id,
        category: row.category,
        rating: row.rating,
        title: row.title,
        message: row.message,
        createdAt: row.createdAt,
        authorName: row.authorName,
      },
    ];
  });
}
