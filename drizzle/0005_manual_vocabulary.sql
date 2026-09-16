ALTER TABLE "vocabularies" ADD COLUMN "is_manual" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "vocabularies" ADD COLUMN "created_by_user_id" uuid;--> statement-breakpoint
ALTER TABLE "vocabularies" DROP CONSTRAINT "vocabularies_word_unique";--> statement-breakpoint
ALTER TABLE "vocabularies" ADD CONSTRAINT "vocabularies_created_by_user_id_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "vocabularies_catalog_word_unique" ON "vocabularies" USING btree ("word") WHERE "is_manual" = false;--> statement-breakpoint
CREATE UNIQUE INDEX "vocabularies_manual_word_creator_unique" ON "vocabularies" USING btree ("word","created_by_user_id") WHERE "is_manual" = true;--> statement-breakpoint
ALTER TABLE "vocabularies" ADD CONSTRAINT "vocabularies_manual_creator_check" CHECK (
  ("is_manual" = false AND "created_by_user_id" IS NULL)
  OR ("is_manual" = true AND "created_by_user_id" IS NOT NULL)
);
