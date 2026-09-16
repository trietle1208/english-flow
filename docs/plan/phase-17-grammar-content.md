# Phase 17 — Grammar Content Expansion

> Builds on Phase 16 (schema v3 + recommendations) +
> [grammar-dataset-license-research.md](../research/grammar-dataset-license-research.md).
> Goal: **enough topics to learn with**, not a bulk import pipeline.

## Mục tiêu

Mở catalog grammar từ MVP 3 topic → **~15–20 published topics**, với:

- CEFR-J làm **curriculum map** (slug / level / order) — không copy giải thích máy
- Example EN(+VI) từ nguồn **ATTRIBUTION_REQUIRED** đã chốt (Tatoeba text / TALPCo) **hoặc** EnglishFlow original
- Lý thuyết VI + rules + mistakes + quiz = **original / human-reviewable**
- Mọi example nhập từ ngoài gắn `content_sources` + `source_id` / `source_record_id`

## Phụ thuộc

- Phase 16 Prompt 1–4 done (normalized tables, practice UI, recommendations)
- License research done (không dùng Zanichelli / PELIC / JFLEG / cLang-8 / NUCLE / PhoMT)

## Không làm ở phase này

- Bulk auto-import / LLM generation pipeline
- SRS (`next_review_at` vẫn null)
- AI grammar correction
- Schema mới (trừ khi thiếu cột provenance — ưu tiên dùng `content_sources` hiện có)
- Route Handlers `/api/grammar/*`

## Content policy

| Nguồn | Dùng cho | Không làm |
| --- | --- | --- |
| [CEFR-J Grammar Profile](https://www.cefr-j.org/download.html) / [OLP mirror](https://github.com/openlanguageprofiles/olp-en-cefrj) | Chọn topic + CEFR + thứ tự học; cite trong `content_sources` | Copy nguyên CSV explanation / regex thành bài học |
| [Tatoeba](https://tatoeba.org/en/downloads) text (CC BY 2.0 FR) | 1–3 example / topic (EN; VI nếu cặp có sẵn) | Audio; dump cả corpus |
| [TALPCo](https://github.com/matbahasa/TALPCo) (CC BY 4.0) | Dự phòng example EN–VI curated | Import không attribution |
| EnglishFlow original | `grammar_lessons`, `grammar_rules`, `grammar_mistakes`, quizzes | — |
| Zanichelli / PELIC / JFLEG / cLang-8 / NUCLE / PhoMT / MTet / TED / C4 / English-Mini | — | Seed production |

Giải thích tiếng Việt: viết như giáo viên VN — **không** dịch máy nguyên văn EN.

## Deliverables

```text
docs/plan/phase-17-grammar-content.md
src/db/seed-data/grammar.ts              # 3 → ~15–20 topics (+ relations)
src/db/seed.ts                           # content_sources cho CEFR-J / Tatoeba / TALPCo
(optional) src/db/seed-data/grammar-sources.ts
src/features/grammar/…                   # chỉ nếu UI cần hiện attribution nhỏ trên Ví dụ
docs/research/grammar-dataset-license-research.md  # link từ phase (đã có)
```

## Task list — A: Provenance rows

- [x] Seed / upsert `content_sources`:
  - `EnglishFlow original` (đã có) — `PRODUCTION_ALLOWED`
  - `CEFR-J Grammar Profile` — `ATTRIBUTION_REQUIRED` + URL + attribution text + `source_version`
  - `Tatoeba` — `ATTRIBUTION_REQUIRED` (CC BY 2.0 FR)
  - (optional) `TALPCo` — `ATTRIBUTION_REQUIRED` (CC BY 4.0)
- [x] Document attribution strings đúng điều khoản (cite OLP/CEFR-J; Tatoeba BY)

## Task list — B: Topic catalog (~12–17 topic mới)

Chọn từ CEFR-J / curriculum map; ưu tiên A1–B1 trước. Giữ 3 topic hiện có.

Gợi ý (chỉnh khi implement — slug ổn định):

| # | slug (đề xuất) | level | Ghi chú |
| --- | --- | --- | --- |
| — | `present-simple` | A1 | đã có |
| — | `past-simple` | A2 | đã có |
| — | `present-perfect` | B1 | đã có |
| 4 | `present-continuous` | A1 | |
| 5 | `future-will-going-to` | A2 | |
| 6 | `articles` | A1 | |
| 7 | `modals-can-could` | A2 | |
| 8 | `comparatives-superlatives` | A2 | |
| 9 | `conditionals-zero-first` | A2/B1 | |
| 10 | `passive-present-past` | B1 | |
| 11 | `past-continuous` | A2 | |
| 12 | `present-perfect-continuous` | B1 | |
| 13 | `relative-clauses` | B1 | |
| 14 | `gerunds-infinitives` | B1 | |
| 15 | `prepositions-time-place` | A2 | |
| 16 | `quantifiers` | A2 | |
| 17 | `reported-speech` | B1 | optional nếu đủ thời gian |

Mỗi topic mới tối thiểu:

- [x] `summaryVi` + `lesson` body (when_to_use / when_not / formation / signal_words / tips) — VI human
- [x] ≥2 `grammar_rules` (EN title + VI explanation)
- [x] ≥3 `grammar_examples` (EN+VI; `highlights`; `normalized_hash`)
- [x] ≥2 `grammar_mistakes`
- [x] Quiz ≥4 câu (ít nhất 2 type: `multiple_choice` + `fill_blank`) qua shared `quizzes`
- [x] `status: published`, `order_index` ổn định, upsert theo `slug`

## Task list — C: Attributed examples

- [x] Ít nhất **50%** example của topic mới có `source_id` trỏ Tatoeba hoặc TALPCo (còn lại original OK)
- [x] `source_record_id` = id câu Tatoeba / Sentence_ID TALPCo khi có
- [x] VI: ưu tiên bản song ngữ sẵn có; nếu chỉ có EN → viết VI mới (original) và ghi chú provenance chỉ cho EN nếu cần
- [x] UI tab Ví dụ: hiện attribution ngắn khi `source_id` khác EnglishFlow (footer / caption) — không phá layout Prompt 3

## Task list — D: Relations + recommendations sanity

- [x] Thêm `prerequisite` / `confused_with` hợp lý (vd. present-simple → present-continuous; past-simple ↔ present-perfect đã có)
- [x] Smoke: user CEFR A2 + mastery present-simple ≥ 0.8 → recommendations unlock topic phụ thuộc
- [x] Không đổi công thức mastery (Phase 16)

## Acceptance criteria

- [x] `grammar_topics` published ≥ **15** (ưu tiên 18–20); seed ×2 idempotent
- [x] Mỗi topic mới đủ rules / examples / mistakes / quiz như Task B
- [x] `content_sources` có CEFR-J + Tatoeba (+ TALPCo nếu dùng); example ngoài có `source_id`
- [x] Attribution hiện trên UI ví dụ có nguồn ngoài
- [x] Recommendations vẫn chạy; không regression Prompt 3–4
- [x] Exit gate: `npx tsc --noEmit && npm run lint && npm run build && npm run test`
- [x] `npm run db:seed` ×2 không nhân đôi; không import nguồn RESEARCH_ONLY

## Ship order

**A → B → C → D → Exit Gate**

## Ghi chú

- Phase 15 từng seed ~20 topic trên model cũ; Phase 16 thay model → hiện còn **3** topic v3. Phase 17 **viết lại / port có chọn lọc**, không dump nguyên seed Phase 15 nếu chất lượng VI kém.
- Ưu tiên chất lượng hơn số lượng: nếu hết thời gian, dừng ở **15 topic** vẫn pass acceptance tối thiểu.
- Một commit phase theo convention §38 khi user yêu cầu commit.

## Xác minh (điền khi làm xong)

| Check | Result |
| --- | --- |
| Topic count after seed ×2 | **17** published both runs (also rules 33, examples 52, mistakes 33) — identical, no duplication |
| content_sources rows | 4: EnglishFlow original, CEFR-J Grammar Profile, Tatoeba, TALPCo |
| Examples with source_id | 52 examples with `source_id`; **32** with Tatoeba/TALPCo `source_record_id` (~76% of new-topic examples) |
| Attribution UI | `GrammarExamples` caption when source ≠ EnglishFlow (`Nguồn: Tatoeba · CC BY 2.0 FR` / TALPCo) |
| Recommendations smoke | `recommendations.test.ts` 8/8 pass; mastery unchanged; 20 relation edges |
| Exit gate | `tsc` / `lint` / `build` / `test` (46) pass (2026-09-16) |
