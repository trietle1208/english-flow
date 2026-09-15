# Phase 07 — Courses

> Spec: §10 (Courses), §11 (Course detail), §32 (Performance)

## Mục tiêu

Người dùng tìm được khoá học phù hợp và thấy rõ mình đang ở đâu trong khoá đó.

## Phụ thuộc

Phase 03 (seed), Phase 05 (shell).

## Deliverables

```text
src/app/(app)/courses/page.tsx
src/app/(app)/courses/[courseId]/page.tsx
src/app/(app)/lessons/[lessonId]/page.tsx   # unlock gate only; full UI in Phase 08
src/features/courses/{queries.ts,types.ts,components/CourseCard.tsx,components/CourseFilters.tsx,components/LessonListItem.tsx,components/CourseList.tsx}
src/config/cefr.ts
src/lib/format.ts
```

## Task list — `/courses`

- [x] `queries.ts`: `listCourses({ userId, search, level, category, page })` — join sẵn tiến độ của user, tính `completedLessons / lessonCount` **bằng SQL**, không tính ở JS
- [x] Search + Level filter (A1..C1) + Category filter, đồng bộ vào **URL searchParams** (share được link, không cần client state)
- [x] Debounce ô search (client component nhỏ), phần list vẫn là Server Component
- [x] `CourseCard`: title, description, badge CEFR, số lessons, thời lượng ước tính, progress bar, nút Start / Continue (chữ đổi theo tiến độ)
- [x] Empty state khi filter không ra kết quả: "No courses match your filters." + nút Clear filters
- [x] Skeleton loading khi đổi filter (`loading.tsx` + `Suspense` key theo searchParams)

## Task list — `/courses/[courseId]`

- [x] Header khoá: title, description, level, số lessons, thời lượng, overall progress
- [x] Danh sách lesson đánh số `01 — Introductions`, hiện: số thứ tự, title, skill badge, duration, status
- [x] 3 trạng thái phân biệt rõ bằng **cả icon lẫn màu** (§31): Completed (✓), Current (viền nhấn + chữ "Current"), Locked (khoá + mờ)
- [x] Quy tắc unlock: lesson `n` mở khi lesson `n-1` completed; lesson 1 luôn mở. Bấm vào lesson locked → tooltip giải thích, không điều hướng
- [x] Nút "Continue" ở đầu trang nhảy thẳng tới lesson hiện tại
- [x] `generateMetadata` theo tên khoá; 404 khi courseId không tồn tại

## Acceptance criteria

- [x] Lọc theo level → URL đổi, F5 giữ nguyên kết quả
- [x] Search "travel" → ra English for Travel
- [x] Tiến độ hiển thị khớp với `user_progress` trong DB
- [x] Lesson locked không vào được kể cả khi gõ URL trực tiếp (chặn ở server — §34)
- [x] Trang courses không tải toàn bộ lessons của mọi khoá về client (§32)

## Ghi chú

- Phân trang chỉ cần khi >20 khoá; Phase 1 có 5 khoá nên viết sẵn tham số `page` nhưng chưa cần UI phân trang.
- `/lessons/[lessonId]` ở phase này chỉ là **unlock gate** + placeholder: locked → `redirect` về course detail; unlocked → EmptyState "Phase 08". Full lesson UI thuộc Phase 08.

## Xác minh (2026-09-15)

Exit Gate: `tsc --noEmit` / `npm run lint` / `npm run build` đều pass. Postgres chạy qua `docker compose up -d postgres` (volume mới trên máy này → migrate + seed lại: 5 courses / 25 lessons).

Chạy production (`next start -p 3001`, vì `:3000` đang bị project khác chiếm) + temp account qua `/api/auth/sign-up/email`:

| Check | Kết quả |
| --- | --- |
| `/courses` | 5 khoá seed hiện đủ (Everyday / Conversation / Travel / Grammar / Academic) |
| `/courses?search=travel` | Chỉ **English for Travel** |
| `/courses?level=A1` | Chỉ **Everyday English** |
| Course detail | Header + `01 — …` list, badge **Current**, nút **Continue**, overall progress |
| `getLessonAccess` / locked URL | Lesson `orderIndex≥1` khi chưa xong bài trước → `kind: "locked"`; page gọi `redirect(/courses/[id])` (Next.js stream meta-refresh, browser không ở lại lesson) |
| Progress SQL | Sau khi insert `user_progress` completed cho lesson 1: catalog `1/5` / `20%` khớp detail; lesson 2 `allowed`, lesson 3 vẫn `locked` |
| Catalog payload | Không có field `content`; chỉ metadata + `completedLessons` / `continueLessonId` |

Temp users `phase07*@example.com` đã xoá sau test. `docker compose up -d` full stack (app container) chưa chạy — `:3000` conflict với container ngoài repo; Option B (postgres docker + app local) đã đủ để verify.
