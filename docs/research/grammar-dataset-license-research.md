# Grammar dataset license research

> Track riêng từ `grammar-feature-prompt-v3-nextjs.md`.  
> Ngày: 2026-09-16.  
> Quy tắc: chỉ nguồn chính thức (GitHub LICENSE/README, Hugging Face dataset card, OPUS, trang chủ dự án). Không suy đoán. Không tìm thấy LICENSE rõ → `UNKNOWN`.

Phân loại map sang `content_license_code` trong schema:

| Code | Nghĩa vận hành |
| --- | --- |
| `PRODUCTION_ALLOWED` | Thương mại OK, không bắt buộc attribution |
| `ATTRIBUTION_REQUIRED` | Thương mại OK nếu ghi nguồn / tuân CC-BY |
| `RESEARCH_ONLY` | Có NC / “research-educational only” / không commercial |
| `UNKNOWN` | Không đọc được LICENSE rõ, hoặc mâu thuẫn / quyền nền không rõ |
| `DO_NOT_USE` | Cấm commercial rõ hoặc rủi ro bản quyền nguồn gốc quá cao |

---

## Bảng đánh giá (10 dataset trong prompt)

| Dataset | URL chính thức | License (đọc ở đâu) | Commercial OK? | Attribution? | EN-VI? | CEFR? | Kích thước (ước) | Phân loại |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **CEFR-J Grammar Profile** | [cefr-j.org/download](https://www.cefr-j.org/download.html); mirror [openlanguageprofiles/olp-en-cefrj](https://github.com/openlanguageprofiles/olp-en-cefrj) | OLP README **Terms of use**: research **and commercial**, no charge, **cite properly**; copyright Tono Lab, TUFS. (Wordlist trên trang chính thức cũng ghi research/education/commercial + citation.) | Có (với cite) | Có | Không (EN + JP metadata) | Có (CEFR-J) | ~hàng trăm grammar items (CSV 20180315) | **ATTRIBUTION_REQUIRED** |
| **EVBCorpus** | [github.com/qhungngo/EVBCorpus](https://github.com/qhungngo/EVBCorpus); [sourceforge.net/projects/evbc](https://sourceforge.net/projects/evbc/) | GitHub README: **không có LICENSE**. SourceForge metadata ghi “Affero GNU Public License” nhưng không thấy file LICENSE trong repo GitHub; README bảo email maintainer. Nội dung gồm sách / luật / phụ đề phim → quyền bên thứ ba. | Không rõ | Không rõ | Có | Không | ~2.3M sentence pairs / ~21M words (README v2.0) | **UNKNOWN** (không nhúng production cho đến khi có thỏa thuận rõ) |
| **Tatoeba (OPUS EN–VI)** | [tatoeba.org/downloads](https://tatoeba.org/en/downloads); Terms [wiki](https://en.wiki.tatoeba.org/articles/show/terms-of-use-v1); OPUS Tatoeba | Text sentences: **CC BY 2.0 FR** (downloads page + Terms). Commercial allowed if attribution. Audio: license **per contributor** — không dùng chung với text. | Có (text) | Có | Có | Không | Lớn, đa ngôn ngữ; EN–VI là subset (đổi theo dump) | **ATTRIBUTION_REQUIRED** (chỉ text; kiểm tra từng audio) |
| **Zanichelli MCC generation** | [ZanichelliEditore/english-grammar-multiple-choice-generation](https://github.com/ZanichelliEditore/english-grammar-multiple-choice-generation) | **LICENSE file = CC BY-NC-ND 4.0** (đã tải raw, dòng đầu “Attribution-NonCommercial-NoDerivatives 4.0”). README ghi sai “CC BY 4.0” → **ưu tiên LICENSE**. | Không (NC) | Có (nếu dùng NC) | Không | Không (19 grammar topics, không CEFR) | Dataset MCC trong repo (Git LFS) | **RESEARCH_ONLY** |
| **PELIC** | [ELI-Data-Mining-Group/PELIC-dataset](https://github.com/ELI-Data-Mining-Group/PELIC-dataset) | README §11: **CC BY-NC-ND 4.0** | Không | Có | Không | Không (có proficiency / level trong EAP context, không phải CEFR chuẩn) | Learner corpus lớn (IELI Pitt; CSV corpus_files) | **RESEARCH_ONLY** |
| **JFLEG** | [keisks/jfleg](https://github.com/keisks/jfleg); HF [jhu-clsp/jfleg](https://huggingface.co/datasets/jhu-clsp/jfleg) | README + HF card: **CC BY-NC-SA 4.0** | Không | Có + ShareAlike | Không | Không (phủ nhiều trình độ learner) | ~1.5k sentences (dev+test) | **RESEARCH_ONLY** |
| **cLang-8** | [google-research-datasets/clang8](https://github.com/google-research-datasets/clang8) | README License: research/educational only; **CC BY-NC-SA 4.0**. Cần Lang-8 raw (form NAIST) — cũng research-only. | Không | Có + SA | Không | Không | EN ~2.37M pairs (sau khi ghép) | **RESEARCH_ONLY** |
| **NUCLE** | [NUS NLP corpora](https://www.comp.nus.edu.sg/~nlp/corpora.html); license PDF [nucle_license.pdf](https://www.comp.nus.edu.sg/~nlp/conll14st/nucle_license.pdf); HF [nusnlp/NUCLE](https://huggingface.co/datasets/nusnlp/NUCLE) | **NUS Non-commercial research/trial corpus license** — academic / nonprofit R&D hoặc test-eval; **không commercial** trừ thỏa thuận riêng. | Không (trừ license riêng với NUS) | Theo thỏa thuận NUS | Không | Không | ~1.4k essays / ~1M words | **RESEARCH_ONLY** (commercial → đàm phán NUS, coi như **DO_NOT_USE** mặc định) |
| **C4_200M (GEC)** | [google-research-datasets/C4_200M-…](https://github.com/google-research-datasets/C4_200M-synthetic-dataset-for-grammatical-error-correction) | README: **corruption edits = CC BY 4.0**. Câu sạch lấy từ **C4** → AllenAI C4 **ODC-BY** + **Common Crawl terms** (nội dung web vẫn thuộc chủ gốc). | Edits: có (BY). Full sentence pairs trong product: **không chắc**. | Có (edits + ODC-BY) | Không | Không | ~185–200M pairs (synthetic) | **UNKNOWN** cho learner-facing production; research/training nội bộ có thể dùng edits dưới CC BY |
| **English-Mini** (`Gugu8/English-Mini`) | [huggingface.co/datasets/Gugu8/English-Mini](https://huggingface.co/datasets/Gugu8/English-Mini) | Card: `license: other` / **ODATL-1.0**, `license_link: LICENSE`. **File LICENSE resolve về 0 byte** (HTTP 200, size 0) — không đọc được điều khoản. README tự nhận “synthetic and license-free” nhưng thiếu văn bản license. | Không xác minh được | Không xác minh được | Không | Có (A1–B2 cột `level`) | ~650k–750k rows / ~100MB CSV | **UNKNOWN** |

### Ghi chú quan trọng

1. **Zanichelli**: README vs LICENSE mâu thuẫn — luôn lấy **LICENSE = NC-ND**.
2. **EVBCorpus / English-Mini**: public ≠ production-ready.
3. **NUCLE / PELIC / JFLEG / cLang-8 / Zanichelli**: không seed thẳng vào app thương mại.
4. **Tatoeba audio ≠ text license**.

---

## Đề xuất 2–3 dataset cho MVP grammar (production)

Ưu tiên: có thể thương mại + phù hợp feature (CEFR / grammar / EN–VI giải thích).

| Ưu tiên | Dataset | Vì sao |
| --- | --- | --- |
| **1** | **CEFR-J Grammar Profile** | Commercial + cite; có CEFR/grammar item list — dùng làm **taxonomy / order_index / CEFR tagging**, không copy nguyên bài giải thích máy. |
| **2** | **Tatoeba (text EN–VI)** | CC BY 2.0 FR; có song ngữ — candidate cho `grammar_examples` + `sentence_vi`, kèm attribution trong `content_sources`. Lọc thủ công / human-review (AD prompt). |
| **3 (phụ)** | Tiếp tục **EnglishFlow original** | Nội dung lý thuyết VI + quiz: viết/human-review như hiện tại; provenance `PRODUCTION_ALLOWED`. |

**Không** lấy Zanichelli / PELIC / JFLEG / cLang-8 / NUCLE / PhoMT làm seed production.

**C4_200M / English-Mini**: chỉ cân nhắc sau khi có counsel / LICENSE đầy đủ; không ưu tiên MVP.

---

## Nguồn EN–VI miễn phí khác (ngoài list gốc)

| Nguồn | URL | License (đọc ở đâu) | Phân loại | Ghi chú |
| --- | --- | --- | --- | --- |
| **TALPCo** (EN + VI cùng Sentence_ID) | [github.com/matbahasa/TALPCo](https://github.com/matbahasa/TALPCo) `readme.md` | **CC BY 4.0** (README Introduction) | **ATTRIBUTION_REQUIRED** | Song ngữ qua pivot JP; quy mô nhỏ (~vài nghìn câu) nhưng license sạch — tốt cho example curated. |
| **PhoMT** | [VinAIResearch/PhoMT](https://github.com/VinAIResearch/PhoMT); HF `vinai/PhoMT` | Research/educational only; cấm redistribute (README + HF gate) | **RESEARCH_ONLY** | 3.02M pairs — không production. |
| **MTet** | HF `albertvillanova/mtet` | Card: **CC BY-NC-SA 4.0** | **RESEARCH_ONLY** | ~4.2M pairs — NC. |
| **TED2020 (OPUS)** | [OPUS TED2020](https://opus.nlpl.eu/legacy/TED2020.php) + [TED Usage Policy](https://www.ted.com/about/our-organization/our-policies-terms/ted-talks-usage-policy) | TED: **CC BY-NC-ND 4.0** | **RESEARCH_ONLY** | OPUS bảo “respect TED Talks Usage Policy”. |
| **OpenSubtitles (OPUS)** | OPUS OpenSubtitles | Bản quyền phụ đề phim/TV — OPUS redistributes “believed free”; không phải giấy phép commercial rõ cho product | **UNKNOWN** / tránh production | |
| **Wiktionary / Wikipedia EN–VI** | wiktionary.org / vi.wikipedia.org | **CC BY-SA 4.0** (+ GFDL historically cho một phần WP) | **ATTRIBUTION_REQUIRED** (+ ShareAlike nếu derivative) | Định nghĩa/câu ví dụ ngắn; cần pipeline attribution & SA compliance. |

---

## Mapping gợi ý vào EnglishFlow

| Nhu cầu sản phẩm | Nguồn nên dùng | `content_sources.license_code` |
| --- | --- | --- |
| Danh mục topic + CEFR | CEFR-J Grammar Profile (+ original) | `ATTRIBUTION_REQUIRED` |
| Example EN + VI | Tatoeba text / TALPCo / original | `ATTRIBUTION_REQUIRED` / `PRODUCTION_ALLOWED` |
| Theory VI + tips | EnglishFlow original (human) | `PRODUCTION_ALLOWED` |
| Mistake / GEC pairs | Original hoặc tự sinh + review — **không** JFLEG/cLang-8/NUCLE | — |
| MCC quiz | Original / generator nội bộ — **không** Zanichelli dataset | — |

---

## Việc tiếp theo (không nằm trong research này)

1. Seed `content_sources` rows cho CEFR-J + Tatoeba (URL, attribution text, `source_version`).
2. Pipeline import nhỏ: Tatoeba EN–VI → filter theo grammar pattern → human-review VI → `grammar_examples`.
3. Không import hàng loạt C4/English-Mini/Zanichelli cho đến khi license/counsel rõ.

**Next:** [phase-17-grammar-content.md](../plan/phase-17-grammar-content.md).
