DROP INDEX "quiz_attempts_user_idx";--> statement-breakpoint
DROP INDEX "user_daily_activity_user_idx";--> statement-breakpoint
DROP INDEX "user_progress_user_idx";--> statement-breakpoint
CREATE INDEX "quiz_attempts_user_completed_idx" ON "quiz_attempts" USING btree ("user_id","completed_at");--> statement-breakpoint
CREATE INDEX "user_progress_user_status_idx" ON "user_progress" USING btree ("user_id","status");