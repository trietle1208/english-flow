# TOEIC vocabulary import (EN–VI dictionary ∩ TSL + curated fill)

Date: 2026-09-21 (updated: ~5000 catalog)

## Goal

Fill EnglishFlow’s `/vocabulary/toeic` catalog with licensed, learner-safe
rows — **without** dumping the full ~105k-entry EN–VI dictionary.

## Sources

| Role | Source | License |
| --- | --- | --- |
| Core lemma filter | [TOEIC Service List (TSL) 1.1](https://www.newgeneralservicelist.org/new-general-service-list-project-20) (Browne & Culligan, 2016) | CC BY-SA 4.0 |
| Expansion + VI/IPA/examples | [english-vietnamese-dictionary](https://github.com/skypediacode/english-vietnamese-dictionary) (Skypedia / MinhQND) | CC BY-SA 4.0 |

Both require attribution + ShareAlike for derivatives. UI aside +
`content_sources` rows record provenance (`TOEIC_TSL_ATTRIBUTION`,
`TOEIC_DICT_ATTRIBUTION`).

## Subset strategy (~5000)

1. **Core:** parse TSL 1.1 alphabetized headwords (~1259) and keep every
   lemma that has a usable sense in `dictionary_en_vi.db` (~1182).
2. **Expand** to `--target` (default **5000**) with curated single-word
   lemmas from the same dictionary:
   - ASCII `a–z`, length 3–12, no spaces/hyphens
   - POS ∈ {N, V, A, D}, IPA present, example ≥ 20 chars
   - Rank: topic/business keyword hits, then shorter forms
3. One sense per word (prefer earlier senses, business-relevant VI glosses,
   examples containing the headword, US/NAmE IPA when present).
4. Skip lemmas already in general `vocabularySeed` (unique on `word`).
5. Assign `topic` ∈ {office, hr, sales, logistics, meetings} via keyword
   scoring (stable letter-bucket fallback).
6. Map difficulty by morphology/length; ASCII learner `pronunciation` from
   IPA (`audioUrl` null → Web Speech fallback).

### Resulting counts (this import)

- Target: **5000**
- TSL kept: **~1182**
- Dictionary fill: **~3818**
- Skipped (general vocab seed): **~31**
- TSL missing from dictionary: **~45**
- By topic (approx.): office ~929 · hr ~684 · sales ~1082 · logistics ~1034 · meetings ~1271

## Why not dump the full dictionary?

The SQLite DB is a general EN–VI lexicon (104k+ headwords). Shipping it
wholesale would overwhelm browse/search UX and mix slang, archaic, and
non-business vocabulary into the TOEIC catalog. TSL remains the documented
core; the fill is quality-filtered, not “all words”.

## Regeneration

```bash
# Download once (gitignored under tmp/)
curl -L -o tmp/dictionary_en_vi.db \
  https://github.com/skypediacode/english-vietnamese-dictionary/raw/main/dictionary_en_vi.db
curl -L -o tmp/tsl_11_alphabetized_description.txt \
  https://www.newgeneralservicelist.org/files/s/tsl_11_alphabetized_description.txt

python3 scripts/import-toeic-from-en-vi-dict.py --target 5000
# load .env then:
npm run db:seed
```

Generated output: `src/db/seed-data/toeic-vocabulary-entries.json`
(loaded by `toeic-vocabulary-seed.ts`, which only `seed.ts` imports).
Constants/attribution stay in `toeic-vocabulary.ts` so client UI does not
bundle the JSON. JSON (vs TS literals) also avoids TS2590.

## Out of scope

- Full dictionary browse UI
- TTS MP3 generation
- Reintroducing scraped TFLAT / MyMemory batches
