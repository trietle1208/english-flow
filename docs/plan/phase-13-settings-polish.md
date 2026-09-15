# Phase 13 — Settings & Polish

> Spec: §22 (Settings), §30 (Responsive), §31 (Accessibility), §32 (Performance), §33 (Error handling)

## Mục tiêu

Đóng nốt trang Settings và quét toàn bộ ứng dụng một lượt về responsive, accessibility, performance, trạng thái lỗi.

## Phụ thuộc

Phase 12 (mọi trang đã tồn tại).

## Deliverables

```text
src/app/(app)/settings/page.tsx
src/features/settings/{actions.ts,schemas.ts,components/}
docs/qa-checklist.md
```

## Task list — Settings

- [x] **Profile**: sửa Name; Email hiển thị read-only (đổi email không nằm trong Phase 1, ghi chú rõ)
- [x] **Learning**: Current level (select A1..C1 + link "Retake placement test"), Daily learning goal (10/20/30/45/60 phút), Preferred learning time
- [x] **Appearance**: Light / Dark / System
- [x] **Account**: Logout
- [x] Server Action `updateSettings` — Zod validate, chỉ cho sửa của chính mình, toast success/error
- [x] Đổi daily goal → Dashboard phản ánh ngay

## Task list — Responsive audit

- [x] Duyệt qua **toàn bộ** route ở 3 breakpoint 390 / 768 / 1440
- [x] Không trang nào scroll ngang (§30)
- [x] Mobile: 1 cột, card full-width, quiz và audio player dùng tốt bằng ngón tay
- [x] Bảng/danh sách dài trên mobile chuyển thành dạng card hoặc cho scroll trong container riêng
- [x] Ghi lại kết quả vào `docs/qa-checklist.md`

## Task list — Accessibility audit

- [x] HTML ngữ nghĩa: `nav`, `main`, `header`, `section`, heading đúng cấp
- [x] Mọi input có `<label>` gắn đúng `id`
- [x] Mọi icon-button có `aria-label`
- [x] Focus state nhìn thấy được ở mọi phần tử tương tác
- [x] Contrast đạt WCAG AA ở cả light lẫn dark
- [x] Không có trạng thái nào chỉ truyền đạt bằng màu (§31)
- [x] Chạy axe DevTools trên: dashboard, lesson, vocabulary, quiz, listening → 0 lỗi nghiêm trọng

## Task list — Performance

- [x] Rà `"use client"`: bỏ khỏi mọi component không thực sự cần
- [x] `next/image` cho mọi ảnh, có `sizes` phù hợp
- [x] `dynamic()` cho các khối nặng ít dùng (charts, audio player)
- [x] Xác nhận danh sách vocabulary có phân trang, không có endpoint nào trả toàn bộ bảng (§32)
- [x] Kiểm tra bundle: `npm run build` → xem route nào có First Load JS bất thường

## Task list — Error/Empty/Loading sweep

- [x] Lập bảng: mỗi route × 4 trạng thái (loading / empty / error / success) → điền đủ, không để ô trống
- [x] Tắt Postgres → app hiện "Something went wrong. Please try again.", **không** hiện stack trace (§33)
- [x] Kiểm tra không có `console.log` sót lại; log server dùng logger có mức độ

## Acceptance criteria

- [x] Settings lưu được và có hiệu lực thật
- [x] Bảng qa-checklist điền đủ, mọi mục ✓
- [x] Lighthouse mobile trên `/dashboard`: Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95
- [x] Không route nào lộ lỗi thô ra người dùng

## Xác minh (2026-09-15)

`npx tsc --noEmit` / `npm run lint` / `npm run build` pass.

Live against Docker Postgres + `PORT=3007 npm start`:

- `/settings` renders Profile / Learning / Appearance / Account (email read-only note present)
- Persist `daily_goal_minutes=45` → session `dailyGoalMinutes: 45` → Dashboard Daily Goal shows `0 / 45 min` + `aria-label="Daily goal 0 of 45 minutes"`
- `updateSettings` writes via Drizzle scoped to `requireUser().id` and revalidates `/settings`, `/dashboard`, `/courses`, `/progress`
- Charts (`SkillPerformanceChart`, `WeeklyActivityChart`) and Listening `AudioPlayer` loaded via `next/dynamic`
- Server Actions log through `src/lib/logger.ts` (leveled); no runtime `console.log` left in app code
- Bundle (First Load JS): `/dashboard` 116 kB, `/settings` 203 kB, `/progress` 217 kB (Recharts); no outlier beyond expected chart weight
- Full audit matrix: [docs/qa-checklist.md](../qa-checklist.md)

Lighthouse mobile (headless Chrome, 2026-09-15): Performance **98**, Accessibility **98**, Best Practices **100** (targets ≥85 / ≥95 / ≥95). Settings + daily-goal reflection verified live on `PORT=3007 npm start` against Docker Postgres.
