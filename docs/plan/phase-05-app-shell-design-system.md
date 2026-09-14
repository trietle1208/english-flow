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

- [x] Chốt token trong `globals.css` cho cả light & dark: `--background`, `--foreground`, `--primary`, `--muted`, `--border`, `--success`, `--warning`, `--destructive`, và 4 màu skill (vocabulary / grammar / listening / reading)
- [x] Chốt scale: radius `--radius: 0.625rem`, spacing dùng scale mặc định của Tailwind, chỉ 2 mức shadow (`sm`, `md`) — spec §29 cấm shadow/màu thừa
- [x] Cài shadcn components: `button input select card badge tabs progress dialog dropdown-menu sonner tooltip skeleton separator avatar sheet scroll-area label form checkbox`
- [x] `EmptyState`: icon + title + description + CTA (dùng lại ở vocabulary rỗng, courses rỗng, progress rỗng — §33)
- [x] `PageHeader`: title + description + slot actions
- [x] `StatCard`: label + value + delta/subtext + optional progress bar
- [x] `next-themes` + toggle Light / Dark / System (dùng lại ở `/settings` Phase 13)
- [x] Viết `docs/design-system.md` ngắn: bảng token, khi nào dùng màu nào, quy tắc "màu chỉ để truyền đạt trạng thái"

## Task list — Navigation & Shell

- [x] `config/navigation.ts`: mảng `{ href, label, icon }` cho Dashboard, Courses, Vocabulary, Grammar, Listening, Quiz, Progress
- [x] Sidebar desktop (≥1024px): logo "EnglishFlow", nav chính, đáy sidebar có User profile + Settings + Logout (§4)
- [x] Mobile (<768px): header gọn (logo + avatar) + **bottom navigation 4 mục**: Dashboard, Courses, Vocabulary, Progress (§4); các mục còn lại nằm trong drawer (`Sheet`) mở từ avatar
- [x] Tablet (768–1023px): sidebar thu gọn chỉ còn icon + tooltip
- [x] Active state rõ ràng, không chỉ dựa vào màu (thêm indicator/bold — §31)
- [x] `UserMenu`: tên, email, link Settings, Logout
- [x] Tạo trang placeholder cho cả 7 route với `PageHeader` + `EmptyState` "Coming in the next phase" — để nav không có link chết
- [x] `error.tsx` toàn cục: "Something went wrong. Please try again." + nút Retry, **không in raw error** (§33)
- [x] `not-found.tsx` + `loading.tsx` với skeleton

## Acceptance criteria

- [x] Điều hướng qua đủ 7 mục, không link chết, active state đúng — xác minh thật bằng Playwright: Tab từ `/dashboard` đi qua đúng 7 href sidebar (`/dashboard /courses /vocabulary /grammar /listening /quiz /progress`), không thiếu link nào
- [x] 390px: không scroll ngang, bottom nav không che nội dung, target chạm ≥44px — xác minh thật (Playwright, viewport 390×844): `document.documentElement.scrollWidth` = 390 (đúng bằng viewport, không tràn ngang), bottom nav item cao thật 63px (>44px), `<main>` có `padding-bottom: 64px` nên nội dung không bị bottom nav che
- [x] 768px và 1440px: layout đúng như mô tả §30 — xác minh thật (Playwright): 768px → `scrollWidth`=768 (không tràn ngang), sidebar hiện icon-only (label `span.truncate` có nhưng `hidden` tới `lg:`, đo được là không visible); 1440px → `scrollWidth`=1440, sidebar hiện icon+label (label visible)
- [x] Dark mode không có chỗ nào chữ chìm vào nền — xác minh thật bằng đo contrast WCAG thật (Playwright lấy `getComputedStyle` màu `oklch(...)`, tự chuyển sang linear-sRGB rồi tính relative luminance theo đúng công thức WCAG — canvas `fillStyle` không normalize được `oklch()` ở Chromium hiện tại nên phải tính tay): sidebar text 17.16:1, page title 18.96:1, muted-foreground 7.63:1 — tất cả đều vượt xa ngưỡng AA (4.5:1 cho text thường, 3:1 cho text lớn/đậm)
- [x] Tab bằng bàn phím đi hết được sidebar, focus ring nhìn thấy rõ (§31) — xác minh thật (Playwright): Tab tuần tự từ `/dashboard` đi qua đủ 7 link sidebar, mỗi link khi focus đều có `box-shadow` từ `focus-visible:ring-2` (đo được khác `none`)
- [x] Ném lỗi giả trong 1 page → `error.tsx` bắt được, hiện thông báo thân thiện — xác minh thật: sửa tạm `courses/page.tsx` thành `throw new Error(...)`, chạy `next dev`, Playwright điều hướng tới `/courses` — `(app)/error.tsx` bắt lỗi, hiện đúng "Something went wrong. Please try again." + nút Retry, sidebar/header vẫn còn nguyên (chỉ vùng nội dung bị thay), message lỗi thật **không** xuất hiện trong text hiển thị (chỉ nằm trong console log dev, đúng thiết kế); đã revert file ngay sau test, `git diff` xác nhận sạch 100%

## Xác minh

**2026-09-10/11**: Không có browser/GUI cho agent này (giống các phase trước), nên xác minh bằng
`npm start` (production build) chạy thật trên `localhost:3001` (đổi cổng vì Docker container
`english-flow-app-1` — build cũ, trước Phase 05 — đã chiếm sẵn cổng 3000) nhắm vào Postgres thật
trên `localhost:5432`, cùng một tài khoản đăng ký thật qua `/api/auth/sign-up/email`:

- Cả 9 route xác thực (`/dashboard /courses /vocabulary /grammar /listening /quiz /progress
  /settings /placement-test`) trả về `200` với đúng nội dung `PageHeader`/`EmptyState` (đã `grep`
  đúng câu "Coming in the next phase" + đúng số phase cho từng trang) — không route nào 404/500.
- Không có cookie → `/dashboard` trả về `307` tới `/login` (middleware + `requireUser()` vẫn đúng).
- Route không tồn tại → `404` thật, render đúng `not-found.tsx` ("Page not found" + nút "Go home").
- Phát hiện 1 lỗi thật trong lúc xác minh (không phải giả định): `not-found.tsx` gốc lúc đầu gọi
  `getCurrentUser()` để đổi CTA giữa "Go home"/"Go to Dashboard" — Next.js statically-optimize file
  `not-found.tsx` gốc cho URL không khớp route nào, nên `headers()`/`cookies()` bên trong nó không
  đáng tin cậy (response bị cache, phớt lờ cookie thật). Đã bỏ nhánh theo session, luôn trỏ về `/`;
  sau khi sửa, `/not-found` build ra `○` (static) đúng như Next.js khuyến nghị, và `/` cũng static
  trở lại (trước đó bị kéo thành `ƒ` một cách không cần thiết).
- Tài khoản test (`phase05-verify-tmp@example.com`) tạo trong lúc xác minh **chưa xoá được** —
  Docker daemon tắt giữa chừng phiên làm việc (agent không có quyền bật lại), cần xoá thủ công
  (`DELETE FROM sessions/accounts/users WHERE email = 'phase05-verify-tmp@example.com'` hoặc qua
  Adminer) khi Postgres online lại.
- `npx tsc --noEmit`, `npm run lint`, `npm run build` đều sạch (0 lỗi, 0 warning).
- Chưa xác minh: hiển thị thật trên 390/768/1440px, dark mode, keyboard-only tab qua sidebar, và
  một lần `error.tsx` bắt lỗi thật thành công (xem ghi chú ở acceptance criteria phía trên).

**2026-09-14**: Lần này có Docker CLI + trình duyệt thật (Playwright/Chromium, cài qua
`npx playwright install chromium` — tải và cài được, không còn giới hạn "no browser" của các lần
trước). Rebuild code Phase 05 mới nhất (`npm run build`, 0 lỗi), chạy production thật trên
`localhost:3001` nhắm vào Postgres thật, đăng ký + đăng nhập một tài khoản test qua **UI form thật**
(không phải gọi thẳng API như trước), rồi dùng Playwright headless để đo trực tiếp trên DOM đã
render — không còn audit code nữa, đã đóng hết 5 acceptance criteria còn lại phía trên bằng số đo
thật (xem chi tiết trong từng dòng). Điểm đáng chú ý: phép đo contrast ban đầu bị lỗi vì Chromium
hiện tại trả `getComputedStyle(...).color` ở dạng `oklch(...)` thay vì `rgb(...)` như các phiên bản
cũ hơn (kể cả `canvas.fillStyle` cũng không tự normalize) — phải tự viết lại phép chuyển
OKLCH → linear-sRGB → relative luminance theo đúng công thức WCAG mới ra số đúng; các lần code-audit
trước đó không phát hiện được vì không thực sự render màu.

Dọn dẹp sau khi xác minh: tài khoản test cũ `phase05-verify-tmp@example.com` (sót lại từ lần trước)
hoá ra không còn trong DB (đã tự biến mất hoặc bị dọn ở đâu đó giữa hai phiên — không chắc chắn tại
sao, nhưng đã xác nhận `SELECT` ra 0 dòng); tài khoản mới tạo lần này
(`phase05-verify2-tmp@example.com`) đã xoá sạch (`users`/`accounts`/`sessions`) ngay sau khi xong.

Còn tồn đọng (không thuộc phạm vi Phase 05, không chặn việc đóng phase): container Docker `app`
(`english-flow-app-1`) đang bị một container rác cùng tên (`...elastic_blackwell`, thiếu label
`com.docker.compose.container-number` — lỗi đã biết của Docker Compose v2.15.1) chặn không cho
`docker compose up -d --build` tạo lại — cần người dùng tự `docker rm -f` container đó (quyền bị
auto-mode classifier chặn với agent). Không ảnh hưởng việc xác minh Phase 05 vì toàn bộ test ở trên
chạy qua `npm start`/`npm run dev` local, không qua container `app`.

## Ghi chú

- Spec §3 cấm: gamification quá đà, UI trẻ con, animation thừa, gradient thừa, badge tràn lan. Giữ mọi thứ tiết chế.
- Không copy giao diện của sản phẩm nào; tham chiếu chỉ là tinh thần (§3).
