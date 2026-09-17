ALTER TABLE "user_vocabularies" ADD COLUMN "is_pinned" boolean DEFAULT false NOT NULL;--> statement-breakpoint
CREATE INDEX "user_vocabularies_user_pinned_idx" ON "user_vocabularies" USING btree ("user_id","is_pinned");
