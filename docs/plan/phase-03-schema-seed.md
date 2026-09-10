# Phase 03 — Database Schema & Seed

> Spec: §16, §23, §24, §28

## Mục tiêu

Toàn bộ mô hình dữ liệu Phase 1 tồn tại thật trong Postgres, kèm nội dung học tiếng Anh thật để mọi UI phía sau có dữ liệu render.

## Phụ thuộc

Phase 02.

## Deliverables

```text
src/db/schema/
├── index.ts        # re-export tất cả
├── enums.ts
├── users.ts        # bảng của better-auth + cột nghiệp vụ (AD-01)
├── courses.ts       lessons.ts       vocabulary.ts
├── grammar.ts       listening.ts     quizzes.ts
├── progress.ts       placement-test.ts
src/db/seed.ts + src/db/seed-data/*.ts
drizzle/            # migration files (commit vào git)
```

## Task list — Schema

- [x] `enums.ts`: `cefr_level` (A1..C1), `skill` (vocabulary|grammar|listening|reading|speaking), `part_of_speech`, `question_type` (multiple_choice|true_false|fill_blank), `difficulty` (easy|medium|hard)
- [x] `users`: id, name, email (unique), emailVerified, image + cột nghiệp vụ: `cefr_level`, `daily_goal_minutes` (default 20), `preferred_learning_time`, `timezone` (default `Asia/Ho_Chi_Minh`), `onboarded_at`, timestamps
- [x] `courses`: id, slug (unique), title, description, level, category, `lesson_count`, `estimated_minutes`, `cover_color`, `sort_order`, timestamps
- [x] `lessons`: id, `course_id` FK cascade, `order_index`, slug, title, skill, `estimated_minutes`, `content jsonb` (AD-03), timestamps. Unique `(course_id, order_index)`
- [x] `vocabularies`: đúng §16 — word, pronunciation, phonetic, part_of_speech, meaning, example_sentence, audio_url, difficulty, timestamps. Index trên `word`
- [x] `lesson_vocabularies`: bảng nối `lesson_id` × `vocabulary_id` + `order_index` (một từ dùng lại ở nhiều bài — §13 cấm nhân bản vocabulary)
- [x] `user_vocabularies`: đúng §16 — user_id, vocabulary_id, saved_at, is_learned, learned_at, last_reviewed_at, review_count, next_review_at. **Unique `(user_id, vocabulary_id)`**, index `(user_id, is_learned)`
- [x] `grammar_topics`: id, slug, title, level, summary, `content jsonb` (rules / examples / common_mistakes), `quiz_id` nullable, sort_order
- [x] `listening_lessons`: id, slug, title, difficulty, `duration_seconds`, `audio_url`, `transcript`, `quiz_id`, `course_id` nullable
- [x] `quizzes`: id, title, description, `reveal_mode` (immediate|after_submit — §19), `pass_score`, `time_limit_seconds` nullable (added `slug`, unique, for idempotent seeding — see Ghi chú)
- [x] `quiz_questions`: id, quiz_id, order_index, type, prompt, `explanation`, `points`
- [x] `quiz_answers`: id, question_id, order_index, `content`, `is_correct` (với fill_blank: lưu đáp án chấp nhận được, so khớp không phân biệt hoa thường/khoảng trắng)
- [x] `quiz_attempts`: id, user_id, quiz_id, score, `total_questions`, `correct_count`, `time_spent_seconds`, `answers jsonb` (để Review Mistakes ở §20), started_at, completed_at
- [x] `user_progress`: id, user_id, lesson_id, status (not_started|in_progress|completed), `progress_percent`, `completed_at`. Unique `(user_id, lesson_id)`
- [x] `user_daily_activity`: user_id, `activity_date` (date), minutes, lessons_completed, words_saved, quizzes_completed. Unique `(user_id, activity_date)` — nền cho streak & daily goal (AD-08, AD-09)
- [x] `user_achievements`: user_id, `achievement_key`, unlocked_at. Unique `(user_id, achievement_key)`
- [x] `placement_tests`, `placement_test_questions`, `placement_test_attempts` (attempt lưu score + `estimated_level` + answers jsonb)
- [x] Rà lại index: mọi FK dùng để lọc đều có index; các truy vấn dashboard (`user_progress` theo user, `user_daily_activity` theo user+ngày) phải hit index

## Task list — Seed

- [x] `seed.ts` **idempotent**: chạy lại nhiều lần không nhân đôi dữ liệu (upsert theo `slug`/`word`)
- [x] 5 khoá: Everyday English (A1), English Conversation (A2), English for Travel (A2), Essential Grammar (B1), Academic English (B2)
- [x] ≥5 lessons/khoá (tổng ≥25 — thực tế 25), có `content` blocks thật: objective + explanation + vocabulary + examples + exercise
- [x] ≥100 vocabulary (thực tế 134): từ thật, IPA thật, nghĩa tiếng Việt thật, câu ví dụ thật, gắn difficulty
- [x] ≥10 grammar topics (thực tế 10: 8 chủ đề trong §17 + Comparatives + Articles), mỗi topic có rules + examples + common mistakes + mini quiz
- [x] ≥5 listening lessons (thực tế 5) + transcript + file audio trong `public/audio/listening/` — **transcript và quiz có thật; file mp3 thì chưa, xem Ghi chú**
- [x] ≥5 quizzes (thực tế 19: 4 course-practice + 10 grammar mini-quiz + 5 listening comprehension), đủ 3 loại câu hỏi, mỗi câu có `explanation`
- [x] 1 placement test 20 câu trải từ A1→C1 (4 câu/level), kèm bảng quy đổi điểm → CEFR (`placementScoreToLevel` trong `seed-data/placement-test.ts`)
- [x] Script kiểm đếm sau seed, in ra bảng số lượng từng entity (`console.table` cuối `seed.ts`)

## Acceptance criteria

- [x] `npm run db:generate && npm run db:migrate` chạy sạch trên DB trống
- [x] `npm run db:seed` chạy 2 lần liên tiếp → số lượng bản ghi không đổi
- [x] Query kiểm chứng đạt ngưỡng: courses = 5, lessons = 25, vocabularies = 134, grammar_topics = 10, listening_lessons = 5, quizzes = 19
- [x] Không có bản ghi nào chứa lorem ipsum / placeholder (seed.ts tự kiểm tra bằng `assertNoPlaceholderContent`, cộng rà soát thủ công)
- [ ] `npm run db:studio` mở được, quan hệ FK hiển thị đúng — **chưa tự xác nhận được** (không có UI trong sandbox), xem Ghi chú

> **Cách đã xác nhận**:
>
> 1. Ban đầu (sandbox, chưa có Docker thật): cài tạm `embedded-postgres` (Postgres 18 chạy không cần root) + tải tạm Node 22 (khớp `node:22-alpine`, vì `uuid`'s `v7()` cần `globalThis.crypto` mà sandbox chỉ có Node 18.19) → chạy `drizzle-kit generate` → `migrate` → `db:seed` (2 lần liên tiếp) trên Postgres tạm đó — thành công, số bản ghi giữ nguyên ở lần 2. Dọn dẹp, không cài gì vào `package.json` của dự án.
> 2. **Cập nhật 2026-09-10 — trên Postgres thật của người dùng**: người dùng đã tự chạy `docker compose up -d` trên máy có Docker (xác nhận qua Adminer). Container `postgres` publish port `5432:5432` nên **reachable trực tiếp từ agent sandbox qua network host** dù sandbox không gọi được lệnh `docker`. Đã chạy lại `drizzle-kit migrate` + `db:seed` (2 lần) thẳng vào container thật đó — cùng kết quả: 18 bảng, đúng số bản ghi ở trên, 0 bản ghi mồ côi FK, 0 từ trùng lặp. Đây là xác nhận mạnh hơn bước 1 vì chạy trên đúng Postgres mà `docker-compose.yml` định nghĩa, không phải mô phỏng.
> - `npx tsc --noEmit`, `npm run lint`, `npm run build` đều pass (cả Node 18 lẫn Node 22).
>
> **Việc còn lại cho người dùng**: mở `npm run db:studio` (hoặc refresh Adminer đang mở sẵn ở `localhost:8080`, chọn schema `public`) để tự mắt xác nhận UI hiển thị đúng 18 bảng + quan hệ FK — agent sandbox không có trình duyệt/GUI nên chỉ xác nhận được bằng query, chưa xác nhận được phần hiển thị UI.

## Ghi chú

- Các cột `review_count`, `next_review_at`, `last_reviewed_at` **chỉ tạo cột, không viết logic SRS** (§16, §35).
- Nội dung seed tách ra `src/db/seed-data/*.ts` theo từng entity (`courses.ts`, `vocabulary.ts`, `grammar.ts`, `listening.ts`, `quizzes.ts`, `placement-test.ts`); `seed.ts` chỉ là orchestrator, upsert theo natural key (slug/word) để giữ id ổn định qua các lần seed lại (không phá FK của dữ liệu người dùng thật ở các phase sau).
- `quizzes` có thêm cột `slug` (không có trong bản phác thảo §23 gốc) để `seed.ts` upsert quiz theo key ổn định thay vì theo `title` tự do.
- **Audio thật cho listening lessons chưa có** (`public/audio/*.mp3` không tồn tại). Sandbox này không có binary TTS (`espeak-ng` thiếu binary, chỉ có data package) và không có quyền tải/ghi âm thật. `listening_lessons.audio_url` đã seed đúng đường dẫn dự kiến (`/audio/listening/*.mp3`), transcript + quiz đã có thật — chỉ thiếu file âm thanh. Xem [public/audio/README.md](../../public/audio/README.md) để biết việc cần làm trước khi Phase 10 (Listening) dùng tới các file này. Đây là quyết định có chủ đích (không tạo file âm thanh giả/tiếng bíp) để tuân thủ nguyên tắc "No fake content" — khác với việc tự động hoá được.
- `users` bảng dùng tên số nhiều `users` (khớp task list phase này và §23 gốc); AD-01 sẽ cấu hình better-auth's Drizzle adapter với `usePlural: true` ở Phase 04 để map đúng vào bảng này.
