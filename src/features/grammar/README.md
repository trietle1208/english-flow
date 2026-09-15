# features/grammar

Grammar topic catalog and detail (Phase 10/15 + Phase 16 Prompt 1–3).

## Schema

`grammar_topics` + lessons / rules / examples / mistakes / relations /
`content_sources` / `user_grammar_progress`. Exercises stay on shared `quizzes`
+ `QuizRunner` (`quiz_id` on topic).

## Data layer (Prompt 2 / AD-06)

- `learner.ts` — `ExerciseForLearner` / `ExerciseWithAnswer` + `toLearnerExercise()`
  (strips `isCorrect`, seeded option shuffle). **Never** pass `ExerciseWithAnswer`
  into Client Components.
- `queries.ts` — list / detail (id + slug + param) / examples / learner exercises /
  search (FTS + `pg_trgm`) / progress
- `actions.ts` — Server Action wrappers (`requireUser` + Zod)
- `progress.ts` — upsert mastery after grammar quiz submit (same transaction as
  `quiz_attempts` in `features/quiz/actions.ts`)
- `mastery.ts` — weighted last-10 score → `mastery_score` 0–1

Progress badges on the catalog still also derive from `quiz_attempts` (Weak /
Practiced / Mastered).

## UI (Prompt 3)

- `/grammar` — VI titles + EN subtitle, CEFR / category / status / search filters
  (URL searchParams), progress bar on cards
- `/grammar/[slug]` — tabs **Lý thuyết | Ví dụ | Bài tập** (UUID param still works)
- `/grammar/[slug]/practice` — `ExerciseForLearner` → `QuizRunner` practiceMode
  (one question / screen, wrong → related rule + sample example, summary + retry)
- `loading.tsx` + `error.tsx` on catalog, topic, and practice routes
