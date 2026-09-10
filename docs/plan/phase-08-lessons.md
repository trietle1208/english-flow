# Phase 08 — Lesson Experience

> Spec: §12 (Lesson), §42 (Core loop)

## Mục tiêu

Màn hình quan trọng nhất của sản phẩm: người dùng học được thật, và tiến độ được ghi lại thật.

## Phụ thuộc

Phase 07.

## Deliverables

```text
src/app/(app)/lessons/[lessonId]/page.tsx
src/features/lessons/{queries.ts,actions.ts,schemas.ts}
src/features/lessons/components/{LessonHeader,LessonBlockRenderer,VocabularyBlock,ExampleBlock,ExerciseBlock,LessonFooterNav}.tsx
src/features/study-time/{useStudyHeartbeat.ts,actions.ts}
```

## Task list

- [ ] Zod schema cho `LessonBlock` (AD-03) + renderer map `type → component`; gặp type lạ thì bỏ qua an toàn, không crash
- [ ] Top bar: tên khoá (link về course), tiêu đề lesson, thanh progress "Lesson 3 of 12"
- [ ] Nội dung: Learning objective (khối nhấn) → Explanation → Vocabulary → Examples → Interactive exercises
- [ ] `VocabularyBlock` render `VocabularyItem` dùng chung (Phase 09 sẽ gắn nút Save vào đúng component này): word, IPA, part of speech, nghĩa, câu ví dụ, nút phát âm
- [ ] Nút phát âm: dùng `audio_url` nếu có, fallback Web Speech API (AD-04); có `aria-label`, bấm được bằng bàn phím (§31)
- [ ] `ExerciseBlock`: nhúng quiz inline (Phase 11 cung cấp engine — phase này để interface sẵn, tạm render placeholder rồi nối ở Phase 11)
- [ ] Footer: Previous lesson / Next lesson (disable đúng ở đầu và cuối khoá) + nút **"Mark as complete"**
- [ ] Server Action `completeLesson(lessonId)`:
  - `requireUser()`, verify lesson tồn tại và user được phép học (không bị locked)
  - upsert `user_progress` (status=completed, progress_percent=100, completed_at)
  - cộng `user_daily_activity.lessons_completed`
  - mở khoá lesson kế tiếp, `revalidatePath` course detail + dashboard
- [ ] Server Action `updateLessonProgress(lessonId, percent)` — gọi khi user cuộn/hoàn thành block, giữ trạng thái `in_progress`
- [ ] Heartbeat thời gian học (AD-08): hook gửi mỗi 60s khi tab visible, server chặn gian lận
- [ ] Trạng thái: loading skeleton, error boundary riêng cho lesson, toast khi complete

## Acceptance criteria

- [ ] Mở lesson → `user_progress` chuyển `in_progress`
- [ ] Bấm "Mark as complete" → DB cập nhật, quay lại course detail thấy ✓, lesson kế tiếp mở khoá
- [ ] Ở lesson cuối khoá, nút Next thành "Back to course"
- [ ] Học 3 phút → `user_daily_activity.minutes` tăng ~3, không tăng khi chuyển tab đi chỗ khác
- [ ] Gọi `completeLesson` với lesson đang locked → bị từ chối ở server
- [ ] Đọc bài bằng bàn phím được từ đầu tới cuối

## Ghi chú

- Đây là mắt xích trung tâm của core loop §42 — ưu tiên chất lượng UX ở đây hơn mọi trang khác.
