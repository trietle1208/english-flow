# features/lessons

Lesson experience (Phase 08) — block rendering (AD-03), completion, scroll progress.

- `schemas.ts` — re-exports AD-03 block Zod + `parseLessonBlocks` (unknown types dropped)
- `queries.ts` — `getLessonDetail` (incl. saved-word state), `getLessonTitle`
- `progress.ts` — `markLessonInProgress` (server-only helper for the lesson page; not a Server Action)
- `actions.ts` — `completeLesson`, `updateLessonProgress`
- `components/` — header, block renderer (incl. exercise → `QuizRunner`), footer nav, study session (heartbeat + scroll)
