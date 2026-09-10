# EnglishFlow — Personal English Learning Platform

Production-minded Phase 1 build. Full spec: [production-mined.txt](production-mined.txt).
Build plan (14 phases): [docs/plan/README.md](docs/plan/README.md).
Architecture decisions (read before touching auth/schema/lessons/audio): [docs/plan/00-architecture-decisions.md](docs/plan/00-architecture-decisions.md).

---

## Current Status

**Phase: 01 done, 02 not started.** Next.js app scaffolded, TS strict, Tailwind + shadcn/ui, ESLint/Prettier, feature-oriented directory structure, first commit made. No DB/Docker/auth yet.

> Update this section every time a phase is completed or started. Format:
> `- [x] Phase 01 — Foundation (done YYYY-MM-DD)`
> `- [ ] Phase 02 — Docker & Database (in progress)`

- [x] Phase 01 — Foundation (done 2026-09-10)
- [ ] Phase 02 — Docker & Database Infrastructure
- [ ] Phase 03 — Schema & Seed
- [ ] Phase 04 — Authentication
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
