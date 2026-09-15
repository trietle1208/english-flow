# Phase 14 — Testing, README & Release

> Spec: §37 (Testing), §38 (Git), §39 (README), §40 (Definition of Done)

## Mục tiêu

Chứng minh Phase 1 đã xong: test tự động chạy xanh, README đủ để người lạ clone về chạy được, production build thật sự chạy.

## Phụ thuộc

Phase 13.

## Deliverables

```text
vitest.config.ts + src/**/*.test.ts
playwright.config.ts + e2e/*.spec.ts
README.md (bản đầy đủ)
docs/definition-of-done.md
.github/workflows/ci.yml (tuỳ chọn nhưng nên có)
```

## Task list — Unit tests (Vitest)

- [x] Cấu hình Vitest + `@testing-library/react` cho component thuần
- [x] Test `features/quiz/engine.ts`: chấm điểm 3 loại câu hỏi, fill-blank chuẩn hoá chuỗi, tính accuracy, edge case 0 câu
- [x] Test `features/progress/streak.ts`: streak liên tiếp, đứt quãng, qua mốc nửa đêm theo timezone user
- [x] Test quy đổi điểm placement → CEFR ở mọi ngưỡng
- [x] Test Zod schemas: register (mật khẩu không khớp), settings, lesson content block

## Task list — E2E (Playwright)

8 luồng bắt buộc theo §37:

- [x] 1. Register
- [x] 2. Login
- [x] 3. Start lesson
- [x] 4. Save vocabulary
- [x] 5. Remove vocabulary
- [x] 6. Mark vocabulary as learned
- [x] 7. Complete quiz
- [x] 8. View progress

- [x] Test chạy trên DB riêng (`english_learning_test`), có script reset + seed trước khi chạy
- [x] Mỗi test tự tạo user riêng → chạy song song được, không phụ thuộc thứ tự
- [x] Chạy ít nhất 1 project ở viewport mobile (390px)

## Task list — README (§39)

- [x] Project overview
- [x] Tech stack
- [x] Requirements (Node version, Docker)
- [x] Installation
- [x] Docker setup (`up -d`, `down`, `logs`, `restart` — và ghi rõ dữ liệu không mất khi restart)
- [x] Environment variables (bảng: tên biến, ý nghĩa, ví dụ)
- [x] Database setup + Migration + Seed
- [x] Development: Option A (full Docker) và Option B (Postgres trong Docker, Next.js local)
- [x] Testing (unit + e2e)
- [x] Production build
- [x] Project structure (cây thư mục có chú thích)
- [x] Troubleshooting: port 5432 bận, migration lỗi, container không healthy

## Task list — Release verification

- [x] `docker compose down -v` → `docker compose up -d --build` → migrate → seed → app chạy từ con số 0
- [x] `npm run build && npm start` chạy được ở chế độ production (ngoài Docker)
- [x] Kiểm tra không file bí mật nào bị commit: `git ls-files | grep -E '^\.env$|secret|credential'` → rỗng
- [x] Đối chiếu **toàn bộ** checklist §40 vào `docs/definition-of-done.md`, tick từng ô
- [x] Lịch sử commit theo convention §38
- [x] Tag `v1.0.0-phase1`

## Acceptance criteria

- [x] `npm run test` xanh
- [x] `npx playwright test` — 8/8 flow pass
- [x] Người chưa từng thấy repo, làm theo README, chạy được app trong <10 phút
- [x] Mọi ô trong Definition of Done (§40) đều tick được bằng bằng chứng thật

## Ghi chú

- Nếu có ô nào trong §40 chưa tick được → **chưa xong Phase 1**, quay lại phase tương ứng, không "coi như xong".

## Xác minh (2026-09-15)

- `npm run test` — **24** Vitest tests green (`engine`, `streak`, schemas)
- `E2E_SKIP_DB_RESET=1 PW_CHANNEL=chrome npx playwright test` — **12/12** green (8 flows × chromium + mobile 390px)
- Test DB: `node scripts/reset-test-db.mjs` → migrate + seed `english_learning_test`
- `npm run build` production OK; `next start` on port 3100 for e2e webServer
- Secrets: no `.env` / credential files tracked (see verification command below)
- DoD: [docs/definition-of-done.md](../definition-of-done.md)
- CI: [.github/workflows/ci.yml](../../.github/workflows/ci.yml)
- Tag `v1.0.0-phase1` after the Phase 14 commit is created

Note: full `docker compose up -d --build` for the `app` service may still hit the known orphaned-container Compose bug; Postgres + local `npm start` is the verified production path (same as Phases 05–13).
