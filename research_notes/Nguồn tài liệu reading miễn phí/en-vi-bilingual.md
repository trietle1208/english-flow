# EN–VI bilingual sources for reading support

Research date: September 2026.  
Scope: official LICENSE / README / dataset-card / terms pages only. Codes match EnglishFlow grammar research (`PRODUCTION_ALLOWED` / `ATTRIBUTION_REQUIRED` / `RESEARCH_ONLY` / `UNKNOWN` / `DO_NOT_USE`). This file **extends** [docs/research/grammar-dataset-license-research.md](/var/www/html/my/english-flow/docs/research/grammar-dataset-license-research.md) for **reading-length** texts (glosses, translations, parallel passages). It does not reopen or contradict that file’s classifications.

---

## Which already-cleared EN–VI sources still apply to longer reading passages?

### Takeaway
License codes from the grammar file still stand. For **reading-length** use, only Wikimedia-family text (Wikipedia / Wiktionary / Wikivoyage) is actually passage-scale and commercially reusable (with attribution + ShareAlike). Tatoeba and TALPCo remain clean but are **sentence-scale**, not readers. EVBCorpus has real books/news but still has **no verifiable LICENSE**. PhoMT, MTet, and TED2020 stay **off production**. OpenSubtitles stays **UNKNOWN / avoid**.

### Cited Findings

**Inventory of grammar-file sources, re-checked for reading length (September 2026)**

| Source | Official license read | Grammar code (unchanged) | Reading-length? | Production reading use |
| --- | --- | --- | --- | --- |
| Tatoeba text | CC BY 2.0 FR; commercial allowed with attribution | `ATTRIBUTION_REQUIRED` | No — individual sentences | Gloss / example sentences only |
| TALPCo | CC BY 4.0 (README Introduction) | `ATTRIBUTION_REQUIRED` | No — `Sentence_ID` + one sentence per line | Curated short examples only |
| Wikipedia / Wiktionary | CC BY-SA 4.0 (+ GFDL dual-license on Wiktionary) | `ATTRIBUTION_REQUIRED` (+ SA) | Wikipedia: yes (articles). Wiktionary: no (defs / short quotes) | Yes for WP article text if SA + attribution complied |
| EVBCorpus | GitHub README has **no LICENSE**; asks email `hungnq@uit.edu.vn` | `UNKNOWN` | Yes — 15 books, 100 fictions, 5,000 news, 250 laws, 2,000 subtitles | Do not embed until a written license exists |
| PhoMT | Research/educational only; no redistribute | `RESEARCH_ONLY` | No — 3.02M **sentence pairs** | Do not use |
| MTet | HF card `license: cc-by-nc-sa-4.0` | `RESEARCH_ONLY` | Mixed domains; still packaged as pairs, not a reader corpus | Do not use (NC + third-party film/TED/books) |
| TED2020 (OPUS) | OPUS: “respect TED Talks Usage Policy”; TED: CC BY-NC-ND 4.0 | `RESEARCH_ONLY` | Talk-length transcripts exist | Do not use in a commercial app |
| OpenSubtitles (OPUS) | Attribution request to opensubtitles.org; “files we believe we are free to redistribute” — not a film/TV commercial grant | `UNKNOWN` | Dialogue lines, not passages | Avoid production |

- Tatoeba Terms of Use v1 state that text contributions are licensed under Creative Commons Attribution 2.0 (fr), and that this license “does allow commercial uses of your contributions, as long as such uses are compliant with the terms.” Re-users must attribute authors (hyperlink/URL or author list), indicate modifications, and include a CC-BY notice. The French text takes precedence. — [Tatoeba Terms of Use v1](https://en.wiki.tatoeba.org/articles/show/terms-of-use-v1)
- The same terms apply to **sentences**, not continuous passages. Attribution can be a URL to the sentence(s). This matches the grammar file’s “text only; audio is per-contributor.” — [Tatoeba Terms of Use v1](https://en.wiki.tatoeba.org/articles/show/terms-of-use-v1)
- TALPCo README: “TALPCo is licensed under a Creative Commons Attribution 4.0 International (CC BY 4.0) license.” Format is `Sentence_ID [TAB] Sentence` for Japanese plus translations including English (`data_eng.txt`) and Vietnamese (`data_vie.txt`). Alignment is via shared Sentence_ID (JP pivot), not paragraph-aligned readers. — [TALPCo readme.md](https://raw.githubusercontent.com/matbahasa/TALPCo/master/readme.md)
- TALPCo English file includes a US-English variant “by courtesy of Charles Kelly”; sound files are separately noted as coming from TUFS Open Language Resources. Text license is CC BY 4.0; audio is a different provenance and should not be assumed to travel with the text. — [TALPCo readme.md](https://raw.githubusercontent.com/matbahasa/TALPCo/master/readme.md)
- EVBCorpus README v2.0 lists **15 bilingual books**, **100 fictions**, **250 law texts**, **5,000 news articles**, **500 ETests**, and **2,000 film subtitles** — **2,292,077 sentence pairs / ~21M words**. That is reading-length source material. The same README has **no LICENSE file language**, says “email to hungnq(at)uit.edu.vn to have more details,” and lists academic-use papers. — [EVBCorpus README](https://raw.githubusercontent.com/qhungngo/EVBCorpus/master/README.md)
- PhoMT official README: 3.02M Vietnamese–English sentence pairs. Download terms: “use the dataset for research or educational purposes only”; “not distribute the dataset or part of the dataset in any original or modified form”; cite the EMNLP 2021 paper. Same terms are repeated on the Hugging Face card. — [PhoMT README](https://raw.githubusercontent.com/VinAIResearch/PhoMT/master/README.md); [vinai/PhoMT](https://huggingface.co/datasets/vinai/PhoMT)
- MTet Hugging Face dataset card YAML: `license: cc-by-nc-sa-4.0`. Licensing Information section: “Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0).” Card also lists source_datasets including `extended|open_subtitles`, `extended|tatoeba`, `extended|bible_para`. — [albertvillanova/mtet README](https://huggingface.co/datasets/albertvillanova/mtet/raw/main/README.md)
- VietAI MTet README (upstream repo) gives domain counts for v2: Fictional Books 473,306; Legal 1,134,813; Movies Subtitles 721,174; TED Talk 303,131; Wikipedia 1,094,248; Educational 213,284; total **4,163,710**. That README does **not** itself grant a commercial dataset license; the paper’s arXiv stamp is CC BY 4.0 (paper, not data). — [vietai/mTet README](https://raw.githubusercontent.com/vietai/mTet/master/README.md)
- OPUS TED2020 page: “License: Please respect the TED Talks Usage Policy.” Corpus is crawled TED/TEDx transcripts (July 2020), 108 languages. — [OPUS TED2020](https://opus.nlpl.eu/legacy/TED2020.php)
- TED Talks Usage Policy: talks are CC BY-NC-ND 4.0. NC = cannot use “in any commercial context or to gain any type of revenue… in an app of any kind… including in any ad supported content.” ND = no derivatives, including “dubbing, voice-overs, or other translations not authorized by TED.” Transcripts “may be used under the same Creative Commons license in conjunction with the TED Talk video”; “if you wanted to publish a TED Talk in a book, test, play, or any other publication, permission is required.” Commercial / corporate use (including “in-person, online or virtual course,” “Subscription-Based Educational Service,” “Corporate Education Provider”) requires a paid license / TED@Work. — [TED Talks Usage Policy](https://www.ted.com/about/our-organization/our-policies-terms/ted-talks-usage-policy)
- OPUS OpenSubtitles: data from opensubtitles.org; “If you use the OpenSubtitle corpus: Please, add a link to http://www.opensubtitles.org/”; no copyright grant from film/TV rightsholders is stated. — [OPUS OpenSubtitles](https://opus.nlpl.eu/legacy/OpenSubtitles-v2018.php)
- Wikimedia Foundation Terms of Use: users “are free to… Share and Reuse our articles and other media under free and open licenses,” and “You generally must license your contributions and edits… under a free and open license (unless your contribution is in the public domain).” — [Wikimedia Terms of Use](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use)
- English Wiktionary Copyrights: “The original texts of Wiktionary entries are dual-licensed to the public under both the Creative Commons Attribution-ShareAlike 4.0 International License (CC-BY-SA) and the GNU Free Documentation License (GFDL).” Re-use for books/sites is allowed if CC-BY-SA / GFDL (same or compatible license + attribution) is followed. External quotations may be fair-use or third-party and “copyright holders of that material retain their rights.” — [Wiktionary:Copyrights](https://en.wiktionary.org/wiki/Wiktionary:Copyrights)

### Inferences
- A source being `ATTRIBUTION_REQUIRED` for **grammar examples** does not make it a **reading passage** source. Tatoeba and TALPCo stay the right seeds for glosses / `sentence_vi`, not for lesson-length readers.
- Wikimedia article text is the only already-cleared family that is both commercially licensable (with BY-SA) and actually paragraph-length. Wiktionary is the already-cleared family for **glosses and short example sentences**, not passages; example sentences quoted from living authors may be third-party and cannot be bulk-imported as if they were CC-BY-SA.
- EVBCorpus is the only grammar-file source that is *structurally* a bilingual reader corpus (books + news). License remains `UNKNOWN`; third-party books/subtitles mean even an AGPL claim on SourceForge (noted in the grammar file, not re-verified as a GitHub LICENSE) would not clear the underlying literary copyrights.
- MTet’s HF NC-SA label is enough to keep `RESEARCH_ONLY`. The domain mix (TED + movie subtitles + fictional books) independently bars production even if someone ignored the NC clause.
- TED transcripts are the closest “long spoken-English + Vietnamese subtitle” resource in the old list, and TED’s own policy is explicit that a commercial learning app is out of scope without a paid license.

### Gaps
- Exact current Tatoeba EN–VI sentence count was not read from a dated dump on tatoeba.org/downloads in this pass.
- `en.wikipedia.org/wiki/Wikipedia:Copyrights` timed out when fetched; Wikipedia text license is inferred from Wikimedia ToU plus sister-project pages (Wiktionary / Wikivoyage) that state CC BY-SA 4.0. A later pass should archive the English Wikipedia Copyrights page itself.
- EVBCorpus GitHub still has no LICENSE file; SourceForge “Affero GNU Public License” metadata from the grammar file was not re-downloaded here.
- WikiMatrix EN–VI pair count and precision were not read from the Facebook paper tables in this pass (see question 3).

---

## Are there bilingual graded readers, children's books, or news with a clear commercial license?

### Takeaway
**VOA-exclusive text** (English Learning English and VOA Tiếng Việt) is public-domain U.S. government work and is the clearest commercial-news option, with mandatory credit and a hard ban on AP/AFP/Reuters and other third-party items. **BBC Vietnamese is personal/non-commercial only — `DO_NOT_USE`.** **StoryWeaver / Pratham Books story text is CC BY 4.0** (commercial OK with attribution); read-alongs/videos are CC BY-NC-ND and must be excluded. No official commercial bilingual **graded-reader series** (Oxford, Cambridge, Pearson, etc.) was found under an open license.

### Cited Findings

**News**

- VOA Tiếng Việt Copyright Statement: “All text, audio and video material produced **exclusively** by the Voice of America is in the public domain. Credit for any use of VOA material should be given to voanews.com, Voice of America, or VOA.” Third-party material “is not in the public domain and may not be copied, redistributed, sold, or published without the express permission of the copyright owner.” AP photos/graphics are copyrighted and may not be copied, published, or redistributed; computer storage of AP material is limited to “personal and non-commercial use.” “Voice of America” and “voanews.com” are trademarks that “may not be used for commercial purposes without express permission.” — [VOA Tiếng Việt terms / copyright](https://www.voatiengviet.com/p/3943.html)
- The same exclusive-VOA public-domain + credit + third-party exclusion language appears on VOA Learning English Terms of Use. — [VOA Learning English Terms](https://learningenglish.voanews.com/p/6021.html)
- Wikimedia Commons documents the same VOA rule and lists the Vietnamese site `https://www.voatiengviet.com` among VOA language services; compatible tag `{{PD-USGov-VOA}}`. — [Commons:Voice of America files](https://commons.wikimedia.org/wiki/Commons:Voice_of_America_files)
- BBC News Tiếng Việt Điều Khoản Sử Dụng (posted 11 October 2016): all IP in bbc.co.uk / bbcvietnamese.com content is owned by BBC or its licensors. Users “không được sao chép, tái bản, cắt xén, tải xuống, phát sóng, chuyển tải, hoặc dùng nội dung của bbcvietnamese.com bất cứ trong trường hợp nào, ngoại trừ cho mục đích cá nhân và không mang tính chất kinh doanh.” Other uses require prior written BBC permission. The page points to the English BBC terms as the full/latest version. — [BBC News Tiếng Việt Điều Khoản](https://www.bbc.com/vietnamese/institutional-37622991)
- BBC English “Can I reuse BBC content and services for my business?”: any business use (including commercial, educational, non-profit, charitable, or government uses) needs permission and may require a fee. — [BBC business reuse](https://www.bbc.co.uk/usingthebbc/terms/can-i-use-bbc-content-for-my-business/)
- BBC Global Terms of Use: “the Services and the Content are provided only for your personal, non-commercial use.” Non-commercial use “does not include the use of Content, without prior consent from us, in connection with the development, training, fine tuning, or grounding of any software program, model, algorithm, artificial intelligence system…” — [BBC Global Terms of Use](https://www.bbc.com/pages/terms-of-use)

**Children’s / graded open books**

- StoryWeaver site footer on published story pages: “The books on StoryWeaver are licensed under the Creative Commons CC BY 4.0 license. The Readalongs and videos showcased on StoryWeaver’s website and YouTube channels are licensed under the CC BY-NC-ND 4.0 license.” — [StoryWeaver example: Chơi trốn tìm](https://storyweaver.org.in/en/stories/105418-choi-tron-tim)
- Same platform hosts Vietnamese translations of English-origin stories (e.g. “Ở Nhà” = translation of Pratham Books “At Home” by Giang Nguyen) and English translations of Vietnamese-origin stories (e.g. Room to Read “Sinh nhật Bơ” → “Bon and Butter,” CC BY 4.0). — [Ở Nhà](https://storyweaver.org.in/en/stories/610875-o-nha); [Storyberries credit citing Room to Read / StoryWeaver CC BY 4.0](https://www.storyberries.com/bedtime-story-bon-and-butter-short-stories-for-kids/)
- StreetLib / StoryWeaver 2019 press release: “All the books are available under the Creative Commons CC BY 4.0 licence which means that anyone can read, download, print, reuse or build upon these books for free and anywhere in the world,” and lists Vietnamese among the languages in that catalog expansion. — [StreetLib press release](https://medium.com/streetlib/press-release-unescos-year-of-indigenous-languages-sees-streetlib-and-storyweaver-providing-3b88cd5d4076)
- A 2021 classroom write-up (secondary; not a license) reported “229 stories in Vietnamese at four different reading levels” on StoryWeaver and restated the CC BY 4.0 book license. Count is dated 2021 and was not re-audited against the live catalog in this pass. — [GUAVA / Extensive Reading with StoryWeaver](https://guavamerica.org/extensive-reading-in-the-vietnamese-language-classroom-with-storyweaver/)

**Commercial graded readers**

- No official LICENSE/README was found placing Oxford Bookworms, Cambridge Readers, Penguin Readers, or similar EN–VI bilingual graded-reader series under CC-BY / CC-BY-SA / public domain. Vietnamese Ministry textbooks that *are* graded English (Global Success, Cambridge-partnered SGK) are publisher-owned, not open (see last question).

### Inferences
- **VOA exclusive text = `ATTRIBUTION_REQUIRED` in EnglishFlow codes** (public domain, but official terms still require credit; trademarks are restricted). Operationally treat as: ship VOA-written text + audio you have verified as exclusive VOA; strip AP/AFP/Reuters/other credits; do not use VOA branding as a product mark.
- VOA Learning English (graded English) and VOA Tiếng Việt (Vietnamese news) are **two separate services**. Official terms do not grant a ready-made aligned EN–VI parallel news corpus. Pairing is a product-engineering task (same event / same story ID), not a license grant of bitext.
- **BBC Vietnamese = `DO_NOT_USE`** for a commercial self-hosted app.
- **StoryWeaver book text/illustrations under CC BY 4.0 = `ATTRIBUTION_REQUIRED`.** This is the strongest find for **children’s bilingual readers**. Exclude read-alongs/videos (`RESEARCH_ONLY` / NC-ND). Per-story attribution (author, illustrator, translator, original title) is required; some stories originate from Room to Read, Asia Foundation, Pratham — still under the platform CC BY 4.0 statement on those pages.
- There is still **no** production-cleared EN–VI **adult graded reader** series equivalent to a commercial ELT publisher list.

### Gaps
- StoryWeaver `/open_content` page timed out; license is taken from official story-page footer + third-party restatements. A later pass should archive https://storyweaver.org.in/en/open_content and Terms.
- Live count of Vietnamese and true EN–VI *paired* StoryWeaver titles (same story ID, both languages) was not scraped.
- Whether a given VOA Tiếng Việt article is exclusive VOA vs. agency rewrite must be checked **per article**; no bulk whitelist was found.
- African Storybook, Bloom Library, Global Voices, and Wikibooks EN–VI were not license-verified in this pass (do not treat as cleared).

---

## Wikivoyage, Simple English Wikipedia + Vietnamese Wikipedia alignment — license and quality?

### Takeaway
**Wikivoyage text is CC BY-SA 4.0** (`ATTRIBUTION_REQUIRED` + ShareAlike) and is the best Wikimedia source for **travel-length, learner-friendly passages**. Simple English Wikipedia and Vietnamese Wikipedia are also free-licensed Wikimedia text, but they are **independently written encyclopedias**, not a translation pair. WikiMatrix supplies **mined sentence pairs** (CC BY-SA), not aligned articles; quality is “mined bitext,” not a graded bilingual reader.

### Cited Findings
- English Wikivoyage Copyleft policy: “All written contributions to this project are automatically licensed under the CC BY-SA 4.0 License.” “All redistributed and derivative works of Wikivoyage text must also be licensed as CC-BY-SA 4.0.” Images have **per-file** licenses. — [Wikivoyage:Copyleft / CC-by-sa](https://en.wikivoyage.org/wiki/Wikivoyage:CC-by-sa); also [Wikivoyage:Copyrights](https://en.wikivoyage.org/wiki/Wikivoyage:Copyrights)
- Wikivoyage reuse guide: re-users must include the licence (text = CC-BY-SA 4.0), attribute authors, notify users of the licence, and release modifications under the same or a compatible free license. Image licences vary; linking the article or each file description page is the stated way to satisfy image attribution. — [Wikivoyage:How to re-use Wikivoyage guides](https://en.wikivoyage.org/wiki/Wikivoyage:How_to_re-use_Wikivoyage_guides)
- CC BY-SA 4.0 deed: commercial use is allowed; attribution + ShareAlike + no extra legal/technical restrictions that block license rights. — [CC BY-SA 4.0 deed](https://creativecommons.org/licenses/by-sa/4.0/deed.en)
- Simple English Wikipedia Copyrights policy (page itself warns it is a simplified/local policy): article text is described as copyrighted by contributors and licensed under the **GFDL**. It also says the Wikimedia Foundation does not own the copyright and that permission to reproduce under the applicable license “has already been granted to everyone.” The page is **not** the current multi-project CC BY-SA 4.0 statement used by English Wikipedia / Wiktionary / Wikivoyage. — [simple.wikipedia.org Wikipedia:Copyrights](https://simple.wikipedia.org/wiki/Wikipedia:Copyrights)
- Wikimedia Foundation Terms of Use (covers all Projects, including Wikipedia language editions): reuse under free and open licenses; contributions must be freely licensed or public domain. — [Wikimedia Terms of Use](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use)
- WikiMatrix (Facebook Research, hosted on OPUS): “Parallel corpora from Wikimedia compiled by Facebook Research.” “The data is released under the Creative Commons Attribution-ShareAlike” license. OPUS also uses its standard caveat: “We do not own any of the text… We only offer files that we believe we are free to redistribute.” — [OPUS WikiMatrix](https://opus.nlpl.eu/legacy/WikiMatrix.php)
- Facebook LASER WikiMatrix README (quoted via indexers): “The mined data is distributed under the Creative Commons Attribution-ShareAlike license.” Method: mine parallel **sentences** from Wikipedia textual content across language pairs (paper: 135M pairs / 1620 pairs). — [LASER WikiMatrix README](https://github.com/facebookresearch/LASER/blob/main/tasks/WikiMatrix/README.md); paper citation on [OPUS WikiMatrix](https://opus.nlpl.eu/legacy/WikiMatrix.php)
- A third-party Hugging Face mirror (`ngoan/WikiMatrix.en-vi`) restates “Creative Commons Attribution-ShareAlike License” but is not the upstream LICENSE file. SEACrowd’s card labels WikiMatrix `cc-by-sa-4.0`. — [ngoan/WikiMatrix.en-vi](https://huggingface.co/datasets/ngoan/WikiMatrix.en-vi); [SEACrowd/wikimatrix](https://huggingface.co/datasets/SEACrowd/wikimatrix)

### Inferences
- **Wikivoyage EN (and VI, if used) = `ATTRIBUTION_REQUIRED`.** Articles are already “reading passages” (destination guides). EN and VI editions are **community-written in each language**, not official translations of each other. Product use should treat them as **comparable texts** (same place name / interlanguage link), then human-review, not as a gold parallel reader.
- **Simple English Wikipedia** is pedagogically attractive (controlled vocabulary) and is a Wikimedia Project under the Foundation ToU. Because its local Copyrights page is GFDL-centric and outdated relative to sister projects, production should follow the **current Wikimedia project license banner on each page** (typically CC BY-SA 4.0 + GFDL) and keep ShareAlike on any adapted reader.
- **Vietnamese Wikipedia** is a full encyclopedia, not a translation of Simple English Wikipedia. Interlanguage links connect topics, not sentences. Shipping “Simple EN article + vi.wikipedia article on the same topic” is **topic-aligned comparable text**, often different structure, length, and facts.
- **WikiMatrix EN–VI = `ATTRIBUTION_REQUIRED` (CC BY-SA)** for the mined **sentences**, inheriting Wikipedia’s copyleft. It is **not** a passage-aligned bilingual reader. Mining noise (near-parallels, wrong alignments) is inherent to the method described by the authors (“mining”). Do not dump WikiMatrix into learner-facing passages without human review.
- ShareAlike is the operational constraint: a Wikivoyage- or Wikipedia-derived bilingual reader that “transforms” the text likely must be released CC BY-SA 4.0. That is compatible with a self-hosted commercial app **displaying** the text, but it restricts keeping adapted passage text as proprietary EnglishFlow-only content.

### Gaps
- Vietnamese Wikivoyage (`vi.wikivoyage.org`) article count and overlap with English Wikivoyage were not measured.
- Simple English Wikipedia ↔ Vietnamese Wikipedia interlanguage-link coverage and length/readability stats were not measured.
- Official WikiMatrix EN–VI sentence count and precision-at-threshold were not read from the 2019 paper tables.
- English Wikipedia Copyrights page fetch timed out; confirm CC BY-SA 4.0 + GFDL dual-license on a live en.wikipedia article footer before shipping.

---

## Can we legally machine-translate public-domain English passages into Vietnamese and ship that as original?

### Takeaway
You may **translate and ship** a Vietnamese version of a **public-domain** English work without permission from the (expired) English copyright. You may **not** honestly label unedited machine output as EnglishFlow “original copyrighted content.” U.S. Copyright Office practice: a translation of a PD work is a copyrightable derivative **only with human authorship**; a translation “performed by a machine without human intervention cannot be registered.” Vietnamese law likewise requires the author’s **own intellectual labor** and treats translation as a **derivative work**.

### Cited Findings
- U.S. Copyright Office Circular 14: translations are a listed type of derivative work. “The copyright in a derivative work covers only the additions, changes, or other new material appearing for the first time in the work” and “does not extend to… works in the public domain.” Using PD material in a derivative “will not prevent anyone else from using the same public domain work for another derivative work.” — [Circular 14](https://copyright.gov/circs/circ14.pdf)
- U.S. Copyright Office Compendium Chapter 700 §709.1: “A translation is a rendering of a nondramatic literary work from one language into another.” A translation may be registered if it contains “a sufficient amount of original expression.” The same section states that a translation “that is performed by a machine without human intervention cannot be registered as a derivative work.” — [Compendium ch. 700](https://www.copyright.gov/comp3/chap700/ch700-literary-works.pdf)
- 17 U.S.C. § 103(b) (quoted in Compendium ch. 500): copyright in a derivative is “independent of, and does not affect or enlarge the scope, duration, ownership, or subsistence of, any copyright protection in the preexisting material.” — [Compendium ch. 500](https://copyright.gov/comp3/chap500/ch500-identifying-works.pdf)
- U.S. Copyright Office 16 March 2023 AI Registration Guidance (37 CFR Part 202): human authors may claim only their own contributions; “AI-generated content that is more than de minimis should be explicitly excluded” from the claim. — [AI Registration Guidance](https://www.copyright.gov/ai/ai_policy_guidance.pdf)
- Copyright Office 28 June 2023 webinar: if an author “uses AI to translate that book into English, register the human authored [original-language] version rather than the AI translated English version”; “The English translation, however, cannot be registered because it was performed by AI.” — [AI application-process webinar transcript](https://copyright.gov/events/ai-application-process/Registration-of-Works-with-AI-Transcript.pdf)
- Copyright Office *Copyright and Artificial Intelligence, Part 2: Copyrightability* (29 January 2025) reiterates human authorship as essential; more than de minimis AI-generated material must be disclosed; the Office did not create sui generis protection for AI-generated content. — [Part 2 Copyrightability Report](https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf)
- Luật Sở hữu trí tuệ (consolidated 155/VBHN-VPQH 2025): Điều 4(8) — “Tác phẩm phái sinh là tác phẩm được sáng tạo trên cơ sở một hoặc nhiều tác phẩm đã có thông qua việc **dịch từ ngôn ngữ này sang ngôn ngữ khác**…” Điều 14(2) — a derivative is protected only if it does not harm the copyright in the underlying work. Điều 14(3) — protected works “phải do tác giả **trực tiếp sáng tạo bằng lao động trí tuệ của mình** mà không sao chép từ tác phẩm của người khác.” — [155/VBHN-VPQH 2025](https://thuvienphapluat.vn/van-ban/So-huu-tri-tue/Van-ban-hop-nhat-155-VBHN-VPQH-2025-Luat-So-huu-tri-tue-672556.aspx); [Điều 14 text](https://hethongphapluat.com/van-ban-hop-nhat-155-vbhn-vpqh-nam-2025-hop-nhat-luat-so-huu-tri-tue-do-van-phong-quoc-hoi-ban-hanh/dieu-14)
- Luật số 07/2022/QH15 restates the same definition of tác phẩm phái sinh (translation = derivative). — [Wikisource Luật 07/2022/QH15](https://vi.wikisource.org/wiki/Lu%E1%BA%ADt_s%E1%BB%91_07/2022/QH15)

### Inferences
- **Permission to create the Vietnamese text:** if the English source is truly public domain (e.g. pre-1929 U.S. literature; exclusive VOA text; CC0 / expired copyright), no license is needed from the English author to make a Vietnamese translation. That answers the “can we legally MT it” half: **yes, no infringement of the English copyright.**
- **Shipping it:** lawful to display the PD English + your Vietnamese rendering in a commercial app.
- **Shipping it “as original”:**  
  - The **English PD text** is not EnglishFlow original and must not be claimed as such.  
  - A **human** translation (or a human-edited translation with substantial expressive revision) can be EnglishFlow-owned `PRODUCTION_ALLOWED` **as to the new Vietnamese expression only**.  
  - **Unedited MT / AI translation** is, on current U.S. Office practice, **not copyrightable**. Vietnamese Điều 14(3) (“trực tiếp sáng tạo bằng lao động trí tuệ”) points the same way. You can still ship it (nobody owns the English; you are not stealing a third-party Vietnamese translation), but you should **not** register it as an original literary work or treat it as exclusive IP. Others may copy the raw MT.
- **Do not MT copyrighted English** (news, modern graded readers, TED, film dialogue) and ship the output. Circular 14 and Vietnamese Điều 14(2)/Điều 20 require the underlying rightsholder’s permission for a derivative.
- Practical production pattern consistent with both legal systems: choose PD or VOA-exclusive English → human translate or MT + **documented human revision** → store provenance (`public_domain` EN + `PRODUCTION_ALLOWED` human VI, or `UNKNOWN` if raw MT) → never claim the English as original.

### Gaps
- This is not legal advice; no Vietnamese court decision on “AI translation = no tác giả” was located.
- Project Gutenberg / Standard Ebooks Vietnamese translations were not inventoried. Existing published Vietnamese translations of PD English novels are typically **still in copyright** as derivatives even when the English is PD — those published translations must not be copied.
- Whether a light human post-edit of MT is “sufficient original expression” is case-by-case (Compendium + 2025 report); no bright-line word-change percentage exists in the official documents read.

---

## Any Vietnamese government / open-education English reading materials?

### Takeaway
**No official Bộ GDĐT English reading corpus with a commercial-open LICENSE was found.** National textbooks (including Tiếng Anh Global Success / “Kết nối tri thức”) are publisher-owned; free school PDFs are not a commercial-reuse license. The Ministry has used **CC BY / CC BY-SA only for a 2016 e-learning contest**, not for SGK. Cánh Buồm / VOER open textbooks are **Tiếng Việt / Văn**, not EN–VI readers, and were only seen via secondary pages in this pass.

### Cited Findings
- Công văn on the 2026–2027 national textbook list (implementing Quyết định 3588/QĐ-BGDĐT 26/12/2025): the unified set “Kết nối tri thức với cuộc sống” includes **“Tiếng Anh Global Success”** among many subjects. NXB Giáo dục Việt Nam posts **updated PDFs at `http://taphuan.nxbgd.vn`** that “các đơn vị, trường học, giáo viên, học sinh có thể truy cập và tải về miễn phí để sử dụng.” The document is about school supply and reuse of already-printed books, not a Creative Commons grant to third-party apps. — [Công văn / danh mục SGK 2026–2027 (repost)](https://levantamnt.edu.vn/laws/detail/Cong-van-ve-viec-gioi-thieu-danh-muc-va-to-chuc-thuc-hien-sach-giao-khoa-giao-duc-pho-thong-su-dung-thong-nhat-toan-quoc-tu-nam-hoc-2026-2027-349/?download=1&id=0)
- Dân trí interview with Bộ GDĐT (January 2026): “Kết nối tri thức với cuộc sống” of NXB Giáo dục Việt Nam was chosen as the nationwide unified textbook set under the new law. No open-license statement. — [Dân trí](https://dantri.com.vn/thoi-su/bo-giao-duc-noi-ve-viec-chon-ket-noi-tri-thuc-voi-cuoc-song-lam-sgk-chung-20260107104645262.htm)
- VnExpress: Cambridge University Press partners on Vietnamese English textbooks aligned to the 2018 general-education program — commercial publishing, not an open corpus. — [VnExpress](https://vnexpress.net/nxb-dh-cambridge-bien-soan-sach-giao-khoa-tieng-anh-tai-viet-nam-4435635.html)
- Quyết định số 1878/QĐ-BGDĐT (02/06/2016) thể lệ cuộc thi thiết kế bài giảng e-Learning lần 4 required contest entries to be **CC BY 4.0 or CC BY-SA 4.0** in order to build OER. That is a **contest rule for submitted lesson designs**, not a license on national English textbooks. — [Commentary quoting QĐ 1878/QĐ-BGDĐT](https://letrungnghia.mangvn.org/Education/hieu-cho-dung-quy-dinh-giay-phep-creative-commons-trong-quyet-dinh-so-1878-qd-bgddt-ngay-02-06-2016-ve-viec-ban-hanh-the-le-cuoc-thi-quoc-gia-thiet-ke-bai-giang-e-learning-lan-thu-4-cua-bo-giao-duc-va-dao-tao-5544.html)
- A how-to wiki describes Cánh Buồm textbooks on VOER as Creative Commons Attribution 3.0 (“trừ khi ghi chú rõ ngoại lệ”) and lists **Tiếng Việt and Văn** (grades 6–9), not English. This is a secondary page, not VOER’s own LICENSE fetch. — [how.com.vn / Cánh Buồm](https://www.how.com.vn/todo/vi/T%C3%ACm-s%C3%A1ch-gi%C3%A1o-khoa-%C4%91%C6%B0%E1%BB%A3c-c%E1%BA%A5p-ph%C3%A9p-m%E1%BB%9F-ti%E1%BA%BFng-Vi%E1%BB%87t-c%E1%BB%A7a-Nh%C3%B3m-C%C3%A1nh-Bu%E1%BB%93m)

### Inferences
- **National English SGK = `DO_NOT_USE` (or `UNKNOWN` until NXBGD/Cambridge grants a license).** “Tải miễn phí để sử dụng” in a ministry công văn aimed at schools is not a sublicense to seed a commercial app.
- **2016 e-learning contest OER = possible `ATTRIBUTION_REQUIRED` only for those specific CC-licensed entries**, if they can still be found with intact license notices. They are lesson designs, not a bilingual reading library.
- **Cánh Buồm / VOER = not an EN–VI reading source** even if CC BY 3.0 is confirmed later; content is Vietnamese-language mother-tongue textbooks.
- For EnglishFlow reading, government/OER does **not** currently replace VOA + Wikimedia + StoryWeaver + human-translated PD English.

### Gaps
- The original PDF of Quyết định 3588/QĐ-BGDĐT and the NXBGD terms-of-use on `taphuan.nxbgd.vn` were not fetched; classification relies on the công văn reprint and news.
- VOER (`voer.edu.vn` or current host) LICENSE footer was not fetched; Cánh Buồm remains `UNKNOWN` until that official page is archived.
- No official catalog of CC-licensed Bộ GDĐT English *reading passages* (as opposed to contest slides) was found. “I found no official open-license EN–VI government reader corpus” is the accurate negative result.

---

## Production shortlist (reading support only)

Codes below follow the grammar-file operational meanings. **Do not use PhoMT / MTet / TED NC in production** (constraint confirmed by official terms above).

| Priority | Source | Code | What to use it for |
| --- | --- | --- | --- |
| 1 | Human-written or human-revised VI of **public-domain English** (Gutenberg-era texts, etc.) | EN: PD / `PRODUCTION_ALLOWED` provenance; VI: `PRODUCTION_ALLOWED` only if human-authored | Core graded passages you control |
| 2 | **VOA-exclusive** Learning English + (separately) VOA Tiếng Việt text/audio | `ATTRIBUTION_REQUIRED` (credit VOA; no trademark; strip agencies) | News-style / graded news reading |
| 3 | **StoryWeaver** book text (not videos) with per-story CC BY 4.0 | `ATTRIBUTION_REQUIRED` | Children’s / beginner bilingual readers |
| 4 | **Wikivoyage** EN (+ optional VI comparable article) | `ATTRIBUTION_REQUIRED` + ShareAlike | Travel passages; SA applies to adaptations |
| 5 | **Simple English Wikipedia** / **Vietnamese Wikipedia** article text; **WikiMatrix** only as gloss candidates | `ATTRIBUTION_REQUIRED` + ShareAlike | Background reading / mined sentence glosses after review |
| 6 | **Tatoeba text** / **TALPCo** | `ATTRIBUTION_REQUIRED` | Word/sentence glosses under a passage — not the passage itself |
| — | BBC Vietnamese; PhoMT; MTet; TED2020; OpenSubtitles; EVBCorpus (until written license); official SGK Global Success | `DO_NOT_USE` / `RESEARCH_ONLY` / `UNKNOWN` | Not for production reading |
