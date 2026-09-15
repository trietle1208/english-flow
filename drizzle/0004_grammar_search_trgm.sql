CREATE EXTENSION IF NOT EXISTS pg_trgm;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "grammar_topics_title_en_trgm_idx" ON "grammar_topics" USING gin ("title_en" gin_trgm_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "grammar_topics_title_vi_trgm_idx" ON "grammar_topics" USING gin ("title_vi" gin_trgm_ops);--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "grammar_topics_summary_vi_trgm_idx" ON "grammar_topics" USING gin ("summary_vi" gin_trgm_ops);
