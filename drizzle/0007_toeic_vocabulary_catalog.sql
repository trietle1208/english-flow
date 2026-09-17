ALTER TABLE "vocabularies" ADD COLUMN "catalog_source" text;--> statement-breakpoint
CREATE INDEX "vocabularies_catalog_source_idx" ON "vocabularies" USING btree ("catalog_source");
