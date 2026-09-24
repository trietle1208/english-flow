import type { FeedbackCategory, FeedbackStatus } from "./constants";

export type FeedbackItem = {
  id: string;
  category: FeedbackCategory;
  rating: number | null;
  title: string;
  message: string;
  isPublic: boolean;
  status: FeedbackStatus;
  createdAt: Date;
};

export type PublicReview = {
  id: string;
  category: FeedbackCategory;
  rating: number | null;
  title: string;
  message: string;
  createdAt: Date;
  authorName: string;
};
