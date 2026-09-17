ALTER TABLE "vocabularies" ADD COLUMN "topic" text;--> statement-breakpoint
CREATE INDEX "vocabularies_catalog_source_topic_idx" ON "vocabularies" USING btree ("catalog_source","topic");
