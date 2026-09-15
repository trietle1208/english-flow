# features/quiz

Reusable quiz engine (Phase 11 / spec §19–§20 + Phase 15 practice drills).

- `engine.ts` — pure scoring (fill-blank normalize, accuracy, CEFR helpers)
- `queries.ts` — `getQuizForAttempt` (no correctness flags), `getQuizAttemptForOwner`, `listQuizzes`
- `actions.ts` — `submitQuiz` / `submitQuizAttempt`, `gradeQuestion` (immediate only), `gradePracticeQuestion` (drills; no attempt)
- `components/QuizRunner.tsx` — shared runner; `practiceMode` = warm-up subset without persisting progress
- Result UI: `QuizResultSummary`, `ReviewMistakes`

Used by grammar, listening, lesson `exercise` blocks, and `/quiz/*`.
