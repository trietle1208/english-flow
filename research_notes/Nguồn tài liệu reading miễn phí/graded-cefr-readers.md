# Graded readers and CEFR reading corpora (license inventory, September 2026)

Findings dated September 2026. License classifications use the same taxonomy as [grammar-dataset-license-research.md](../../docs/research/grammar-dataset-license-research.md): `PRODUCTION_ALLOWED` (commercial OK, no required attribution), `ATTRIBUTION_REQUIRED` (commercial OK if attribution / CC-BY / CC-BY-SA terms met), `RESEARCH_ONLY` (NC / research-educational / non-transferable), `UNKNOWN` (no readable official LICENSE, or contradictory official text), `DO_NOT_USE` (explicit commercial ban, NDA-only, or third-party copyright too high to seed). Official licenses only; missing LICENSE → `UNKNOWN`. No license was inferred from “free to read online.”

## Which graded-reader or CEFR reading collections are free to download and redistributable in a commercial product?

### Takeaway
The only sources with official, commercial-redistribution-friendly licenses for English learner-facing *passages* are open children’s storybook platforms (StoryWeaver CC BY 4.0; Book Dash CC BY 4.0; per-title CC BY / CC BY-SA titles on African Storybook, Global Digital Library, and Bloom Library), VOA Learning English original text (U.S. public domain, credit requested), Project Gutenberg texts not restricted by U.S. copyright (after stripping the PG trademark), and the OneStopEnglish *research corpus* release (CC BY-SA 4.0). CEFR-J does **not** publish a reading-passage corpus. Almost every well-known CEFR-tagged or ESL reading site is `RESEARCH_ONLY` or `DO_NOT_USE`.

### Cited Findings

**Open children’s storybooks (commercial OK if attribution; not CEFR-native)**

- StoryWeaver (Pratham Books) official attribution page states all stories and images are **CC BY 4.0**, allowing distribution, remix, and commercial use if credit is given to the original creators, StoryWeaver, the publisher, and the donor/funder; a required attribution line is specified for apps and other media. — [StoryWeaver Attributions](https://storyweaver.org.in/en/attributions)
- StoryWeaver FAQs (official help) repeat CC BY 4.0 for all stories and images and require citing the specific license with a link to https://creativecommons.org/licenses/by/4.0/. — [StoryWeaver FAQs](https://storyweaver.org.in/en/help/faqs)
- The same official attributions page (search-indexed full text) also states StoryWeaver **Readalongs and videos** are **CC BY-NC-ND 4.0**, i.e. not the same license as the books. — [StoryWeaver Attributions](https://storyweaver.org.in/en/attributions)
- Book Dash official reuse guide: all books are **CC BY 4.0**; anyone may republish on websites/apps, adapt, translate, print and sell; required credit is the four creatives (author, illustrator, designer, editor), a link to www.bookdash.org, a visible Book Dash logo, and a statement of any adaptation. Source files (PDF ebooks, print-ready PDFs, illustration/design files, text) are published; library size stated as **200+ titles**. — [Book Dash: How to re-use Book Dash content](https://bookdash.org/re-using-the-book-dash-content/)
- African Storybook official terms: stories are openly licensed (read, download, print, copy, adapt, translate without permission or fee) **with required acknowledgement** of writers, illustrators, translators, copyright holders, and African Storybook. Some contributors add a **non-commercial restriction**; for those titles “you will not make a profit out of the sale of the stories.” License is **per title**, not a single platform license. Formats on the official how-to PDF: online, PDF, print PDF, EPUB. — [African Storybook terms](https://www.africanstorybook.org/terms.html); [Open Licensing Made Plain (2023)](https://www.earlylearningresourcenetwork.org/system/files/resourcefiles/Open%20Licensing%20Made%20Plain%202023.pdf) (states ASb uses both CC BY and CC BY-NC)
- Global Digital Library official license page: GDL hosts Creative Commons or otherwise openly licensed materials; **primary licenses are CC BY and CC BY-SA**, which “drive innovation and creativity, including commercial reuse”; every item is marked with license, authors, and illustrators. — [GDL license](https://digitallibrary.io/about/license/)
- GDL print-repo README (official GitHub): at 2020 launch, 500+ files / 23 languages; “more than 90% of the titles allow commercial re-use”; most common licences CC-BY and CC-BY-SA, some CC-BY-NC-SA; “It is essential to check the license on every title before re-using”; formats PDF or InDesign. — [GlobalDigitalLibraryio/print README](https://github.com/GlobalDigitalLibraryio/print)
- Bloom Library official Terms (effective 16 February 2017): users “agree to abide by the licenses of any books you download”; books carry their own license; **except where otherwise noted, contributed site content is CC BY-NC 4.0**; books and illustrations “will normally carry their own license.” No single commercial-OK blanket. — [Bloom Terms of use](https://bloom.sil.org/terms)

**Public-domain / government learner news (commercial OK with caveats)**

- VOA Learning English official content-request page: “Learning English texts, MP3s, photos and videos are in the public domain. You are allowed to reprint them for educational and commercial purposes, with credit to learningenglish.voanews.com.” Agency photos/video from AP, Reuters, AFP “are copyrighted, so you are not allowed to republish them.” — [VOA Request Our Content](https://learningenglish.voanews.com/p/6861.html)
- Project Gutenberg official license: books **not restricted under U.S. copyright** may be copied and distributed in the U.S.; if the PG trademark/license header is stripped, the remaining text is unrestricted by U.S. IP law. Copyrighted PG books (author permission to PG only) may **not** be redistributed without a separate author agreement. Commercial use of the **“Project Gutenberg” trademark** requires verbatim copies and royalties if money is charged. — [Project Gutenberg License](https://www.gutenberg.org/policy/license.html)

**Research corpora whose *official* text license allows commercial reuse (ShareAlike / underlying-rights caveats)**

- OneStopEnglish **corpus** GitHub README (official release for Vajjala & Lučić 2018): “This work is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.” Contents: 189 texts × 3 reading levels (ele/int/adv) as `.txt`, plus CSV (three columns), sentence-aligned pairs, parser output. — [nishkalavallabhi/OneStopEnglishCorpus README](https://raw.githubusercontent.com/nishkalavallabhi/OneStopEnglishCorpus/master/README.md)
- ACL paper abstract: corpus is “189 texts, each in three versions (567 in total)” and “freely available under a CC by-SA 4.0 license.” — [ACL Anthology W18-0535](https://aclanthology.org/W18-0535/)
- Zenodo record for the same release lists license **Creative Commons Attribution Share Alike 4.0 International**. — [Zenodo 1219041](https://zenodo.org/records/1219041)
- Wiki-Auto (Wikipedia-derived sentence pairs used inside CEFR-SP) is stated by the CEFR-SP authors as **CC BY-SA 3.0**, matching Wikipedia relicensing of that subset. — [Arase, Uchida, Kajiwara 2022, Ethics Statement](https://aclanthology.org/2022.emnlp-main.416.pdf)

**CEFR-J / Open Language Profiles — not a reading corpus**

- Official CEFR-J download page section “CEFR-J Text Profile”: “★Text profile関連の資料 後日アップします” (related materials will be uploaded later). The published tool is **CVLA** (CEFR-based Vocabulary Level Analyzer), which *estimates* CEFR-J level of user-supplied text; it is not a passage collection. — [cefr-j.org/download](https://www.cefr-j.org/download.html)
- OLP GitHub README Terms of use: CEFR-J vocabulary and grammar profiles “can be used for research and commercial purposes with no charge, provided that you cite the dataset properly.” Files listed: wordlist, Octanove C1/C2 wordlist, grammar profile — **no reading passages**. — [openlanguageprofiles/olp-en-cefrj](https://github.com/openlanguageprofiles/olp-en-cefrj?tab=readme-ov-file)
- Official CEFR-J Wordlist terms (same download page): copyright Tono Laboratory, TUFS; research, education, **and commercial** use with proper citation. — [cefr-j.org/download](https://www.cefr-j.org/download.html)
- Official CEFR-J CAN-DO test samples (including **読むこと / Reading**, PreA1–B2.2, PDF): “教育・研究用に無償公開”; “教育・研究・商用を問わず、必ず下記の引用を行うこと.” These are **test items**, not a graded-reader library. — [cefr-j.org/download](https://www.cefr-j.org/download.html)

**Explicitly not commercial-redistributable (official text)**

- CLEAR corpus official GitHub README: “The data is provided under a **CC BY-NC-SA 4.0** … license.” Size described as ~5,000 excerpts, grades 3–12, teacher readability scores. — [scrosseye/CLEAR-Corpus README](https://raw.githubusercontent.com/scrosseye/CLEAR-Corpus/main/README.md)
- CommonLit blog on CLEAR (official CommonLit post) **conflicts** with the GitHub statement: it says the dataset/metadata are “distributed under an open MIT license,” while each excerpt retains its original license (public domain, various CC including NC/SA). — [CommonLit: Introducing the CLEAR Corpus](https://www.commonlit.org/blog/introducing-the-clear-corpus-an-open-dataset-to-advance-research-28ff8cfea84a/)
- Newsela corpus official page (last updated September 2025): access “only [to] academically-affiliated researchers whose projects are likely to lead to a publication”; NDA required; no public download. — [Newsela Corpus Access](https://newsela.com/legal/data)
- Newsela platform Terms: license is “solely for your personal, educational, or other non-commercial use.” — [Newsela Terms of Use](https://solutions.newsela.com/legal/terms)
- WeeBit (Vajjala & Meurers 2012): Weekly Reader portion requires a paid research license from support@weeklyreader.com; authors share the exact corpus only with researchers who obtained that license. No public LICENSE file for WeeBit as a redistributable dataset. — [Vajjala & Meurers 2012 PDF](https://sifnos.iwm-tuebingen.de/dm/papers/vajjala-meurers-12.pdf)
- CEFR-SP official paper Ethics Statement: sentences sampled from Newsela-Auto, Wiki-Auto, and SCoRE; licenses kept per source — Wiki-Auto **CC BY-SA 3.0**, SCoRE **CC BY-NC-SA 4.0**, Newsela-Auto distributed only after the user first obtains the Newsela corpus. — [Arase et al. 2022](https://aclanthology.org/2022.emnlp-main.416.pdf)
- UniversalCEFR Hugging Face card for `cefr_sp_en`: “Dataset License: **cc-by-nc-sa-4.0**”; 10,004 rows. — [UniversalCEFR/cefr_sp_en](https://huggingface.co/datasets/UniversalCEFR/cefr_sp_en)
- UniversalCEFR data-directory README: compilation of 26 CEFR-labeled corpora “which can be used for **non-commercial research**”; EFCAMDAT, APA-LHA, BEA 2019 Write and Improve, and DEPlain require separate Terms of Use and are not on the HF org. — [UniversalCEFR/universalcefr-data-directory](https://github.com/UniversalCEFR/universalcefr-data-directory)
- SCoRE (Sentence Corpus of Remedial English, Waseda/Nihon) official Japanese homepage: examples provided under **CC BY-NC-SA 4.0**; “非営利で使用する限り” (as long as use is non-profit). Sentence-level DDL corpus, not graded readers. — [score.ddl-study.org](https://score.ddl-study.org/)
- MeloLingua CEFR-graded stories HF card (v1.0.0, 27 August 2026): **CC BY-NC 4.0**; 118 stories in DE/ES/FR/IT/KO/RU (English is a translation field, not the target-language passage set). — [ismaelfi/melolingua-cefr-graded-multilingual-stories](https://huggingface.co/datasets/ismaelfi/melolingua-cefr-graded-multilingual-stories)
- Open Cambridge Learner Corpus (Sketch Engine): CUP copyright; users may publish research results and reproduce excerpts only under UK fair dealing; must identify excerpts as OpenCLC owned by CUP / Cambridge English. Learner **exam writing**, not graded readers. — [Open CLC on Sketch Engine](https://www.sketchengine.eu/cambridge-learner-corpus/)
- Let’s Read (Asia Foundation) 2025 illustrator ToR: books “uploaded to Let’s Read! digital library under a Creative Commons license”; the document links **https://creativecommons.org/licenses/by-nc/4.0/**. — [Let’s Read APLJ ToR PDF (Nov 2025)](https://asiafoundation.org/wp-content/uploads/2025/11/Terms-of-Reference-ToR-for-Illustrator-%E2%80%93-Lets-Read-APLJ.pdf)
- An older Let’s Read! Khmer e-books page states “Creative Commons Attribution” (CC BY, no NC). That page is a WordPress archive, not the current letsreadasia.org legal page. — [letsreadbooksorg.wordpress.com/books](https://letsreadbooksorg.wordpress.com/books/)

**Source-by-source inventory (official fields only)**

| Source | Official URL | License text location | Commercial? | Attribution? | CEFR / level tags | Passage length | Format | Classification |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| StoryWeaver stories/images | [storyweaver.org.in](https://storyweaver.org.in/en/attributions) | Attributions + FAQs: **CC BY 4.0** | Yes | Yes (author, illustrator, publisher, donor, StoryWeaver) | Platform Levels 1–4 (word ranges), **not CEFR** | L1 ≤50–250 words; L2 250–600; L3 600–1500; L4 longer | Web, PDF | **ATTRIBUTION_REQUIRED** |
| StoryWeaver readalongs/video | same | Attributions: **CC BY-NC-ND 4.0** | No | Yes | n/a | audio/video | Web/YouTube | **RESEARCH_ONLY** |
| Book Dash | [bookdash.org/re-using…](https://bookdash.org/re-using-the-book-dash-content/) | Official reuse page: **CC BY 4.0** + logo/link | Yes (print/sell/apps) | Yes (4 creatives + logo + link) | Theme filters; **not CEFR** | Picture-book length; 200+ titles | PDF, print PDF, source files | **ATTRIBUTION_REQUIRED** |
| African Storybook | [africanstorybook.org/terms.html](https://www.africanstorybook.org/terms.html) | Terms: open + optional **NC** per title | Only CC BY titles | Yes (creators + ASb) | ASb Levels 1–5 (words/page); **not CEFR**; Play listing says “not graded readers” | L1 ≤10 w/page … L5 71–140 w/page | Web, PDF, EPUB | **ATTRIBUTION_REQUIRED** (BY titles) / **RESEARCH_ONLY** (NC titles) |
| Global Digital Library | [digitallibrary.io/about/license](https://digitallibrary.io/about/license/) | Platform: primarily **CC BY / CC BY-SA**; some **NC-SA** | Per title (README: >90% commercial) | Yes | Early-grade / classroom vs library; **not CEFR** | Children’s books; 500+ files in 2020 print dump | PDF, InDesign; online | **ATTRIBUTION_REQUIRED** (BY/BY-SA titles) / **RESEARCH_ONLY** (NC titles) |
| Bloom Library | [bloom.sil.org/terms](https://bloom.sil.org/terms) | Per-book license; default site contrib **CC BY-NC 4.0** | Per book only | Per book | SIL reading levels; **not CEFR** | Variable picture books | Bloom/PDF via library | **UNKNOWN** as a dump; **per-title** BY → ATTRIBUTION_REQUIRED, NC → RESEARCH_ONLY |
| VOA Learning English (VOA-original) | [learningenglish.voanews.com/p/6861.html](https://learningenglish.voanews.com/p/6861.html) | Official page: **public domain** + credit; exclude AP/Reuters/AFP | Yes | Credit requested | VOA “levels” / Special English style; **not official CEFR** | News features; audio+text | HTML, MP3, video | **ATTRIBUTION_REQUIRED** (PD + requested credit; strip agency media) |
| Project Gutenberg (U.S.-unrestricted texts) | [gutenberg.org/policy/license.html](https://www.gutenberg.org/policy/license.html) | PG License: strip trademark → unrestricted in U.S. | Yes (without PG mark) | No for PD text; PG mark has extra rules | None | Full books (classics), not graded | HTML, EPUB, plain text | **PRODUCTION_ALLOWED** for PD text after stripping PG header; **DO_NOT_USE** copyrighted-PG titles |
| OneStopEnglish **corpus** (2018) | [github.com/nishkalavallabhi/OneStopEnglishCorpus](https://github.com/nishkalavallabhi/OneStopEnglishCorpus) | README + Zenodo: **CC BY-SA 4.0** | Yes (SA applies) | Yes + ShareAlike | ele / int / adv (Macmillan site levels), **not CEFR** | 189×3 = 567 articles | TXT, CSV, alignments | **ATTRIBUTION_REQUIRED** (SA). Underlying Macmillan *website* is still closed (see Q5). |
| Wiki-Auto / Wikipedia text | CEFR-SP ethics + Wikimedia | Paper: Wiki-Auto **CC BY-SA 3.0** | Yes (SA) | Yes + SA | None in Wiki-Auto itself | Sentences / article pairs | Research dumps | **ATTRIBUTION_REQUIRED** (SA) |
| Simple English Wikipedia | [simple.wikipedia.org/wiki/Wikipedia:Copyrights](https://simple.wikipedia.org/wiki/Wikipedia:Copyrights) | Fetched policy page states **GFDL** only | GFDL allows commercial with copyleft | Yes (GFDL attribution) | Informal “simple English,” **not CEFR** | Encyclopedia articles | HTML / dumps | **UNKNOWN** for current dual-license status — live Simple policy page still says GFDL; English WP copyrights page timed out this pass (Wikimedia-wide ToU is typically CC BY-SA 3.0/4.0 + GFDL, **not verified here**) |
| CEFR-J Wordlist / Grammar Profile | [cefr-j.org/download](https://www.cefr-j.org/download.html); [OLP GitHub](https://github.com/openlanguageprofiles/olp-en-cefrj) | Official + OLP: research **and commercial**, cite | Yes | Yes | CEFR-J levels | **Not passages** (lexis/grammar lists) | XLSX/CSV | **ATTRIBUTION_REQUIRED** — taxonomy only, not reading seed |
| CEFR-J Text Profile passages | [cefr-j.org/download](https://www.cefr-j.org/download.html) | Materials “will be uploaded later” | n/a | n/a | Analyzer (CVLA) estimates CEFR-J | n/a | Tool, not corpus | **UNKNOWN** / not published |
| CEFR-J CAN-DO Reading tests | [cefr-j.org/download](https://www.cefr-j.org/download.html) | Education/research/commercial + mandatory citation | Yes | Yes | CEFR-J PreA1–B2.2 | Short test tasks (PDF) | PDF | **ATTRIBUTION_REQUIRED** — tests, not readers |
| CLEAR | [github.com/scrosseye/CLEAR-Corpus](https://github.com/scrosseye/CLEAR-Corpus) | README: **CC BY-NC-SA 4.0** (blog says MIT — conflict) | No (if README controls) | Yes + SA | U.S. grades 3–12 / CLEAR score; **not CEFR-native** | ~4,724 excerpts; mean ~FKGL 9.5 (paper) | CSV on GitHub | **RESEARCH_ONLY** (prefer README over blog); per-excerpt original license still applies |
| WeeBit | Paper only | No public LICENSE; WeeklyReader research fee | No public redistrib. | n/a | WeeklyReader + BBC Bitesize **grade/KS**, not CEFR | Combined 7–16 yrs | Not publicly posted | **RESEARCH_ONLY** / **DO_NOT_USE** for seed |
| Newsela corpus / site | [newsela.com/legal/data](https://newsela.com/legal/data) | Academic NDA; ToU non-commercial | No | NDA | Lexile / U.S. grade; **not CEFR** | 1,130 articles × up to 5 levels (Xu 2015) | Gated | **DO_NOT_USE** |
| CEFR-SP (full) | [HF UniversalCEFR/cefr_sp_en](https://huggingface.co/datasets/UniversalCEFR/cefr_sp_en); [yukiar/CEFR-SP](https://github.com/yukiar/CEFR-SP) | HF card **CC BY-NC-SA 4.0**; paper splits by source | No (collection) | Yes + SA | Expert CEFR **sentence** labels A1–C2 | Sentences (~17k in directory; HF transform 10,004) | JSON/TSV | **RESEARCH_ONLY** (Newsela slice **DO_NOT_USE**) |
| SCoRE | [score.ddl-study.org](https://score.ddl-study.org/) | Official: **CC BY-NC-SA 4.0** | No | Yes + SA | Remedial EFL sentences, not CEFR-tagged passages | Sentences | Web DDL tools | **RESEARCH_ONLY** |
| UniversalCEFR bundle | [huggingface.co/UniversalCEFR](https://huggingface.co/UniversalCEFR) | Directory: **non-commercial research**; per-row `license` field | Generally no | Per source | Mixed CEFR; many **learner** texts | 505,807 texts / 13 langs (org page) | JSON | **RESEARCH_ONLY** as a bundle; inspect each child |
| MeloLingua stories | [HF ismaelfi/…](https://huggingface.co/datasets/ismaelfi/melolingua-cefr-graded-multilingual-stories) | Card: **CC BY-NC 4.0** | No | Yes | Editorial A1–B2 (not official exam) | 118 stories; has questions | JSON/CSV | **RESEARCH_ONLY**; target langs are not English |
| Open CLC | [sketchengine.eu/cambridge-learner-corpus](https://www.sketchengine.eu/cambridge-learner-corpus/) | CUP access policy; fair-dealing excerpts only | No | Cite CUP | Exam suite (FCE/CAE/CPE), not reading levels | 2.9M words / 10k+ scripts | Sketch Engine | **RESEARCH_ONLY** |
| Let’s Read (Asia Foundation) | [asiafoundation.org/…/lets-read](https://asiafoundation.org/programs/education-and-leadership/lets-read/); 2025 ToR PDF | 2025 ToR links **CC BY-NC 4.0**; older WP page said CC BY | Unclear / likely NC for new titles | Yes | Children’s library; **not CEFR** | Picture books; ToR: 15,000+ books / 70+ langs | App/web | **UNKNOWN** platform-wide (contradictory official pages) → treat new titles as **RESEARCH_ONLY** until each book’s license is read |
| Kaggle “CEFR Levelled English Texts” | [kaggle.com/datasets/amontgomerie/cefr-levelled-english-texts](https://www.kaggle.com/datasets/amontgomerie/cefr-levelled-english-texts) | Uploader marked **CC0**; card admits texts from British Council, ESLFast, CNN/DailyMail | Uploader claim does not bind source copyright | n/a | Uploader CEFR labels | ~1,493 texts / 3.66 MB CSV | CSV | **DO_NOT_USE** (scraped third-party copyright; CC0 is not an official source license) |

### Inferences
- For a self-hosted commercial EnglishFlow seed, the **cleanest passage pools** are StoryWeaver/Book Dash (and per-title CC BY / CC BY-SA books from ASb/GDL/Bloom) plus VOA-original Learning English and (if ShareAlike product implications are acceptable) the OneStopEnglish corpus and Wikipedia-derived text.
- There is **no official CEFR-J or Cambridge open graded-reader dump** that can be seeded. CEFR-J’s published reading assets are CAN-DO *tests* and a level *estimator*, not a reader library.
- Aggregator datasets that restamp British Council / ESL Fast / Newsela / CNN text as CC0 or “open” do not clear the underlying copyright; they stay `DO_NOT_USE`.

### Gaps
- Exact current English-title counts on StoryWeaver, ASb, GDL, and Bloom were not published as a single official statistic on the pages fetched (StoryWeaver search UI shows “thousands” / 36M reads, not a license-filtered English count).
- Simple English Wikipedia’s **current** license deed was not confirmed: the live Simple policy page still describes GFDL; the English Wikipedia:Copyrights fetch timed out.
- Let’s Read Asia has no single current legal page fetched that resolves CC BY vs CC BY-NC; only a 2025 ToR (NC link) and an old WordPress CC BY statement.
- CLEAR GitHub README (NC-SA) vs CommonLit blog (MIT for metadata) is an official contradiction; production should not rely on the MIT claim.
- No Cambridge English / English Profile **reading-passage** collection with a redistributable commercial license was found on official pages in this pass.

## Which sources have official CEFR or CEFR-J / EFL level tags vs informal “easy English”?

### Takeaway
True official CEFR or CEFR-J tags on *redistributable English reading passages* are essentially absent. What exists is (a) CEFR-J tooling and CAN-DO reading *tests*, (b) expert CEFR **sentence** labels on NC research sets (CEFR-SP), and (c) many informal or adjacent scales (StoryWeaver 1–4, ASb 1–5, Macmillan ele/int/adv, VOA levels, U.S. grade/Lexile, WeeklyReader/Bitesize).

### Cited Findings
- CEFR-J Wordlist and Grammar Profile carry official CEFR-J levels; they are lists, not readers. — [cefr-j.org/download](https://www.cefr-j.org/download.html); [OLP README](https://github.com/openlanguageprofiles/olp-en-cefrj?tab=readme-ov-file)
- CEFR-J Text Profile **passage materials are not published**; CVLA estimates CEFR-J from features and is unstable below ~300 words. — [cefr-j.org/download](https://www.cefr-j.org/download.html)
- CEFR-J CAN-DO **Reading** sample tests are labeled PreA1–B2.2. — [cefr-j.org/download](https://www.cefr-j.org/download.html)
- CEFR-SP: “largest corpus to date of sentences annotated according to established language ability indicators”; annotators paid; labels A1–C2 at **sentence** granularity; sources Newsela-Auto / Wiki-Auto / SCoRE. — [Arase et al. 2022](https://aclanthology.org/2022.emnlp-main.416.pdf)
- UniversalCEFR directory row for cefr-sp: `en`, sentence-level, `reference`, ~17,000, manual, A1–C2, **CC BY-NC-SA 4.0**. — [universalcefr-data-directory](https://github.com/UniversalCEFR/universalcefr-data-directory)
- A later study (reported in a third-party research note, not re-fetched as a primary PDF this pass) is said to CEFR-rate 1,181 CLEAR texts; CLEAR itself is **grade 3–12 / teacher CLEAR scores**, not CEFR-native. — [CLEAR GitHub](https://raw.githubusercontent.com/scrosseye/CLEAR-Corpus/main/README.md); secondary mention [GliteTech research note](https://github.com/GliteTech/research-ace-cefr/blob/main/tasks/t0004_find_related_cefr_datasets/research/research_internet.md)
- StoryWeaver official reading-level page: Levels 1–4 defined by word range and literacy stage (e.g. Level 1 up to 50 words / “Beginning to Read”; Level 3 600–1500). No CEFR mapping. — [StoryWeaver reading levels](https://storyweaver.org.in/en/reading-levels)
- African Storybook Reader Play listing: Levels 1–5 by words per page; “Although the stories are at different levels, they are **not graded readers**.” — [ASb Reader on Google Play](https://play.google.com/store/apps/details?hl=en_US&id=org.saide.ASbReader)
- OneStopEnglish corpus folders are `-ele` / `-int` / `-adv` (site “elementary / intermediate / advanced”), not CEFR codes. — [OneStopEnglishCorpus README](https://raw.githubusercontent.com/nishkalavallabhi/OneStopEnglishCorpus/master/README.md)
- ESL Fast official About page: “Some, but not all, reading passages at ESL Fast are classified into six levels. However, **these levels do not correspond exactly to the six CEFR levels**”; a “rough guide” maps Super Easy/1–2 → A1–A2, etc. — [eslfast.com/about-eslfast.htm](https://www.eslfast.com/about-eslfast.htm)
- Newsela is grounded in **Lexile** and U.S. Common Core grade bands, not CEFR (Xu et al. 2015). — [TACL paper](https://doi.org/10.1162/tacl_a_00139)
- WeeBit combines Weekly Reader levels 2–4 and BBC Bitesize KS3/GCSE (ages ~7–16), not CEFR. — [Vajjala & Meurers 2012](https://sifnos.iwm-tuebingen.de/dm/papers/vajjala-meurers-12.pdf)
- MeloLingua card: “CEFR labels are **editorial teaching labels**, not official test scores.” And the stories are not English-as-target. — [HF MeloLingua card](https://huggingface.co/datasets/ismaelfi/melolingua-cefr-graded-multilingual-stories)
- Kaggle “CEFR Levelled English Texts” (~1493 texts, A1–C2) is an unofficial scrape mix (British Council, ESLFast, cnn-dailymail) labeled by the uploader. — [Kaggle dataset](https://www.kaggle.com/datasets/amontgomerie/cefr-levelled-english-texts)

### Inferences
- EnglishFlow cannot import a ready-made **official CEFR A1–C1 passage ladder**. Any CEFR tags on production content would need to be assigned in-house (e.g. human review + optional CVLA estimate on ≥300-word texts), not copied from StoryWeaver/ASb/VOA/Newsela scales.
- The only official CEFR-J reading *content* that is commercial-citable is the CAN-DO **test sample** PDFs — useful as task models, not as a reader catalog.

### Gaps
- Primary PDF for the Zhang & Lu (or Lu 2025) CEFR-labeled CLEAR subset (1,181 texts) was not fetched; only a secondary research note mentions it.
- No official British Council or Cambridge page was found that releases a CEFR-tagged reading corpus for redistribution.
- ESL Fast’s “six levels” vs CEFR mapping is explicitly unofficial; no independent alignment study was located on the official site.

## Are comprehension questions included, or only passages?

### Takeaway
Open commercial-friendly storybook platforms ship **passages (and illustrations) only**. Comprehension items appear on closed ESL sites (Breaking News English, ESL Fast, British Council, CommonLit, Macmillan OneStopEnglish lessons) that ban commercial redistribution, and on NC research/OER sets (CommonLit original questions, MeloLingua). The OneStopEnglish *corpus* and CLEAR are passages/excerpts only.

### Cited Findings
- StoryWeaver / Book Dash / ASb / GDL official pages describe stories, downloads, translation, and print — not bundled comprehension-question datasets. — [StoryWeaver Attributions](https://storyweaver.org.in/en/attributions); [Book Dash reuse](https://bookdash.org/re-using-the-book-dash-content/); [ASb terms](https://www.africanstorybook.org/terms.html); [GDL license](https://digitallibrary.io/about/license/)
- OneStopEnglish corpus README lists leveled texts, CSV columns, sentence alignments, parser output — **no question key**. — [README](https://raw.githubusercontent.com/nishkalavallabhi/OneStopEnglishCorpus/master/README.md)
- CLEAR is “reading excerpts” plus readability scores and metadata (year, genre), not items. — [CLEAR README](https://raw.githubusercontent.com/scrosseye/CLEAR-Corpus/main/README.md)
- Breaking News English official copyright page: materials include “the Article, the exercises that go with it”; printing for a teacher’s own students is allowed; **no** reproduction of article or exercises on any other website, app, LMS, or book. — [breakingnewsenglish.com/copyright.html](https://breakingnewsenglish.com/copyright.html)
- ESL Fast About: “thousands of conversations, reading passages, audio recordings, and **interactive exercises**” (vocabulary, comprehension, crossword, scrambled sentences, dictation). — [eslfast.com/about-eslfast.htm](https://www.eslfast.com/about-eslfast.htm)
- CommonLit original articles **and questions** are CC BY-NC-SA 4.0; third-party passages follow the permissions line; **Free Reading Assessment / Assessment Series are not CC** and may not be shared. Uploading CommonLit materials to AI tools is forbidden. — [CommonLit Support](https://support.commonlit.org/article/451-i-want-to-respect-copyright-and-permission-rules-what-am-i-allowed-to-do-with-commonlit-materials-and-resources-can-i-download-and-print-articles-can-i-share-them-what-about-assessments)
- MeloLingua HF card: records include “comprehension questions, sentence-building exercises” under **CC BY-NC 4.0**. — [HF MeloLingua](https://huggingface.co/datasets/ismaelfi/melolingua-cefr-graded-multilingual-stories)
- CEFR-J CAN-DO Reading PDFs are **test tasks** (can-do prompts), not lesson comprehension packs attached to a reader series. — [cefr-j.org/download](https://www.cefr-j.org/download.html)
- VOA page documents texts/MP3s/videos; it does not publish a redistributable question bank on that license page. — [VOA Request Our Content](https://learningenglish.voanews.com/p/6861.html)

### Inferences
- Production quizzes for EnglishFlow reading must be **original** (or drawn only from a license-clean item set such as CEFR-J CAN-DO samples, with citation). Do not scrape BNE / ESL Fast / LearnEnglish / CommonLit assessments.
- Children’s CC BY books are usable as A1–A2 *extensive reading* stems; items would be written in-house.

### Gaps
- Whether individual VOA Learning English lesson pages include quizzes, and whether those quizzes are also PD, was not verified page-by-page.
- Macmillan OneStopEnglish *lesson worksheets* (as opposed to the 2018 research corpus) were not fetched as a standalone copyright PDF; site/Macmillan ToU treat them as licensed products (see Q5).

## What are the sizes, formats, and quality caveats?

### Takeaway
Commercially usable open readers are large in *children’s picture-book* volume (StoryWeaver “thousands”; Book Dash 200+; GDL 500+ files in 2020; Let’s Read ToR claims 15,000+ books / 70 languages) but thin for **adult A2–C1** journalistic/academic reading. The only sizable adult leveled open dump with a commercial-ish license is OneStopEnglish (567 texts, SA). Research-only sets are larger (CLEAR ~4.7k; UniversalCEFR 500k+ multilingual) but unusable for a commercial seed.

### Cited Findings
- OneStopEnglish: **189 × 3 = 567** texts; TXT by level; CSV with paragraph breaks; sentence alignments via cosine similarity (quality caveat: automatic alignment). — [README](https://raw.githubusercontent.com/nishkalavallabhi/OneStopEnglishCorpus/master/README.md); [ACL W18-0535](https://aclanthology.org/W18-0535/)
- CLEAR: N ≈ 4,724–5,000 excerpts; informative 2304 / literary 2420; mean publication year 1937.89; mean FKGL 9.51; mostly mid-text excerpts; content ratings G/PG/PG-13 (+ 3 R kept). — [Crossley et al., Behavior Research Methods](https://link.springer.com/article/10.3758/s13428-022-01802-x)
- Newsela research descriptions: **1,130** articles, up to five professionally simplified versions; cannot be redistributed, so alignments cannot be published. — [Xu et al. TACL](https://doi.org/10.1162/tacl_a_00139); [Computational Linguistics survey](https://direct.mit.edu/coli/article/46/1/135/93384/Data-Driven-Sentence-Simplification-Survey-and)
- Book Dash: **200+ titles**; full source-file library download. Age/audience: early childhood picture books. — [Book Dash reuse](https://bookdash.org/re-using-the-book-dash-content/)
- GDL print repo (March 2020): **500+ files, 23 languages**, English as bridge language; files often need prep before print. — [GDL print README](https://github.com/GlobalDigitalLibraryio/print)
- Let’s Read 2025 ToR: “over **15,000** … storybooks in over **70** languages.” License of that whole library is not uniformly stated on the program page. — [ToR PDF](https://asiafoundation.org/wp-content/uploads/2025/11/Terms-of-Reference-ToR-for-Illustrator-%E2%80%93-Lets-Read-APLJ.pdf)
- StoryWeaver: 380+ languages (site chrome); English stories exist at Levels 1–4; FAQs require child-friendly content. Cultural setting is often South Asian — a fit caveat for Vietnamese adult learners. — [StoryWeaver FAQs](https://storyweaver.org.in/en/help/faqs); [reading levels](https://storyweaver.org.in/en/reading-levels)
- African Storybook: “thousands” of picture books in African languages **and** English translations; levels support early primary literacy, not EFL graded-reader pedagogy. — [ASb introduction PDF](https://www.africanstorybook.org/documents/howto/Introduction_to_ASb.pdf); [Play listing](https://play.google.com/store/apps/details?hl=en_US&id=org.saide.ASbReader)
- CEFR-SP / HF transform: 10,004 rows on `cefr_sp_en`; directory lists ~17,000; **sentence** not passage length. — [HF card](https://huggingface.co/datasets/UniversalCEFR/cefr_sp_en)
- UniversalCEFR org page: **505,807** CEFR-labeled texts, 13 languages, mixed learner vs reference, mixed licenses including `Unknown`. — [huggingface.co/UniversalCEFR](https://huggingface.co/UniversalCEFR)
- Kaggle CEFR texts: **1,493** texts, 3.66 MB CSV; quality caveat: scraped heterogeneous web ESL + news. — [Kaggle](https://www.kaggle.com/datasets/amontgomerie/cefr-levelled-english-texts)
- ESL Fast official counts (site content, not redistributable): 2,500+ dialogues, 3,000+ short essays/stories. — [eslfast.com/about-eslfast.htm](https://www.eslfast.com/about-eslfast.htm); [rong-chang.com/about.htm](https://www.rong-chang.com/about.htm)
- CVLA caveat: short texts “推定値が大きくずれる” (estimates can deviate sharply); ~300+ words recommended. — [cefr-j.org/download](https://www.cefr-j.org/download.html)
- Project Gutenberg: large classic-literature archive; **not** written to CEFR; many texts are archaic and far above A1–B1. Trademark/header must be handled per PG license. — [PG License](https://www.gutenberg.org/policy/license.html)
- VOA: PD text/audio is adult-news “Learning English” (controlled vocabulary/speed historically), but **not** a CEFR-graded reader series; must exclude wire-service media. — [VOA p/6861](https://learningenglish.voanews.com/p/6861.html)

### Inferences
- A1–A2 production seed can be built from **CC BY picture books** (StoryWeaver/Book Dash/ASb-BY/GDL-BY) after human CEFR tagging and Vietnamese-learner cultural screening.
- B1–C1 production seed has **no large clean CEFR-tagged open corpus**. Practical options: VOA-original articles (tag in-house), OneStopEnglish ele/int/adv (SA + Macmillan-origin pedagogy, not CEFR), original EnglishFlow writing, and optionally Wikipedia/Simple English if license is confirmed.
- CLEAR/WeeBit/Newsela are the quality gold standards in *readability research* and are the wrong legal class for a commercial app.

### Gaps
- No official word-count distribution for VOA Learning English articles was found on the license page.
- Current (2026) live inventory sizes for GDL and Bloom English CC BY titles were not listed on the license pages fetched.
- Quality of StoryWeaver user-generated vs “Verified” publisher stories (Pratham) was not quantified on official pages beyond the Verified badge in the catalog UI.

## Which popular ESL sites fail the commercial/redistribution test?

### Takeaway
British Council LearnEnglish / TeachingEnglish, Newsela, Breaking News English, Macmillan OneStopEnglish **website**, CommonLit (NC + third-party texts + banned assessments), and ESL Fast / rong-chang.com all **fail** commercial redistribution. Official terms forbid selling, hosting in another app, or (for several) any copying beyond personal/classroom use. The 2018 OneStopEnglish *research corpus* is a separate CC BY-SA release and must not be confused with scraping the live Macmillan site.

### Cited Findings
- **British Council – LearnEnglish apps ToU:** British Council owns/licenses all IP; users “may not … copy, reproduce, … distribute, commercially exploit … British Council Content in whole or in part”; “must not be reproduced or exploited for commercial gain”; other uses need prior written consent. — [learnenglish.britishcouncil.org/terms-of-use-for-apps](https://learnenglish.britishcouncil.org/terms-of-use-for-apps)
- **British Council – TeachingEnglish copyright:** “Materials on this site cannot be redistributed or used for commercial purposes.” Copyright British Council and BBC. Classroom photocopying only “where indicated.” — [teachingenglish.org.uk/copyright](https://www.teachingenglish.org.uk/copyright)
- **British Council – organisation Terms (National Archives capture of britishcouncil.org/terms):** personal and **non-commercial** copy/share/download with credit; may not use for commercial purposes, republish on another website, or modify content. — [webarchive of BC Terms](https://webarchive.nationalarchives.gov.uk/ukgwa/20250418110908mp_/https:/www.britishcouncil.org/terms)
- **Newsela:** academic-only corpus + NDA (Sept 2025); platform ToU limited to personal/educational/non-commercial use; download must be deleted when the purpose ends. — [newsela.com/legal/data](https://newsela.com/legal/data); [Newsela Terms](https://solutions.newsela.com/legal/terms)
- **Breaking News English:** “NONE OF THE MATERIALS ON THIS WEBSITE CAN BE SOLD OR MONETIZED IN ANY FORM.” Allowed: paper copies for own students / private study; HTML links (not MP3). **Not** granted: reproduce article or exercises on any website, social, video platform, blog, **app**, LMS/CMS; not in brochures, magazines, bundled materials, or books; no copy-paste to create new formats. — [breakingnewsenglish.com/copyright.html](https://breakingnewsenglish.com/copyright.html)
- **OneStopEnglish website (Macmillan):** Macmillan English Terms — downloadable products are a “non-exclusive, revocable and personal license” for personal or pedagogical classroom use; “We do not transfer title”; Macmillan/affiliates own IP in the Services. Onestopenglish.com is “part of Macmillan Education” and premium news lessons are subscriber content. — [macmillanenglish.com/by/terms-of-use](https://www.macmillanenglish.com/by/terms-of-use); [onestopenglish.com/about](https://www.onestopenglish.com/about)
- **CommonLit:** original materials **CC BY-NC-SA 4.0** (non-commercial); many library texts are third-party and may not be stored off-site; assessments are all-rights-reserved; no AI upload; no LOR aggregation. — [CommonLit Support art. 451](https://support.commonlit.org/article/451-i-want-to-respect-copyright-and-permission-rules-what-am-i-allowed-to-do-with-commonlit-materials-and-resources-can-i-download-and-print-articles-can-i-share-them-what-about-assessments)
- **ESL Fast / rong-chang.com:** “All content … is the property of Rong-Chang ESL, Inc.” “may not be copied or hosted on other websites without permission.” “Teachers are welcome to make copies for classroom use, but materials **may not be included in any commercial publications or applications, online or offline**, without prior written consent.” — [rong-chang.com/about.htm](https://www.rong-chang.com/about.htm)
- ESL Fast About (same publisher) also states materials “may not be copied, reproduced, or hosted on other websites without prior written permission” and may not be included in commercial publications, websites, or mobile apps (search-indexed copyright block on that page). — [eslfast.com/about-eslfast.htm](https://www.eslfast.com/about-eslfast.htm)

**Classification for the named popular sites**

| Site | Official terms | Classification |
| --- | --- | --- |
| British Council LearnEnglish / TeachingEnglish | No commercial exploit; no redistribute | **DO_NOT_USE** |
| Newsela site + research corpus | Non-commercial platform; NDA research corpus | **DO_NOT_USE** |
| Breaking News English | No sell/monetize; no app/LMS/site republish | **DO_NOT_USE** |
| OneStopEnglish **website** (Macmillan) | Personal/pedagogical license; no title transfer | **DO_NOT_USE** (do not scrape) |
| OneStopEnglish **2018 corpus** | CC BY-SA 4.0 on GitHub/Zenodo | **ATTRIBUTION_REQUIRED** (separate from the website) |
| CommonLit | CC BY-NC-SA originals; third-party locked; assessments closed | **RESEARCH_ONLY** (originals) / **DO_NOT_USE** (third-party + assessments) |
| ESL Fast / rong-chang.com | No hosting; no commercial apps | **DO_NOT_USE** |

### Inferences
- “Free ESL reading” on the open web is almost never a production license. Classroom-print permissions (BNE, ESL Fast, BC) are **not** app-seed permissions.
- A Kaggle/Hugging Face card that copies those sites and stamps CC0 does not change the official source terms.

### Gaps
- Live `britishcouncil.org/terms` (non-archived) is accordion-only in the fetch and did not expand the operative clauses; the National Archives capture was used instead. Confirm the live page before counsel sign-off.
- Macmillan’s full onestopenglish-specific subscriber agreement (if separate from the generic Macmillan English ToU) was not fetched.
- Cambridge English / Write & Improve / English Profile public sites were not exhaustively crawled; no open commercial reader dump surfaced in the searches that were run.
