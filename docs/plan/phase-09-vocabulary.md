# Phase 09 — Personal Vocabulary ⭐ (core feature)

> Spec: §13, §14, §15, §16, §32

## Mục tiêu

Tính năng lõi của Phase 1: lưu từ vựng ở bất cứ đâu trong app, quản lý tập trung ở `/vocabulary`.

## Phụ thuộc

Phase 08 (component `VocabularyItem` đã tồn tại).

## Deliverables

```text
src/app/(app)/vocabulary/page.tsx
src/features/vocabulary/{queries.ts,actions.ts,schemas.ts}
src/features/vocabulary/components/{VocabularyItem,SaveVocabularyButton,VocabularyCard,VocabularyFilters,VocabularyStats}.tsx
```

## Task list — Save / Remove / Learned

- [ ] Server Action `saveVocabulary(vocabularyId)`: tạo bản ghi `user_vocabularies` (chỉ nối user ↔ vocabulary, **tuyệt đối không copy nội dung từ vựng** — §13). Idempotent nhờ unique `(user_id, vocabulary_id)`
- [ ] Server Action `removeVocabulary(vocabularyId)` — verify ownership trước khi xoá (§34)
- [ ] Server Action `toggleLearned(vocabularyId, isLearned)` — set `is_learned`, `learned_at`
- [ ] `SaveVocabularyButton`: dùng `useOptimistic` → đổi ngay "Save" ⭐ ↔ "Saved", không reload trang (§15)
- [ ] Toast "Vocabulary saved." / "Removed from your vocabulary." (sonner)
- [ ] Rollback optimistic + toast lỗi khi action thất bại
- [ ] Cộng `user_daily_activity.words_saved` khi lưu từ mới

## Task list — `/vocabulary`

- [ ] Header "My Vocabulary" + 3 thống kê: Total saved / Learned / Not learned (tính bằng 1 query aggregate)
- [ ] Search "Search vocabulary..." — tìm theo word + meaning, thực hiện **ở DB** (ILIKE + index), không lọc ở client (§32)
- [ ] Filter tabs: All / Recently Added / Learned / Not Learned
- [ ] Sort: Recently added / Alphabetical / Most reviewed
- [ ] Search + filter + sort đồng bộ vào URL searchParams
- [ ] **Pagination hoặc infinite scroll** — không bao giờ tải toàn bộ danh sách (§32). Mặc định 24 item/trang
- [ ] `VocabularyCard` đúng §14: word, IPA, part of speech, nghĩa, câu ví dụ, 🔊 Play, ✓ Mark as learned, Remove
- [ ] Xác nhận trước khi Remove (Dialog), tránh mất dữ liệu do bấm nhầm
- [ ] Empty state: "You haven't saved any vocabulary yet." + CTA "Explore Lessons" → `/courses` (§33)
- [ ] Empty state riêng cho trường hợp search không ra kết quả
- [ ] Skeleton loading cho grid

## Acceptance criteria

- [ ] Lưu 1 từ trong lesson → mở `/vocabulary` thấy ngay từ đó
- [ ] Bấm Save 2 lần liên tiếp → chỉ 1 bản ghi trong DB
- [ ] Remove → biến khỏi danh sách, thống kê cập nhật
- [ ] Mark as learned → chuyển tab Learned thấy từ đó, tab Not Learned thì không
- [ ] Search "beautiful" ra kết quả đúng; kiểm tra Network: chỉ trả về trang hiện tại, không phải cả DB
- [ ] Cùng một từ được 2 user lưu → vẫn chỉ 1 dòng trong bảng `vocabularies`
- [ ] Gọi `removeVocabulary` với id của user khác → bị từ chối

## Ghi chú

- Các cột `review_count`, `next_review_at` được ghi ở mức tối thiểu (`review_count += 1` khi bấm Play/Mark) nhưng **không có thuật toán SRS** ở Phase 1 (§16, §35).
