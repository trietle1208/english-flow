CREATE TYPE "public"."grammar_content_status" AS ENUM('draft', 'review', 'published');--> statement-breakpoint
CREATE TYPE "public"."grammar_relation_type" AS ENUM('prerequisite', 'related', 'confused_with');--> statement-breakpoint
CREATE TYPE "public"."content_license_code" AS ENUM('PRODUCTION_ALLOWED', 'ATTRIBUTION_REQUIRED', 'RESEARCH_ONLY', 'UNKNOWN', 'DO_NOT_USE');--> statement-breakpoint
CREATE TABLE "content_sources" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"url" text,
	"license_code" "content_license_code" NOT NULL,
	"attribution_text" text,
	"source_version" text,
	"imported_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grammar_topic_relations" (
	"id" uuid PRIMARY KEY NOT NULL,
	"from_topic_id" uuid NOT NULL,
	"to_topic_id" uuid NOT NULL,
	"relation_type" "grammar_relation_type" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "grammar_topic_relations_unique" UNIQUE("from_topic_id","to_topic_id","relation_type"),
	CONSTRAINT "grammar_topic_relations_no_self" CHECK ("from_topic_id" <> "to_topic_id")
);
--> statement-breakpoint
CREATE TABLE "grammar_rules" (
	"id" uuid PRIMARY KEY NOT NULL,
	"topic_id" uuid NOT NULL,
	"title_en" text NOT NULL,
	"title_vi" text NOT NULL,
	"pattern" text NOT NULL,
	"explanation_vi" text NOT NULL,
	"order_index" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grammar_lessons" (
	"id" uuid PRIMARY KEY NOT NULL,
	"topic_id" uuid NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"body" jsonb NOT NULL,
	"status" "grammar_content_status" DEFAULT 'draft' NOT NULL,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "grammar_lessons_topic_version_unique" UNIQUE("topic_id","version")
);
--> statement-breakpoint
CREATE TABLE "grammar_examples" (
	"id" uuid PRIMARY KEY NOT NULL,
	"topic_id" uuid NOT NULL,
	"rule_id" uuid,
	"sentence_en" text NOT NULL,
	"sentence_vi" text NOT NULL,
	"highlights" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"cefr_level" "cefr_level" NOT NULL,
	"difficulty" smallint DEFAULT 1 NOT NULL,
	"source_id" uuid,
	"source_record_id" text,
	"normalized_hash" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "grammar_examples_difficulty_check" CHECK ("difficulty" >= 1 AND "difficulty" <= 5)
);
--> statement-breakpoint
CREATE TABLE "grammar_mistakes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"topic_id" uuid NOT NULL,
	"incorrect_sentence" text NOT NULL,
	"correct_sentence" text NOT NULL,
	"error_type" text NOT NULL,
	"explanation_vi" text NOT NULL,
	"severity" smallint DEFAULT 1 NOT NULL,
	"cefr_level" "cefr_level" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "grammar_mistakes_severity_check" CHECK ("severity" >= 1 AND "severity" <= 3),
	CONSTRAINT "grammar_mistakes_error_type_check" CHECK ("error_type" in ('article','preposition','verb_tense','subject_verb_agreement','plural','pronoun','word_form','word_order','modal','conditional','passive','relative_clause','gerund_infinitive','other'))
);
--> statement-breakpoint
CREATE TABLE "user_grammar_progress" (
	"user_id" uuid NOT NULL,
	"topic_id" uuid NOT NULL,
	"attempt_count" integer DEFAULT 0 NOT NULL,
	"correct_count" integer DEFAULT 0 NOT NULL,
	"mastery_score" numeric(4, 3) DEFAULT '0' NOT NULL,
	"last_attempt_at" timestamp with time zone,
	"next_review_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_grammar_progress_user_id_topic_id_pk" PRIMARY KEY("user_id","topic_id"),
	CONSTRAINT "user_grammar_progress_mastery_check" CHECK ("mastery_score" >= 0 AND "mastery_score" <= 1)
);
--> statement-breakpoint
ALTER TABLE "grammar_topics" ADD COLUMN "title_en" text;--> statement-breakpoint
ALTER TABLE "grammar_topics" ADD COLUMN "title_vi" text;--> statement-breakpoint
ALTER TABLE "grammar_topics" ADD COLUMN "category" text;--> statement-breakpoint
ALTER TABLE "grammar_topics" ADD COLUMN "parent_id" uuid;--> statement-breakpoint
ALTER TABLE "grammar_topics" ADD COLUMN "order_index" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "grammar_topics" ADD COLUMN "summary_vi" text;--> statement-breakpoint
ALTER TABLE "grammar_topics" ADD COLUMN "status" "grammar_content_status" DEFAULT 'draft' NOT NULL;--> statement-breakpoint
ALTER TABLE "grammar_topics" ADD COLUMN "deleted_at" timestamp with time zone;--> statement-breakpoint
UPDATE "grammar_topics" SET
	"title_en" = "title",
	"title_vi" = "title",
	"summary_vi" = "summary",
	"order_index" = "sort_order",
	"category" = 'verb_tenses',
	"status" = 'published'
WHERE "title_en" IS NULL;--> statement-breakpoint
ALTER TABLE "grammar_topics" ALTER COLUMN "title_en" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "grammar_topics" ALTER COLUMN "title_vi" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "grammar_topics" ALTER COLUMN "summary_vi" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "grammar_topics" ALTER COLUMN "category" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "grammar_topics" DROP COLUMN "title";--> statement-breakpoint
ALTER TABLE "grammar_topics" DROP COLUMN "summary";--> statement-breakpoint
ALTER TABLE "grammar_topics" DROP COLUMN "content";--> statement-breakpoint
ALTER TABLE "grammar_topics" DROP COLUMN "sort_order";--> statement-breakpoint
ALTER TABLE "grammar_topics" ADD CONSTRAINT "grammar_topics_category_check" CHECK ("category" in ('verb_tenses','articles','clauses','modals','prepositions','other'));--> statement-breakpoint
ALTER TABLE "grammar_topics" ADD CONSTRAINT "grammar_topics_parent_id_grammar_topics_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."grammar_topics"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grammar_topic_relations" ADD CONSTRAINT "grammar_topic_relations_from_topic_id_grammar_topics_id_fk" FOREIGN KEY ("from_topic_id") REFERENCES "public"."grammar_topics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grammar_topic_relations" ADD CONSTRAINT "grammar_topic_relations_to_topic_id_grammar_topics_id_fk" FOREIGN KEY ("to_topic_id") REFERENCES "public"."grammar_topics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grammar_rules" ADD CONSTRAINT "grammar_rules_topic_id_grammar_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."grammar_topics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grammar_lessons" ADD CONSTRAINT "grammar_lessons_topic_id_grammar_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."grammar_topics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grammar_examples" ADD CONSTRAINT "grammar_examples_topic_id_grammar_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."grammar_topics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grammar_examples" ADD CONSTRAINT "grammar_examples_rule_id_grammar_rules_id_fk" FOREIGN KEY ("rule_id") REFERENCES "public"."grammar_rules"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grammar_examples" ADD CONSTRAINT "grammar_examples_source_id_content_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."content_sources"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grammar_mistakes" ADD CONSTRAINT "grammar_mistakes_topic_id_grammar_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."grammar_topics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_grammar_progress" ADD CONSTRAINT "user_grammar_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_grammar_progress" ADD CONSTRAINT "user_grammar_progress_topic_id_grammar_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."grammar_topics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "grammar_topics_slug_idx" ON "grammar_topics" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "grammar_topics_level_category_idx" ON "grammar_topics" USING btree ("level","category");--> statement-breakpoint
CREATE INDEX "grammar_rules_topic_idx" ON "grammar_rules" USING btree ("topic_id");--> statement-breakpoint
CREATE INDEX "grammar_lessons_topic_status_idx" ON "grammar_lessons" USING btree ("topic_id","status");--> statement-breakpoint
CREATE INDEX "grammar_examples_topic_idx" ON "grammar_examples" USING btree ("topic_id");--> statement-breakpoint
CREATE INDEX "grammar_examples_normalized_hash_idx" ON "grammar_examples" USING btree ("normalized_hash");--> statement-breakpoint
CREATE INDEX "grammar_mistakes_topic_idx" ON "grammar_mistakes" USING btree ("topic_id");--> statement-breakpoint
CREATE INDEX "user_grammar_progress_user_idx" ON "user_grammar_progress" USING btree ("user_id");
