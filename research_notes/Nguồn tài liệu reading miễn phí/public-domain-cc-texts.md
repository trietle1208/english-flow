# Public-domain and Creative Commons English texts for reading passages

Research date: September 2026. Scope: official license/terms pages only. Taxonomy matches EnglishFlow `content_license_code` in [docs/research/grammar-dataset-license-research.md](../../docs/research/grammar-dataset-license-research.md): `PRODUCTION_ALLOWED` (commercial OK, attribution not required by license), `ATTRIBUTION_REQUIRED` (commercial OK if cite / CC-BY), `RESEARCH_ONLY` (NC / educational-only / ND that blocks leveling), `UNKNOWN` (no clear LICENSE, contradiction, or territorial status unresolved), `DO_NOT_USE` (commercial forbidden or third-party copyright risk too high).

**Vietnam hosting caveat (applies to all US-PD literature):** Project Gutenberg and Standard Ebooks determine status under **US** law only. Việt Nam Luật Sở hữu trí tuệ Điều 27 (văn bản hợp nhất): hầu hết tác phẩm văn học được bảo hộ suốt đời tác giả **cộng 50 năm** sau khi chết, hết hạn 24:00 ngày 31/12 năm hết hạn. — [Luật SHTT Điều 27, bản tiếng Anh trên WIPO Lex / Thu viện Pháp luật](https://thuvienphapluat.vn/van-ban/EN/So-huu-tri-tue/Law-No-50-2005-QH11-of-November-29-2005-on-Intellectual-property/84542/tieng-anh.aspx); [bản hợp nhất Điều 27](https://english.luatvietnam.vn/consolidated-text-no-07-vbhn-vpqh-of-the-law-on-intellectual-property-176790-doc5.html). A book that is unrestricted in the US (typically first published before 1 Jan 1931 for Standard Ebooks) can still be in copyright in Vietnam if the author died after ~1975. US-PD ≠ VN-PD. Per-work author-death check is required before production seed.

---

## Which listed sources are safe for commercial redistribution in a self-hosted English-learning app?

### Takeaway
Safe-enough production candidates, after per-item filters: **VOA Learning English original text/audio** (credit requested; strip AP/Reuters/AFP), **original NASA/US federal text** (acknowledge NASA; strip third-party and logos), **Project Gutenberg / Standard Ebooks / LibriVox audio of works that are PD in both the US and Vietnam** (strip the Gutenberg trademark if you charge), and **Wikimedia text under CC BY-SA 4.0** if the product can carry attribution + ShareAlike on derivatives. **BBC Learning English, News in Levels, and wikiHow are not usable** for a commercial app. English Wikipedia and Simple English Wikipedia are commercially allowed but copyleft.

### Cited Findings

#### Project Gutenberg — `PRODUCTION_ALLOWED` (US-unrestricted texts after stripping the PG trademark); `UNKNOWN` until Vietnam term is checked; `DO_NOT_USE` for items the ebook header marks copyrighted

- Official URLs: [gutenberg.org](https://www.gutenberg.org); permission how-to [gutenberg.org/policy/permission.html](https://www.gutenberg.org/policy/permission.html); license [gutenberg.org/policy/license.html](https://www.gutenberg.org/policy/license.html); site terms [gutenberg.org/policy/terms_of_use.html](https://www.gutenberg.org/policy/terms_of_use.html).
- “The vast majority of Project Gutenberg eBooks are in the public domain in the US. This means that nobody can grant, or withhold, permission… ‘As you please’ includes any commercial use, republishing in any format, making derivative works…” — [Permission How-to](https://www.gutenberg.org/policy/permission.html).
- PG no longer uses the phrase “public domain” in the license explainer because of confusion; it speaks of books “not restricted by U.S. copyright law.” A PG ebook has two parts: the unrestricted book text and the **non-public-domain Project Gutenberg trademark and license**. “If you strip the Project Gutenberg license and all references to Project Gutenberg from the text, you are left with a text unrestricted by U.S. intellectual property law.” — [License](https://www.gutenberg.org/policy/license.html).
- If you **keep** the Project Gutenberg name on copies you charge for: verbatim copies only, **20% of gross profits** as trademark royalties, refund rules. Acknowledgements/colophon mentions with a link are **not** trademark use. — [License](https://www.gutenberg.org/policy/license.html); [Permission How-to](https://www.gutenberg.org/policy/permission.html).
- “There are thousands of items… still under copyright… Each copyrighted item is clearly indicated as copyrighted in the eBook’s header.” Those need the rightsholder’s license. — [Permission How-to](https://www.gutenberg.org/policy/permission.html).
- “PG is entirely based in the US… If you are operating outside of the US, you should get professional guidance… Not all items that are public domain in the US are public domain in other countries.” — [Permission How-to](https://www.gutenberg.org/policy/permission.html); same warning in [Terms of Use](https://www.gutenberg.org/policy/terms_of_use.html) and the license explainer.
- Attribution to PG is **optional**, not required, for quotes/extracts. — [Permission How-to](https://www.gutenberg.org/policy/permission.html).
- PG claims no copyright in markup/modernization (“no sweat of the brow”). — [Permission How-to](https://www.gutenberg.org/policy/permission.html).
- **Download/API path:** do **not** bulk-crawl `www.gutenberg.org` (automated access is blocked; “more than ~100 [books] per day” from the main site is treated as “many”). Use [mirrors](https://www.gutenberg.org/policy/terms_of_use.html), [offline catalogs](https://www.gutenberg.org/ebooks/offline_catalogs.html), and feeds at [gutenberg.org/cache/epub/feeds/](https://www.gutenberg.org/cache/epub/feeds/): `pg_catalog.csv.gz` (~5.3 MB, updated Aug–Sep 2026 in directory listings), daily `rdf-files.tar.bz2`, weekly `txt-files.tar.zip` (~10–11 GB). Link to landing pages (`/ebooks/N`), not deep file URLs. — [Terms of Use](https://www.gutenberg.org/policy/terms_of_use.html); [feeds index](https://www.gutenberg.org/cache/epub/feeds/).
- Typical length: full books (novels, essays, short-story collections). No official CEFR tags. 19th / early-20th-century literary English; needs human leveling. Children’s and short-story titles exist but are not CEFR-labeled.
- ShareAlike/ND: none on US-unrestricted text after the header is stripped.

#### Standard Ebooks — `PRODUCTION_ALLOWED` (US) after confirming the work is US-unrestricted; `UNKNOWN` until Vietnam term is checked

- Official URLs: [standardebooks.org](https://standardebooks.org/); [About](https://standardebooks.org/about); [Collections Policy](https://standardebooks.org/contribute/collections-policy); per-ebook Uncopyright (example: [A Christmas Carol Uncopyright](https://standardebooks.org/ebooks/charles-dickens/a-christmas-carol/text/uncopyright)). The path `/about/legal` returned **HTTP 404** (September 2026); license text lives in About + each ebook’s Uncopyright / `LICENSE.md`.
- “The text and cover art in our ebooks are already believed to be in the U.S. public domain, and Standard Ebooks dedicates its own work to the public domain, thus releasing the entirety of each ebook file into the public domain.” — [About](https://standardebooks.org/about).
- Uncopyright: source text/artwork believed free of US copyright; contributors dedicate metadata, typography, and enhancements to the worldwide public domain via **CC0 1.0**. “This dedication doesn’t change the copyright status of the source text.” Users outside the US “must check their local laws.” — [Uncopyright example](https://standardebooks.org/ebooks/charles-dickens/a-christmas-carol/text/uncopyright); imprint template in [Manual of Style](https://standardebooks.org/manual/1.8.4/single-page).
- Collections policy: generally published **before 1 January 1931**; “If it’s not hosted on Project Gutenberg, we’ll probably decline it.” Different editions/translations: they host one “best” PD edition. — [Collections Policy](https://standardebooks.org/contribute/collections-policy).
- Tools repo is **GPLv3** (not the ebook texts). — [standardebooks/tools LICENSE.md](https://raw.githubusercontent.com/standardebooks/tools/master/LICENSE.md).
- **Download path:** HTML/epub from each book page; Git history of each ebook (About: they use Git). No ShareAlike/ND on the dedicated files. Same Vietnam term problem as Gutenberg. Better typography than raw PG; still no CEFR.

#### Simple English Wikipedia — `ATTRIBUTION_REQUIRED` (+ ShareAlike on derivatives)

- Official URLs: [simple.wikipedia.org](https://simple.wikipedia.org/); copyrights [simple.wikipedia.org/wiki/Wikipedia:Copyrights](https://simple.wikipedia.org/wiki/Wikipedia:Copyrights); Foundation ToU [foundation.wikimedia.org/wiki/Policy:Terms_of_Use](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use).
- **Conflict:** the Simple copyrights policy page still describes text as GFDL-only and says not to copy unless allowed under GFDL. That page is **stale** relative to Foundation ToU §7, which requires contributors on **all** Wikimedia projects to license text under **CC BY-SA 4.0 and GFDL**, reusers may comply with either (unless a project exceptionally requires another license). — [Simple:Copyrights](https://simple.wikipedia.org/wiki/Wikipedia:Copyrights); [WMF ToU §7](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use).
- Classification follows **Foundation ToU + English Wikipedia copyrights**, not the stale Simple page: commercial reuse allowed; attribution + SA + license notice required.
- Typical length: encyclopedia articles, often a few hundred to a few thousand words; written in simpler English but **not officially CEFR-tagged**. Practical candidate for A2–B1 after human review.
- **Download/API:** Wikimedia dumps (`dumps.wikimedia.org`, `simplewiki`); MediaWiki Action API. Hugging Face Wikipedia dumps are usable only if the dataset card cites CC BY-SA and the dump date.

#### English Wikipedia — `ATTRIBUTION_REQUIRED` (+ ShareAlike); strip non-free / fair-use media

- Official URLs: [en.wikipedia.org/wiki/Wikipedia:Copyrights](https://en.wikipedia.org/wiki/Wikipedia:Copyrights); reuse [en.wikipedia.org/wiki/Wikipedia:Reusing_Wikipedia_content](https://en.wikipedia.org/wiki/Wikipedia:Reusing_Wikipedia_content); [WMF ToU](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use).
- Most text dual-licensed **CC BY-SA 4.0 + GFDL** (unversioned, no invariant/cover texts). Some imported text is CC BY-SA-only (check footer, history, talk). WMF does **not** own article copyright and cannot grant extra permission. Logos are trademarks. — [Wikipedia:Copyrights](https://en.wikipedia.org/wiki/Wikipedia:Copyrights).
- Commercial use is allowed if the license terms are met. — [WMF ToU §7.1](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use) (“these licenses do allow commercial uses… as long as such uses are compliant”).
- Fair-use / non-free quotations and images on Wikipedia are **not** under CC BY-SA and must not be copied into the app. — [Wikipedia:Copyrights § Non-free](https://en.wikipedia.org/wiki/Wikipedia:Copyrights).
- Typical length: 500–10,000+ words; register is often B2–C2. Needs leveling for A1–B1 Vietnamese learners.
- **Download/API:** `dumps.wikimedia.org` (`enwiki`); MediaWiki API. Do not treat a Hugging Face mirror as a license if the card does not cite upstream CC BY-SA.

#### Wikibooks — `ATTRIBUTION_REQUIRED` (+ ShareAlike)

- Official: [en.wikibooks.org/wiki/Wikibooks:Copyrights](https://en.wikibooks.org/wiki/Wikibooks:Copyrights). Most text dual-licensed CC BY-SA 4.0 + GFDL; some CC BY-SA-only (footer/history/talk). Commercial reuse allowed under those licenses. Textbook-length modules; CEFR not assigned. Same dump/API path as other Wikimedia projects (`enwikibooks`).

#### Wikisource — mixed: `PRODUCTION_ALLOWED` / `ATTRIBUTION_REQUIRED` / `UNKNOWN` per work

- Official: [en.wikisource.org/wiki/Wikisource:Copyright_policy](https://en.wikisource.org/wiki/Wikisource:Copyright_policy); [Help:Licensing compatibility](https://en.wikisource.org/wiki/Help:Licensing_compatibility).
- **User contributions** (annotations, original translations, talk) default to **CC BY-SA 4.0 + GFDL**. **Source works** must be public domain or a free-content-compatible license; each page should carry a copyright-tag template. — [Copyright policy](https://en.wikisource.org/wiki/Wikisource:Copyright_policy).
- LibriVox’s own text-source policy rejects Wikisource unless a scan shows publication 96+ years ago, because Wikisource “restrict[s] use of the texts with a CC license.” — [LibriVox Recording & Text Policies](https://wiki.librivox.org/index.php?title=Recording_%26_Text_Policies). For EnglishFlow: prefer scan-backed US-PD (and VN-PD) source texts; treat unsigned/unscanned pages as `UNKNOWN`.
- NC and ND licenses are prohibited as Wikisource source licenses. — [Licensing compatibility](https://en.wikisource.org/wiki/Help:Licensing_compatibility).

#### wikiHow — `DO_NOT_USE` for commercial EnglishFlow

- Official: [wikiHow:Creative Commons](https://www.wikihow.com/wikiHow:Creative-Commons); [wikiHow:Terms of Use](https://www.wikihow.com/wikiHow:Terms-of-Use); [wikiHow:Attribution](https://www.wikihow.com/wikiHow:Attribution).
- Effective **24 March 2025**, new user content is **not** CC-licensed (proprietary). Staff-written content was **never** under CC. Pre-2025 applicable community article text (title + editor-field intro/steps/tips/warnings only) remains **CC BY-NC-SA 3.0**. NC is defined to include “a website or app with advertisements… or a paid app.” Commercial republish needs a case-by-case email to `wiki@wikihow.com`. Scraping for ML/AI is forbidden without written permission. — [wikiHow:Creative Commons](https://www.wikihow.com/wikiHow:Creative-Commons).
- Even the old CC corpus is `RESEARCH_ONLY` (NC + SA). Post-2025 and staff text: `DO_NOT_USE`.

#### VOA Learning English — `ATTRIBUTION_REQUIRED` for original VOA-produced text/MP3/video; `DO_NOT_USE` for AP/Reuters/AFP (and similar) inserts

- Official: [learningenglish.voanews.com/p/6861.html](https://learningenglish.voanews.com/p/6861.html) (“Request Our Content”); site terms [learningenglish.voanews.com/p/6021.html](https://learningenglish.voanews.com/p/6021.html).
- “Learning English texts, MP3s, photos and videos are in the public domain. You are allowed to reprint them for educational and commercial purposes, **with credit to learningenglish.voanews.com**. However, stories, photos and video images from news agencies such as AP, Reuters and AFP are copyrighted, so you are not allowed to republish them.” High-res files via **USAGM Direct** (registration). Contact `learningenglish@voanews.com`. — [Request Our Content](https://learningenglish.voanews.com/p/6861.html).
- Typical length: short graded news/feature articles (hundreds to ~1,500 words) plus matching audio. Written for English learners; no official CEFR scale on the terms pages, but the simplest practical “news” source in this inventory for A2–B1 after editorial leveling.
- Credit is requested on a public-domain work (not a CC license). EnglishFlow maps “commercial + required credit” to `ATTRIBUTION_REQUIRED`. No ShareAlike/ND on original VOA LE text.

#### Voice of America news (voanews.com) — mixed: `ATTRIBUTION_REQUIRED` for **exclusively VOA-produced** text/audio/video; `DO_NOT_USE` for wire content

- Official copyright block on [voanews.com/p/5338.html](https://www.voanews.com/p/5338.html) (Privacy Notice page; the copyright terms are appended there): “All text, audio and video material **produced exclusively by** the Voice of America is in the public domain. Credit… should be given to voanews.com, Voice of America, or VOA.” Licensed third-party material “is not in the public domain and may not be copied, redistributed, sold, or published.” AFP, AP, and Reuters text/video/audio/photos/graphics “may not be copied, published or redistributed” and “shall not be… stored in a computer except for personal and non-commercial use.” “Voice of America” and “voanews.com” are trademarks; commercial use of the marks needs permission.
- Same mixed-copyright model as VOA Learning English, but **main VOA News is not written for learners** (B2–C1+ current-affairs English) and is more heavily mixed with wires. Safer pipeline: VOA Learning English originals, not generic VOA News dumps.

#### BBC Learning English — `DO_NOT_USE`

- Official archived terms: [bbc.co.uk/worldservice/learningenglish/terms.shtml](https://www.bbc.co.uk/worldservice/learningenglish/terms.shtml); copyright notice [bbc.com/worldservice/learningenglish/copyright.shtml](https://www.bbc.com/worldservice/learningenglish/copyright.shtml); current BBC reuse [bbc.co.uk/usingthebbc/terms/can-i-use-bbc-content/](https://www.bbc.co.uk/usingthebbc/terms/can-i-use-bbc-content/); [BBC Global Terms of Use](https://bbc.co.uk/pages/terms-of-use).
- “You may not copy, reproduce, edit, adapt… or otherwise use audio, video or other material… except for your own personal or educational **non-commercial** use.” Teachers may copy for class but “may not make any charge” and “may not make the material available through any other website or publication.” — [BBC LE Terms](https://www.bbc.co.uk/worldservice/learningenglish/terms.shtml).
- Copyright notice: download only for personal non-commercial use; educational use allowed if no charge and not placed on another website; all other uses need prior written BBC permission. — [BBC LE Copyright](https://www.bbc.com/worldservice/learningenglish/copyright.shtml).
- Global ToU: Services/Content for personal, non-commercial use; business use needs permission and may require a fee; using content to train/ground AI/ML is called out as not non-commercial. — [BBC Global ToU](https://bbc.co.uk/pages/terms-of-use); [Can I use BBC content?](https://www.bbc.co.uk/usingthebbc/terms/can-i-use-bbc-content/).
- Free-to-read in a browser ≠ license to copy into an app.

#### News in Levels — `DO_NOT_USE`

- Official: [newsinlevels.com/conditions-of-use/](https://newsinlevels.com/conditions-of-use/); operator terms PDF (English in Levels s.r.o., last updated **18 February 2026**) covering newsinlevels.com and related sites: [Terms_and_Conditions_English_in_Levels.pdf](https://www.englishinlevels.com/wp-content/uploads/2026/02/Terms_and_Conditions_English_in_Levels.pdf).
- “It is forbidden to copy anything from this website” except: students may copy Level 1–3 texts for **personal** use, “never for making money”; private teachers may use those texts in live classes ≤50 or screen-share online ≤200. **No institutional copy.** — [Conditions of Use](https://newsinlevels.com/conditions-of-use/).
- PDF: all content owned by English in Levels s.r.o. or licensors; students personal-learning only; teachers may not compile texts/audio into a booklet, book, digital coursebook, or collection of more than one article; **no institutional copy** from any of their sites/apps. — [Feb 2026 Terms PDF](https://www.englishinlevels.com/wp-content/uploads/2026/02/Terms_and_Conditions_English_in_Levels.pdf).
- Pedagogically attractive (3 levels) but copyright-closed.

#### NASA / US government texts — `ATTRIBUTION_REQUIRED` for original NASA/federal employee works; `DO_NOT_USE` for third-party marked media and NASA insignia

- Statute: **17 U.S.C. § 105(a)** — “Copyright protection under this title is not available for any work of the United States Government,” but the government may hold copyrights transferred to it. — [US Code § 105 (House)](https://uscode.house.gov/view.xhtml?req=%28title%3A17+section%3A105+edition%3Aprelim%29); [GovInfo PDF](https://www.govinfo.gov/content/pkg/USCODE-2024-title17/pdf/USCODE-2024-title17-chap1-sec105.pdf).
- Official NASA media page: [nasa.gov/nasa-brand-center/images-and-media/](https://www.nasa.gov/nasa-brand-center/images-and-media/). NASA content (images, audio, video, related media) is “generally… not subject to copyright in the United States” and may be used for educational or informational purposes including textbooks and web pages; news outlets/schools/textbook authors may use it without explicit permission if they do not imply endorsement; “NASA should be acknowledged as the source.” Third-party copyrighted material on NASA sites is marked and conveys **no** sublicense. NASA Insignia, Logotype, identifiers, and Seal are **not** public domain. Commercial use must not imply NASA endorsement. — [NASA Images and Media Guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/); summary also on [gpm.nasa.gov/image-use-policy](https://gpm.nasa.gov/image-use-policy).
- Wikipedia’s copyrights page (not a statute, but consistent): US federal works are PD **in the US** and “may be protected by copyright outside the U.S.”; contractor works and assigned copyrights are not automatically PD. — [Wikipedia:Copyrights § US Government](https://en.wikipedia.org/wiki/Wikipedia:Copyrights).
- Typical NASA explainer/feature: 400–2,000+ words, technical B2–C1. Good science-reading source after stripping captions credited to non-NASA photographers. **Download:** nasa.gov pages and multimedia portals linked from the media guidelines page (no single “all NASA text” dump).

#### LibriVox — audio `PRODUCTION_ALLOWED` (US PD recordings); official transcripts **do not exist** (`UNKNOWN` / do not import third-party “LibriVox transcripts”)

- Official: [librivox.org/pages/about-librivox/](https://librivox.org/pages/about-librivox/); volunteer page [librivox.org/pages/volunteer-for-librivox/](https://librivox.org/pages/volunteer-for-librivox/); wiki [LibriVox and Ebay](https://wiki.librivox.org/index.php?title=LibriVox_and_Ebay); [Recording & Text Policies](https://wiki.librivox.org/index.php?title=Recording_%26_Text_Policies).
- “All our audio is in the public domain, so you may use it for whatever purpose you wish.” Texts mostly from Project Gutenberg; audio hosted on Internet Archive. — [About LibriVox](https://librivox.org/pages/about-librivox/).
- Wiki: files are PD including commercial use (e.g. eBay CDs); credit is preferred but “we can’t and don’t enforce that.” — [LibriVox and Ebay](https://wiki.librivox.org/index.php?title=LibriVox_and_Ebay).
- LibriVox records existing PD books; it is not a transcript publisher. Third-party sites that sell “LibriVox transcripts” (e.g. catalogue/API wrappers) claim copyright in **their** generated transcript layer — that layer is not a LibriVox license. — [Supreme Audiobooks licensing page](https://supremeaudiobooks.com/licensing) (aggregator, not LibriVox; illustrates the split).
- Practical path: pair LibriVox audio with the **same** Gutenberg/Standard Ebooks text (after US+VN PD check), not with a scraped “transcript” dump.

### Inferences

- For a **Vietnam-hosted commercial app**, the cleanest “copy into the DB” news/explainer sources are **VOA Learning English originals** (with credit; wire-scrubbed) and **original NASA/US federal explainers** (acknowledge source; no logos/endorsement). Wikimedia text is legally copyable but infects derivatives with CC BY-SA 4.0.
- Gutenberg/Standard Ebooks/LibriVox are safe **only** for works that clear **both** US unrestricted status (ebook header / SE Uncopyright) **and** Vietnam life+50. Do not seed from a “US PD corpus” dump without author-death dates.
- “Free to read” graded-news brands (BBC LE, News in Levels) are the opposite of free-to-redistribute.

### Gaps

- No official CEFR labels were found on any of the listed publishers’ terms pages.
- Simple English Wikipedia’s local copyrights page was not updated to CC BY-SA 4.0 in the text fetched September 2026; Foundation ToU is the controlling document, but counsel should confirm treating Simple the same as other Wikimedia projects.
- Hugging Face mirrors were not inventory-audited item-by-item; rule remains: no upstream LICENSE citation → `UNKNOWN`.
- Territorial copyright of US government works **outside** the US is flagged by Wikipedia:Copyrights but not restated as a restriction on VOA’s own “commercial reprint with credit” page. VOA LE’s page is the better operational source for VOA LE text.

---

## What exactly do Wikipedia / Wikimedia terms require (CC BY-SA 4.0 + attribution + share-alike)?

### Takeaway
Wikimedia text is copyrighted by contributors and licensed to the public, usually **CC BY-SA 4.0 and GFDL**. Commercial reuse is allowed. Reusers must **attribute** (URL to the article is enough), **license modifications under CC BY-SA 4.0 or later**, **indicate changes**, and **include a license notice** linking to the license. Fair-use media and some imported text have extra or different terms. WMF trademarks are not included.

### Cited Findings

- Mission/summary: users may “Share and Reuse our articles and other media under free and open licenses.” Contributors “generally must license [contributions] under a free and open license (unless… public domain).” — [WMF ToU summary](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use).
- ToU §7: contributing text licenses it under **CC BY-SA 4.0** and **GFDL** (unversioned, no invariant/cover texts). “Reusers may comply with either license or both.” Exception: a project/feature that requires a different license. “These licenses do allow commercial uses… as long as such uses are compliant.” Sui generis database rights under CC BY-SA 4.0 are waived (facts may be reused without attribution). — [WMF ToU §7.1](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use).
- **Attribution (contributors agree to be credited, and reusers must credit) in any of:** (1) hyperlink/URL to the article (history lists authors); (2) hyperlink/URL to another stable, freely accessible, license-conforming copy with equivalent credit; or (3) a list of authors (tiny/irrelevant contributions may be filtered). — [WMF ToU §7.2 and §7.7](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use); same three options on [Wikipedia:Copyrights § Re-use of text](https://en.wikipedia.org/wiki/Wikipedia:Copyrights) and [Wikipedia:Reusing Wikipedia content](https://en.wikipedia.org/wiki/Wikipedia:Reusing_Wikipedia_content).
- Imported text may add attribution requirements (banners/notations on the page). Those visible notations should be preserved. Some imported text is CC BY-SA-compatible but **not** GFDL — then GFDL is not an option. Check footer, history, talk. — [WMF ToU §7.3, §7.7](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use).
- **Modifications:** modified or added text must be licensed under **CC BY-SA 4.0 or later** (or the project’s exceptional license). Must “clearly indicate that the original work has been modified.” Each distributed copy needs a licensing notice + hyperlink/URL to the license or a copy of the license. Suitable URL given by Wikipedia: `https://creativecommons.org/licenses/by-sa/4.0/`. — [WMF ToU §7.8](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use); [Wikipedia:Copyrights](https://en.wikipedia.org/wiki/Wikipedia:Copyrights).
- Non-text media: **per-file** licenses (Commons licensing policy). Fair-use / non-free content is **not** a grant to reusers. — [WMF ToU §7.4, §7.7](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use); [Wikipedia:Copyrights](https://en.wikipedia.org/wiki/Wikipedia:Copyrights).
- Public-domain contributions are welcome if actually PD under US law (and other countries the project requires) and labeled. — [WMF ToU §7.6](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use).
- Licenses granted are not unilaterally revocable. — [WMF ToU §7.5](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use).
- Do not ask WMF for permission to reuse article text; they do not own it. Only logos need WMF trademark permission. — [Wikipedia:Copyrights](https://en.wikipedia.org/wiki/Wikipedia:Copyrights).
- English Wikipedia text is copyrighted by editors under the Berne Convention and licensed as above. — [Wikipedia:Copyrights](https://en.wikipedia.org/wiki/Wikipedia:Copyrights).

### Inferences

- Putting a Wikipedia/Simple Wikipedia/Wikibooks passage into EnglishFlow, then adapting it (simplify, add Vietnamese glosses that are a derivative of the EN text, quiz stems copied from the passage) likely makes that **adapted package** CC BY-SA 4.0. Original EnglishFlow-only theory/UI can stay separate if it is not a derivative of the Wikimedia text. Mixing SA passages into a closed proprietary lesson JSON is a compliance design problem, not a ban on commercial use.
- A hyperlink to the exact revision (oldid) plus “Adapted from [title], Wikipedia, CC BY-SA 4.0” plus a license URL is the minimum attribution pattern the ToU describes.
- Facts (CEFR labels you assign, word counts) are not locked by SA; the **expression** of the article is.

### Gaps

- Whether a short Vietnamese translation of a Wikimedia passage is a “modification” that must be SA was not litigated in the sources; CC BY-SA 4.0 treats translations as adapted material. Product/legal review still needed for EN+VI lesson bundles.
- Interwiki GFDL-only language on Simple Wikipedia was not reconciled on-wiki as of this fetch.

---

## Is VOA / VOA Learning English public domain (US government) or mixed copyright?

### Takeaway
**Mixed.** Material **produced exclusively by VOA** is treated by VOA as **US public domain**, and VOA Learning English explicitly allows **educational and commercial reprint with credit**. The same sites also carry **AFP/AP/Reuters and other licensed** text, photos, audio, and graphics that are **not** PD and may not be stored or republished. Trademarks are reserved.

### Cited Findings

- VOA Learning English: originals (texts, MP3s, photos, videos) “are in the public domain”; commercial reprint allowed “with credit to learningenglish.voanews.com”; agency stories/photos/video “are copyrighted.” — [Request Our Content](https://learningenglish.voanews.com/p/6861.html).
- VOA Learning English terms: “All text, audio and video material produced exclusively by the Voice of America is in the public domain. Credit… voanews.com, Voice of America, or VOA.” Other licensed material “is not in the public domain.” Associated Press license language forbids storage except personal non-commercial use. VOA/voanews.com marks need permission for commercial trademark use. — [Terms of Use and Privacy Note](https://learningenglish.voanews.com/p/6021.html).
- VOA News privacy/copyright block: same exclusive-VOA PD + credit sentence; explicit AFP, AP, and Reuters reservation (no copy, publish, redistribute, rewrite; no computer storage except personal non-commercial). — [voanews.com/p/5338.html](https://www.voanews.com/p/5338.html).
- Statutory backdrop: works of the United States Government are not copyrightable under 17 U.S.C. § 105(a); the government may still hold assigned copyrights (e.g. contractor or wire licenses). — [17 U.S.C. § 105](https://uscode.house.gov/view.xhtml?req=%28title%3A17+section%3A105+edition%3Aprelim%29).
- Georgetown University Library (secondary, quoting VOA LE) repeats the same PD + credit + wire exception and USAGM Direct path. Not a substitute for VOA’s page. — [Georgetown open EFL resources](https://library.georgetown.edu/scholarly-communication/open-access-esl-efl).

### Inferences

- A production importer must **exclude** anything credited to AP, Reuters, AFP, or “used by permission,” and prefer stories that are clearly VOA-staff written. When in doubt: `DO_NOT_USE` that item.
- Credit line for seed rows: `Voice of America Learning English — https://learningenglish.voanews.com/…` (or voanews.com / VOA for main-site originals). Do not use VOA logos as product branding.
- Classification: `ATTRIBUTION_REQUIRED` (credit requested on PD material), not `PRODUCTION_ALLOWED`, so it matches how EnglishFlow treated “commercial + cite” sources such as CEFR-J.

### Gaps

- VOA’s pages do not publish a machine-readable allowlist of which articles are 100% exclusive-VOA. Human review per story is required.
- USAGM Direct’s current terms of access were not fetched (registration wall).
- Interaction of § 105 with Vietnam copyright for US government works is not spelled out on VOA pages; VOA LE’s own “commercial purposes, with credit” sentence is the operational grant for that corpus.

---

## How practical is it to slice Gutenberg / Standard Ebooks into CEFR-leveled short passages?

### Takeaway
**Legally easy in the US (and for VN-PD works); pedagogically expensive.** Official catalogs give bulk text and metadata but **no CEFR**. Typical files are whole novels. Slicing chapters/paragraphs is allowed on unrestricted texts (and is not ShareAlike). Turning 19th-century prose into reliable A1–B2 passages for Vietnamese learners needs a human (or carefully evaluated) leveling pipeline, not a dump-and-cut.

### Cited Findings

- PG: commercial derivatives and extracts of unrestricted texts are allowed; citing PG is optional. Copyrighted PG items are excluded by the ebook header. Non-US operators must check local law. — [Permission How-to](https://www.gutenberg.org/policy/permission.html); [License](https://www.gutenberg.org/policy/license.html).
- PG bulk access is designed around **mirrors + catalog feeds**, not scraping the main site. Machine-readable catalog: CSV, RDF, MARC; all-text zip ~10–11 GB weekly. — [Terms of Use](https://www.gutenberg.org/policy/terms_of_use.html); [feeds](https://www.gutenberg.org/cache/epub/feeds/).
- Standard Ebooks: US-PD source + CC0 on their editorial work; collection is the “best” PD edition of books generally published before 1931; they decline individual pamphlets/short works that belong in an omnibus. — [About](https://standardebooks.org/about); [Collections Policy](https://standardebooks.org/contribute/collections-policy).
- Neither PG license pages nor SE About/Uncopyright mention CEFR, graded readers, or recommended passage length.
- Vietnam life+50 (Điều 27) means a US-unrestricted 1925 novel by an author who died in 1980 is still protected in Vietnam until 31 Dec 2030. — [VN IP Law Art. 27](https://thuvienphapluat.vn/van-ban/EN/So-huu-tri-tue/Law-No-50-2005-QH11-of-November-29-2005-on-Intellectual-property/84542/tieng-anh.aspx).
- SE and PG warn that US-unrestricted ≠ free worldwide. — [SE Uncopyright](https://standardebooks.org/ebooks/charles-dickens/a-christmas-carol/text/uncopyright); [PG License](https://www.gutenberg.org/policy/license.html).

### Inferences

- **Practical MVP slice:** (1) filter catalog to US-unrestricted + author death year ≤ 1975 (for a 2026 Vietnam product); (2) prefer short stories, essays, and children’s titles over 80k-word novels; (3) cut at chapter/paragraph boundaries (300–800 words); (4) human CEFR tag (or CEFR-J-informed review); (5) store provenance (PG ebook number or SE Git URL) without using the PG trademark on paid UI; (6) optional LibriVox chapter audio for the same work.
- Standard Ebooks is the better **source file** (clean HTML, consistent markup, CC0 on their layer) once the underlying work clears Vietnam. Gutenberg is the better **discovery catalog** (`pg_catalog.csv`).
- Automatic “CEFR from Flesch-Kincaid” on Dickens will mis-label literary A2-looking short sentences as easy. That is a quality risk, not a license issue.
- Simplifying (rewriting) a PD passage into A2 English is a **new original** (EnglishFlow `PRODUCTION_ALLOWED`) if it does not copy a copyrighted graded-reader. Simplifying a **Wikipedia** passage is a CC BY-SA derivative.

### Gaps

- No official count of Gutenberg/SE titles that are also PD in Vietnam was computed in this pass.
- No official CEFR gold set for these corpora was found on the publisher sites.

---

## Any high-quality CC-BY (not SA, not NC) news or explainer sources?

### Takeaway
**True CC BY (no SA, no NC, no ND) news is scarce.** The best official hits for explainers are **Our World in Data writing/charts they produced** (CC BY, but their republish FAQ limits **material edits**) and **LSE Blogs** (CC BY 4.0, commercial adaptations allowed). **The Conversation is CC BY-ND** (and some editions charge commercial fees) — not suitable for leveling. Do not treat “CC news” aggregators as a license.

### Cited Findings

- **CC BY 4.0 deed:** share and adapt, including commercially; attribution; indicate changes; no extra legal/tech restrictions that block license freedoms. Not SA, not NC, not ND. — [creativecommons.org/licenses/by/4.0/](https://creativecommons.org/licenses/by/4.0/?lang=en).
- **Our World in Data** official FAQ [ourworldindata.org/how-to-use-our-world-in-data](https://ourworldindata.org/how-to-use-our-world-in-data/): charts they made (logo + CC BY stamp) may be reproduced with citation; data they produced is CC BY; third-party data stays on the provider’s terms. Articles: republish free with credit + link + specified byline; **“You must not edit the material, except to reflect relative changes in time, location and editorial style. If you do wish to make material edits, you will need to run them by us…”** Translations of their work are allowed under CC BY if marked unofficial. Chart Data API (CSV/JSON) is documented. Classification for **verbatim** OWID-authored explainers: `ATTRIBUTION_REQUIRED`. For **CEFR-leveled rewrites**: their FAQ requires prior approval → treat as `UNKNOWN` until written OK (the CC BY deed would allow adaptation; the site FAQ adds a no-material-edit rule).
- **LSE Blogs** [blogs.lse.ac.uk/republishing-policy](https://blogs.lse.ac.uk/republishing-policy/): unless otherwise stated, articles are **CC BY 4.0**; commercial full-text syndication, translation, abridgement, and teaching-material derivatives are allowed with TASL attribution (title, author, source, licence). Third-party images/charts may differ. Classification: `ATTRIBUTION_REQUIRED`. Register is academic B2–C1; better as explainer than “news.”
- **The Conversation** (US/AU/Africa/UK republishing pages): **CC BY-ND** (no derivatives). US: free republish with credit, logo preference, **mandatory page-view pixel**, images often not covered; translations need author approval (derivative). — [theconversation.com/us/republishing-guidelines](https://theconversation.com/us/republishing-guidelines). UK edition additionally: “If you’re planning to use our content for **commercial use**, you’ll need to pay a licensing fee.” — [UK republishing guidelines](https://gcp.theconversation.com/uk/republishing-guidelines). Classification: `RESEARCH_ONLY` / `DO_NOT_USE` for a commercial app that levels or excerpts into exercises (ND + possible commercial fee).
- **Creative Commons journalism guide** (CC BY 4.0 itself): CC BY / CC BY-SA are the least restrictive for reuse; NC/ND constrain downstream use. — [A Journalist’s Guide to Creative Commons (2023)](https://creativecommons.org/wp-content/uploads/2023/05/AJournalistsGuideToCreativeCommons2023_1.0.pdf).
- US federal explainers (NASA features, other `.gov` employee-written pages) are often **no-copyright** under § 105 rather than CC BY; still request acknowledgement; still mixed with third-party media. That is the closest “news-like” high-volume corpus without ShareAlike.

### Inferences

- There is **no** high-volume, officially CC BY (not SA/NC/ND) **daily news** wire comparable to VOA LE. For learner news, **VOA Learning English originals** beat CC news in both license clarity and level.
- For explainers without copyleft: **LSE Blogs (per-article CC BY 4.0)** and **verbatim OWID articles** (if you can live with their no-material-edit FAQ or get approval to simplify).
- The Conversation is the highest-quality CC news brand in this search and is still the wrong license (ND) for CEFR slicing.

### Gaps

- No official CC BY daily English news service with a dump/API and learner-appropriate length was found on primary terms pages in this pass.
- Hugging Face “CC news” / Common Crawl news corpora were not opened; without an upstream LICENSE on the dataset card they stay `UNKNOWN` and are likely copyrighted news text.
- OpenStax and other CC BY textbooks were out of the “news/encyclopedia/literature” brief and were not fully licensed here.

---

## Source scorecard (September 2026)

| Source | Official license location | Commercial? | SA / ND / NC | Typical length | CEFR | Download / API | Code |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Project Gutenberg (US-unrestricted, header stripped) | [permission](https://www.gutenberg.org/policy/permission.html), [license](https://www.gutenberg.org/policy/license.html) | Yes (US); VN term check required | None | Full books | Ungraded; needs leveling | Mirrors + [feeds](https://www.gutenberg.org/cache/epub/feeds/) | `PRODUCTION_ALLOWED` (US) / `UNKNOWN` (VN until death-year filter) |
| Project Gutenberg (header says copyrighted) | Same; ebook header | No (unless author license) | n/a | n/a | n/a | n/a | `DO_NOT_USE` |
| Standard Ebooks | [About](https://standardebooks.org/about), per-book Uncopyright / `LICENSE.md` | Yes (US); VN term check | CC0 on SE layer | Full books, cleaner HTML | Ungraded | Book pages + Git | `PRODUCTION_ALLOWED` (US) / `UNKNOWN` (VN until filter) |
| Simple English Wikipedia | [WMF ToU](https://foundation.wikimedia.org/wiki/Policy:Terms_of_Use) (local [Copyrights](https://simple.wikipedia.org/wiki/Wikipedia:Copyrights) stale) | Yes | **SA** | Short–medium articles | Simpler EN; no official CEFR | Wikimedia dumps / API | `ATTRIBUTION_REQUIRED` |
| English Wikipedia | [Copyrights](https://en.wikipedia.org/wiki/Wikipedia:Copyrights), [Reuse](https://en.wikipedia.org/wiki/Wikipedia:Reusing_Wikipedia_content) | Yes | **SA**; strip fair use | Medium–long | B2–C2 typical | `enwiki` dumps / API | `ATTRIBUTION_REQUIRED` |
| Wikibooks | [Wikibooks:Copyrights](https://en.wikibooks.org/wiki/Wikibooks:Copyrights) | Yes | **SA** | Textbook modules | Ungraded | `enwikibooks` dumps | `ATTRIBUTION_REQUIRED` |
| Wikisource | [Copyright policy](https://en.wikisource.org/wiki/Wikisource:Copyright_policy) | Per work | Contributions **SA**; sources often US-PD | Full works | Ungraded | Dumps + per-page tags | Mixed: PD work `PRODUCTION_ALLOWED` (US) / contribs `ATTRIBUTION_REQUIRED` / unscanned `UNKNOWN` |
| wikiHow | [wikiHow:Creative Commons](https://www.wikihow.com/wikiHow:Creative-Commons) | No (NC; post-2025 proprietary) | **NC+SA** (old); proprietary (new) | How-to articles | A2–B1-ish | n/a | `DO_NOT_USE` |
| VOA Learning English (exclusive VOA) | [Request Our Content](https://learningenglish.voanews.com/p/6861.html) | Yes + credit | None | Short learner news + MP3 | Learner-written; unofficial A2–B1 | Site + USAGM Direct | `ATTRIBUTION_REQUIRED` |
| VOA News (exclusive VOA) | [voanews.com/p/5338.html](https://www.voanews.com/p/5338.html) | Yes + credit | None | News features | B2–C1 | Site + USAGM Direct | `ATTRIBUTION_REQUIRED` |
| VOA / VOA LE wire (AP, Reuters, AFP) | Same pages | No | n/a | n/a | n/a | n/a | `DO_NOT_USE` |
| BBC Learning English | [terms](https://www.bbc.co.uk/worldservice/learningenglish/terms.shtml), [copyright](https://www.bbc.com/worldservice/learningenglish/copyright.shtml) | No | All rights reserved | Graded lessons | Designed for learners | n/a | `DO_NOT_USE` |
| News in Levels | [conditions](https://newsinlevels.com/conditions-of-use/), [2026 PDF](https://www.englishinlevels.com/wp-content/uploads/2026/02/Terms_and_Conditions_English_in_Levels.pdf) | No | All rights reserved | Short 3-level articles | Site’s own 1–3 | n/a | `DO_NOT_USE` |
| NASA original media/text | [Media guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/); [17 USC 105](https://uscode.house.gov/view.xhtml?req=%28title%3A17+section%3A105+edition%3Aprelim%29) | Informational/educational/textbook use; no endorsement | None (US); acknowledge NASA | Features, captions | Technical B2–C1 | nasa.gov | `ATTRIBUTION_REQUIRED` |
| NASA third-party / logos | Same | No | n/a | n/a | n/a | n/a | `DO_NOT_USE` |
| LibriVox recordings | [About](https://librivox.org/pages/about-librivox/) | Yes (US) | None (courtesy credit) | Chapter audio | Same as source book | Archive.org via LibriVox | `PRODUCTION_ALLOWED` (US); pair with VN-cleared text |
| “LibriVox transcripts” (third party) | Not a LibriVox product | Unclear / claimed by aggregator | n/a | n/a | n/a | n/a | `UNKNOWN` / `DO_NOT_USE` |
| Our World in Data (their writing/charts) | [FAQ](https://ourworldindata.org/how-to-use-our-world-in-data/) | Yes with credit | CC BY; FAQ limits material edits | Long explainers | B2–C1 | Chart Data API | `ATTRIBUTION_REQUIRED` (verbatim) |
| LSE Blogs | [Republishing policy](https://blogs.lse.ac.uk/republishing-policy/) | Yes | CC BY 4.0 (no SA/NC/ND) | Academic essays | B2–C1 | Per-article HTML | `ATTRIBUTION_REQUIRED` |
| The Conversation | [US guidelines](https://theconversation.com/us/republishing-guidelines) | Mixed (UK may fee) | **ND** | ~600–1,200 words | C1 explainers | Republish button | `DO_NOT_USE` for leveling; ND |
| Hugging Face mirrors | Dataset card must cite upstream | Only if card matches official license | Inherit upstream | Varies | Varies | HF `datasets` | `UNKNOWN` if LICENSE missing |
