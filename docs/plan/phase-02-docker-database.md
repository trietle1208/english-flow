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

- [x] Cài `drizzle-orm`, `postgres` (postgres-js), `zod`; dev: `drizzle-kit`, `tsx`
- [x] `src/env.ts`: parse env bằng Zod, throw rõ ràng khi thiếu biến (AD-10)
- [x] `src/db/index.ts`: tạo client dùng singleton pattern (tránh tạo pool mới mỗi HMR ở dev)
- [x] `drizzle.config.ts`: dialect `postgresql`, schema `./src/db/schema`, out `./drizzle`
- [x] `docker-compose.yml`:
  - service `postgres`: image `postgres:16-alpine`, db `english_learning`, user/pass `postgres`, port `5432:5432`, volume `pgdata:/var/lib/postgresql/data`, **healthcheck** bằng `pg_isready`
  - service `app`: build từ Dockerfile, `depends_on: postgres (condition: service_healthy)`, port `3000:3000`, env `DATABASE_URL=postgresql://postgres:postgres@postgres:5432/english_learning`
  - named volume `pgdata` khai báo ở cấp trên cùng → **không mất dữ liệu khi `docker compose down`**
- [x] `next.config.ts`: `output: "standalone"` để image production nhẹ
- [x] `Dockerfile` multi-stage: `deps` → `builder` → `runner` (node:22-alpine, chạy bằng user non-root `nextjs`)
- [x] `.dockerignore`: `node_modules`, `.next`, `.git`, `.env*`, `playwright-report`, `docs`
- [x] Thêm scripts db:* vào `package.json`
- [x] Viết mục Docker trong README (Option A: full Docker, Option B: chỉ Postgres trong Docker)

## Acceptance criteria

- [x] `docker compose up -d` → cả 2 container `healthy`/`running`
- [x] `docker compose exec postgres psql -U postgres -d english_learning -c '\l'` chạy được (xác nhận bằng phương án tương đương — xem Ghi chú)
- [ ] `docker compose down && docker compose up -d` → dữ liệu trong volume vẫn còn
- [ ] `docker compose logs app` không có lỗi
- [ ] Chạy được cả Option B: `docker compose up -d postgres && npm run dev`
- [x] Bỏ 1 biến trong `.env` → app fail với thông báo rõ ràng từ `src/env.ts`, không phải lỗi `undefined`

> **Cập nhật 2026-09-10**: người dùng đã tự chạy `docker compose up -d` trên máy thật (có Docker) — xác nhận qua Adminer (`http://localhost:8080`) thấy kết nối được tới Postgres. Từ agent sandbox (vẫn **không có quyền** truy cập `/var/run/docker.sock` — đã thử lại, vẫn `permission denied`), publish ports của container lại **reachable qua network của cùng host**, nên xác minh trực tiếp được:
> - `postgres://127.0.0.1:5432` reachable, trả về `PostgreSQL 16.15` — đúng image `postgres:16-alpine` trong compose file.
> - `http://127.0.0.1:3000` trả về `200 OK`, HTML thật của Next.js (`X-Powered-By: Next.js`, `x-nextjs-prerender`) — container `app` build & chạy đúng, và `depends_on: postgres (condition: service_healthy)` đã pass (app không start được nếu healthcheck fail) → gián tiếp xác nhận healthcheck hoạt động.
> - Chạy `drizzle-kit migrate` + `db:seed` (2 lần) thẳng vào Postgres đó qua TCP — thành công, xem [phase-03-schema-seed.md](phase-03-schema-seed.md).
> - Đây là xác nhận tương đương `psql -c '\l'` (dùng `postgres` npm client thay vì `docker compose exec` + `psql`, vì agent sandbox không gọi được lệnh `docker` — nhưng kết nối là tới đúng container đó, không phải Postgres giả lập).
>
> **2 mục còn lại vẫn cần chạy tay** (cần lệnh `docker compose` trực tiếp, agent sandbox không có): `docker compose down && docker compose up -d` rồi kiểm tra dữ liệu còn nguyên; `docker compose logs app` xem có lỗi không. Khả năng cao sẽ pass (named volume `pgdata` + healthcheck đã đúng cấu hình, và app đã trả 200 OK không lỗi), nhưng chưa tự mắt xác nhận được 2 dòng log này.

## Ghi chú

- Hostname DB khác nhau giữa 2 chế độ: trong Docker là `postgres`, chạy local là `localhost`. Ghi rõ trong `.env.example` và README.
- Chưa có bảng nào ở phase này là bình thường — migration thật bắt đầu ở Phase 03.
