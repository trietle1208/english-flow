# features/quiz

Reusable quiz engine (Phase 11 / spec §19–§20).

- `engine.ts` — pure scoring (fill-blank normalize, accuracy, CEFR helpers)
- `queries.ts` — `getQuizForAttempt` (no correctness flags), `getQuizAttemptForOwner`, `listQuizzes`
- `actions.ts` — `submitQuiz` / `submitQuizAttempt`, `gradeQuestion` (immediate mode only)
- `components/QuizRunner.tsx` — shared runner (lesson / grammar / listening / `/quiz/[id]`)
- Result UI: `QuizResultSummary`, `ReviewMistakes`

Used by grammar, listening, lesson `exercise` blocks, and `/quiz/*`.
