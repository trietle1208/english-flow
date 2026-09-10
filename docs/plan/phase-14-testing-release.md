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

- [ ] Cấu hình Vitest + `@testing-library/react` cho component thuần
- [ ] Test `features/quiz/engine.ts`: chấm điểm 3 loại câu hỏi, fill-blank chuẩn hoá chuỗi, tính accuracy, edge case 0 câu
- [ ] Test `features/progress/streak.ts`: streak liên tiếp, đứt quãng, qua mốc nửa đêm theo timezone user
- [ ] Test quy đổi điểm placement → CEFR ở mọi ngưỡng
- [ ] Test Zod schemas: register (mật khẩu không khớp), settings, lesson content block

## Task list — E2E (Playwright)

8 luồng bắt buộc theo §37:

- [ ] 1. Register
- [ ] 2. Login
- [ ] 3. Start lesson
- [ ] 4. Save vocabulary
- [ ] 5. Remove vocabulary
- [ ] 6. Mark vocabulary as learned
- [ ] 7. Complete quiz
- [ ] 8. View progress

- [ ] Test chạy trên DB riêng (`english_learning_test`), có script reset + seed trước khi chạy
- [ ] Mỗi test tự tạo user riêng → chạy song song được, không phụ thuộc thứ tự
- [ ] Chạy ít nhất 1 project ở viewport mobile (390px)

## Task list — README (§39)

- [ ] Project overview
- [ ] Tech stack
- [ ] Requirements (Node version, Docker)
- [ ] Installation
- [ ] Docker setup (`up -d`, `down`, `logs`, `restart` — và ghi rõ dữ liệu không mất khi restart)
- [ ] Environment variables (bảng: tên biến, ý nghĩa, ví dụ)
- [ ] Database setup + Migration + Seed
- [ ] Development: Option A (full Docker) và Option B (Postgres trong Docker, Next.js local)
- [ ] Testing (unit + e2e)
- [ ] Production build
- [ ] Project structure (cây thư mục có chú thích)
- [ ] Troubleshooting: port 5432 bận, migration lỗi, container không healthy

## Task list — Release verification

- [ ] `docker compose down -v` → `docker compose up -d --build` → migrate → seed → app chạy từ con số 0
- [ ] `npm run build && npm start` chạy được ở chế độ production (ngoài Docker)
- [ ] Kiểm tra không file bí mật nào bị commit: `git ls-files | grep -E '^\.env$|secret|credential'` → rỗng
- [ ] Đối chiếu **toàn bộ** checklist §40 vào `docs/definition-of-done.md`, tick từng ô
- [ ] Lịch sử commit theo convention §38
- [ ] Tag `v1.0.0-phase1`

## Acceptance criteria

- [ ] `npm run test` xanh
- [ ] `npx playwright test` — 8/8 flow pass
- [ ] Người chưa từng thấy repo, làm theo README, chạy được app trong <10 phút
- [ ] Mọi ô trong Definition of Done (§40) đều tick được bằng bằng chứng thật

## Ghi chú

- Nếu có ô nào trong §40 chưa tick được → **chưa xong Phase 1**, quay lại phase tương ứng, không "coi như xong".
