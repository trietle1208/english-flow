CREATE TABLE "speaking_prompts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"prompt_text" text NOT NULL,
	"cefr_level" "cefr_level" NOT NULL,
	"difficulty" "difficulty" NOT NULL,
	"audio_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "speaking_prompts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "user_speaking_attempts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"prompt_id" uuid NOT NULL,
	"recognized_text" text NOT NULL,
	"overlap_percent" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_speaking_attempts" ADD CONSTRAINT "user_speaking_attempts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_speaking_attempts" ADD CONSTRAINT "user_speaking_attempts_prompt_id_speaking_prompts_id_fk" FOREIGN KEY ("prompt_id") REFERENCES "public"."speaking_prompts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_speaking_attempts_user_prompt_created_idx" ON "user_speaking_attempts" USING btree ("user_id","prompt_id","created_at");
