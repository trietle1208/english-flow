# EnglishFlow

Personal English learning platform for CEFR-aligned study: courses, lessons, vocabulary, grammar, listening, quizzes, placement test, and progress tracking.

Self-hostable Phase 1 build — Next.js only (no separate API server), PostgreSQL, better-auth.

## Tech stack

| Layer | Choice |
| --- | --- |
| Frontend | Next.js 15 (App Router), React 19, TypeScript (strict), Tailwind CSS, shadcn/ui, Lucide |
| Backend | Next.js Server Components + Server Actions |
| Database | PostgreSQL 16 + Drizzle ORM + Drizzle Kit |
| Auth | better-auth (email + password, Drizzle adapter) |
| Charts | Recharts (via shadcn `chart`) |
| Tests | Vitest (unit) + Playwright (e2e) |
| Runtime | Docker Compose (app + Postgres) or local Node + Dockerized Postgres |

## Requirements

- **Node.js** 18+ (22 recommended)
- **npm** 9+
- **Docker** + Docker Compose (for Postgres; optional for the app)
- ~2 GB free disk for images + `node_modules`

## Installation

```bash
git clone <repo-url> english-flow
cd english-flow
cp .env.example .env
# Set BETTER_AUTH_SECRET (openssl rand -base64 32). DATABASE_URL defaults to local Postgres.
npm install
```

## Environment variables

| Variable | Meaning | Example |
| --- | --- | --- |
| `DATABASE_URL` | Postgres connection string. Use host `localhost` when the app runs on the host; `postgres` when the app runs inside Compose. | `postgresql://postgres:postgres@localhost:5432/english_learning` |
| `NEXT_PUBLIC_APP_URL` | Public site origin (links, OG, redirects) | `http://localhost:3000` |
| `BETTER_AUTH_SECRET` | Session signing secret (≥32 chars). Generate with `openssl rand -base64 32` | *(random)* |
| `BETTER_AUTH_URL` | better-auth base URL (must match the origin you open in the browser) | `http://localhost:3000` |

Copy from [`.env.example`](.env.example). Never commit `.env`.

## Docker setup

Data lives in the named volume `pgdata` and **survives** `docker compose down` / restart. Only `docker compose down -v` deletes it.

```bash
docker compose up -d              # start postgres + app + adminer
docker compose down               # stop; keep volume
docker compose logs -f app        # follow app logs
docker compose restart app        # restart app container
docker compose up -d --build      # rebuild app image after code changes
```

Adminer (dev): [http://localhost:8081](http://localhost:8081) — System PostgreSQL, Server `postgres`, User/Password `postgres`, Database `english_learning`. (Host port `8081` so it does not clash with other local stacks on `8080`.)

## Database setup, migration & seed

```bash
npm run db:migrate    # apply Drizzle migrations in drizzle/
npm run db:seed       # idempotent realistic content (courses, vocab, quizzes, …)
npm run db:studio     # browse tables in the browser
npm run db:generate   # only when you change src/db/schema
```

Fresh empty volume:

```bash
docker compose up -d postgres
npm run db:migrate && npm run db:seed
```

## Development

### Option A — full stack in Docker

```bash
docker compose up -d --build
```

App: [http://localhost:3000](http://localhost:3000). `DATABASE_URL` for the app service is set in `docker-compose.yml` (host `postgres`).

### Option B — Postgres in Docker, Next.js local (faster iteration)

```bash
docker compose up -d postgres
npm run db:migrate && npm run db:seed   # first time
npm run dev
```

`.env` must use `localhost` in `DATABASE_URL` (default in `.env.example`).

## Testing

```bash
npm run test                 # Vitest unit tests
npm run test:e2e:prepare     # create/migrate/seed english_learning_test
npm run test:e2e             # build + Playwright (chromium + 390px mobile)
```

E2E uses a **separate** database `english_learning_test`, resets it in Playwright `globalSetup`, and creates a unique user per test so workers can run in parallel.

```bash
npx playwright install chromium      # once per machine
E2E_SKIP_DB_RESET=1 npx playwright test   # reuse a warm test DB while iterating
npx playwright test --project=mobile      # mobile viewport only (390px)
# If browser download fails, use system Chrome:
PW_CHANNEL=chrome npx playwright test
```

## Production build

```bash
npm run build
npm start                 # serves .next on PORT (default 3000)
# or
docker compose up -d --build
```

Ensure `BETTER_AUTH_URL` / `NEXT_PUBLIC_APP_URL` match the URL you open (including port).

## Project structure

```text
src/
├── app/
│   ├── (marketing)/     # public landing
│   ├── (auth)/          # login, register
│   ├── (app)/           # authenticated shell (dashboard, courses, …)
│   └── api/auth/        # better-auth route handler
├── features/            # domain logic: auth, courses, lessons, vocabulary, …
├── components/ui/       # shadcn primitives
├── components/shared/   # PageHeader, EmptyState, …
├── db/                  # Drizzle schema, seed, client
├── lib/                 # session, logger, utils
└── config/              # navigation, CEFR
e2e/                     # Playwright specs
docs/plan/               # phased build plan
drizzle/                 # SQL migrations
```

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Port **5432** already in use | Stop the other Postgres, or change the host port mapping in `docker-compose.yml` and `DATABASE_URL`. |
| Migration fails / “relation does not exist” | Confirm `DATABASE_URL`, then `npm run db:migrate`. For a clean slate on the **dev** DB only: `docker compose down -v && docker compose up -d postgres` then migrate + seed. |
| Container not healthy | `docker compose ps` and `docker compose logs postgres`. Wait for healthcheck; ensure nothing else binds 5432. |
| `Invalid origin` from better-auth | `BETTER_AUTH_URL` must match the browser origin (e.g. `http://localhost:3000`, not another port). |
| `docker compose up` fails recreating `app` | Known Compose orphan-container glitch — `docker rm -f` the leftover `app` container, then `docker compose up -d --build` again. |
| E2E can’t reach DB | `docker compose up -d postgres`, then `npm run test:e2e:prepare`. |

## Scripts reference

```bash
npm run dev / build / start / lint
npm run db:generate | db:migrate | db:seed | db:studio
npm run test | test:e2e | test:e2e:prepare
```

## Docs

- [Build plan](docs/plan/README.md) — 14 phases
- [Architecture decisions](docs/plan/00-architecture-decisions.md)
- [QA checklist](docs/qa-checklist.md)
- [Definition of Done](docs/definition-of-done.md)
- [Design system](docs/design-system.md)
