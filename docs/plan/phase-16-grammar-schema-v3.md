# Phase 16 — Grammar Schema v3 (normalized)

> Adapted from `grammar-feature-prompt-v3-nextjs.md`.
> Decisions (user): **C** full replace of grammar content model; **keep** shared
> `QuizRunner` / `quiz_attempts`; **AD-06** Server Actions (no `/api/grammar/*`).

## Mục tiêu

Chuẩn hóa nội dung ngữ pháp + data layer learner-safe (không lộ đáp án qua RSC),
vẫn giữ mini quiz trên engine quiz chung.

## Prompt status

| Prompt | Status |
| --- | --- |
| 1 Schema + migration + seed | ✅ 2026-09-15 |
| 2 Data layer + Server Actions | ✅ 2026-09-15 |
| 3 UI tabs / practice route | ✅ 2026-09-15 |
| 4 Recommendations polish | ✅ 2026-09-16 |

## Không làm ở phase này

- `grammar_exercises` / `grammar_exercise_options` / `user_grammar_attempts` (dùng quizzes)
- Route Handlers `/api/grammar/*` (dùng Server Actions + `queries.ts`)
- Guest attempt without login (middleware + `requireUser` — Prompt 3 nếu cần)
- ~~Dataset license research (track riêng)~~ → done 2026-09-16:
  [docs/research/grammar-dataset-license-research.md](../research/grammar-dataset-license-research.md)

## Deliverables

```text
docs/plan/phase-16-grammar-schema-v3.md
src/db/schema/grammar.ts
drizzle/0003_grammar_schema_v3.sql
drizzle/0004_grammar_search_trgm.sql
src/db/seed-data/grammar.ts
src/features/grammar/learner.ts | mastery.ts | progress.ts | rate-limit.ts
src/features/grammar/recommendations.ts
src/features/grammar/schemas.ts | actions.ts | queries.ts
src/features/quiz/actions.ts          # transaction + grammar progress upsert
src/features/grammar/components/GrammarRecommendations.tsx
```

## Acceptance — Prompt 1

- [x] Migration chạy sạch; seed ×2; topics=3; rules/examples/mistakes/relations OK
- [x] MCQ uniqueness via `quiz_answers`
- [x] Exit gate pass

## Acceptance — Prompt 2 (adapted)

- [x] `ExerciseForLearner` / `ExerciseWithAnswer` + `toLearnerExercise()`
- [x] Learner quiz JSON never contains `is_correct` / `isCorrect` (unit + smoke)
- [x] Queries: list/page, detail by id+slug, examples, exercises, search (FTS+trgm), progress
- [x] Server Actions wrappers (AD-06); no Route Handlers
- [x] Grammar quiz submit updates `user_grammar_progress` in same DB transaction
- [x] Seeded option shuffle; simple rate limit on grammar-linked submits
- [x] `npx tsc --noEmit` / `npm run lint` / `npm run test` pass

## Acceptance — Prompt 3 (adapted)

- [x] `/grammar` — CEFR + category + search (URL); card titleVi lớn + titleEn nhỏ + progress
- [x] `/grammar/[slug]` — tabs Lý thuyết | Ví dụ | Bài tập; highlights; confused_with
- [x] `/grammar/[slug]/practice` — QuizRunner practiceMode, ExerciseForLearner only
- [x] Wrong → related rule + sample example; summary đúng/sai + thời gian + làm lại
- [x] Empty state khi chưa có exercise; loading/error skeletons per route
- [x] Guest banner skipped (middleware + `requireUser` — app requires login)
- [x] Network retry keeps draft answer (sessionStorage + toast)
- [x] `npx tsc --noEmit` / `npm run lint` / `npm run test` pass

## Acceptance — Prompt 4 (adapted)

- [x] `user_grammar_progress` upsert + weighted last-10 `mastery_score` (already P2)
- [x] `listUserGrammarProgress` / `getGrammarProgressAction`
- [x] `listGrammarRecommendations` / `getGrammarRecommendationsAction` — prereq ≥0.8, CEFR fit, weak first
- [x] Progress on `/grammar` cards; recommendations section on catalog
- [x] `next_review_at` left null (no SRS)
- [x] Unit tests for ranking; `npx tsc --noEmit` / `npm run lint` / `npm run test` pass

## Xác minh Prompt 2 (2026-09-15)

| Check | Result |
| --- | --- |
| `0004` pg_trgm | applied |
| `searchGrammarTopics({ q: "present" })` | present-simple, present-perfect |
| Learner exercises raw JSON | no `isCorrect` / `is_correct` |
| Vitest | 38 tests pass |

## Xác minh Prompt 3 (2026-09-15)

| Check | Result |
| --- | --- |
| Routes | `[slug]` + `[slug]/practice` (UUID param still resolves) |
| Tabs | Lý thuyết / Ví dụ / Bài tập |
| Practice | immediate feedback + rule/example hint + duration summary |

## Xác minh Prompt 4 (2026-09-16)

| Check | Result |
| --- | --- |
| `rankGrammarRecommendations` unit | unlock / weak / CEFR / limit |
| `listGrammarRecommendations` + action | Server Actions (no `/api/grammar/*`) |
| `/grammar` UI | section **Gợi ý học tiếp** above filters |
| Vitest grammar | pass |

**Stopped after Prompt 4 + license research** — see
[grammar-dataset-license-research.md](../research/grammar-dataset-license-research.md).
Next: [phase-17-grammar-content.md](phase-17-grammar-content.md).
