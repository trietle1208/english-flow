# Free reading-comprehension / QA datasets — license inventory (EnglishFlow)

Findings dated **September 2026**. Taxonomy matches [grammar-dataset-license-research.md](../../docs/research/grammar-dataset-license-research.md): `PRODUCTION_ALLOWED` (commercial, no attribution), `ATTRIBUTION_REQUIRED` (commercial if cite / CC-BY / Apache notice / ShareAlike), `RESEARCH_ONLY` (NC / research-educational / no commercial), `UNKNOWN` (no official LICENSE readable, or conflict), `DO_NOT_USE` (explicit commercial ban **or** exam/news copyright risk too high). Official GitHub LICENSE / project page / HF card hosted by the dataset owner only. Aggregator cards (Kaggle “CC0”, unofficial HF mirrors) are ignored when they contradict the official page.

---

## Which datasets allow commercial reuse of BOTH passages and questions?

### Takeaway
No surveyed MRC/QA dataset is `PRODUCTION_ALLOWED` (zero-attribution). A small Wikipedia- or Gutenberg-backed cluster is `ATTRIBUTION_REQUIRED` for **both** passage text and questions: SQuAD 1.1/2.0, XQuAD, BoolQ, Belebele **eval** (not its assembled train set), HotpotQA, TyDi QA, Natural Questions, and FairytaleQA. Everything exam- or news-derived fails this test.

### Cited Findings
- SQuAD official explorer states the download is “distributed under the CC BY-SA 4.0 license”; SQuAD 2.0 is 100k SQuAD 1.1 questions plus 50k+ unanswerable questions on Wikipedia articles. — [SQuAD explorer](https://rajpurkar.github.io/SQuAD-explorer/)
- The SQuAD 2.0 paper: “As with previous versions of SQuAD, we release SQuAD 2.0 under the CC BY-SA 4.0 license.” — [Rajpurkar et al. 2018 PDF](https://nlp.stanford.edu/pubs/rajpurkar2018squad.pdf); [arXiv 1806.03822](https://doi.org/10.48550/arxiv.1806.03822)
- Official HF cards for `rajpurkar/squad` and `rajpurkar/squad_v2` both set `license: cc-by-sa-4.0` and repeat “The dataset is distributed under the CC BY-SA 4.0 license.” SQuAD 1.1 is 100,000+ pairs on 500+ articles. — [rajpurkar/squad README](https://huggingface.co/datasets/rajpurkar/squad/blob/main/README.md); [rajpurkar/squad_v2 README](https://huggingface.co/datasets/rajpurkar/squad_v2/blob/main/README.md)
- XQuAD official README: 240 paragraphs + 1,190 QA pairs from SQuAD v1.1 **plus** professional translations (including Vietnamese); “This dataset is distributed under the CC BY-SA 4.0 license.” — [google-deepmind/xquad README](https://raw.githubusercontent.com/google-deepmind/xquad/master/README.md)
- BoolQ official README: 15,942 yes/no examples; “BoolQ is released under the Creative Commons Share-Alike 3.0 license” linking CC BY-SA 3.0; passages are Wikipedia (example title “Time in France”). Train 9,427 / dev 3,270 / unlabeled test 3,245. — [google-research-datasets/boolean-questions README](https://raw.githubusercontent.com/google-research-datasets/boolean-questions/master/README.md)
- Official HF `google/boolq` card: `license: cc-by-sa-3.0`; same license sentence. — [google/boolq README](https://huggingface.co/datasets/google/boolq/blob/main/README.md)
- Belebele official README: 900 four-way MCQs × 122 language variants (109,800 total) on 488 FLORES-200 passages; “The Belebele dataset is licensed under the license found in the LICENSE_CC-BY-SA4.0 file”; **eval-only** — “intended to be used only as a test set, and not for training or validation.” Assembled English train set is “67.5k training samples and 3.7k development samples, more than half of which are from RACE” and “governed by a different license.” — [facebookresearch/belebele README](https://raw.githubusercontent.com/facebookresearch/belebele/main/README.md)
- FLORES-200 (Belebele passage source) is documented on HF as Creative Commons Attribution Share Alike 4.0. — [Muennighoff/flores200 card](https://huggingface.co/datasets/Muennighoff/flores200)
- HotpotQA official homepage: “HotpotQA is distributed under a CC BY-SA 4.0 License”; processed Wikipedia corpus also CC BY-SA 4.0. GitHub: “The HotpotQA dataset is distribued under the CC BY-SA 4.0 license. The code is distribued under the Apache 2.0 license.” — [hotpotqa.github.io](https://hotpotqa.github.io/); [hotpotqa/hotpot](https://github.com/hotpotqa/hotpot)
- TyDi QA official GitHub repo license is Apache License 2.0; 204K QA pairs in 11 languages from Wikipedia snapshots; GoldP task is SQuAD-style extractive MRC on a gold passage. English exists but leaderboard averages **exclude** English. — [google-research-datasets/tydiqa](https://github.com/google-research-datasets/tydiqa); [tydiqa README](https://raw.githubusercontent.com/google-research-datasets/tydiqa/master/README.md)
- Natural Questions official LICENSE file is Apache License 2.0. — [google-research-datasets/natural-questions LICENSE](https://github.com/google-research-datasets/natural-questions/blob/master/LICENSE)
- FairytaleQA official repo: GitHub license Apache-2.0; “278 children's stories from Project Gutenberg” + expert QA; 10,580 questions; HF split sizes train 8,548 / val 1,025 / test 1,007. — [uci-soe/FairytaleQAData](https://github.com/uci-soe/fairytaleqadata); [FairytaleQAData README](https://raw.githubusercontent.com/uci-soe/FairytaleQAData/main/README.md)
- NarrativeQA official repo LICENSE is Apache 2.0; README: repo contains “list of documents with Wikipedia summaries, links to full stories, and questions and answers” — full story files are **not** shipped, only `download_stories.sh` + size check. — [google-deepmind/narrativeqa LICENSE](https://github.com/google-deepmind/narrativeqa/blob/master/LICENSE); [narrativeqa README](https://raw.githubusercontent.com/google-deepmind/narrativeqa/master/README.md)
- CoQA official page licenses **by domain**: “Literature and Wikipedia passages are shared under CC BY-SA 4.0”; children’s stories = MCTest MSR-LA; exam passages = RACE license; news = DeepMind CNN “Apache.” 127,000+ questions / 8,000+ conversations. — [stanfordnlp.github.io/coqa](https://stanfordnlp.github.io/coqa/)
- RACE official page forbids commercial use of “any portion of the contexts and any portion of derived data”; passages from Chinese English exams. — [CMU RACE page](https://www.cs.cmu.edu/~glai1/data/race/)
- ReClor official page: “available for non-commercial research purpose use only”; “extracted from logical reasoning questions of standardized graduate admission examinations”; unzip password `for_non-commercial_research_purpose_only`. — [whyu.me/reclor](https://whyu.me/reclor/)
- SciQ official AllenAI HF card: “The dataset is licensed under the Creative Commons Attribution-NonCommercial 3.0 Unported License.” Support text in the card itself includes CK-12 lines marked “CC BY-NC 3.0.” — [allenai/sciq](https://huggingface.co/datasets/allenai/sciq)

### Inferences
- For EnglishFlow seed of **passage + question + answer** in a commercial app, the only clean “both sides” candidates are Wikipedia-backed CC BY-SA / Apache sets (SQuAD, SQuAD 2.0, XQuAD, BoolQ, HotpotQA, TyDi QA GoldP English, Natural Questions long/short answers) plus Belebele **English eval** (FLORES + CC BY-SA 4.0) and FairytaleQA (Gutenberg + Apache-2.0). All of these are `ATTRIBUTION_REQUIRED`, not `PRODUCTION_ALLOWED`. ShareAlike (CC BY-SA 3.0/4.0) additionally requires that a **derivative** of the licensed material stay under SA — relevant if EnglishFlow adapts or translates the items.
- CoQA is **not** a single-license dataset: only Literature + Wikipedia subsets meet “both sides commercial.” RACE and MCTest slices do not.
- NarrativeQA Apache grant covers **questions, answers, Wikipedia summaries, and URLs**, not the copyrighted novels/scripts the download script fetches. Full-story passages are not commercially redistributable from this repo.
- Belebele’s assembled train set (RACE/SciQ/MultiRC/MCTest/MCScript/ReClor) is **not** commercially usable even though the eval set is CC BY-SA 4.0.
- No official LICENSE in this survey grants commercial reuse **without** attribution (no CC0 / public-domain dedication on an owner-hosted MRC card). Kaggle SuperGLUE “CC0” is an aggregator label and contradicts official MultiRC / BoolQ texts.

### Gaps
- QuAC (`quac.ai`) and DROP (`allenai.org/data/drop`) were not fetched as official pages this pass; EleutherAI’s license catalog claims QuAC CC BY-SA 4.0 and DROP “CC BY” — treat as `UNKNOWN` until those pages are read.
- CosmosQA has **no** LICENSE file found on the owner repo; HF `allenai/cosmos_qa` says “As reported via email by Yejin Choi, the dataset is licensed under CC BY 4.0.” Per EnglishFlow rule (missing LICENSE → `UNKNOWN`).
- TriviaQA LICENSE is Apache 2.0 for the repo, but evidence documents are web crawl / Wikipedia; whether **evidence passages** are redistributable was not verified in an official data card this pass (`UNKNOWN` for passage redistribution; questions likely Apache).
- Project Gutenberg public-domain status is US-centric; FairytaleQA README does not list per-story Gutenberg license IDs, so a production import still needs a per-title PD check.
- CC BY-SA ShareAlike product implications (does embedding an item in a SaaS lesson make the lesson a “Adapted Material”?) is a legal question, not answered by the dataset pages.

---

## Which are research-only even if on Hugging Face (RACE, NewsQA, ReClor, DREAM, etc.)?

### Takeaway
Hugging Face hosting is not a license. RACE, ReClor, DREAM, MultiRC, and SciQ are explicitly non-commercial on **owner** pages. NewsQA’s MIT file covers **code only**; CNN keeps article copyright and the compiled dataset is not redistributed. Exam-derived sets (RACE, ReClor, CoQA-RACE slice, Belebele train) are `RESEARCH_ONLY` or `DO_NOT_USE`.

### Cited Findings
- **RACE** official CMU page: “available for non-commercial research purpose only”; “All passages are obtained from the Internet which is not property of Carnegie Mellon University”; “You agree not to reproduce, duplicate, copy, sell, trade, resell or exploit for any commercial purpose, any portion of the contexts and any portion of derived data”; access may be terminated. Size: “more than 28,000 passages and nearly 100,000 questions” from Chinese middle- and high-school English exams; 4-option MCQ. — [www.cs.cmu.edu/~glai1/data/race](https://www.cs.cmu.edu/~glai1/data/race/)
- Official HF `ehovy/race` “Licensing Information” copies those four CMU clauses verbatim. — [ehovy/race README](https://huggingface.co/datasets/ehovy/race/blob/main/README.md)
- ACL paper: RACE is “English exams for middle and high school Chinese students” ages 12–18; “near 28,000 passages and near 100,000 questions generated by human experts (English instructors).” — [Lai et al. EMNLP 2017](https://aclanthology.org/D17-1082/)
- **ReClor** official site Use Items: (1) “non-commercial research purpose use only”; (2) passages from websites/books not owned by NUS; (3) options shuffled and one wrong option deleted “to comply with fair use of law”; (4) no commercial exploit of “any portion of the contexts and any portion of derived data”; (5) access may be terminated. Content: “logical reasoning questions of standardized graduate admission examinations.” GitHub unzip password is literally `for_non-commercial_research_purpose_only`. — [whyu.me/reclor](https://whyu.me/reclor/); [yuweihao/reclor README](https://github.com/yuweihao/reclor/blob/master/README.md)
- **DREAM** official `license.txt` (entire file): “DREAM dataset is intended for non-commercial research purpose only.” Repo also lists `websites.txt` for collection sources. — [nlpdata/dream license.txt](https://raw.githubusercontent.com/nlpdata/dream/master/license.txt)
- **NewsQA** official repo: “the dataset cannot be made directly available due to legal reasons”; users must download CNN stories separately; “CNN articles are used here by permission from The Cable News Network (CNN). CNN does not waive any rights of ownership in its articles and materials.” `LICENSE.txt` header is “NewsQA **Code**” + MIT. GitHub license metadata: Other (NOASSERTION). MSR page: 120K Q&A on CNN articles from the DeepMind Q&A Dataset. — [Maluuba/newsqa](https://github.com/Maluuba/newsqa); [LICENSE.txt](https://raw.githubusercontent.com/Maluuba/newsqa/master/LICENSE.txt); [Microsoft NewsQA project](https://www.microsoft.com/en-us/research/project/newsqa-dataset/)
- Official HF `Maluuba/newsqa` “Licensing Information” pastes that same **code** MIT text (`license: mit` in YAML). It does **not** license CNN text. — [Maluuba/newsqa README](https://huggingface.co/datasets/Maluuba/newsqa/blob/main/README.md)
- **MultiRC** official LICENSE: “Research and Academic Use License” (UIUC Cognitive Computation Group). Grant is “academic and research purposes” only. “No license is granted herein that would permit Licensee to incorporate the Software into a commercial product.” Commercial use requires UIUC Office of Technology Management. HF `CogComp/eraser_multi_rc` reprints this and points to the GitHub LICENSE. — [CogComp/multirc LICENSE](https://github.com/CogComp/multirc/blob/master/LICENSE); [CogComp/eraser_multi_rc](https://huggingface.co/datasets/CogComp/eraser_multi_rc)
- SuperGLUE’s own card does **not** re-license constituents: “We refer users to the original licenses accompanying each dataset, but it is our understanding that these licenses allow for their use and redistribution in a **research** context.” — [aps/super_glue](https://huggingface.co/datasets/aps/super_glue)
- **SciQ** AllenAI card: CC BY-NC 3.0 Unported. — [allenai/sciq](https://huggingface.co/datasets/allenai/sciq)
- **Belebele train assembly** official README lists RACE, SciQ, MultiRC, MCTest, MCScript 2.0, ReClor; “majority of the training set (data and code) is licensed under CC-BY-NC.” — [facebookresearch/belebele README](https://raw.githubusercontent.com/facebookresearch/belebele/main/README.md)
- **CoQA** official page assigns the exam domain to “RACE which comes with its own license.” — [stanfordnlp.github.io/coqa](https://stanfordnlp.github.io/coqa/)
- A Kaggle SuperGLUE dump labels MultiRC as CC0 1.0; that contradicts the UIUC Research and Academic Use License. — [Kaggle SuperGLUE dump](https://www.kaggle.com/datasets/thedevastator/task-oriented-natural-language-understanding-dat)
- A Kaggle ReClor copy labels CC BY-NC-ND 4.0; that is **not** the official NUS Use Items page (which is a custom research-only terms list, not a CC instrument). — [Kaggle ReClor](https://www.kaggle.com/datasets/gariscat/reclor)

### Inferences
- Classification for commercial EnglishFlow seed:
  - **RACE**: `DO_NOT_USE` (research-only **and** copyrighted exam passages).
  - **ReClor**: `DO_NOT_USE` (research-only **and** graduate-admission exam items; authors already treat “fair use” as a constraint they try to satisfy by shuffling/deleting options).
  - **DREAM**: `RESEARCH_ONLY` (one-sentence official license; dialogues collected from listed websites — third-party copyright not cleared for production).
  - **NewsQA**: `DO_NOT_USE` for passages; questions file has **no** data license in `LICENSE.txt`.
  - **MultiRC**: `RESEARCH_ONLY` (UIUC; commercial only via OTM negotiation).
  - **SciQ**: `RESEARCH_ONLY` (CC BY-NC 3.0; support text includes other NC material).
  - **Belebele train / CoQA-RACE / CoQA-MCTest**: inherit source licenses → `RESEARCH_ONLY` / `DO_NOT_USE`.
- Presence on Hugging Face (even with a `license:` YAML tag) does not override owner terms. NewsQA’s HF `mit` tag is a **code** license mis-applied to the dataset card.

### Gaps
- MCTest official MSR-LA text was not fetched; CoQA only names “MSR-LA license.” Treat MCTest as `UNKNOWN` pending that agreement (historically non-commercial).
- MCScript 2.0 official LICENSE was not fetched (`UNKNOWN`).
- DREAM `websites.txt` was not fetched, so the exact dialogue sites (likely learner-exam / listening sites) are not enumerated here.
- LogiQA / Gaokao-style sets mentioned in general MRC literature were not license-audited this pass; default `DO_NOT_USE` until an official LICENSE is read.

---

## SQuAD, SQuAD 2.0, BoolQ, MultiRC, CosmosQA, SciQ, FairytaleQA, NarrativeQA, Belebele, XQuAD, TyDi QA — exact licenses?

### Takeaway
Owner-hosted licenses are: SQuAD 1.1 + 2.0 and XQuAD = **CC BY-SA 4.0**; BoolQ = **CC BY-SA 3.0**; MultiRC = **UIUC Research and Academic Use (no commercial)**; SciQ = **CC BY-NC 3.0**; FairytaleQA and TyDi QA and NarrativeQA (repo contents) = **Apache 2.0**; Belebele eval = **CC BY-SA 4.0** (train assembly = mixed NC / source licenses); CosmosQA = **no LICENSE file** (`UNKNOWN`; HF email report only).

### Cited Findings

#### Per-dataset inventory (official license location, commercial, attribution, passage redistributability, CEFR, types, size, code)

- **SQuAD 1.1** — Official URL: [rajpurkar.github.io/SQuAD-explorer](https://rajpurkar.github.io/SQuAD-explorer/); data also [github.com/rajpurkar/SQuAD-explorer](https://github.com/rajpurkar/SQuAD-explorer). License location: explorer download line + HF `rajpurkar/squad`. License: **CC BY-SA 4.0**. Commercial: yes with BY + SA. Attribution: yes. Passages redistributable: **yes** (Wikipedia + dataset SA). CEFR: no. Types: extractive span. Size: 100,000+ pairs / 500+ articles. **`ATTRIBUTION_REQUIRED`**. — [SQuAD explorer](https://rajpurkar.github.io/SQuAD-explorer/); [HF squad](https://huggingface.co/datasets/rajpurkar/squad/blob/main/README.md)
- **SQuAD 2.0** — Same homepage. License location: explorer + paper footnote 2 + HF `rajpurkar/squad_v2`. License: **CC BY-SA 4.0**. Commercial: yes with BY + SA. Attribution: yes. Passages: Wikipedia, redistributable under SA. CEFR: no. Types: extractive span + unanswerable. Size: 100k answerable + 50k+ unanswerable. **`ATTRIBUTION_REQUIRED`**. — [SQuAD explorer](https://rajpurkar.github.io/SQuAD-explorer/); [Rajpurkar et al. 2018](https://nlp.stanford.edu/pubs/rajpurkar2018squad.pdf)
- **BoolQ** — Official URL: [github.com/google-research-datasets/boolean-questions](https://github.com/google-research-datasets/boolean-questions). License location: README “License” section (not a separate LICENSE file, but an explicit owner statement + CC link). License: **CC BY-SA 3.0**. Commercial: yes with BY + SA. Attribution: yes. Passages: Wikipedia, redistributable under SA. CEFR: no. Types: yes/no. Size: 15,942 (train 9,427 / dev 3,270 / test 3,245 unlabeled). **`ATTRIBUTION_REQUIRED`**. — [BoolQ README](https://raw.githubusercontent.com/google-research-datasets/boolean-questions/master/README.md)
- **MultiRC** — Official URL: [github.com/CogComp/multirc](https://github.com/CogComp/multirc). License location: [LICENSE](https://github.com/CogComp/multirc/blob/master/LICENSE). License: **UIUC Research and Academic Use License** (not CC). Commercial: **no** unless OTM deal. Attribution: copyright notice on redistributed research derivatives. Passages: various; license does not clear third-party copyright for a product. CEFR: no. Types: multi-sentence multi-answer (T/F-style option sets). **`RESEARCH_ONLY`**. — [CogComp/multirc LICENSE](https://github.com/CogComp/multirc/blob/master/LICENSE)
- **CosmosQA** — Official URL (data): [github.com/wilburOne/cosmosqa](https://github.com/wilburOne/cosmosqa) (HF points here). License location: **none found on owner repo**; HF card: “As reported via email by Yejin Choi … CC BY 4.0.” Size on HF: 35.6K MCQ (train 25,262 / val 2,985 / test 6,963). Types: 4-way MC commonsense on everyday narratives. CEFR: no. Passage source: personal blogs / everyday narratives (third-party). **`UNKNOWN`**. — [allenai/cosmos_qa](https://huggingface.co/datasets/allenai/cosmos_qa); [HF commit adding email license](https://huggingface.co/datasets/allenai/cosmos_qa/commit/2605bbb672ca4cd748081c6c56458369a25118da)
- **SciQ** — Official URL: [allenai.org/data/sciq](https://allenai.org/data/sciq) (resolves to AllenAI HF card). License location: HF “Licensing Information.” License: **CC BY-NC 3.0 Unported**. Commercial: no. Attribution: yes if used under NC. Passages (`support`): science textbook-style text; card rows include CK-12 “CC BY-NC 3.0.” CEFR: no (science domain, often advanced). Types: 4-way MC + supporting sentence. **`RESEARCH_ONLY`**. — [allenai/sciq](https://huggingface.co/datasets/allenai/sciq)
- **FairytaleQA** — Official URL: [github.com/uci-soe/FairytaleQAData](https://github.com/uci-soe/fairytaleqadata). License location: GitHub repo license **Apache-2.0** (README itself has no “License” heading). Commercial: Apache allows commercial use with license notice. Attribution: Apache NOTICE/attribution. Passages: Project Gutenberg children’s stories — generally US public domain, **but** not enumerated per title in README. CEFR: no; target is “kindergarten to eighth-grade” narrative comprehension. Types: short-answer (explicit/implicit; 7 narrative attributes). Size: 10,580 Qs / 278 stories (HF 8,548 / 1,025 / 1,007). **`ATTRIBUTION_REQUIRED`**. — [FairytaleQAData](https://github.com/uci-soe/fairytaleqadata); [README](https://raw.githubusercontent.com/uci-soe/FairytaleQAData/main/README.md)
- **NarrativeQA** — Official URL: [github.com/google-deepmind/narrativeqa](https://github.com/google-deepmind/narrativeqa). License location: [LICENSE](https://github.com/google-deepmind/narrativeqa/blob/master/LICENSE) Apache 2.0; README Dataset Metadata license = Apache 2.0. Commercial for **repo files**: yes with Apache notice. Passages: Wikipedia summaries in-repo (WP + Apache); **full books/scripts not redistributed** (`download_stories.sh`). CEFR: no. Types: free-form short answer (2 references). **Questions + wiki summaries: `ATTRIBUTION_REQUIRED`. Full stories: `DO_NOT_USE`.** — [narrativeqa README](https://raw.githubusercontent.com/google-deepmind/narrativeqa/master/README.md); [LICENSE](https://github.com/google-deepmind/narrativeqa/blob/master/LICENSE)
- **Belebele** — Official URL: [github.com/facebookresearch/belebele](https://github.com/facebookresearch/belebele); zip [dl.fbaipublicfiles.com/belebele/Belebele.zip](https://dl.fbaipublicfiles.com/belebele/Belebele.zip). License location: `LICENSE_CC-BY-SA4.0` in repo root (README). Eval: **CC BY-SA 4.0**. Train assembly: “majority … CC-BY-NC” + source dataset licenses. Passages: FLORES-200, redistributable under SA. CEFR: **no official CEFR tags**; authors say questions “discriminate between different levels of generalizable language comprehension”; English “proves difficult enough to challenge state-of-the-art language models.” Types: 4-way MC. Size: 900 Q / 488 passages per language (EN = `eng_Latn`); avg 79.1 words/passage, 4.1 sentences. **Eval: `ATTRIBUTION_REQUIRED`. Train assembly: `RESEARCH_ONLY` / `DO_NOT_USE`.** — [belebele README](https://raw.githubusercontent.com/facebookresearch/belebele/main/README.md)
- **XQuAD** — Official URL: [github.com/google-deepmind/xquad](https://github.com/google-deepmind/xquad). License location: README “License” section. License: **CC BY-SA 4.0**. Commercial: yes with BY + SA. Attribution: yes. Passages: SQuAD v1.1 Wikipedia subset + professional translations (AR, DE, EL, EN, ES, HI, RU, TH, TR, **VI**, ZH, + RO). CEFR: no. Types: extractive span (no unanswerables). Size: 240 paragraphs, 1,190 pairs, parallel. **`ATTRIBUTION_REQUIRED`**. — [xquad README](https://raw.githubusercontent.com/google-deepmind/xquad/master/README.md)
- **TyDi QA** — Official URL: [github.com/google-research-datasets/tydiqa](https://github.com/google-research-datasets/tydiqa); site [ai.google.com/research/tydiqa](https://ai.google.com/research/tydiqa). License location: GitHub repo license **Apache-2.0** (README body does **not** restate the license text). Passages: Wikipedia snapshots (Internet Archive links listed). Commercial: Apache allows, with notice; Wikipedia text still needs BY-SA compliance. CEFR: no. Types: passage selection, minimal span, yes/no, GoldP extractive. Size: 204K pairs / 11 languages. English GoldP is the MRC-relevant slice. **`ATTRIBUTION_REQUIRED`** (Apache + Wikipedia SA). — [tydiqa repo](https://github.com/google-research-datasets/tydiqa); [README](https://raw.githubusercontent.com/google-research-datasets/tydiqa/master/README.md)

#### Extra official-license rows useful for the same product question

- **HotpotQA** — [hotpotqa.github.io](https://hotpotqa.github.io/) **CC BY-SA 4.0**; Wikipedia multi-hop; **`ATTRIBUTION_REQUIRED`**.
- **Natural Questions** — [LICENSE Apache 2.0](https://github.com/google-research-datasets/natural-questions/blob/master/LICENSE); Wikipedia; **`ATTRIBUTION_REQUIRED`**.
- **RACE** — [CMU terms](https://www.cs.cmu.edu/~glai1/data/race/) non-commercial + no commercial derived data; exam passages; **`DO_NOT_USE`**.
- **ReClor** — [whyu.me/reclor](https://whyu.me/reclor/) non-commercial + exam items; **`DO_NOT_USE`**.
- **DREAM** — [license.txt](https://raw.githubusercontent.com/nlpdata/dream/master/license.txt) non-commercial research only; **`RESEARCH_ONLY`**.
- **NewsQA** — [LICENSE.txt is code MIT](https://raw.githubusercontent.com/Maluuba/newsqa/master/LICENSE.txt); CNN retains article rights; **`DO_NOT_USE`**.
- **CoQA** — [mixed, official](https://stanfordnlp.github.io/coqa/): WP+Literature `ATTRIBUTION_REQUIRED`; RACE `DO_NOT_USE`; MCTest `UNKNOWN`; CNN news `UNKNOWN`/`DO_NOT_USE` (CNN ownership not waived in the sibling NewsQA notice).
- **OneStopEnglish** (passages only, not QA) — paper: “freely available under a CC by-SA 4.0 license”; 189 texts × 3 levels (567) rewritten from **The Guardian** by Macmillan OneStopEnglish teachers. — [Vajjala & Lučić, ACL 2018 PDF](https://aclanthology.org/W18-0535.pdf); HF [iastate/onestop_english](https://huggingface.co/datasets/iastate/onestop_english) repeats CC BY-SA 4.0. Guardian/Macmillan copyright of the underlying news is **not** independently waived on those pages → **`UNKNOWN` / treat as `DO_NOT_USE` for production seed**.

### Inferences
- Exact-license table for the named eleven:

  | Dataset | Official license text | Code |
  | --- | --- | --- |
  | SQuAD 1.1 | CC BY-SA 4.0 (explorer + HF) | `ATTRIBUTION_REQUIRED` |
  | SQuAD 2.0 | CC BY-SA 4.0 (explorer + paper + HF) | `ATTRIBUTION_REQUIRED` |
  | BoolQ | CC BY-SA 3.0 (README) | `ATTRIBUTION_REQUIRED` |
  | MultiRC | UIUC Research and Academic Use LICENSE | `RESEARCH_ONLY` |
  | CosmosQA | No owner LICENSE file; HF email → CC BY 4.0 | `UNKNOWN` |
  | SciQ | CC BY-NC 3.0 (AllenAI HF card) | `RESEARCH_ONLY` |
  | FairytaleQA | Apache-2.0 (GitHub license metadata) | `ATTRIBUTION_REQUIRED` |
  | NarrativeQA | Apache-2.0 (LICENSE); stories not in grant | `ATTRIBUTION_REQUIRED` (Q+wiki only) |
  | Belebele eval | LICENSE_CC-BY-SA4.0 | `ATTRIBUTION_REQUIRED` |
  | Belebele train | CC-BY-NC + RACE/etc. | `RESEARCH_ONLY` |
  | XQuAD | CC BY-SA 4.0 (README) | `ATTRIBUTION_REQUIRED` |
  | TyDi QA | Apache-2.0 (repo LICENSE) | `ATTRIBUTION_REQUIRED` |

- XQuAD English + Vietnamese files are the only **officially parallel EN–VI extractive MRC** set in this list with a clean SA license (inherited from SQuAD).

### Gaps
- TyDi QA README never quotes Apache 2.0; classification relies on GitHub’s repo LICENSE badge/file (standard, but not restated in README).
- FairytaleQA README never quotes Apache 2.0; unofficial HF `WorkInTheDark/FairytaleQA` card says “Licensing Information: More Information Needed” while YAML says `apache-2.0`. Prefer the official GitHub license field.
- CosmosQA owner repo was not fully listed for a LICENSE file beyond HF’s “email” note — remains `UNKNOWN`.
- QuAC, DROP, TriviaQA evidence, Qasper, Quoref, QuALITY, WikiHop, ReCoRD were not given full official-LICENSE reads this pass.

---

## Can we use questions only if passages are copyrighted?

### Takeaway
No surveyed research-only dataset grants a questions-only commercial carve-out. RACE and ReClor expressly ban commercial use of **contexts and derived data**. NewsQA’s MIT file is code-only. Splitting questions from passages does not create a license. The only “questions without full passages” pattern that is *intentional* is NarrativeQA (Apache Q/A + wiki summaries; stories fetched separately).

### Cited Findings
- RACE terms: no commercial exploit of “any portion of the contexts **and any portion of derived data**.” — [CMU RACE](https://www.cs.cmu.edu/~glai1/data/race/)
- ReClor Use Item 4 is the same “contexts and … derived data” commercial ban; Use Item 3 says they shuffled/deleted options “to comply with fair use of law,” i.e. the authors themselves treat the exam text as third-party copyright. — [whyu.me/reclor](https://whyu.me/reclor/)
- MultiRC: “No license is granted herein that would permit Licensee to incorporate the Software into a commercial product.” The LICENSE governs the released package (passages + questions). No questions-only exception. — [CogComp/multirc LICENSE](https://github.com/CogComp/multirc/blob/master/LICENSE)
- DREAM `license.txt` covers “DREAM dataset” with no field-level split. — [dream license.txt](https://raw.githubusercontent.com/nlpdata/dream/master/license.txt)
- NewsQA: questions/answers are a separate download, but `LICENSE.txt` is titled “NewsQA Code” / MIT; README: dataset “cannot be made directly available due to legal reasons”; CNN “does not waive any rights of ownership.” — [Maluuba/newsqa](https://github.com/Maluuba/newsqa); [LICENSE.txt](https://raw.githubusercontent.com/Maluuba/newsqa/master/LICENSE.txt)
- NarrativeQA ships `qaps.csv` + Wikipedia summaries under Apache 2.0 and **does not** ship full stories. — [narrativeqa README](https://raw.githubusercontent.com/google-deepmind/narrativeqa/master/README.md)
- SQuAD / XQuAD / BoolQ / Belebele eval license the released JSON as a whole under CC BY-SA; Wikipedia/FLORES passages are independently SA-licensed, so a “questions-only” split is unnecessary for copyright of the passage layer. — [SQuAD explorer](https://rajpurkar.github.io/SQuAD-explorer/); [xquad README](https://raw.githubusercontent.com/google-deepmind/xquad/master/README.md); [BoolQ README](https://raw.githubusercontent.com/google-research-datasets/boolean-questions/master/README.md); [belebele README](https://raw.githubusercontent.com/facebookresearch/belebele/main/README.md)
- CoQA official page licenses **passages by domain**, not questions as a standalone CC work. Exam-domain items remain under RACE’s license. — [CoQA](https://stanfordnlp.github.io/coqa/)

### Inferences
- For exam-wrapped sets (RACE, ReClor, CoQA-RACE, Belebele-train-from-RACE), questions are typically written by exam authors or are “derived data.” Using Q+options with a newly written passage still likely violates “derived data” / research-only clauses and may still copy copyrighted exam items. **Do not** plan a “questions-only import.”
- For NewsQA, there is **no** official grant to use the crowd questions commercially either; MIT does not attach to the Q/A tarball.
- For NarrativeQA, pairing Apache-licensed questions with **EnglishFlow-original** passages would still be pedagogically broken (answers key to the copyrighted story) and may be a derivative of the story; the license does not authorize reconstructing story text.
- For SQuAD-family / BoolQ / Belebele eval / FairytaleQA, the production constraint is attribution/ShareAlike, not “passage copyright vs question copyright.”
- Copyright law point that dataset pages do **not** contradict: a compilation license is the grant you have. Absence of a passage does not imply the questions are public domain.

### Gaps
- No jurisdiction-specific legal opinion was obtained (US fair use vs Vietnamese commercial publication). This inventory only records what **owners wrote**.
- NewsQA Q/A tarball terms beyond `LICENSE.txt` (download clickwrap, if any) were not captured.
- Whether crowdworker questions in SQuAD are “Adapted Material” of Wikipedia (SA) is a CC-legal nuance the Stanford page does not discuss; they simply release the whole dataset as CC BY-SA 4.0.

---

## Any datasets already CEFR-leveled or written for EFL learners?

### Takeaway
No owner-licensed MRC/QA dataset in this survey ships official **CEFR** labels and a commercial-friendly license. The only large EFL-exam reading QA sets (RACE, and DREAM’s exam-site dialogues) are research-only. FairytaleQA is K–8 education, not CEFR. Belebele is multilingual/parallel and difficulty-discriminating but not CEFR-tagged and is hard even in English. OneStopEnglish is leveled ESL **passages** (elementary / intermediate / advanced), not QA, and sits on Guardian/Macmillan news.

### Cited Findings
- RACE is built from English exams for Chinese students 12–18, expert-written questions — i.e. **EFL exam** material — but restricted to non-commercial research and exam-sourced passages. — [CMU RACE](https://www.cs.cmu.edu/~glai1/data/race/); [Lai et al. 2017](https://aclanthology.org/D17-1082/)
- DREAM license is non-commercial research only; repo includes `websites.txt` for collection (typical of Chinese English-exam dialogue MRC). — [dream license.txt](https://raw.githubusercontent.com/nlpdata/dream/master/license.txt)
- FairytaleQA: “narrative comprehension of kindergarten to eighth-grade students”; Gutenberg fairy tales; seven narrative-element question types; **no CEFR field** in the README schema (`local-or-sum`, `attribute`, `ex-or-im`). — [FairytaleQAData README](https://raw.githubusercontent.com/uci-soe/FairytaleQAData/main/README.md)
- Belebele: questions meant to “discriminate between different levels of generalizable language comprehension”; English alone “challenge[s] state-of-the-art language models”; **no CEFR column** in the documented schema (`link`, `split`, `question_number`, `dialect`, `correct_answer_num`). 122 variants include `vie_Latn` (Vietnamese) parallel to `eng_Latn`. — [belebele README](https://raw.githubusercontent.com/facebookresearch/belebele/main/README.md)
- OneStopEnglish paper: 189 Guardian-sourced articles rewritten by teachers for “three levels of adult ESL learners (elementary, intermediate, and advanced)”; released by the **compilers** under CC BY-SA 4.0; original site is Macmillan’s onestopenglish.com; corpus is readability/simplification, not a QA set (PDF extraction dropped “pre/post test questions”). — [W18-0535.pdf](https://aclanthology.org/W18-0535.pdf)
- HF `iastate/onestop_english`: labels `ele` / `int` / `adv`; “Creative Commons Attribution-ShareAlike 4.0 International License.” — [iastate/onestop_english](https://huggingface.co/datasets/iastate/onestop_english)
- EnglishFlow’s existing CEFR-friendly **grammar** sources (CEFR-J Grammar Profile, Tatoeba text) are not reading-comprehension QA datasets. — [grammar-dataset-license-research.md](../../docs/research/grammar-dataset-license-research.md)
- SQuAD / BoolQ / XQuAD / TyDi / HotpotQA / NQ passages are raw Wikipedia — adult native-level, no CEFR. — [SQuAD explorer](https://rajpurkar.github.io/SQuAD-explorer/); [BoolQ README](https://raw.githubusercontent.com/google-research-datasets/boolean-questions/master/README.md); [xquad README](https://raw.githubusercontent.com/google-deepmind/xquad/master/README.md)

### Inferences
- For an EFL reading feature, **do not** expect a drop-in CEFR-tagged commercial QA corpus. Viable path: (1) seed from `ATTRIBUTION_REQUIRED` Wikipedia/FLORES/Gutenberg items and **human-assign CEFR**; (2) write original passages + items as `PRODUCTION_ALLOWED`; (3) optionally use Belebele EN–VI parallel MCQs as a small high-level (likely B2–C2) attributed set; (4) FairytaleQA for story-comprehension at child/A2–B1-ish **estimated** level after review — not an official CEFR mapping.
- RACE/DREAM would be the most “EFL-native” question style (exam MCQ) and are exactly the sets EnglishFlow must not seed.
- OneStopEnglish must not be treated as a CEFR QA source: no questions in the public corpus, and news-rewrite copyright is `UNKNOWN`.

### Gaps
- No official CEFR-J / Cambridge / British Council **reading QA** dataset with a public commercial LICENSE was found in this pass. Absence of search hits is not proof none exist; it is “I found no reliable owner-licensed CEFR-tagged MRC/QA set.”
- Belebele paper analyses of per-question difficulty were not extracted beyond the README claim that English is hard; no CEFR mapping table is on the official README.
- CLEAR, Newsela, EFCAMDAT, CAMB, and other learner corpora were not license-audited here (Newsela is typically licensed/copyrighted news; not pursued once out of MRC/QA + official-LICENSE scope).
