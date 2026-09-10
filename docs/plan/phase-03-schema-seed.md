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
├── courses.ts      lessons.ts       vocabulary.ts
├── grammar.ts      listening.ts     quizzes.ts
├── progress.ts     placement-test.ts
src/db/seed.ts + src/db/seed-data/*.ts
drizzle/            # migration files (commit vào git)
```

## Task list — Schema

- [ ] `enums.ts`: `cefr_level` (A1..C1), `skill` (vocabulary|grammar|listening|reading|speaking), `part_of_speech`, `question_type` (multiple_choice|true_false|fill_blank), `difficulty` (easy|medium|hard)
- [ ] `users`: id, name, email (unique), emailVerified, image + cột nghiệp vụ: `cefr_level`, `daily_goal_minutes` (default 20), `preferred_learning_time`, `timezone` (default `Asia/Ho_Chi_Minh`), `onboarded_at`, timestamps
- [ ] `courses`: id, slug (unique), title, description, level, category, `lesson_count`, `estimated_minutes`, `cover_color`, `sort_order`, timestamps
- [ ] `lessons`: id, `course_id` FK cascade, `order_index`, slug, title, skill, `estimated_minutes`, `content jsonb` (AD-03), timestamps. Unique `(course_id, order_index)`
- [ ] `vocabularies`: đúng §16 — word, pronunciation, phonetic, part_of_speech, meaning, example_sentence, audio_url, difficulty, timestamps. Index trên `word`
- [ ] `lesson_vocabularies`: bảng nối `lesson_id` × `vocabulary_id` + `order_index` (một từ dùng lại ở nhiều bài — §13 cấm nhân bản vocabulary)
- [ ] `user_vocabularies`: đúng §16 — user_id, vocabulary_id, saved_at, is_learned, learned_at, last_reviewed_at, review_count, next_review_at. **Unique `(user_id, vocabulary_id)`**, index `(user_id, is_learned)`
- [ ] `grammar_topics`: id, slug, title, level, summary, `content jsonb` (rules / examples / common_mistakes), `quiz_id` nullable, sort_order
- [ ] `listening_lessons`: id, slug, title, difficulty, `duration_seconds`, `audio_url`, `transcript`, `quiz_id`, `course_id` nullable
- [ ] `quizzes`: id, title, description, `reveal_mode` (immediate|after_submit — §19), `pass_score`, `time_limit_seconds` nullable
- [ ] `quiz_questions`: id, quiz_id, order_index, type, prompt, `explanation`, `points`
- [ ] `quiz_answers`: id, question_id, order_index, `content`, `is_correct` (với fill_blank: lưu đáp án chấp nhận được, so khớp không phân biệt hoa thường/khoảng trắng)
- [ ] `quiz_attempts`: id, user_id, quiz_id, score, `total_questions`, `correct_count`, `time_spent_seconds`, `answers jsonb` (để Review Mistakes ở §20), started_at, completed_at
- [ ] `user_progress`: id, user_id, lesson_id, status (not_started|in_progress|completed), `progress_percent`, `completed_at`. Unique `(user_id, lesson_id)`
- [ ] `user_daily_activity`: user_id, `activity_date` (date), minutes, lessons_completed, words_saved, quizzes_completed. Unique `(user_id, activity_date)` — nền cho streak & daily goal (AD-08, AD-09)
- [ ] `user_achievements`: user_id, `achievement_key`, unlocked_at. Unique `(user_id, achievement_key)`
- [ ] `placement_tests`, `placement_test_questions`, `placement_test_attempts` (attempt lưu score + `estimated_level` + answers jsonb)
- [ ] Rà lại index: mọi FK dùng để lọc đều có index; các truy vấn dashboard (`user_progress` theo user, `user_daily_activity` theo user+ngày) phải hit index

## Task list — Seed

- [ ] `seed.ts` **idempotent**: chạy lại nhiều lần không nhân đôi dữ liệu (upsert theo `slug`/`word`)
- [ ] 5 khoá: Everyday English (A1), English Conversation (A2), English for Travel (A2), Essential Grammar (B1), Academic English (B2)
- [ ] ≥5 lessons/khoá (tổng ≥25), có `content` blocks thật: objective + explanation + vocabulary + examples + exercise
- [ ] ≥100 vocabulary: từ thật, IPA thật, nghĩa tiếng Việt thật, câu ví dụ thật, gắn difficulty
- [ ] ≥10 grammar topics (8 chủ đề trong §17 + Comparatives, Articles), mỗi topic có rules + examples + common mistakes + mini quiz
- [ ] ≥5 listening lessons + transcript + file audio trong `public/audio/listening/`
- [ ] ≥5 quizzes, đủ 3 loại câu hỏi, mỗi câu có `explanation`
- [ ] 1 placement test ~20 câu trải từ A1→C1, kèm bảng quy đổi điểm → CEFR
- [ ] Script kiểm đếm sau seed, in ra bảng số lượng từng entity

## Acceptance criteria

- [ ] `npm run db:generate && npm run db:migrate` chạy sạch trên DB trống
- [ ] `npm run db:seed` chạy 2 lần liên tiếp → số lượng bản ghi không đổi
- [ ] Query kiểm chứng đạt ngưỡng: courses ≥5, lessons ≥25, vocabularies ≥100, grammar_topics ≥10, listening_lessons ≥5, quizzes ≥5
- [ ] Không có bản ghi nào chứa lorem ipsum / placeholder
- [ ] `npm run db:studio` mở được, quan hệ FK hiển thị đúng

## Ghi chú

- Các cột `review_count`, `next_review_at`, `last_reviewed_at` **chỉ tạo cột, không viết logic SRS** (§16, §35).
- Nội dung seed nên tách ra `src/db/seed-data/*.ts` theo từng entity để dễ mở rộng, `seed.ts` chỉ là orchestrator.
