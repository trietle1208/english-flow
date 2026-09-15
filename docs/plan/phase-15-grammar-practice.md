# Phase 15 — Grammar Practice+

> Builds on Phase 10 (§17 Grammar) + Phase 11 (quiz engine) + Phase 12 (dashboard).
> Content sources: CEFR English Grammar Profile / British Council outlines as **curriculum map only**; all lesson text is original (EN rules + VI examples). Do not copy commercial textbooks.

## Mục tiêu

Nâng grammar từ “đọc topic + 1 mini quiz” thành **luyện tập có tiến độ rõ**: thêm topic theo CEFR, badge Weak / Practiced / Mastered, filter trên `/grammar`, và gợi ý topic yếu trên Dashboard.

## Phụ thuộc

Phase 14 (Phase 1 baseline complete). Không bắt buộc schema mới nếu progress suy ra được từ `quiz_attempts`.

## Deliverables

```text
docs/plan/phase-15-grammar-practice.md
src/db/seed-data/grammar.ts                    # 10 → ~20 topics
src/features/grammar/queries.ts                # filters, best score, status
src/features/grammar/components/GrammarFilters.tsx
src/features/grammar/components/GrammarProgressBadge.tsx
src/features/dashboard/…                       # “Grammar to review” block
(optional) drill block before QuizRunner       # reuse quiz engine; no new engine
```

## Content sources (free, safe use)

| Source | Use for | Do not |
| --- | --- | --- |
| [English Grammar Profile](https://www.englishprofile.org/english-grammar-profile) | Which structures belong at A1–C1 | Copy sample sentences wholesale |
| [British Council LearnEnglish Grammar](https://learnenglish.britishcouncil.org/grammar) | Topic outline / learner can-dos | Scrape HTML into seed |
| [EF English Grammar](https://www.ef.com/wwen/english-resources/english-grammar/) | Cross-check explanations | Paste pages |
| [Purdue OWL Grammar](https://owl.purdue.edu/owl/general_writing/grammar/index.html) | Formal rule wording ideas | Redistribute as-is |
| [Wikibooks English Grammar](https://en.wikibooks.org/wiki/English_Grammar) (CC BY-SA) | Optional attributed paraphrase | Use without attribution if near-verbatim |

## Task list — A: Seed +10 topics

- [x] Thêm 10 topic (sortOrder 11–20), mỗi topic: ≥4 rules, ≥3 examples EN+VI, ≥2 common mistakes, quiz 4 câu (MC / TF / fill-blank)
- [x] Map CEFR hợp lý (A1–B2); slug ổn định cho upsert idempotent
- [x] Cập nhật comment “10 grammar topics” → “20”
- [x] `npm run db:seed` → `grammar_topics = 20`, quizzes tăng tương ứng, chạy 2 lần không nhân đôi

**Topics A (done 2026-09-15):**

| # | slug | title | level |
| --- | --- | --- | --- |
| 11 | `past-continuous` | Past Continuous | A2 |
| 12 | `past-perfect` | Past Perfect | B1 |
| 13 | `used-to` | Used to | A2 |
| 14 | `relative-clauses` | Relative Clauses | B1 |
| 15 | `reported-speech` | Reported Speech | B1 |
| 16 | `gerunds-infinitives` | Gerunds & Infinitives | B1 |
| 17 | `quantifiers` | Quantifiers | A2 |
| 18 | `prepositions-time-place` | Prepositions of Time & Place | A2 |
| 19 | `wish-if-only` | Wish / If only | B2 |
| 20 | `question-tags` | Question Tags | A2 |

## Task list — B: Progress UI on `/grammar`

- [x] Status từ `quiz_attempts` trên quiz của topic: **Not started** / **Weak** (best &lt; 60%) / **Practiced** (60–79%) / **Mastered** (≥ 80%)
- [x] `GrammarProgressBadge` trên card (không chỉ dựa màu — có text/icon)
- [x] `GrammarFilters`: level + status + search; sync URL searchParams; list vẫn Server Component + Suspense
- [x] Empty state khi filter không khớp

## Task list — C: Dashboard weak grammar

- [x] Query top topic Weak (best score &lt; 60% hoặc gần fail gần nhất), tối đa 3
- [x] Card “Grammar to review” trên `/dashboard` (Suspense riêng), empty ẩn hoặc CTA “Browse grammar” khi chưa có attempt
- [x] Click → `/grammar/[topicId]`

## Task list — D (optional, sau A–C)

- [x] Khối “Try these drills” trước mini quiz (câu từ cùng `quiz` hoặc subset) — tái sử dụng `QuizRunner`, không engine mới
- [x] (Chỉ nếu cần) mở rộng `grammarContentSchema` với `explanation: string` tách khỏi `rules` — **không cần**: giữ `summary` làm Explanation

## Acceptance criteria

- [x] Seed ≥20 grammar topics; idempotent
- [x] Filter level + status + search hoạt động qua URL
- [x] Badge Mastered/Weak/Practiced đúng với best attempt
- [x] Dashboard hiện ≥1 gợi ý khi user có topic Weak
- [x] `npx tsc --noEmit` / `npm run lint` / `npm run build` / `npm run test` pass
- [x] Không copy nguyên văn nguồn thương mại
- [x] Drills: 2 câu đầu, instant feedback, không ghi `quiz_attempts` / không đổi Mastered

## Ghi chú

- **Không schema mới** trừ khi B không suy ra được status từ `quiz_attempts` (ưu tiên derive).
- AI Grammar Correction vẫn out of scope (spec Phase 1 exclusions).
- Ship order: **A → B → C → (D)**.

## Xác minh

### A — Seed +10 (2026-09-15)

- `grammarTopicsSeed.length === 20`, sortOrder 1–20 unique
- `npm run db:seed` ×2 → `grammar_topics = 20`, `quizzes = 29` (idempotent; was 10 topics / 19 quizzes)
- New slugs: past-continuous, past-perfect, used-to, relative-clauses, reported-speech, gerunds-infinitives, quantifiers, prepositions-time-place, wish-if-only, question-tags

### B+C — Progress UI + Dashboard (2026-09-15)

- Status derived from `max(quiz_attempts.score)`: &lt;60 Weak, 60–79 Practiced, ≥80 Mastered
- `/grammar` filters: `?search=&level=&status=` + Clear filters; empty state when no match
- Dashboard `GrammarToReview` after Continue Learning (weak topics or Browse CTA)
- Unit: `src/features/grammar/status.test.ts`

### D — Try these drills (2026-09-15)

- `QuizRunner` `practiceMode`: first 2 questions, `gradePracticeQuestion` (works for `after_submit` quizzes), no attempt row
- Grammar topic page: drills section above Mini exercises; Finish drill → summary + Try again
- Mini quiz still persists attempts and revalidates `/grammar` + `/dashboard`
