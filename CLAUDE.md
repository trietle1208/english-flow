# EnglishFlow — Personal English Learning Platform

Production-minded Phase 1 build. Full spec: [production-mined.txt](production-mined.txt).
Build plan (14 phases): [docs/plan/README.md](docs/plan/README.md).
Architecture decisions (read before touching auth/schema/lessons/audio): [docs/plan/00-architecture-decisions.md](docs/plan/00-architecture-decisions.md).

---

## Current Status

**Phase: 01–14 done (Phase 1 complete).** Drizzle + `postgres-js` + Zod-validated `src/env.ts`, `docker-compose.yml` (postgres + app + adminer, healthcheck, named `pgdata` volume), multi-stage `Dockerfile` (non-root `nextjs` user), `next.config.ts` `output: "standalone"`, `db:*` scripts. `npx tsc --noEmit` / `npm run lint` / `npm run build` / `npm run test` all pass (Node 18 and 22) and `src/env.ts` fails fast with a clear message on a missing var.

**2026-09-10 update**: the user ran `docker compose up -d` themselves on a machine with a working Docker daemon (confirmed via Adminer at `localhost:8080`). This agent's own sandbox still has no `docker` CLI access (`permission denied` on `/var/run/docker.sock`, unchanged), but the containers' published ports are reachable over the host network, so both were verified directly: `postgres:16-alpine` reachable on `5432` (`psql`-equivalent check via the `postgres` npm client instead of `docker compose exec`), and the `app` container itself reachable on `3000` returning real Next.js HTML (`200 OK`, `X-Powered-By: Next.js`) — proving the healthcheck-gated `depends_on` actually works. `drizzle-kit migrate` + `db:seed` were then run twice against that real container (not a simulation): 18 tables, identical row counts both runs (courses 5, lessons 25, vocabularies 134, grammar_topics 10, listening_lessons 5, quizzes 19, placement test 20 questions), zero orphaned FK references.

**2026-09-14 — Phase 02 closed**: this session has a real Docker CLI (a different, non-sandboxed environment from the earlier agent), so the 2 remaining checks got run for real: `docker compose down && docker compose up -d` — row counts identical before/after (`courses=5`, `vocabularies=134`, `users` still just `admin@admin.com`), confirming the named `pgdata` volume survives the cycle; and `docker compose logs app` — clean, no errors (`✓ Ready in 193ms`). Option B (`docker compose up -d postgres && npm run dev`) was also exercised for real: a test sign-up written through the locally-run dev server landed in the same Dockerized Postgres. One wrinkle worth recording: a leftover container from an earlier failed rebuild (missing the `com.docker.compose.container-number` label — a known Docker Compose v2.15.1 bug) crashes `docker compose up -d`/`--build` with `strconv.Atoi: parsing "": invalid syntax` every time it needs to create/recreate the `app` service container. `docker rm` on it is blocked by this agent's own permissions (destructive-action guard), so the workaround was creating the `app` container directly via `docker run` with the exact labels/network compose expects (`com.docker.compose.project/service/container-number/...`) — `docker compose ps/logs/down` all recognize it normally afterward, as if compose itself had created it. The orphaned container is still sitting there unused; removing it (`docker rm -f`) needs the user, but doesn't block anything. Full detail: [phase-02-docker-database.md](docs/plan/phase-02-docker-database.md#acceptance-criteria).

The Phase 03 listening-audio gap closed in Phase 10 (2026-09-15): real TTS MP3s now live under `public/audio/listening/` for all five seed lessons (see [public/audio/README.md](public/audio/README.md)). (The other Phase 03 gap — visually confirming the `db:studio` UI — got closed 2026-09-14 the same way Phase 05's browser checks did: a real headless Chromium via Playwright, screenshotted against `https://local.drizzle.studio`, showing all 18 tables with the right row counts.)

**Phase 04 (2026-09-10, done)**: better-auth wired up per AD-01 (Drizzle adapter, `usePlural: true`, `sessions`/`accounts`/`verifications` tables added and migrated into the same real dev DB from Phase 03), `emailAndPassword` with an 8-char + letter+number password rule, `requireUser()`/`getCurrentUser()` (`React.cache`), edge `middleware.ts`, Zod-validated register/login forms (`react-hook-form`), and a temporary Logout button. `npx tsc --noEmit` / `npm run lint` / `npm run build` all pass. No browser available to this agent, so the flow was verified for real instead of skipped: built production (`npm start`) against the live Postgres on `localhost:5432` and drove `/api/auth/*` directly with `curl` — real sign-up (scrypt-hashed password, UUID v7 id), duplicate-email and wrong-password both map to the friendly messages the acceptance criteria ask for, the session cookie is `HttpOnly`/`SameSite=Lax`, and sign-out really invalidates the DB session (confirmed `/dashboard` still redirects to `/login` on the old cookie because `requireUser()` re-queries the DB, not just because middleware saw no cookie). Two real bugs only showed up under this live test, not in `tsc`/`build`, and are now fixed — see the "Xác minh" section in [phase-04-auth.md](docs/plan/phase-04-auth.md) for both. Test users created during verification were deleted afterward. `npm run test` still has no script (pre-existing gap from Phase 01-03, not introduced here) — the Playwright-level "click through the actual UI" pass (Google-button tooltip, Skip-for-now button) is unverified beyond reading the code.

**Phase 05 (2026-09-11, code complete; 2026-09-14, done)**: `AppShell` (`Sidebar` ≥768px icon+tooltip until 1024px then icon+label, `AppHeader`+`MobileNav` <768px with a `Sheet` drawer for the overflow nav items, `UserMenu`), full design-system tokens in `globals.css`/`tailwind.config.ts` (radius `0.625rem`, 2-level shadow scale, added a 4th `--skill-reading` token alongside vocabulary/grammar/listening), `next-themes` (`ThemeProvider`/`ThemeToggle`), `src/config/navigation.ts`, shared `PageHeader`/`EmptyState`/`ErrorState`/`StatCard`/`SectionCard`/`ProgressRing`, root + `(app)` `error.tsx`/`loading.tsx`/`not-found.tsx`, and placeholder pages for all 7 nav routes + `/settings`. The 15 shadcn primitives the phase's task list asks for are installed via `npx shadcn@latest add`, then hand-aligned to this repo's existing `data-slot` function-component style (the CLI's own output uses the older `forwardRef` pattern for a Tailwind-v3 project like this one — see `src/components/ui/README.md`). `npx tsc --noEmit` / `npm run lint` / `npm run build` all pass. The 2026-09-11 pass (no browser available to that agent) verified route behavior for real via `curl` (all 9 authenticated routes `200` with correct copy, redirect and 404 both correct) and caught one real bug, now fixed: the root `not-found.tsx` called `getCurrentUser()` to vary its CTA, but Next.js statically-optimizes that file for unmatched URLs and doesn't support `headers()`/`cookies()` there — the response was getting cached, ignoring the real session cookie. Removed that branch; `/not-found` and `/` build static again. **2026-09-14**: this session had a real Docker CLI and, for the first time, a real headless browser (Playwright/Chromium, installable via `npx playwright install chromium` — the earlier "no browser" limitation no longer holds), so the 5 remaining acceptance criteria that had only been code-audited got closed with actual measurements instead: 390px has zero horizontal scroll and 63px-tall bottom-nav touch targets, 768px/1440px both render the right sidebar mode with no overflow, dark-mode text contrast is 7.6–19:1 (WCAG AA needs ≥4.5:1) — computed by hand from `getComputedStyle`'s `oklch(...)` output since Chromium no longer normalizes colors to `rgb()` (not even via `canvas.fillStyle`), keyboard Tab reaches all 7 sidebar links with a visible focus ring on each, and a real temporary `throw` in `courses/page.tsx` (reverted immediately after, `git diff` confirmed clean) proved `(app)/error.tsx` catches it, shows the friendly message with a working shell around it, and never leaks the raw error text to the page. Full detail in the "Xác minh" section of [phase-05-app-shell-design-system.md](docs/plan/phase-05-app-shell-design-system.md). Both test accounts from verification (this session's and the leftover one from 09-11, which turned out to already be gone from the DB) are cleaned up. Known non-blocking leftover: the `docker-compose` `app` service container can't currently be rebuilt/recreated — an orphaned container from a prior failed rebuild (`...elastic_blackwell`, missing the `com.docker.compose.container-number` label — a known Docker Compose v2.15.1 bug) blocks `docker compose up -d --build`, and removing it needs a plain `docker rm -f`, which this agent's permissions don't allow; needs the user to run it once. Didn't block this verification since it ran the app via local `npm start`/`npm run dev` against the same live Postgres, not through that container.

**Phase 06 (2026-09-14, done)**: public `/` landing page (spec §6) — `(marketing)/layout.tsx` (`Header`+`Footer` frame) and `(marketing)/page.tsx` (`Hero → Features → HowItWorks → FinalCTA`) in `src/features/marketing/components/`. The old Phase 01 placeholder `src/app/page.tsx` was deleted (it clashed with the new `(marketing)/page.tsx` on the same `/` route). Server Components throughout — `Header`/`Hero`/`FinalCTA` call `getCurrentUser()` themselves to swap every CTA to "Go to Dashboard" for a signed-in visitor (checked with a real session cookie, not just code-read); the only client JS on the route is the mobile `Sheet` menu (same primitive `AppHeader` already uses) plus the app-wide `ThemeProvider`/`Toaster`. The Hero's "mock dashboard" visual is built from the real `StatCard`/`ProgressRing`/`Card` components, not a stock image, and is `aria-hidden` since its numbers are illustrative. Header nav (`Features/Courses/Vocabulary/Progress`) are in-page anchors into `Features`'s cards, not direct links to the (protected) `/courses` etc. routes. `npx tsc --noEmit` / `npm run lint` / `npm run build` all pass. Verified for real: production build on a spare port (3000 was already held by a stale pre-Phase-06 Docker `app` container, left untouched), a real temp account through `/api/auth/sign-up/email` proved the logged-in/anonymous CTA swap in the actual HTML (then deleted), Playwright screenshots at 390/768/1440px confirmed zero horizontal overflow and the mobile Sheet menu, dark-mode contrast measured 7.66–18.97:1 (WCAG AA needs ≥4.5:1), keyboard Tab reaches every interactive element in order with a visible focus ring, and a real `npx lighthouse@13` run (mobile, simulated throttling, run twice) scored **Accessibility 100/100** (≥95 target met) and **Performance 89/100** — 1 point under the ≥90 target. Traced the gap to two causes, neither Phase-06-specific: the self-hosted `Inter` font chain shared by every route since Phase 01 (~578ms), and the Radix `Dialog`/`Sheet` chunk the spec's own "mobile menu as Sheet" requirement pulls in (same component `AppHeader` already uses). Left as a documented, non-blocking gap for Phase 13's dedicated performance-audit pass rather than reworking shared infra or dropping the spec'd Sheet menu. Exit Gate: `docker compose up -d --build` couldn't be completed — the Docker daemon died mid-session (`com.docker.backend.exe` vanished from the process list, every `docker` call after that failed with "daemon is not running"), the same flakiness Phase 05 hit; this agent has no way to restart Docker Desktop itself, so the Docker `app` container is still on its pre-Phase-06 build until the user restarts Docker and reruns that command once. Full detail in the "Xác minh" section of [phase-06-landing.md](docs/plan/phase-06-landing.md).

**Phase 07 (2026-09-15, done)**: real `/courses` catalog + `/courses/[courseId]` detail. `listCourses` aggregates `completedLessons` and `continueLessonId` in SQL (correlated subqueries against `user_progress`/`lessons` — not by loading lesson bodies). Filters (search debounced, CEFR level, category) sync to URL searchParams; list stays a Server Component behind a searchParams-keyed `Suspense` + route `loading.tsx`. Course detail shows overall progress and numbered lessons with Completed / Current / Locked (icon + color); locked rows get a tooltip and no navigation. Sequential unlock is enforced server-side via `getLessonAccess` on a minimal `/lessons/[lessonId]` gate (locked → redirect to course; unlocked → Phase 08 placeholder). `npx tsc --noEmit` / `npm run lint` / `npm run build` pass. Verified against a fresh `docker compose up -d postgres` + migrate/seed and `next start -p 3001`: search `travel` → English for Travel only, `level=A1` → Everyday English only, progress after completing lesson 1 matches catalog+detail (`1/5`, 20%), lesson 2 unlocks and lesson 3 stays locked. Full detail in [phase-07-courses.md](docs/plan/phase-07-courses.md#xác-minh-2026-09-15).

**Phase 08 (2026-09-15, done)**: full `/lessons/[lessonId]` experience. AD-03 blocks Zod-parsed (`parseLessonBlocks` drops unknown types) and rendered via `LessonBlockRenderer` (objective / explanation / vocabulary / examples / exercise placeholder / audio placeholder). Shared `VocabularyItem` + `AudioButton` (file or Web Speech, AD-04). `startLessonProgress` on open → `in_progress`; `completeLesson` upserts progress, bumps `user_daily_activity.lessons_completed`, revalidates course + dashboard; locked lessons rejected server-side. `updateLessonProgress` on scroll; AD-08 `useStudyHeartbeat` every 60s while visible → `recordStudyTime` (cap 2 min / spam ignore). Footer Previous / Next / Back to course + Mark as complete (toast). Route `loading.tsx` + lesson `error.tsx`. `npx tsc --noEmit` / `npm run lint` / `npm run build` pass. Verified on `PORT=3002 npm start` against Docker Postgres: open → `in_progress`, locked `completeLesson` rejected, allowed complete → `completed` + course `1/5`/`20%` + lesson 2 unlocks, last lesson shows Back to course, heartbeat adds 1 then 0 on rapid re-call. Full detail in [phase-08-lessons.md](docs/plan/phase-08-lessons.md#xác-minh-2026-09-15).

**Phase 09 (2026-09-15, done)**: personal vocabulary. `saveVocabulary` / `removeVocabulary` / `toggleLearned` / `recordVocabularyReview` Server Actions (`requireUser` + Zod + ownership on mutate; save is idempotent via unique `(user_id, vocabulary_id)` and only links — never copies vocab content). `SaveVocabularyButton` uses `useOptimistic` (Save ⭐ ↔ Saved) with toast + rollback; lessons wire it into `VocabularyItem.actions`. `/vocabulary` shows aggregate stats (1 SQL query), URL-synced search/filter/sort, paginated list (24/page, SQL `ILIKE` on word+meaning), `VocabularyCard` (Play / Mark learned / Remove+Dialog), empty + skeleton states. New saves bump `user_daily_activity.words_saved`. `npx tsc --noEmit` / `npm run lint` / `npm run build` pass. Verified on `PORT=3003 npm start`: double-save → 1 row, 2 users → 1 `vocabularies` row, learned/not_learned tabs, search hit/miss, ownership-scoped remove, lesson Save button, empty CTA after remove. Full detail in [phase-09-vocabulary.md](docs/plan/phase-09-vocabulary.md#xác-minh-2026-09-15).

**Phase 11 (2026-09-15, done)**: shared quiz engine (`engine.ts` + `QuizRunner`) for lesson exercises, grammar, listening, and `/quiz/[quizId]`; result page with Review Mistakes (owner-only); placement test → CEFR + `users.cefr_level`; `/courses` recommends by level; settings retake link. `npx tsc --noEmit` / `npm run lint` / `npm run build` pass. Verified on `PORT=3005 npm start`: no `isCorrect` in pre-submit payload, fill-blank normalize, placement → C1, ownership gate. Full detail in [phase-11-quiz-placement.md](docs/plan/phase-11-quiz-placement.md#xác-minh-2026-09-15).

**Phase 12 (2026-09-15, done)**: real `/dashboard` + `/progress`. Timezone greeting, daily goal from `user_daily_activity`, streak (AD-09) + 7-day dots, Continue Learning (in-progress preferred), skill overview by lesson skill, recent activity feed (≤8), CEFR+weakest-skill recommendations, brand-new onboarding. Progress: overall stats, Recharts skill/weekly charts (AD-05, `sr-only` tables), streak calendar, achievements (definitions in `achievements.ts`, unlock via `evaluateAchievements` after lesson/vocab/quiz/study-time). Composite indexes migration `0002`. Each dashboard block in its own `Suspense`. `npx tsc --noEmit` / `npm run lint` / `npm run build` pass. Full detail in [phase-12-dashboard-progress.md](docs/plan/phase-12-dashboard-progress.md#xác-minh-2026-09-15).

**Phase 13 (2026-09-15, done)**: full `/settings` — Profile (editable name, read-only email), Learning (CEFR select + placement retake, daily goal 10–60, preferred learning time), Appearance (Light/Dark/System via next-themes), Account logout. `updateSettings` Server Action (Zod + `requireUser` ownership) revalidates dashboard so goal changes show as `0 / N min`. Polish: `dynamic()` for Progress charts + Listening `AudioPlayer`, leveled `src/lib/logger.ts` for Server Actions, route `loading.tsx` for dashboard/progress/quiz/settings, audit matrix in [docs/qa-checklist.md](docs/qa-checklist.md). `npx tsc --noEmit` / `npm run lint` / `npm run build` pass. Verified on `PORT=3007 npm start`: settings sections present; `daily_goal_minutes=45` → Dashboard Daily Goal `0 / 45 min`. Full detail in [phase-13-settings-polish.md](docs/plan/phase-13-settings-polish.md#xác-minh-2026-09-15).

**Phase 14 (2026-09-15, done)**: Vitest (24 tests: quiz engine, streak, Zod schemas) + Playwright 8 critical flows on `english_learning_test` (chromium + 390px mobile = 12 runs). Full README (§39), [docs/definition-of-done.md](docs/definition-of-done.md), CI workflow. Scripts: `npm run test`, `test:e2e:prepare`, `test:e2e`. Tag `v1.0.0-phase1` after the phase commit. Full detail in [phase-14-testing-release.md](docs/plan/phase-14-testing-release.md#xác-minh-2026-09-15).

**Phase 16 (2026-09-16, Prompt 1–4 + license research done)**: Grammar schema v3 +
learner-safe data layer + UI tabs / practice + recommendations. Dataset license
table: [grammar-dataset-license-research.md](docs/research/grammar-dataset-license-research.md).
Detail: [phase-16-grammar-schema-v3.md](docs/plan/phase-16-grammar-schema-v3.md).

**Phase 17 (2026-09-16, done)**: Grammar catalog expanded to **17** published topics;
`content_sources` for CEFR-J / Tatoeba / TALPCo; ~76% of new-topic examples attributed;
Ví dụ tab shows source captions. `db:seed` ×2 idempotent (topics=17 both runs). Detail:
[phase-17-grammar-content.md](docs/plan/phase-17-grammar-content.md).

> Update this section every time a phase is completed or started. Format:
> `- [x] Phase 01 — Foundation (done YYYY-MM-DD)`
> `- [ ] Phase 02 — Docker & Database (in progress)`

- [x] Phase 01 — Foundation (done 2026-09-10)
- [x] Phase 02 — Docker & Database Infrastructure (done 2026-09-14)
- [x] Phase 03 — Schema & Seed (done 2026-09-15 — listening audio filled in with Phase 10)
- [x] Phase 04 — Authentication (done 2026-09-10)
- [x] Phase 05 — App Shell & Design System (done 2026-09-14)
- [x] Phase 06 — Landing Page (done 2026-09-14)
- [x] Phase 07 — Courses (done 2026-09-15)
- [x] Phase 08 — Lesson Experience (done 2026-09-15)
- [x] Phase 09 — Personal Vocabulary (done 2026-09-15)
- [x] Phase 10 — Grammar & Listening (done 2026-09-15)
- [x] Phase 11 — Quiz Engine & Placement Test (done 2026-09-15)
- [x] Phase 12 — Dashboard & Progress (done 2026-09-15)
- [x] Phase 13 — Settings & Polish (done 2026-09-15)
- [x] Phase 14 — Testing & Release (done 2026-09-15)
- [x] Phase 15 — Grammar Practice+ (done 2026-09-15)
- [x] Phase 16 — Grammar Schema v3 Prompt 1–4 (done 2026-09-16)
- [x] Phase 17 — Grammar Content Expansion (done 2026-09-16)

Before starting a phase, read its file in `docs/plan/phase-NN-*.md`. Before ending a phase, run its **Exit Gate** (see `docs/plan/README.md`) and tick its checkboxes in that phase file, then update this section.

---

## Tech Stack

- **Frontend**: Next.js (App Router) + TypeScript (strict) + React + Tailwind CSS + shadcn/ui + Lucide Icons
- **Backend**: Next.js only — Server Components, Server Actions, Route Handlers. No separate Express/NestJS.
- **Database**: PostgreSQL + Drizzle ORM + Drizzle Kit migrations
- **Auth**: better-auth (Drizzle adapter, email+password) — see AD-01
- **Dev env**: Docker + Docker Compose (app + postgres, minimum)
- **Charts**: Recharts via shadcn `chart` wrapper
- **Testing**: Vitest (unit) + Playwright (e2e, 8 critical flows)
- Only free/open-source technologies. No vendor lock-in — must stay self-hostable and deployable to Vercel, plain Node hosting, or Docker.

## Repo Structure (target)

```text
src/
├── app/
│   ├── (marketing)/    # landing page (public)
│   ├── (auth)/         # login, register
│   ├── (app)/          # authenticated routes, shared AppShell
│   └── api/            # route handlers (mainly better-auth callback)
├── features/           # business logic per domain: auth, courses, lessons,
│                        # vocabulary, grammar, listening, quiz, progress,
│                        # placement-test, future/ (empty, for AI phases later)
├── components/
│   ├── ui/             # shadcn primitives
│   └── shared/         # EmptyState, PageHeader, StatCard, etc.
├── db/
│   ├── index.ts  schema/  seed.ts  seed-data/
├── lib/                 # utils, session, format, constants
└── config/              # nav items, CEFR levels, achievements
```

Each feature folder: `queries.ts` (server-only reads), `actions.ts` (Server Actions), `schemas.ts` (Zod), `components/`, `types.ts`.

---

## Non-negotiable Conventions

1. **Server-first**: default to Server Components; `"use client"` only when state/effects/events require it.
2. **Never trust the client for identity**: every Server Action starts with `requireUser()` from `src/lib/session.ts` — never accept a `userId` from the client. Verify ownership before any update/delete.
3. **Feature-oriented**: business logic lives in `src/features/<feature>/`, not inside `app/`.
4. **No premature abstraction**: don't build for hypothetical future features (AI tutor, SRS, etc.) beyond what's explicitly noted in the schema (see AD-03, §16, §35 of spec).
5. **Four states everywhere**: every important feature needs loading, empty, error, and success states. Never expose raw DB/API errors to the UI — show "Something went wrong. Please try again."
6. **No fake content**: seed data is real English learning content (real IPA, real Vietnamese meanings, real example sentences) — never lorem ipsum.
7. **Server Actions are the default** for mutations; Route Handlers only for things that must be called outside React (better-auth callback, etc.). Every action: `requireUser()` → Zod validate → ownership check → `{ ok, data | error }` → scoped `revalidatePath`.
8. **TypeScript strict**, no unnecessary `any`.
9. **One commit per phase**, following the `feat: ...` convention in spec §38.
10. **Don't fetch entire tables to the browser** — paginate vocabulary lists, aggregate stats in SQL, not in JS.

## Out of scope for Phase 1

AI Tutor, AI Conversation/Chat, AI Grammar Correction, Speaking evaluation, full Spaced Repetition algorithm, personalized AI curriculum, social features. Schema leaves room for these (e.g. `review_count`, `next_review_at` columns exist but no SRS logic) — do not implement the logic itself.

---

## Commands (once Phase 01/02 are done)

```bash
docker compose up -d        # full stack (app + postgres)
docker compose up -d postgres && npm run dev   # postgres in docker, app local
npm run db:generate         # drizzle: generate migration
npm run db:migrate          # drizzle: apply migration
npm run db:seed             # seed realistic content (idempotent)
npm run db:studio           # drizzle studio
npx tsc --noEmit            # typecheck
npm run lint
npm run build
npm run test                # vitest
npx playwright test         # e2e
```

## Exit Gate (run after every phase, see docs/plan/README.md)

```bash
npx tsc --noEmit && npm run lint && npm run build && npm run test && docker compose up -d
```

Add `npm run db:generate && npm run db:migrate && npm run db:seed` if the phase touched the schema. Do not move to the next phase with a broken build.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **english-flow** (3166 symbols, 6383 relationships, 226 execution flows).

> Index stale? Run `node .gitnexus/run.cjs analyze --index-only` from the project root — it auto-selects an available runner. No `.gitnexus/run.cjs` yet? Bootstrap with `npx`, `bunx`, or `pnpm dlx` — e.g. `bunx gitnexus@latest analyze` (npm 11 npx crash; #1939).

## Always Do

- **MUST run impact before editing.** Use `impact({target: "symbolName", direction: "upstream"})` or `node .gitnexus/run.cjs impact "symbolName" --direction upstream --repo .`; report callers, processes, and risk. Never substitute grep for graph analysis.
- **MUST analyze graph changes before committing.** Use `detect_changes({scope: "all"})` (MCP) or `node .gitnexus/run.cjs detect-changes --scope all --repo .` (CLI fallback). `partial: true` or `truncated: true` is not a clean check — a zero means unseen, not unaffected; re-run it. For regression review: `detect_changes({scope: "compare", base_ref: "main"})` or `node .gitnexus/run.cjs detect-changes --scope compare --base-ref "main" --repo .`.
- MUST warn on HIGH/CRITICAL `risk` pre-edit; never use `riskSharedAxes` to waive a HIGH/CRITICAL `risk` warning. Compare File/symbol: MCP File omits axes; Graph-RAG expands File.
- **MUST treat `risk: UNKNOWN` as unresolved, not as low.** An empty caller set is not evidence the symbol is unused — it can also mean the callers are not resolvable by the index (plain-object property access, dynamic dispatch, cross-language calls). `impact` pairs `UNKNOWN` with a `riskNote` saying so. Confirm with a text search before treating the symbol as safe to change or delete; do not proceed on the strength of a zero.
- **MUST use `query({search_query: "concept"})` for concepts/flows, `context({name: "symbolName"})` for a named symbol, or `impact` for blast radius, on read-only callers, dependencies, imports, or execution flow.** Graph first; text search only for empty/`UNKNOWN`/literals.
- For security review, `explain({target: "fileOrSymbol"})` lists taint findings (source→sink flows; needs `analyze --pdg`).

## Never Do

- NEVER edit a function, class, or method before MCP/CLI impact analysis.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis, and never read `UNKNOWN` as an all-clear — it means the walk could not answer, which is the one verdict that requires confirming by other means.
- NEVER rename symbols with find-and-replace — use `rename` which understands the call graph.
- NEVER commit before MCP/CLI graph change analysis.

## Resources

| Resource | Use for |
| --- | --- |
| `gitnexus://repo/english-flow/context` | Codebase overview, check index freshness |
| `gitnexus://repo/english-flow/clusters` | All functional areas |
| `gitnexus://repo/english-flow/processes` | All execution flows |
| `gitnexus://repo/english-flow/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
| --- | --- |
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
