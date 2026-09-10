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
src/features/courses/{queries.ts,components/CourseCard.tsx,components/CourseFilters.tsx,components/LessonListItem.tsx}
```

## Task list — `/courses`

- [ ] `queries.ts`: `listCourses({ userId, search, level, category, page })` — join sẵn tiến độ của user, tính `completedLessons / lessonCount` **bằng SQL**, không tính ở JS
- [ ] Search + Level filter (A1..C1) + Category filter, đồng bộ vào **URL searchParams** (share được link, không cần client state)
- [ ] Debounce ô search (client component nhỏ), phần list vẫn là Server Component
- [ ] `CourseCard`: title, description, badge CEFR, số lessons, thời lượng ước tính, progress bar, nút Start / Continue (chữ đổi theo tiến độ)
- [ ] Empty state khi filter không ra kết quả: "No courses match your filters." + nút Clear filters
- [ ] Skeleton loading khi đổi filter (`loading.tsx` + `Suspense` key theo searchParams)

## Task list — `/courses/[courseId]`

- [ ] Header khoá: title, description, level, số lessons, thời lượng, overall progress
- [ ] Danh sách lesson đánh số `01 — Introductions`, hiện: số thứ tự, title, skill badge, duration, status
- [ ] 3 trạng thái phân biệt rõ bằng **cả icon lẫn màu** (§31): Completed (✓), Current (viền nhấn + chữ "Current"), Locked (khoá + mờ)
- [ ] Quy tắc unlock: lesson `n` mở khi lesson `n-1` completed; lesson 1 luôn mở. Bấm vào lesson locked → tooltip giải thích, không điều hướng
- [ ] Nút "Continue" ở đầu trang nhảy thẳng tới lesson hiện tại
- [ ] `generateMetadata` theo tên khoá; 404 khi courseId không tồn tại

## Acceptance criteria

- [ ] Lọc theo level → URL đổi, F5 giữ nguyên kết quả
- [ ] Search "travel" → ra English for Travel
- [ ] Tiến độ hiển thị khớp với `user_progress` trong DB
- [ ] Lesson locked không vào được kể cả khi gõ URL trực tiếp (chặn ở server — §34)
- [ ] Trang courses không tải toàn bộ lessons của mọi khoá về client (§32)

## Ghi chú

- Phân trang chỉ cần khi >20 khoá; Phase 1 có 5 khoá nên viết sẵn tham số `page` nhưng chưa cần UI phân trang.
