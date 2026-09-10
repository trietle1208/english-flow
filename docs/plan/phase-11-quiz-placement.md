# Phase 11 — Quiz Engine & Placement Test

> Spec: §8 (Placement test), §19 (Quiz), §20 (Quiz result)

## Mục tiêu

Một engine quiz duy nhất dùng lại cho: exercise trong lesson, mini-quiz grammar, câu hỏi listening, quiz độc lập, và placement test.

## Phụ thuộc

Phase 10.

## Deliverables

```text
src/app/(app)/quiz/[quizId]/page.tsx
src/app/(app)/quiz/[quizId]/result/page.tsx
src/app/(app)/placement-test/page.tsx
src/features/quiz/{engine.ts,queries.ts,actions.ts,schemas.ts}
src/features/quiz/components/{QuizRunner,QuestionMultipleChoice,QuestionTrueFalse,QuestionFillBlank,QuizProgressBar,QuizResultSummary,ReviewMistakes}.tsx
src/features/placement-test/{queries.ts,actions.ts,components/}
```

## Task list — Quiz engine

- [ ] `engine.ts` thuần logic, không phụ thuộc React → **có thể unit test bằng Vitest** (Phase 14): chấm điểm, so khớp fill-blank (trim, lowercase, chấp nhận nhiều đáp án), tính accuracy
- [ ] `QuizRunner` (client component) quản lý: câu hiện tại, đáp án đã chọn, thời gian bắt đầu
- [ ] Top bar: quiz title, "Question 3 of 10", progress bar, score (chỉ hiện khi `reveal_mode = immediate`)
- [ ] 3 loại câu hỏi, mỗi loại 1 component, chọn được bằng bàn phím (phím 1–4 chọn đáp án, Enter để tiếp)
- [ ] Trạng thái đáp án rõ ràng: default / selected / correct / incorrect — phân biệt bằng **icon + màu**, không chỉ màu (§31)
- [ ] Tôn trọng `reveal_mode` (§19): `immediate` → hiện đúng/sai + explanation ngay; `after_submit` → **không được lộ đáp án** cho tới khi nộp
- [ ] Chống mất bài: lưu tạm đáp án vào `sessionStorage`, F5 không mất tiến trình
- [ ] Server Action `submitQuiz({ quizId, answers, timeSpent })`: **chấm điểm hoàn toàn ở server** (client không bao giờ nhận `is_correct` trước khi nộp ở chế độ after_submit — §34), lưu `quiz_attempts` kèm `answers jsonb`
- [ ] Cộng `user_daily_activity.quizzes_completed`

## Task list — Quiz result

- [ ] `/quiz/[quizId]/result?attempt=<id>`: "Great job!" (đổi lời theo mức điểm, không nịnh khi điểm thấp)
- [ ] Thống kê: Score, Correct, Incorrect, Accuracy, Time spent
- [ ] Actions: Try Again / Continue Learning / Review Mistakes
- [ ] Review Mistakes: liệt kê câu sai + đáp án user + đáp án đúng + explanation (đọc từ `answers jsonb`)
- [ ] Chỉ owner của attempt xem được kết quả (§34)

## Task list — Placement test

- [ ] `/placement-test`: hiện số câu hiện tại / tổng số, progress indicator, câu hỏi, đáp án trắc nghiệm, nút Previous / Next (§8)
- [ ] Cho phép quay lại sửa đáp án trước khi nộp
- [ ] Chấm điểm → quy đổi CEFR (A1/A2/B1/B2/C1) theo bảng ngưỡng định nghĩa trong seed
- [ ] Màn hình kết quả: Score + level ước tính + câu "Your recommended starting level is B1." + CTA "Start Learning"
- [ ] Lưu `placement_test_attempts` và cập nhật `users.cefr_level`
- [ ] Cho phép làm lại từ `/settings`; không bắt buộc làm (nút "Skip for now" đã có ở Phase 04)

## Acceptance criteria

- [ ] Cùng một `QuizRunner` chạy được cho lesson exercise, grammar, listening và quiz độc lập
- [ ] Quiz `after_submit`: kiểm tra payload trả về client **không chứa** `is_correct` trước khi nộp
- [ ] Fill-blank: " Beautiful " được chấm đúng như "beautiful"
- [ ] Nộp bài → `quiz_attempts` có bản ghi với đủ score / correct_count / time_spent / answers
- [ ] Review Mistakes hiện đúng các câu đã sai
- [ ] Xem result của user khác qua URL → bị chặn
- [ ] Hoàn thành placement test → `users.cefr_level` cập nhật, `/courses` gợi ý khoá theo level đó
- [ ] Làm quiz hoàn toàn bằng bàn phím được

## Ghi chú

- Quay lại Phase 08/10 nối `ExerciseBlock` và câu hỏi listening vào engine này, xoá placeholder tạm.
