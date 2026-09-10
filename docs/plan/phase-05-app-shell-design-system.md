# Phase 05 — App Shell & Design System

> Spec: §3 (Philosophy), §4 (Navigation), §29 (Design system), §30 (Responsive), §33 (Error handling)

## Mục tiêu

Một bộ khung giao diện dùng chung cho tất cả trang đã đăng nhập, và một bộ component đủ để các phase sau không phải tự chế UI.

## Phụ thuộc

Phase 04.

## Deliverables

```text
src/app/(app)/layout.tsx           # AppShell
src/components/layout/{Sidebar,MobileNav,AppHeader,UserMenu}.tsx
src/components/ui/*                # shadcn primitives
src/components/shared/{PageHeader,EmptyState,StatCard,ProgressRing,SectionCard}.tsx
src/components/theme/ThemeProvider.tsx
src/config/navigation.ts
loading.tsx / error.tsx / not-found.tsx ở các cấp route
```

## Task list — Design system

- [ ] Chốt token trong `globals.css` cho cả light & dark: `--background`, `--foreground`, `--primary`, `--muted`, `--border`, `--success`, `--warning`, `--destructive`, và 4 màu skill (vocabulary / grammar / listening / reading)
- [ ] Chốt scale: radius `--radius: 0.625rem`, spacing dùng scale mặc định của Tailwind, chỉ 2 mức shadow (`sm`, `md`) — spec §29 cấm shadow/màu thừa
- [ ] Cài shadcn components: `button input select card badge tabs progress dialog dropdown-menu sonner tooltip skeleton separator avatar sheet scroll-area label form checkbox`
- [ ] `EmptyState`: icon + title + description + CTA (dùng lại ở vocabulary rỗng, courses rỗng, progress rỗng — §33)
- [ ] `PageHeader`: title + description + slot actions
- [ ] `StatCard`: label + value + delta/subtext + optional progress bar
- [ ] `next-themes` + toggle Light / Dark / System (dùng lại ở `/settings` Phase 13)
- [ ] Viết `docs/design-system.md` ngắn: bảng token, khi nào dùng màu nào, quy tắc "màu chỉ để truyền đạt trạng thái"

## Task list — Navigation & Shell

- [ ] `config/navigation.ts`: mảng `{ href, label, icon }` cho Dashboard, Courses, Vocabulary, Grammar, Listening, Quiz, Progress
- [ ] Sidebar desktop (≥1024px): logo "EnglishFlow", nav chính, đáy sidebar có User profile + Settings + Logout (§4)
- [ ] Mobile (<768px): header gọn (logo + avatar) + **bottom navigation 4 mục**: Dashboard, Courses, Vocabulary, Progress (§4); các mục còn lại nằm trong drawer (`Sheet`) mở từ avatar
- [ ] Tablet (768–1023px): sidebar thu gọn chỉ còn icon + tooltip
- [ ] Active state rõ ràng, không chỉ dựa vào màu (thêm indicator/bold — §31)
- [ ] `UserMenu`: tên, email, link Settings, Logout
- [ ] Tạo trang placeholder cho cả 7 route với `PageHeader` + `EmptyState` "Coming in the next phase" — để nav không có link chết
- [ ] `error.tsx` toàn cục: "Something went wrong. Please try again." + nút Retry, **không in raw error** (§33)
- [ ] `not-found.tsx` + `loading.tsx` với skeleton

## Acceptance criteria

- [ ] Điều hướng qua đủ 7 mục, không link chết, active state đúng
- [ ] 390px: không scroll ngang, bottom nav không che nội dung, target chạm ≥44px
- [ ] 768px và 1440px: layout đúng như mô tả §30
- [ ] Dark mode không có chỗ nào chữ chìm vào nền
- [ ] Tab bằng bàn phím đi hết được sidebar, focus ring nhìn thấy rõ (§31)
- [ ] Ném lỗi giả trong 1 page → `error.tsx` bắt được, hiện thông báo thân thiện

## Ghi chú

- Spec §3 cấm: gamification quá đà, UI trẻ con, animation thừa, gradient thừa, badge tràn lan. Giữ mọi thứ tiết chế.
- Không copy giao diện của sản phẩm nào; tham chiếu chỉ là tinh thần (§3).
