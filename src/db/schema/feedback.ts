import { boolean, index, integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "./columns.helpers";
import { feedbackCategoryEnum, feedbackStatusEnum } from "./enums";
import { users } from "./users";

/**
 * Product reviews and suggestions from signed-in learners (Góp Ý).
 * Content is never copied from other tables — this is the source of truth.
 */
export const feedbacks = pgTable(
  "feedbacks",
  {
    id: id(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    category: feedbackCategoryEnum("category").notNull(),
    /** 1–5 stars; required in Zod when category is `review`. */
    rating: integer("rating"),
    title: text("title").notNull(),
    message: text("message").notNull(),
    isPublic: boolean("is_public").notNull().default(false),
    status: feedbackStatusEnum("status").notNull().default("new"),
    ...timestamps,
  },
  (table) => [
    index("feedbacks_user_id_idx").on(table.userId),
    index("feedbacks_status_idx").on(table.status),
    index("feedbacks_public_created_idx").on(table.isPublic, table.createdAt),
  ],
);
