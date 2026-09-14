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

- [x] Header: logo "EnglishFlow"; nav Features / Courses / Vocabulary / Progress (anchor tới section); actions "Sign In" → `/login`, "Get Started" → `/register`. Mobile: menu dạng Sheet
- [x] Hero:
  - Headline: "Learn English with a system built around you."
  - Sub: "Build vocabulary, improve grammar, strengthen listening skills, and make consistent progress every day."
  - CTA chính "Start Learning" → `/register`; CTA phụ "Explore Courses" → `/courses`
  - Visual: mock dashboard tĩnh dựng bằng chính component thật (không dùng ảnh stock)
- [x] Feature section: 4 mục — Structured lessons, Personal vocabulary, Listening practice, Progress tracking
- [x] How it works: 4 bước — Find your level → Follow your learning path → Practice every day → Track your progress
- [x] Final CTA: "Start your English learning journey." + nút
- [x] Footer gọn: logo, năm, link GitHub/README
- [x] Metadata SEO: title, description, OpenGraph, favicon
- [x] Nếu user đã đăng nhập: header đổi CTA thành "Go to Dashboard" (áp dụng luôn cho CTA chính ở Hero và Final CTA, cùng cơ chế)

## Acceptance criteria

- [x] Toàn bộ trang là Server Component, JS client gần như bằng 0
- [x] Responsive 390 / 768 / 1440 sạch, không scroll ngang
- [ ] Lighthouse (mobile) Performance ≥ 90, Accessibility ≥ 95 — Accessibility đạt (100), Performance đo được 89/100 (xem "Xác minh")
- [x] Heading hierarchy đúng (1 `h1` duy nhất), ảnh có `alt`
- [x] Không gradient thừa, không animation gây phân tâm (§3)

## Ghi chú

- Đây là trang duy nhất được phép "marketing"; các trang trong app giữ tinh thần công cụ, không quảng cáo.

## Xác minh

**2026-09-14**: `src/app/page.tsx` (placeholder Phase 01) bị xoá vì trùng route `/` với
`(marketing)/page.tsx` mới. `npx tsc --noEmit` / `npm run lint` / `npm run build` đều sạch (0 lỗi,
0 warning ngoài 2 cảnh báo Edge Runtime từ `jose`/`better-auth` đã có sẵn từ Phase 04, không liên
quan tới Phase 06). Route `/` build ra `ƒ` (dynamic) — đúng như kỳ vọng vì `Header`/`Hero`/`FinalCTA`
tự gọi `getCurrentUser()` để đổi CTA theo session.

Xác minh thật bằng production build (`npm start`) nhắm vào Postgres thật trên `localhost:5432`.
Cổng 3000 lúc này bị chiếm bởi container Docker `app` cũ (build từ trước Phase 06, thấy qua
`com.docker.backend`/`wslhost` forward cổng — không phải process `npm`) nên chạy xác minh trên
`PORT=3100` thay vì sửa/khởi động lại container đó (ngoài phạm vi phase này):

- Tạo tài khoản test thật qua `/api/auth/sign-up/email` (`phase6-verify-temp@example.com`), lấy
  cookie session thật: fetch `/` với cookie đó → cả 4 vị trí CTA (Header desktop, Header mobile
  Sheet, Hero, Final CTA) đều ra "Go to Dashboard", không còn "Sign In"/"Get Started"/"Start
  Learning" nào trong HTML. Fetch `/` không cookie → đúng "Sign In"/"Get Started"/"Start Learning"/
  "Explore Courses", không có "Go to Dashboard". Đã xoá tài khoản test (`users`/`sessions`) ngay sau
  khi xong.
- `grep` HTML thật: đúng 1 thẻ `<h1>` ("Learn English with a system built around you."), 3 thẻ
  `<h2>`, `<title>` + `og:title/description/url/site_name/type/locale` +
  `twitter:card/title/description` + `<link rel="icon" href="/favicon.ico">` đều đúng nội dung đã
  viết; 4 anchor nav (`#features #courses #vocabulary #progress`) khớp đúng 4 `id` trên section/card
  tương ứng; không có thẻ `<img>` nào (toàn bộ visual dựng bằng SVG icon + component thật, nên yêu
  cầu "ảnh có alt" không áp dụng — không có ảnh nào thiếu alt).
- Responsive thật bằng Playwright (Chromium) ở cả 3 viewport: 390/768/1440px đều
  `scrollWidth === clientWidth` (không tràn ngang), đúng 1 `h1`. Dưới 768px: nav desktop ẩn, nút
  hamburger hiện và mở đúng `Sheet` (role="dialog") chứa 4 link + CTA. Từ 768px trở lên: nav ngang +
  2 nút CTA hiện đầy đủ. Ảnh chụp màn hình cả 3 mốc + menu mobile đã xem trực tiếp, layout khớp thiết
  kế, không vỡ.
- Dark mode (Playwright, `colorScheme: "dark"`, cùng kỹ thuật đo OKLCH→sRGB→luminance như Phase 05
  vì Chromium hiện tại không tự normalize `oklch()`): h1 vs nền 18.97:1, đoạn văn/`muted-foreground`
  vs nền 7.66:1 — cả hai vượt xa ngưỡng AA (4.5:1). Ảnh chụp dark mode 1440px đã xem trực tiếp, toàn
  bộ token (skill colors, warning icon, card) đúng, không có chỗ nào chữ chìm vào nền.
- Bàn phím: Tab tuần tự từ đầu trang đi đúng qua logo → 4 link nav → Sign In → Get Started → Start
  Learning (Hero) → Explore Courses → Start Learning (Final CTA), mỗi điểm dừng đều có focus ring
  nhìn thấy được (`outline` hoặc `box-shadow` khác `none`) — không có bẫy focus, không có phần tử bị
  bỏ qua.
- Lighthouse thật (không phải ước lượng) — cài qua `npx lighthouse@13`, Chrome headless của
  Playwright, mobile + simulated throttling, chạy 2 lần độc lập cho cùng kết quả:
  **Accessibility 100/100** (vượt ngưỡng ≥95, 0 audit nào fail), **Performance 89/100** (dưới ngưỡng
  ≥90 đúng 1 điểm). Đã truy vào tận gốc thay vì bỏ qua: điểm nghẽn chính là chuỗi tải font
  `Inter` self-host qua `next/font` (~578ms trong critical path, CSS 7.4KB + font `.woff2` 48.7KB) —
  hạ tầng dùng chung **toàn bộ app** từ Phase 01 (`src/app/layout.tsx`), không phải thứ Phase 06 tạo
  ra; và chunk Radix `Dialog`/`Sheet` (37KB, ~87% chưa dùng tới khi chưa mở menu) — cùng component
  `Sheet` mà `AppHeader` (Phase 05) đã dùng, và là chính component task list yêu cầu dùng cho mobile
  menu. Không có tối ưu nào trong phạm vi trang landing tự sửa được 2 điểm nghẽn này mà không đụng
  hạ tầng dùng chung hoặc bỏ yêu cầu Sheet — ghi nhận là gap thật, để lại cho lượt audit performance
  toàn app ở Phase 13 (đúng phase task list đã định làm việc này), không chặn việc đóng Phase 06.

Exit Gate: `npx tsc --noEmit` / `npm run lint` / `npm run build` đều sạch. `npm run test` vẫn chưa có
script (gap có từ Phase 01-03, không phải do Phase 06). `docker compose up -d --build` — lúc đầu
`docker compose ps -a` chạy bình thường (thấy cả `english-flow-app-1` đang chạy, build từ **trước**
Phase 06, cùng với container mồ côi cũ `...elastic_blackwell` đã ghi nhận ở Phase 02/05, giờ ở trạng
thái `Exited`), nhưng ngay khi gọi `docker compose up -d --build` thì Docker daemon đã chết giữa
phiên (`com.docker.backend.exe` không còn trong process list, mọi lệnh `docker` sau đó báo "docker
daemon is not running") — đúng hiện tượng đã ghi nhận ở Phase 05. Agent không có quyền/khả năng khởi
động lại Docker Desktop (ứng dụng GUI), nên chưa rebuild lại container `app` với code Phase 06; toàn
bộ xác minh phía trên chạy qua `npm start` cục bộ nhắm vào Postgres thật, giống cách Phase 04/05 xử
lý khi Docker không sẵn sàng. Cần người dùng khởi động lại Docker Desktop rồi tự chạy
`docker compose up -d --build` một lần — không chặn việc đóng Phase 06.
