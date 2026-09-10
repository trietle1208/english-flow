# Phase 02 — Docker & Database Infrastructure

> Spec: §2 (Database, Dev env), §25 (Docker), §26 (Env), §27 (Local dev)

## Mục tiêu

Một lệnh `docker compose up -d` là có app + Postgres chạy, dữ liệu không mất khi restart, Drizzle kết nối được.

## Phụ thuộc

Phase 01.

## Deliverables

```text
docker-compose.yml   Dockerfile   .dockerignore
drizzle.config.ts
src/env.ts           # zod-validated env
src/db/index.ts      # drizzle client (singleton)
package.json scripts: db:generate db:migrate db:push db:seed db:studio
```

## Task list

- [ ] Cài `drizzle-orm`, `postgres` (postgres-js), `zod`; dev: `drizzle-kit`, `tsx`
- [ ] `src/env.ts`: parse env bằng Zod, throw rõ ràng khi thiếu biến (AD-10)
- [ ] `src/db/index.ts`: tạo client dùng singleton pattern (tránh tạo pool mới mỗi HMR ở dev)
- [ ] `drizzle.config.ts`: dialect `postgresql`, schema `./src/db/schema`, out `./drizzle`
- [ ] `docker-compose.yml`:
  - service `postgres`: image `postgres:16-alpine`, db `english_learning`, user/pass `postgres`, port `5432:5432`, volume `pgdata:/var/lib/postgresql/data`, **healthcheck** bằng `pg_isready`
  - service `app`: build từ Dockerfile, `depends_on: postgres (condition: service_healthy)`, port `3000:3000`, env `DATABASE_URL=postgresql://postgres:postgres@postgres:5432/english_learning`
  - named volume `pgdata` khai báo ở cấp trên cùng → **không mất dữ liệu khi `docker compose down`**
- [ ] `next.config.ts`: `output: "standalone"` để image production nhẹ
- [ ] `Dockerfile` multi-stage: `deps` → `builder` → `runner` (node:22-alpine, chạy bằng user non-root `nextjs`)
- [ ] `.dockerignore`: `node_modules`, `.next`, `.git`, `.env*`, `playwright-report`, `docs`
- [ ] Thêm scripts db:* vào `package.json`
- [ ] Viết mục Docker trong README (Option A: full Docker, Option B: chỉ Postgres trong Docker)

## Acceptance criteria

- [ ] `docker compose up -d` → cả 2 container `healthy`/`running`
- [ ] `docker compose exec postgres psql -U postgres -d english_learning -c '\l'` chạy được
- [ ] `docker compose down && docker compose up -d` → dữ liệu trong volume vẫn còn
- [ ] `docker compose logs app` không có lỗi
- [ ] Chạy được cả Option B: `docker compose up -d postgres && npm run dev`
- [ ] Bỏ 1 biến trong `.env` → app fail với thông báo rõ ràng từ `src/env.ts`, không phải lỗi `undefined`

## Ghi chú

- Hostname DB khác nhau giữa 2 chế độ: trong Docker là `postgres`, chạy local là `localhost`. Ghi rõ trong `.env.example` và README.
- Chưa có bảng nào ở phase này là bình thường — migration thật bắt đầu ở Phase 03.
