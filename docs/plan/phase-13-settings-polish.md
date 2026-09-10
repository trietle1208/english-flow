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

- [ ] **Profile**: sửa Name; Email hiển thị read-only (đổi email không nằm trong Phase 1, ghi chú rõ)
- [ ] **Learning**: Current level (select A1..C1 + link "Retake placement test"), Daily learning goal (10/20/30/45/60 phút), Preferred learning time
- [ ] **Appearance**: Light / Dark / System
- [ ] **Account**: Logout
- [ ] Server Action `updateSettings` — Zod validate, chỉ cho sửa của chính mình, toast success/error
- [ ] Đổi daily goal → Dashboard phản ánh ngay

## Task list — Responsive audit

- [ ] Duyệt qua **toàn bộ** route ở 3 breakpoint 390 / 768 / 1440
- [ ] Không trang nào scroll ngang (§30)
- [ ] Mobile: 1 cột, card full-width, quiz và audio player dùng tốt bằng ngón tay
- [ ] Bảng/danh sách dài trên mobile chuyển thành dạng card hoặc cho scroll trong container riêng
- [ ] Ghi lại kết quả vào `docs/qa-checklist.md`

## Task list — Accessibility audit

- [ ] HTML ngữ nghĩa: `nav`, `main`, `header`, `section`, heading đúng cấp
- [ ] Mọi input có `<label>` gắn đúng `id`
- [ ] Mọi icon-button có `aria-label`
- [ ] Focus state nhìn thấy được ở mọi phần tử tương tác
- [ ] Contrast đạt WCAG AA ở cả light lẫn dark
- [ ] Không có trạng thái nào chỉ truyền đạt bằng màu (§31)
- [ ] Chạy axe DevTools trên: dashboard, lesson, vocabulary, quiz, listening → 0 lỗi nghiêm trọng

## Task list — Performance

- [ ] Rà `"use client"`: bỏ khỏi mọi component không thực sự cần
- [ ] `next/image` cho mọi ảnh, có `sizes` phù hợp
- [ ] `dynamic()` cho các khối nặng ít dùng (charts, audio player)
- [ ] Xác nhận danh sách vocabulary có phân trang, không có endpoint nào trả toàn bộ bảng (§32)
- [ ] Kiểm tra bundle: `npm run build` → xem route nào có First Load JS bất thường

## Task list — Error/Empty/Loading sweep

- [ ] Lập bảng: mỗi route × 4 trạng thái (loading / empty / error / success) → điền đủ, không để ô trống
- [ ] Tắt Postgres → app hiện "Something went wrong. Please try again.", **không** hiện stack trace (§33)
- [ ] Kiểm tra không có `console.log` sót lại; log server dùng logger có mức độ

## Acceptance criteria

- [ ] Settings lưu được và có hiệu lực thật
- [ ] Bảng qa-checklist điền đủ, mọi mục ✓
- [ ] Lighthouse mobile trên `/dashboard`: Performance ≥ 85, Accessibility ≥ 95, Best Practices ≥ 95
- [ ] Không route nào lộ lỗi thô ra người dùng
