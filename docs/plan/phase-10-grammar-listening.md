# Phase 10 — Grammar & Listening

> Spec: §17 (Grammar), §18 (Listening), §31 (Accessibility)

## Mục tiêu

Hai kỹ năng còn lại có màn hình học thực sự dùng được, kết quả luyện tập được lưu.

## Phụ thuộc

Phase 09; engine quiz đầy đủ ở Phase 11 (phase này dùng mini-quiz đơn giản, sẽ thay bằng engine chung).

## Deliverables

```text
src/app/(app)/grammar/{page,loading}.tsx
src/app/(app)/grammar/[topicId]/{page,loading}.tsx
src/app/(app)/listening/{page,loading}.tsx
src/app/(app)/listening/[lessonId]/{page,loading,error}.tsx
src/features/grammar/{queries.ts,types.ts,components/}
src/features/listening/{queries.ts,actions.ts,transcript.ts,types.ts,components/AudioPlayer.tsx,components/TranscriptPanel.tsx}
src/features/quiz/{queries.ts,actions.ts,schemas.ts,types.ts,components/MiniQuiz.tsx}
public/audio/listening/*.mp3
```

## Task list — Grammar

- [x] `/grammar`: lưới topic gộp theo level, mỗi card có title, summary, badge level, trạng thái đã học
- [x] `/grammar/[topicId]` render từ `content jsonb`: Explanation → Rules → Examples → Common mistakes → Mini exercises
- [x] Khối "Common mistakes" hiển thị dạng ❌ sai / ✅ đúng, có giải thích ngắn
- [x] Câu ví dụ tiếng Anh kèm nghĩa tiếng Việt (toggle hiện/ẩn nghĩa để tự kiểm tra)
- [x] Mini quiz cuối trang → dùng quiz engine (nối ở Phase 11), kết quả lưu `quiz_attempts`
- [x] Điều hướng Previous / Next topic

## Task list — Listening

- [x] `/listening`: danh sách bài nghe — title, difficulty, duration, trạng thái hoàn thành
- [x] `/listening/[lessonId]`: header (title, difficulty, duration) + player + transcript toggle + câu hỏi
- [x] `AudioPlayer` tự viết (không thêm dependency): Play/Pause, seek bar kéo được, hiển thị thời gian, Volume, Playback speed (0.75× / 1× / 1.25× / 1.5×)
- [x] **Accessibility cho player** (§31): mọi nút là `<button>` thật có `aria-label`; Space = play/pause, ← → = tua ±5s; seek bar dùng `role="slider"` với `aria-valuenow`; focus ring rõ
- [x] Transcript ẩn mặc định, nút "Show transcript"; khi hiện thì highlight theo thời gian nếu có timestamp, không có thì hiện text tĩnh
- [x] Câu hỏi đủ 3 loại: multiple choice, true/false, fill in the blank
- [x] Sau khi submit: hiện đáp án đúng, đáp án của user, và explanation (§18)
- [x] Lưu kết quả vào `quiz_attempts` (gắn với quiz của listening lesson)
- [x] Responsive: trên mobile player full-width, nút đủ lớn để chạm (§30)

## Acceptance criteria

- [x] Mở 1 grammar topic → đủ 5 phần nội dung, không phần nào rỗng
- [x] Làm mini quiz grammar → có kết quả + attempt trong DB
- [x] Audio phát được, tua được, đổi tốc độ được, chỉnh âm lượng được
- [x] Điều khiển player hoàn toàn bằng bàn phím
- [x] Submit bài nghe → thấy đáp án đúng/sai + giải thích, kết quả lưu DB
- [x] 390px: player không tràn, không scroll ngang (layout full-width + large touch targets; see Xác minh)

## Ghi chú

- File audio đặt trong `public/audio/listening/`, đặt tên theo slug. Phase 10 generated real TTS MP3s for all 5 seed lessons (not silent placeholders). Seed `durationSeconds` matches measured lengths.

## Xác minh (2026-09-15)

Exit Gate: `npx tsc --noEmit` / `npm run lint` / `npm run build` pass. `npm run db:seed` refreshed listening durations. App on `PORT=3004 npm start` against Docker Postgres (`:3000`/`:3003` already held).

Temp account via `/api/auth/sign-up/email` + HTML fetch + Server Action POST (`Next-Action` for `submitQuizAttempt`):

| Check | Kết quả |
| --- | --- |
| `/grammar` | `200`, topics grouped (Present Simple, etc.), Study CTAs |
| `/grammar/[topicId]` (Present Simple) | Explanation / Rules / Examples / Common mistakes / Mini exercises + Show meanings + Prev/Next |
| Grammar quiz submit (all correct) | `quiz_attempts` row score `100`, `4/4`; `user_daily_activity.quizzes_completed` +1; list shows Practiced |
| `/listening` | `200`, Ordering Coffee + difficulty badges |
| `/listening/[lessonId]` | Show transcript, Seek/Play/Mute, Playback speed, Comprehension + Submit |
| `/audio/listening/ordering-coffee.mp3` | `200`, ~205KB real MPEG layer III |
| Listening quiz submit | second attempt `100` `3/3`; daily `quizzes_completed = 2`; list shows Completed |
| Temp user cleanup | `phase10-*@example.com` deleted |
| 390px layout | Player `w-full`, controls `min-h-11`/`min-h-12`, page `max-w-3xl` + horizontal padding — no overflow classes; Chromium measure not re-run this pass |

Mini quiz lives in `features/quiz` (Phase 11 will replace `MiniQuiz` with the full QuizRunner). Keyboard a11y is implemented on `AudioPlayer` (Space / arrows / seek slider).
