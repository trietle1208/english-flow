# EnglishFlow — Phase 1 Build Plan

Kế hoạch triển khai cho `production-mined.txt` (Build Phase 1 — Personal English Learning Platform).

Spec gốc: [../../production-mined.txt](../../production-mined.txt)
Quyết định kiến trúc (đọc trước khi code): [00-architecture-decisions.md](00-architecture-decisions.md)

---

## Cách dùng tài liệu này

- Mỗi phase = 1 file trong thư mục này, thực hiện **tuần tự**, không nhảy cóc.
- Mỗi file có cấu trúc giống nhau: **Mục tiêu → Phụ thuộc → Deliverables → Task list → Acceptance criteria → Ghi chú**.
- Kết thúc mỗi phase **bắt buộc** chạy Exit Gate (bên dưới) rồi mới commit và sang phase kế tiếp.
- Không để app ở trạng thái broken giữa các phase (yêu cầu §41 của spec).
- Đánh dấu `[x]` trực tiếp vào file phase khi hoàn thành task, và cập nhật cột Status trong bảng dưới.

## Exit Gate (chạy sau MỌI phase)

```bash
npx tsc --noEmit        # TypeScript strict, không lỗi
npm run lint            # ESLint sạch
npm run build           # Production build thành công
npm run test            # Unit tests (từ Phase 14 trở đi bắt buộc pass)
docker compose up -d    # App + Postgres chạy được
```

Nếu phase có đụng schema: thêm `npm run db:generate && npm run db:migrate && npm run db:seed`.

---

## Bản đồ phase

| #   | Phase                                                            | Nội dung chính                                                    | Output kiểm chứng được                            | Status |
| --- | ---------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------- | ------ |
| 01  | [Foundation](phase-01-foundation.md)                             | Next.js + TS strict + Tailwind + shadcn + cấu trúc thư mục        | `npm run dev` chạy, trang trắng có design tokens  | ☑      |
| 02  | [Docker & Database Infra](phase-02-docker-database.md)           | docker-compose, Dockerfile, Drizzle, env validation               | `docker compose up -d` → app + postgres healthy   | ◐      |
| 03  | [Schema & Seed](phase-03-schema-seed.md)                         | Toàn bộ schema Postgres + migration + seed content thật           | `npm run db:seed` → đủ số lượng bản ghi           | ◐      |
| 04  | [Authentication](phase-04-auth.md)                               | Register / Login / Logout / protected routes                      | Đăng ký → vào được `/dashboard`, logout → bị chặn | ☐      |
| 05  | [App Shell & Design System](phase-05-app-shell-design-system.md) | Sidebar, mobile nav, UI kit, theme, loading/error/empty           | Điều hướng đủ 7 mục, dark mode, responsive        | ◐      |
| 06  | [Landing Page](phase-06-landing.md)                              | Trang `/` public                                                  | Landing hoàn chỉnh, CTA dẫn tới `/register`       | ☑      |
| 07  | [Courses](phase-07-courses.md)                                   | `/courses`, `/courses/[courseId]` + search/filter                 | Duyệt 5 khoá, lọc theo level, thấy tiến độ        | ☐      |
| 08  | [Lesson Experience](phase-08-lessons.md)                         | `/lessons/[lessonId]` + hoàn thành bài + điều hướng               | Học xong 1 lesson → progress ghi vào DB           | ☐      |
| 09  | [Personal Vocabulary](phase-09-vocabulary.md)                    | Save/remove/learned + `/vocabulary` + search/filter/sort          | Lưu từ trong lesson → xuất hiện ở My Vocabulary   | ☐      |
| 10  | [Grammar & Listening](phase-10-grammar-listening.md)             | `/grammar`, `/grammar/[topicId]`, `/listening/*`, audio player    | Làm bài grammar + nghe + trả lời, kết quả lưu DB  | ☐      |
| 11  | [Quiz & Placement Test](phase-11-quiz-placement.md)              | Quiz engine tái sử dụng, result, placement test → CEFR            | Hoàn thành quiz → result đúng, attempt lưu DB     | ☐      |
| 12  | [Dashboard & Progress](phase-12-dashboard-progress.md)           | Dashboard dữ liệu thật, streak, `/progress`, charts, achievements | Dashboard phản ánh đúng hoạt động thực tế         | ☐      |
| 13  | [Settings & Polish](phase-13-settings-polish.md)                 | `/settings`, responsive audit, a11y, performance                  | 390/768/1440px sạch, không scroll ngang           | ☐      |
| 14  | [Testing & Release](phase-14-testing-release.md)                 | Vitest, Playwright 8 flow, README, production build               | Toàn bộ Definition of Done tick hết               | ☐      |

Legend: ☐ chưa làm · ◐ đang làm · ☑ xong

---

## Nguyên tắc xuyên suốt (áp dụng ở mọi phase)

1. **Server-first**: mặc định Server Component; chỉ `"use client"` khi cần state/effect/event.
2. **Không tin client**: mọi `userId` lấy từ session phía server, không nhận từ request body.
3. **Feature-oriented**: logic nghiệp vụ nằm trong `src/features/<feature>/`, không nhét vào `app/`.
4. **Không abstraction thừa**: chỉ tách lớp khi đã có ≥2 chỗ dùng thật.
5. **Mọi feature quan trọng phải có đủ 4 trạng thái**: loading, empty, error, success.
6. **Không lorem ipsum**: nội dung seed là tiếng Anh học thuật thật, nghĩa tiếng Việt thật.
7. **Không lộ lỗi DB thô ra UI**: bọc bằng thông báo thân thiện, log chi tiết ở server.
8. **Mỗi phase = 1 commit** theo convention ở §38 của spec.

## Phạm vi bị loại trừ khỏi Phase 1

AI Tutor, AI Chat, AI Speaking, đánh giá phát âm, thuật toán Spaced Repetition, curriculum cá nhân hoá bằng AI, social features.
Chỉ chuẩn bị **chỗ trống về mặt dữ liệu/cấu trúc** (các cột `review_count`, `next_review_at`, thư mục `features/future/`), không viết logic.
