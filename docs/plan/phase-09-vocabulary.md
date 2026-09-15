# Phase 09 — Personal Vocabulary ⭐ (core feature)

> Spec: §13, §14, §15, §16, §32

## Mục tiêu

Tính năng lõi của Phase 1: lưu từ vựng ở bất cứ đâu trong app, quản lý tập trung ở `/vocabulary`.

## Phụ thuộc

Phase 08 (component `VocabularyItem` đã tồn tại).

## Deliverables

```text
src/app/(app)/vocabulary/{page,loading}.tsx
src/features/vocabulary/{queries.ts,actions.ts,schemas.ts,types.ts}
src/features/vocabulary/components/{VocabularyItem,SaveVocabularyButton,VocabularyCard,VocabularyFilters,VocabularyStats,VocabularyList,VocabularyGridSkeleton}.tsx
```

## Task list — Save / Remove / Learned

- [x] Server Action `saveVocabulary(vocabularyId)`: tạo bản ghi `user_vocabularies` (chỉ nối user ↔ vocabulary, **tuyệt đối không copy nội dung từ vựng** — §13). Idempotent nhờ unique `(user_id, vocabulary_id)`
- [x] Server Action `removeVocabulary(vocabularyId)` — verify ownership trước khi xoá (§34)
- [x] Server Action `toggleLearned(vocabularyId, isLearned)` — set `is_learned`, `learned_at`
- [x] `SaveVocabularyButton`: dùng `useOptimistic` → đổi ngay "Save" ⭐ ↔ "Saved", không reload trang (§15)
- [x] Toast "Vocabulary saved." / "Removed from your vocabulary." (sonner)
- [x] Rollback optimistic + toast lỗi khi action thất bại
- [x] Cộng `user_daily_activity.words_saved` khi lưu từ mới

## Task list — `/vocabulary`

- [x] Header "My Vocabulary" + 3 thống kê: Total saved / Learned / Not learned (tính bằng 1 query aggregate)
- [x] Search "Search vocabulary..." — tìm theo word + meaning, thực hiện **ở DB** (ILIKE + index), không lọc ở client (§32)
- [x] Filter tabs: All / Recently Added / Learned / Not Learned
- [x] Sort: Recently added / Alphabetical / Most reviewed
- [x] Search + filter + sort đồng bộ vào URL searchParams
- [x] **Pagination hoặc infinite scroll** — không bao giờ tải toàn bộ danh sách (§32). Mặc định 24 item/trang
- [x] `VocabularyCard` đúng §14: word, IPA, part of speech, nghĩa, câu ví dụ, 🔊 Play, ✓ Mark as learned, Remove
- [x] Xác nhận trước khi Remove (Dialog), tránh mất dữ liệu do bấm nhầm
- [x] Empty state: "You haven't saved any vocabulary yet." + CTA "Explore Lessons" → `/courses` (§33)
- [x] Empty state riêng cho trường hợp search không ra kết quả
- [x] Skeleton loading cho grid

## Acceptance criteria

- [x] Lưu 1 từ trong lesson → mở `/vocabulary` thấy ngay từ đó
- [x] Bấm Save 2 lần liên tiếp → chỉ 1 bản ghi trong DB
- [x] Remove → biến khỏi danh sách, thống kê cập nhật
- [x] Mark as learned → chuyển tab Learned thấy từ đó, tab Not Learned thì không
- [x] Search "beautiful" ra kết quả đúng; kiểm tra Network: chỉ trả về trang hiện tại, không phải cả DB
- [x] Cùng một từ được 2 user lưu → vẫn chỉ 1 dòng trong bảng `vocabularies`
- [x] Gọi `removeVocabulary` với id của user khác → bị từ chối

## Ghi chú

- Các cột `review_count`, `next_review_at` được ghi ở mức tối thiểu (`review_count += 1` khi bấm Play/Mark) nhưng **không có thuật toán SRS** ở Phase 1 (§16, §35).

## Xác minh (2026-09-15)

Exit Gate: `tsc --noEmit` / `npm run lint` / `npm run build` đều pass. Postgres healthy trên `:5432`; app production `PORT=3003 npm start` (`:3000` đang bị chiếm).

Temp accounts qua `/api/auth/sign-up/email` (`Origin: http://localhost:3000`) + DB checks + HTML fetch:

| Check | Kết quả |
| --- | --- |
| Unique `(user_id, vocabulary_id)` double-insert | `count = 1` |
| 2 users save `delicious` | `vocabularies` vẫn 1 row; `user_vocabularies` 2 links |
| `/vocabulary` sau save | `200`, "My Vocabulary", word hiện, stats "Total saved" |
| `?search=delicious` / miss | hit đúng; miss → empty filters state |
| `?filter=learned` / `not_learned` | learned có word; not_learned không |
| User B remove scoped by own `user_id` | User A row untouched |
| Lesson page | `200` + Save button |
| After remove | empty CTA "You haven't saved any vocabulary yet." |

Search AC dùng seed word `delicious` (seed không có `beautiful`); query vẫn là SQL `ILIKE` + `LIMIT 24`, không full-table fetch. Temp users `phase09*@example.com` đã xoá sau test.
