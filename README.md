# EnglishFlow

Personal English learning platform. Next.js (App Router) + TypeScript + Tailwind + shadcn/ui, PostgreSQL + Drizzle ORM, better-auth.

> Draft README — will be completed in Phase 14. See [CLAUDE.md](CLAUDE.md) for project instructions and current phase status, and [docs/plan/README.md](docs/plan/README.md) for the full build plan.

## Getting started

```bash
cp .env.example .env    # fill in values, see comments in the file
npm install
```

Then pick one of the two options below to get Postgres (and optionally the app) running, then:

```bash
npm run db:generate      # generate a migration from the schema (from Phase 03 onward)
npm run db:migrate       # apply migrations
npm run db:seed          # seed realistic learning content
```

Open [http://localhost:3000](http://localhost:3000).

## Running with Docker

### Option A — full stack in Docker (app + Postgres)

```bash
docker compose up -d
```

Builds the app image and starts both containers. `DATABASE_URL` for the `app`
service is already set in `docker-compose.yml` (host `postgres`, the service
name) — you don't need to edit `.env` for this option.

```bash
docker compose logs -f app              # follow app logs
docker compose exec postgres psql -U postgres -d english_learning   # psql shell
docker compose down                     # stop containers, keep the pgdata volume
```

### Option B — only Postgres in Docker, app runs locally

Faster iteration loop (no image rebuild on every change):

```bash
docker compose up -d postgres
npm run dev
```

Here `.env`'s `DATABASE_URL` must point at `localhost` (the default in
`.env.example`), since the app runs on the host, not inside the `postgres`
container's network.

Either way, Postgres data lives in the named volume `pgdata` and survives
`docker compose down` / restarts — only `docker compose down -v` deletes it.

### Browsing the database

- `npm run db:studio` — [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview), the easiest option, already wired up via `drizzle.config.ts`.
- [Adminer](https://www.adminer.org/) at [http://localhost:8080](http://localhost:8080) (starts with `docker compose up -d`, dev-only) — System: PostgreSQL, Server: `postgres`, User/Password: `postgres`, Database: `english_learning`.

## Scripts

```bash
npm run dev            # start dev server
npm run build           # production build
npm run start            # run production build
npm run lint             # eslint
npm run format            # prettier --write
npm run format:check      # prettier --check
npm run db:generate       # drizzle: generate a migration from the schema
npm run db:migrate        # drizzle: apply migrations
npm run db:push           # drizzle: push schema directly (no migration file)
npm run db:seed           # seed realistic learning content (idempotent)
npm run db:studio         # drizzle studio (browse the database)
```
