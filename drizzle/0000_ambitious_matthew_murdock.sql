CREATE TYPE "public"."cefr_level" AS ENUM('A1', 'A2', 'B1', 'B2', 'C1');--> statement-breakpoint
CREATE TYPE "public"."difficulty" AS ENUM('easy', 'medium', 'hard');--> statement-breakpoint
CREATE TYPE "public"."part_of_speech" AS ENUM('noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection', 'phrase', 'phrasal_verb');--> statement-breakpoint
CREATE TYPE "public"."progress_status" AS ENUM('not_started', 'in_progress', 'completed');--> statement-breakpoint
CREATE TYPE "public"."question_type" AS ENUM('multiple_choice', 'true_false', 'fill_blank');--> statement-breakpoint
CREATE TYPE "public"."reveal_mode" AS ENUM('immediate', 'after_submit');--> statement-breakpoint
CREATE TYPE "public"."skill" AS ENUM('vocabulary', 'grammar', 'listening', 'reading', 'speaking');--> statement-breakpoint
CREATE TABLE "courses" (
	"id" uuid PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"level" "cefr_level" NOT NULL,
	"category" text NOT NULL,
	"lesson_count" integer DEFAULT 0 NOT NULL,
	"estimated_minutes" integer NOT NULL,
	"cover_color" text DEFAULT 'blue' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "courses_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "grammar_topics" (
	"id" uuid PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"level" "cefr_level" NOT NULL,
	"summary" text NOT NULL,
	"content" jsonb NOT NULL,
	"quiz_id" uuid,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "grammar_topics_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"cefr_level" "cefr_level",
	"daily_goal_minutes" integer DEFAULT 20 NOT NULL,
	"preferred_learning_time" text,
	"timezone" text DEFAULT 'Asia/Ho_Chi_Minh' NOT NULL,
	"onboarded_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "lessons" (
	"id" uuid PRIMARY KEY NOT NULL,
	"course_id" uuid NOT NULL,
	"order_index" integer NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"skill" "skill" NOT NULL,
	"estimated_minutes" integer NOT NULL,
	"content" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "lessons_slug_unique" UNIQUE("slug"),
	CONSTRAINT "lessons_course_order_unique" UNIQUE("course_id","order_index")
);
--> statement-breakpoint
CREATE TABLE "lesson_vocabularies" (
	"id" uuid PRIMARY KEY NOT NULL,
	"lesson_id" uuid NOT NULL,
	"vocabulary_id" uuid NOT NULL,
	"order_index" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "lesson_vocabularies_lesson_vocab_unique" UNIQUE("lesson_id","vocabulary_id")
);
--> statement-breakpoint
CREATE TABLE "user_vocabularies" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"vocabulary_id" uuid NOT NULL,
	"saved_at" timestamp with time zone DEFAULT now() NOT NULL,
	"is_learned" boolean DEFAULT false NOT NULL,
	"learned_at" timestamp with time zone,
	"last_reviewed_at" timestamp with time zone,
	"review_count" integer DEFAULT 0 NOT NULL,
	"next_review_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_vocabularies_user_vocab_unique" UNIQUE("user_id","vocabulary_id")
);
--> statement-breakpoint
CREATE TABLE "vocabularies" (
	"id" uuid PRIMARY KEY NOT NULL,
	"word" text NOT NULL,
	"pronunciation" text NOT NULL,
	"phonetic" text NOT NULL,
	"part_of_speech" "part_of_speech" NOT NULL,
	"meaning" text NOT NULL,
	"example_sentence" text NOT NULL,
	"audio_url" text,
	"difficulty" "difficulty" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "vocabularies_word_unique" UNIQUE("word")
);
--> statement-breakpoint
CREATE TABLE "quiz_answers" (
	"id" uuid PRIMARY KEY NOT NULL,
	"question_id" uuid NOT NULL,
	"order_index" integer NOT NULL,
	"content" text NOT NULL,
	"is_correct" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "quiz_answers_question_order_unique" UNIQUE("question_id","order_index")
);
--> statement-breakpoint
CREATE TABLE "quiz_attempts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"quiz_id" uuid NOT NULL,
	"score" integer NOT NULL,
	"total_questions" integer NOT NULL,
	"correct_count" integer NOT NULL,
	"time_spent_seconds" integer NOT NULL,
	"answers" jsonb NOT NULL,
	"started_at" timestamp with time zone NOT NULL,
	"completed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz_questions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"quiz_id" uuid NOT NULL,
	"order_index" integer NOT NULL,
	"type" "question_type" NOT NULL,
	"prompt" text NOT NULL,
	"explanation" text NOT NULL,
	"points" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "quiz_questions_quiz_order_unique" UNIQUE("quiz_id","order_index")
);
--> statement-breakpoint
CREATE TABLE "quizzes" (
	"id" uuid PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"reveal_mode" "reveal_mode" DEFAULT 'after_submit' NOT NULL,
	"pass_score" integer DEFAULT 70 NOT NULL,
	"time_limit_seconds" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "quizzes_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "listening_lessons" (
	"id" uuid PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"difficulty" "difficulty" NOT NULL,
	"duration_seconds" integer NOT NULL,
	"audio_url" text NOT NULL,
	"transcript" text NOT NULL,
	"quiz_id" uuid,
	"course_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "listening_lessons_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "user_achievements" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"achievement_key" text NOT NULL,
	"unlocked_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_achievements_user_key_unique" UNIQUE("user_id","achievement_key")
);
--> statement-breakpoint
CREATE TABLE "user_daily_activity" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"activity_date" date NOT NULL,
	"minutes" integer DEFAULT 0 NOT NULL,
	"lessons_completed" integer DEFAULT 0 NOT NULL,
	"words_saved" integer DEFAULT 0 NOT NULL,
	"quizzes_completed" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_daily_activity_user_date_unique" UNIQUE("user_id","activity_date")
);
--> statement-breakpoint
CREATE TABLE "user_progress" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"lesson_id" uuid NOT NULL,
	"status" "progress_status" DEFAULT 'not_started' NOT NULL,
	"progress_percent" integer DEFAULT 0 NOT NULL,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_progress_user_lesson_unique" UNIQUE("user_id","lesson_id")
);
--> statement-breakpoint
CREATE TABLE "placement_test_attempts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"placement_test_id" uuid NOT NULL,
	"score" integer NOT NULL,
	"estimated_level" "cefr_level" NOT NULL,
	"answers" jsonb NOT NULL,
	"started_at" timestamp with time zone NOT NULL,
	"completed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "placement_test_questions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"placement_test_id" uuid NOT NULL,
	"order_index" integer NOT NULL,
	"level" "cefr_level" NOT NULL,
	"type" "question_type" NOT NULL,
	"prompt" text NOT NULL,
	"options" jsonb NOT NULL,
	"explanation" text NOT NULL,
	"points" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "placement_test_questions_test_order_unique" UNIQUE("placement_test_id","order_index")
);
--> statement-breakpoint
CREATE TABLE "placement_tests" (
	"id" uuid PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "placement_tests_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "grammar_topics" ADD CONSTRAINT "grammar_topics_quiz_id_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_vocabularies" ADD CONSTRAINT "lesson_vocabularies_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lesson_vocabularies" ADD CONSTRAINT "lesson_vocabularies_vocabulary_id_vocabularies_id_fk" FOREIGN KEY ("vocabulary_id") REFERENCES "public"."vocabularies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_vocabularies" ADD CONSTRAINT "user_vocabularies_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_vocabularies" ADD CONSTRAINT "user_vocabularies_vocabulary_id_vocabularies_id_fk" FOREIGN KEY ("vocabulary_id") REFERENCES "public"."vocabularies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_answers" ADD CONSTRAINT "quiz_answers_question_id_quiz_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."quiz_questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_attempts" ADD CONSTRAINT "quiz_attempts_quiz_id_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_questions" ADD CONSTRAINT "quiz_questions_quiz_id_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listening_lessons" ADD CONSTRAINT "listening_lessons_quiz_id_quizzes_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quizzes"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listening_lessons" ADD CONSTRAINT "listening_lessons_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_daily_activity" ADD CONSTRAINT "user_daily_activity_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_lesson_id_lessons_id_fk" FOREIGN KEY ("lesson_id") REFERENCES "public"."lessons"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "placement_test_attempts" ADD CONSTRAINT "placement_test_attempts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "placement_test_attempts" ADD CONSTRAINT "placement_test_attempts_placement_test_id_placement_tests_id_fk" FOREIGN KEY ("placement_test_id") REFERENCES "public"."placement_tests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "placement_test_questions" ADD CONSTRAINT "placement_test_questions_placement_test_id_placement_tests_id_fk" FOREIGN KEY ("placement_test_id") REFERENCES "public"."placement_tests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "lesson_vocabularies_lesson_idx" ON "lesson_vocabularies" USING btree ("lesson_id");--> statement-breakpoint
CREATE INDEX "user_vocabularies_user_learned_idx" ON "user_vocabularies" USING btree ("user_id","is_learned");--> statement-breakpoint
CREATE INDEX "vocabularies_word_idx" ON "vocabularies" USING btree ("word");--> statement-breakpoint
CREATE INDEX "quiz_answers_question_idx" ON "quiz_answers" USING btree ("question_id");--> statement-breakpoint
CREATE INDEX "quiz_attempts_user_idx" ON "quiz_attempts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "quiz_questions_quiz_idx" ON "quiz_questions" USING btree ("quiz_id");--> statement-breakpoint
CREATE INDEX "user_daily_activity_user_idx" ON "user_daily_activity" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_progress_user_idx" ON "user_progress" USING btree ("user_id");