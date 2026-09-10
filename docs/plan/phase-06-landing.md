# Phase 06 — Landing Page

> Spec: §6

## Mục tiêu

Trang `/` public, hoàn chỉnh, đủ sức thuyết phục — đây là bộ mặt của sản phẩm.

## Phụ thuộc

Phase 05 (design system).

## Deliverables

```text
src/app/(marketing)/layout.tsx
src/app/(marketing)/page.tsx
src/features/marketing/components/{Header,Hero,Features,HowItWorks,FinalCTA,Footer}.tsx
```

## Task list

- [ ] Header: logo "EnglishFlow"; nav Features / Courses / Vocabulary / Progress (anchor tới section); actions "Sign In" → `/login`, "Get Started" → `/register`. Mobile: menu dạng Sheet
- [ ] Hero:
  - Headline: "Learn English with a system built around you."
  - Sub: "Build vocabulary, improve grammar, strengthen listening skills, and make consistent progress every day."
  - CTA chính "Start Learning" → `/register`; CTA phụ "Explore Courses" → `/courses`
  - Visual: mock dashboard tĩnh dựng bằng chính component thật (không dùng ảnh stock)
- [ ] Feature section: 4 mục — Structured lessons, Personal vocabulary, Listening practice, Progress tracking
- [ ] How it works: 4 bước — Find your level → Follow your learning path → Practice every day → Track your progress
- [ ] Final CTA: "Start your English learning journey." + nút
- [ ] Footer gọn: logo, năm, link GitHub/README
- [ ] Metadata SEO: title, description, OpenGraph, favicon
- [ ] Nếu user đã đăng nhập: header đổi CTA thành "Go to Dashboard"

## Acceptance criteria

- [ ] Toàn bộ trang là Server Component, JS client gần như bằng 0
- [ ] Responsive 390 / 768 / 1440 sạch, không scroll ngang
- [ ] Lighthouse (mobile) Performance ≥ 90, Accessibility ≥ 95
- [ ] Heading hierarchy đúng (1 `h1` duy nhất), ảnh có `alt`
- [ ] Không gradient thừa, không animation gây phân tâm (§3)

## Ghi chú

- Đây là trang duy nhất được phép "marketing"; các trang trong app giữ tinh thần công cụ, không quảng cáo.
