# Phase 10 — Grammar & Listening

> Spec: §17 (Grammar), §18 (Listening), §31 (Accessibility)

## Mục tiêu

Hai kỹ năng còn lại có màn hình học thực sự dùng được, kết quả luyện tập được lưu.

## Phụ thuộc

Phase 09; engine quiz đầy đủ ở Phase 11 (phase này dùng mini-quiz đơn giản, sẽ thay bằng engine chung).

## Deliverables

```text
src/app/(app)/grammar/page.tsx
src/app/(app)/grammar/[topicId]/page.tsx
src/app/(app)/listening/page.tsx
src/app/(app)/listening/[lessonId]/page.tsx
src/features/grammar/{queries.ts,components/}
src/features/listening/{queries.ts,actions.ts,components/AudioPlayer.tsx,components/TranscriptPanel.tsx}
```

## Task list — Grammar

- [ ] `/grammar`: lưới topic gộp theo level, mỗi card có title, summary, badge level, trạng thái đã học
- [ ] `/grammar/[topicId]` render từ `content jsonb`: Explanation → Rules → Examples → Common mistakes → Mini exercises
- [ ] Khối "Common mistakes" hiển thị dạng ❌ sai / ✅ đúng, có giải thích ngắn
- [ ] Câu ví dụ tiếng Anh kèm nghĩa tiếng Việt (toggle hiện/ẩn nghĩa để tự kiểm tra)
- [ ] Mini quiz cuối trang → dùng quiz engine (nối ở Phase 11), kết quả lưu `quiz_attempts`
- [ ] Điều hướng Previous / Next topic

## Task list — Listening

- [ ] `/listening`: danh sách bài nghe — title, difficulty, duration, trạng thái hoàn thành
- [ ] `/listening/[lessonId]`: header (title, difficulty, duration) + player + transcript toggle + câu hỏi
- [ ] `AudioPlayer` tự viết (không thêm dependency): Play/Pause, seek bar kéo được, hiển thị thời gian, Volume, Playback speed (0.75× / 1× / 1.25× / 1.5×)
- [ ] **Accessibility cho player** (§31): mọi nút là `<button>` thật có `aria-label`; Space = play/pause, ← → = tua ±5s; seek bar dùng `role="slider"` với `aria-valuenow`; focus ring rõ
- [ ] Transcript ẩn mặc định, nút "Show transcript"; khi hiện thì highlight theo thời gian nếu có timestamp, không có thì hiện text tĩnh
- [ ] Câu hỏi đủ 3 loại: multiple choice, true/false, fill in the blank
- [ ] Sau khi submit: hiện đáp án đúng, đáp án của user, và explanation (§18)
- [ ] Lưu kết quả vào `quiz_attempts` (gắn với quiz của listening lesson)
- [ ] Responsive: trên mobile player full-width, nút đủ lớn để chạm (§30)

## Acceptance criteria

- [ ] Mở 1 grammar topic → đủ 5 phần nội dung, không phần nào rỗng
- [ ] Làm mini quiz grammar → có kết quả + attempt trong DB
- [ ] Audio phát được, tua được, đổi tốc độ được, chỉnh âm lượng được
- [ ] Điều khiển player hoàn toàn bằng bàn phím
- [ ] Submit bài nghe → thấy đáp án đúng/sai + giải thích, kết quả lưu DB
- [ ] 390px: player không tràn, không scroll ngang

## Ghi chú

- File audio đặt trong `public/audio/listening/`, đặt tên theo slug. Nếu chưa có file thật, dùng đoạn ghi âm ngắn tự tạo — **không** dùng file lỗi/placeholder câm.
