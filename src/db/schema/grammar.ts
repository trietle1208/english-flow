import { integer, jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { z } from "zod";
import { id, timestamps } from "./columns.helpers";
import { cefrLevelEnum } from "./enums";
import { quizzes } from "./quizzes";

/** Shape of `grammar_topics.content` — rules, examples and common mistakes for the topic (spec §17). */
export const grammarContentSchema = z.object({
  rules: z.array(z.string().min(1)).min(1),
  examples: z.array(z.object({ en: z.string().min(1), vi: z.string().min(1) })).min(1),
  commonMistakes: z
    .array(z.object({ mistake: z.string().min(1), correction: z.string().min(1) }))
    .min(1),
});
export type GrammarContent = z.infer<typeof grammarContentSchema>;

/** A grammar topic detail page (spec §17): explanation + rules + examples + common mistakes + an optional mini quiz. */
export const grammarTopics = pgTable("grammar_topics", {
  id: id(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  level: cefrLevelEnum("level").notNull(),
  summary: text("summary").notNull(),
  content: jsonb("content").$type<GrammarContent>().notNull(),
  quizId: uuid("quiz_id").references(() => quizzes.id, { onDelete: "set null" }),
  sortOrder: integer("sort_order").notNull().default(0),
  ...timestamps,
});
