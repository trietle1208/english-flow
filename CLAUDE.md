# EnglishFlow — Personal English Learning Platform

Production-minded Phase 1 build. Full spec: [production-mined.txt](production-mined.txt).
Build plan (14 phases): [docs/plan/README.md](docs/plan/README.md).
Architecture decisions (read before touching auth/schema/lessons/audio): [docs/plan/00-architecture-decisions.md](docs/plan/00-architecture-decisions.md).

---

## Current Status

**Phase: 01 done, 02 in progress (Docker now confirmed working, 2 minor checks left), 03 in progress (schema + seed migrated/seeded into the real dev DB, two content gaps remain), 04 done.** Drizzle + `postgres-js` + Zod-validated `src/env.ts`, `docker-compose.yml` (postgres + app + adminer, healthcheck, named `pgdata` volume), multi-stage `Dockerfile` (non-root `nextjs` user), `next.config.ts` `output: "standalone"`, `db:*` scripts. `npx tsc --noEmit` / `npm run lint` / `npm run build` all pass (Node 18 and 22) and `src/env.ts` fails fast with a clear message on a missing var.

**2026-09-10 update**: the user ran `docker compose up -d` themselves on a machine with a working Docker daemon (confirmed via Adminer at `localhost:8080`). This agent's own sandbox still has no `docker` CLI access (`permission denied` on `/var/run/docker.sock`, unchanged), but the containers' published ports are reachable over the host network, so both were verified directly: `postgres:16-alpine` reachable on `5432` (`psql`-equivalent check via the `postgres` npm client instead of `docker compose exec`), and the `app` container itself reachable on `3000` returning real Next.js HTML (`200 OK`, `X-Powered-By: Next.js`) — proving the healthcheck-gated `depends_on` actually works. `drizzle-kit migrate` + `db:seed` were then run twice against that real container (not a simulation): 18 tables, identical row counts both runs (courses 5, lessons 25, vocabularies 134, grammar_topics 10, listening_lessons 5, quizzes 19, placement test 20 questions), zero orphaned FK references. Remaining Phase 02 checks that need the user's own `docker` CLI (this agent still can't run one): `docker compose down && up -d` data-persistence check, and `docker compose logs app` — see [phase-02-docker-database.md](docs/plan/phase-02-docker-database.md#acceptance-criteria).

Two known Phase 03 gaps remain, documented in [phase-03-schema-seed.md](docs/plan/phase-03-schema-seed.md): (1) `npm run db:studio`'s UI itself wasn't visually confirmed (no browser/GUI available to this agent — the user can check via `db:studio` or the already-open Adminer tab); (2) real listening `.mp3` files under `public/audio/listening/` don't exist yet (no TTS binary / no license to real audio available to this agent) — transcripts and comprehension quizzes are real, only the audio files are missing, see [public/audio/README.md](public/audio/README.md).

**Phase 04 (2026-09-10, done)**: better-auth wired up per AD-01 (Drizzle adapter, `usePlural: true`, `sessions`/`accounts`/`verifications` tables added and migrated into the same real dev DB from Phase 03), `emailAndPassword` with an 8-char + letter+number password rule, `requireUser()`/`getCurrentUser()` (`React.cache`), edge `middleware.ts`, Zod-validated register/login forms (`react-hook-form`), and a temporary Logout button. `npx tsc --noEmit` / `npm run lint` / `npm run build` all pass. No browser available to this agent, so the flow was verified for real instead of skipped: built production (`npm start`) against the live Postgres on `localhost:5432` and drove `/api/auth/*` directly with `curl` — real sign-up (scrypt-hashed password, UUID v7 id), duplicate-email and wrong-password both map to the friendly messages the acceptance criteria ask for, the session cookie is `HttpOnly`/`SameSite=Lax`, and sign-out really invalidates the DB session (confirmed `/dashboard` still redirects to `/login` on the old cookie because `requireUser()` re-queries the DB, not just because middleware saw no cookie). Two real bugs only showed up under this live test, not in `tsc`/`build`, and are now fixed — see the "Xác minh" section in [phase-04-auth.md](docs/plan/phase-04-auth.md) for both. Test users created during verification were deleted afterward. `npm run test` still has no script (pre-existing gap from Phase 01-03, not introduced here) — the Playwright-level "click through the actual UI" pass (Google-button tooltip, Skip-for-now button) is unverified beyond reading the code.

> Update this section every time a phase is completed or started. Format:
> `- [x] Phase 01 — Foundation (done YYYY-MM-DD)`
> `- [ ] Phase 02 — Docker & Database (in progress)`

- [x] Phase 01 — Foundation (done 2026-09-10)
- [ ] Phase 02 — Docker & Database Infrastructure (in progress — Docker confirmed working, down/up persistence + app logs still need the user's `docker` CLI, see note above)
- [ ] Phase 03 — Schema & Seed (in progress — schema + seed migrated/seeded into the real dev DB, db:studio UI and real listening audio unverified, see note above)
- [x] Phase 04 — Authentication (done 2026-09-10)
- [ ] Phase 05 — App Shell & Design System
- [ ] Phase 06 — Landing Page
- [ ] Phase 07 — Courses
- [ ] Phase 08 — Lesson Experience
- [ ] Phase 09 — Personal Vocabulary
- [ ] Phase 10 — Grammar & Listening
- [ ] Phase 11 — Quiz Engine & Placement Test
- [ ] Phase 12 — Dashboard & Progress
- [ ] Phase 13 — Settings & Polish
- [ ] Phase 14 — Testing & Release

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
