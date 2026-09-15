# Definition of Done — Phase 1

Spec §40. Evidence from phases 04–14 (code + live verification notes in each `docs/plan/phase-*.md` and [qa-checklist.md](qa-checklist.md)).

## Authentication

- [x] Register works — Phase 04 + e2e `01-auth-lesson`
- [x] Login works — Phase 04 + e2e
- [x] Protected routes work — middleware + `requireUser()`; unauthenticated `/dashboard` → `/login`

## Learning

- [x] Courses work — Phase 07 `/courses`
- [x] Course detail works — `/courses/[courseId]` + sequential unlock
- [x] Lessons work — Phase 08 block renderer
- [x] Lesson completion works — `completeLesson` + progress upsert

## Vocabulary

- [x] Vocabulary can be saved — `saveVocabulary` + e2e
- [x] Vocabulary can be removed — `removeVocabulary` + e2e
- [x] Vocabulary can be searched — SQL `ILIKE` on `/vocabulary`
- [x] Vocabulary can be filtered — All / Learned / Not learned tabs
- [x] Vocabulary can be marked as learned — `toggleLearned` + e2e
- [x] Saved vocabulary appears in My Vocabulary — Phase 09 verify

## Grammar

- [x] Grammar topics work — Phase 10 catalog + detail
- [x] Grammar exercises work — shared QuizRunner

## Listening

- [x] Audio player works — Phase 10 player + seed MP3s
- [x] Listening questions work — comprehension quiz
- [x] Results are stored — `quiz_attempts`

## Quiz

- [x] Quiz questions work — MC / TF / fill-blank
- [x] Answers are evaluated — `engine.ts` + Vitest
- [x] Results are displayed — `/quiz/[id]/result`
- [x] Attempts are stored — Phase 11 verify

## Progress

- [x] Lesson progress works — `user_progress`
- [x] Vocabulary progress works — Progress stats + daily activity
- [x] Quiz progress works — accuracy aggregates
- [x] Streak works — AD-09 + Vitest `streak.test.ts`
- [x] Dashboard reflects real data — Phase 12 verify

## Infrastructure

- [x] PostgreSQL runs through Docker — `docker compose` postgres service
- [x] Application runs through Docker — `app` service / Dockerfile standalone
- [x] Database migrations work — `npm run db:migrate`
- [x] Seed data works — `npm run db:seed` (idempotent)
- [x] Environment variables are documented — README + `.env.example`
- [x] README is complete — root [README.md](../README.md)

## UI

- [x] Desktop responsive — Phase 05/13 audits (1440)
- [x] Tablet responsive — 768
- [x] Mobile responsive — 390 + Playwright mobile project
- [x] Loading states exist — route `loading.tsx` + Suspense skeletons
- [x] Empty states exist — EmptyState on catalogs / vocab / onboarding
- [x] Error states exist — `(app)/error.tsx` + friendly copy
- [x] Accessibility basics are implemented — landmarks, labels, focus, contrast (Phase 13 QA)

---

**Release:** tag `v1.0.0-phase1` after Exit Gate green and this checklist is fully evidenced.
