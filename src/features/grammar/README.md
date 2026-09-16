# features/grammar

Grammar topic catalog and detail (Phase 10/15 + Phase 16 Prompt 1–4 + Phase 17 content).

## Schema

`grammar_topics` + lessons / rules / examples / mistakes / relations /
`content_sources` / `user_grammar_progress`. Exercises stay on shared `quizzes`
+ `QuizRunner` (`quiz_id` on topic).

## Seed (Phase 17)

- ~17 published topics (CEFR-J-informed order) in `src/db/seed-data/grammar.ts` +
  `grammar-topics-extra.ts`
- Provenance: `grammar-sources.ts` → EnglishFlow / CEFR-J / Tatoeba / TALPCo
- ≥50% of new-topic examples attributed (Tatoeba / TALPCo) with `source_record_id`

## Data layer (Prompt 2 / AD-06)

- `learner.ts` — `ExerciseForLearner` / `ExerciseWithAnswer` + `toLearnerExercise()`
  (strips `isCorrect`, seeded option shuffle). **Never** pass `ExerciseWithAnswer`
  into Client Components.
- `queries.ts` — list / detail (id + slug + param) / examples / learner exercises /
  search (FTS + `pg_trgm`) / progress / recommendations
- `actions.ts` — Server Action wrappers (`requireUser` + Zod)
- `progress.ts` — upsert mastery after grammar quiz submit (same transaction as
  `quiz_attempts` in `features/quiz/actions.ts`)
- `mastery.ts` — weighted last-10 score → `mastery_score` 0–1
- `recommendations.ts` — unlock (prereq mastery ≥ 0.8) + CEFR fit + weak-first rank

Progress badges on the catalog still also derive from `quiz_attempts` (Weak /
Practiced / Mastered).

## UI (Prompt 3–4 + Phase 17)

- `/grammar` — VI titles + EN subtitle, CEFR / category / status / search filters
  (URL searchParams), progress bar on cards, **Gợi ý học tiếp** block
- `/grammar/[slug]` — tabs **Lý thuyết | Ví dụ | Bài tập** (UUID param still works)
- Ví dụ tab shows a short attribution caption when the example source is
  Tatoeba / TALPCo (not EnglishFlow original)
- `/grammar/[slug]/practice` — `ExerciseForLearner` → `QuizRunner` practiceMode
  (one question / screen, wrong → related rule + sample example, summary + retry)
- `loading.tsx` + `error.tsx` on catalog, topic, and practice routes
