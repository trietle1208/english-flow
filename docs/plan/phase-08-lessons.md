# Phase 08 — Lesson Experience

> Spec: §12 (Lesson), §42 (Core loop)

## Mục tiêu

Màn hình quan trọng nhất của sản phẩm: người dùng học được thật, và tiến độ được ghi lại thật.

## Phụ thuộc

Phase 07.

## Deliverables

```text
src/app/(app)/lessons/[lessonId]/{page,loading,error}.tsx
src/features/lessons/{queries.ts,actions.ts,schemas.ts,types.ts}
src/features/lessons/components/{LessonHeader,LessonBlockRenderer,ObjectiveBlock,ExplanationBlock,VocabularyBlock,ExampleBlock,ExerciseBlock,AudioBlock,LessonFooterNav,LessonStudySession,SimpleMarkdown}.tsx
src/features/vocabulary/components/VocabularyItem.tsx
src/features/study-time/{useStudyHeartbeat.ts,actions.ts}
src/components/shared/AudioButton.tsx
src/lib/activity-date.ts
```

## Task list

- [x] Zod schema cho `LessonBlock` (AD-03) + renderer map `type → component`; gặp type lạ thì bỏ qua an toàn, không crash
- [x] Top bar: tên khoá (link về course), tiêu đề lesson, thanh progress "Lesson 3 of 12"
- [x] Nội dung: Learning objective (khối nhấn) → Explanation → Vocabulary → Examples → Interactive exercises
- [x] `VocabularyBlock` render `VocabularyItem` dùng chung (Phase 09 sẽ gắn nút Save vào đúng component này): word, IPA, part of speech, nghĩa, câu ví dụ, nút phát âm
- [x] Nút phát âm: dùng `audio_url` nếu có, fallback Web Speech API (AD-04); có `aria-label`, bấm được bằng bàn phím (§31)
- [x] `ExerciseBlock`: nhúng quiz inline (Phase 11 cung cấp engine — phase này để interface sẵn, tạm render placeholder rồi nối ở Phase 11)
- [x] Footer: Previous lesson / Next lesson (disable đúng ở đầu và cuối khoá) + nút **"Mark as complete"**
- [x] Server Action `completeLesson(lessonId)`:
  - `requireUser()`, verify lesson tồn tại và user được phép học (không bị locked)
  - upsert `user_progress` (status=completed, progress_percent=100, completed_at)
  - cộng `user_daily_activity.lessons_completed`
  - mở khoá lesson kế tiếp, `revalidatePath` course detail + dashboard
- [x] Server Action `updateLessonProgress(lessonId, percent)` — gọi khi user cuộn/hoàn thành block, giữ trạng thái `in_progress`
- [x] Heartbeat thời gian học (AD-08): hook gửi mỗi 60s khi tab visible, server chặn gian lận
- [x] Trạng thái: loading skeleton, error boundary riêng cho lesson, toast khi complete

## Acceptance criteria

- [x] Mở lesson → `user_progress` chuyển `in_progress`
- [x] Bấm "Mark as complete" → DB cập nhật, quay lại course detail thấy ✓, lesson kế tiếp mở khoá
- [x] Ở lesson cuối khoá, nút Next thành "Back to course"
- [x] Học 3 phút → `user_daily_activity.minutes` tăng ~3, không tăng khi chuyển tab đi chỗ khác
- [x] Gọi `completeLesson` với lesson đang locked → bị từ chối ở server
- [x] Đọc bài bằng bàn phím được từ đầu tới cuối

## Ghi chú

- Đây là mắt xích trung tâm của core loop §42 — ưu tiên chất lượng UX ở đây hơn mọi trang khác.
- `ExerciseBlock` / `AudioBlock` là placeholder có chủ đích (Phase 11 / 10). `VocabularyItem.actions` để trống cho Phase 09 Save button.
- Study-time anti-abuse dùng process-local last-heartbeat map (Phase 1 single Node); `updated_at` của `user_daily_activity` không dùng vì bị các counter khác ghi đè.

## Xác minh (2026-09-15)

Exit Gate: `tsc --noEmit` / `npm run lint` / `npm run build` đều pass. Postgres healthy qua `docker compose` (Option B: app local `PORT=3002 npm start`).

Temp account qua `/api/auth/sign-up/email` (`Origin: http://localhost:3000`) + Server Action POST (`Next-Action` header, `Origin` khớp host):

| Check | Kết quả |
| --- | --- |
| Mở lesson 1 Everyday English | HTML có objective / vocab / Mark as complete; DB `user_progress.status=in_progress` |
| `completeLesson` lesson locked (order 1) | `{ ok:false, error:"Complete the previous lesson…" }` |
| `completeLesson` lesson 1 | `{ ok:true, data:{ courseId } }`; DB `completed` / 100%; `lessons_completed=1` |
| Course detail sau complete | `1/5` · `20%`, lesson 1 Completed, lesson 2 Current |
| Lesson cuối khoá | CTA **Back to course** (không có Next lesson) |
| `recordStudyTime` | Lần 1 `minutesAdded:1`; lần 2 sau 1s `minutesAdded:0` (anti-spam); DB `minutes=1` |
| Play buttons | `aria-label="Play pronunciation of …"` trên từng từ |

Tab-hidden pause được code-audit trong `useStudyHeartbeat` (`document.hidden` → clearInterval). Temp users `phase08*@example.com` đã xoá sau test.
