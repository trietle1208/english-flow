#!/usr/bin/env python3
"""Generate ~600 extra TOEIC seed rows from TSL definitions + IPA + VI gloss."""

from __future__ import annotations

import csv
import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TARGET = 600
CACHE_PATH = ROOT / "scripts" / ".toeic-extra-cache.json"
OUT_PATH = ROOT / "src" / "db" / "seed-data" / "toeic-vocabulary-extra.ts"
EXISTING_TOEIC = ROOT / "src" / "db" / "seed-data" / "toeic-vocabulary.ts"
EXISTING_GENERAL = ROOT / "src" / "db" / "seed-data" / "vocabulary.ts"

TOPIC_KEYWORDS = {
    "office": ["office", "admin", "document", "memo", "agenda", "deadline", "policy", "procedure", "authorize", "supervise", "manager", "department", "file", "clerk", "secretary", "report"],
    "hr": ["hire", "recruit", "salary", "payroll", "staff", "employee", "interview", "trainee", "resign", "promote", "benefit", "career", "resume", "applicant", "personnel", "colleague", "overtime", "credential", "qualify", "candidate"],
    "sales": ["sale", "client", "customer", "price", "discount", "invoice", "revenue", "profit", "market", "retail", "bargain", "commission", "contract", "quote", "deposit", "expense", "budget", "finance", "bank", "pay", "cost", "fee", "warranty", "refund", "negotiate", "competitor", "advertis", "promot"],
    "logistics": ["ship", "freight", "warehouse", "deliver", "inventory", "supplier", "manufacture", "factory", "facility", "transport", "cargo", "package", "assemble", "operate", "maintain", "distribute", "stock", "load"],
    "meetings": ["conference", "attend", "present", "discuss", "notify", "request", "survey", "announce", "communicate", "seminar", "workshop", "appointment", "invite", "respond", "reply", "telephone", "email", "fax"],
}


def extract_words_from_ts(path: Path) -> set[str]:
    text = path.read_text(encoding="utf-8")
    return {m.group(1).lower() for m in re.finditer(r'word:\s*"([^"]+)"', text)}


def load_freq() -> list[str]:
    words = []
    with open("/tmp/tsl_freq.csv", encoding="utf-8") as f:
        for line in f:
            w = line.split(",")[0].strip().lower()
            if w:
                words.append(w)
    return words


def load_defs() -> dict[str, str]:
    defs: dict[str, str] = {}
    with open("/tmp/tsl_defs.csv", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            word = (row.get("TSL Word") or "").strip().lower()
            definition = (row.get("TSL Definition") or "").strip()
            if word and definition:
                defs[word] = definition
    return defs


def load_ipa() -> dict[str, str]:
    ipa: dict[str, str] = {}
    with open("/tmp/en_US_ipa.txt", encoding="utf-8") as f:
        for line in f:
            if "\t" not in line:
                continue
            word, rest = line.rstrip("\n").split("\t", 1)
            first = rest.split(",")[0].strip()
            if not first.startswith("/"):
                first = f"/{first}/"
            ipa[word.lower()] = first
    return ipa


def guess_pos(word: str) -> str:
    if " " in word:
        return "phrase"
    if word.endswith("ly"):
        return "adverb"
    if re.search(r"(tion|sion|ment|ness|ity|ance|ence|ship|ism|age)$", word):
        return "noun"
    if re.search(r"(ous|ive|ful|less|ical|able|ible|al|ent|ant)$", word):
        return "adjective"
    if re.search(r"(ize|ise|ate|ify|en)$", word):
        return "verb"
    if word.endswith(("ing", "ed")):
        return "verb"
    return "noun"


def map_api_pos(raw: str | None) -> str | None:
    if not raw:
        return None
    p = raw.lower()
    for key in ("noun", "verb", "adjective", "adverb", "pronoun", "preposition", "conjunction", "interjection"):
        if key in p:
            return key
    return None


def assign_topic(word: str, definition: str) -> str:
    hay = f"{word} {definition}".lower()
    for topic, keys in TOPIC_KEYWORDS.items():
        if any(k in hay for k in keys):
            return topic
    return "core"


def difficulty_for_rank(rank: int, total: int) -> str:
    ratio = rank / max(total, 1)
    if ratio < 0.33:
        return "easy"
    if ratio < 0.66:
        return "medium"
    return "hard"


def pronunciation_from_ipa(word: str, ipa: str) -> str:
    cleaned = re.sub(r"[/ˈˌː.\s]+", "-", ipa)
    cleaned = re.sub(r"-+", "-", cleaned).strip("-")
    parts = [p for p in cleaned.split("-") if p]
    if not parts:
        return word.upper()
    return "-".join(p.upper() if i == 0 else p.lower() for i, p in enumerate(parts))


def example_for(word: str, pos: str) -> str:
    if pos == "verb":
        return f"They decided to {word} the plan after the review."
    if pos == "adjective":
        return f"This is a {word} solution for our team."
    if pos == "adverb":
        return f"She responded {word} to the client's request."
    if pos in {"phrase", "phrasal_verb"}:
        return f"Please {word} before the deadline."
    return f"Please check the {word} before the meeting."


def http_get_json(url: str, timeout: float = 12.0):
    req = urllib.request.Request(url, headers={"User-Agent": "english-flow-seed/1.0"})
    with urllib.request.urlopen(req, timeout=timeout) as res:
        return json.loads(res.read().decode("utf-8"))


def translate(text: str) -> str:
    url = (
        "https://api.mymemory.translated.net/get?q="
        + urllib.parse.quote(text[:450])
        + "&langpair=en|vi"
    )
    data = http_get_json(url)
    out = (data.get("responseData") or {}).get("translatedText") or ""
    out = re.sub(r"\s+", " ", out).strip()
    if not out or "MYMEMORY WARNING" in out.upper() or "INVALID" in out.upper():
        raise RuntimeError(f"bad translation: {out!r}")
    return out


def enrich_dict(word: str, ipa_map: dict[str, str]) -> tuple[str, str, str]:
    pos = guess_pos(word)
    phonetic = ipa_map.get(word) or f"/{word}/"
    try:
        data = http_get_json(
            f"https://api.dictionaryapi.dev/api/v2/entries/en/{urllib.parse.quote(word)}"
        )
        entry = data[0]
        pos = map_api_pos((entry.get("meanings") or [{}])[0].get("partOfSpeech")) or pos
        phonetic = (
            entry.get("phonetic")
            or next((p.get("text") for p in entry.get("phonetics") or [] if p.get("text")), None)
            or phonetic
        )
    except Exception:
        pass
    pronunciation = pronunciation_from_ipa(word, phonetic)
    return pos, phonetic, pronunciation


def esc(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"')


def main() -> None:
    existing = extract_words_from_ts(EXISTING_TOEIC) | extract_words_from_ts(EXISTING_GENERAL)
    defs = load_defs()
    ipa_map = load_ipa()
    freq = load_freq()

    selected: list[str] = []
    for word in freq:
        if word in existing or word in selected:
            continue
        if word not in defs:
            continue
        if not re.match(r"^[a-z][a-z0-9'-]*$", word):
            continue
        selected.append(word)
        if len(selected) >= TARGET:
            break

    print(f"Selected {len(selected)} lemmas", flush=True)
    cache: dict = {}
    if CACHE_PATH.exists():
        cache = json.loads(CACHE_PATH.read_text(encoding="utf-8"))

    for i, word in enumerate(selected, start=1):
        if cache.get(word, {}).get("meaning"):
            continue
        definition = defs[word]
        print(f"enriching [{i}/{len(selected)}] {word}", flush=True)
        try:
            meaning = translate(definition)
            pos, phonetic, pronunciation = enrich_dict(word, ipa_map)
            cache[word] = {
                "meaning": meaning,
                "partOfSpeech": pos,
                "phonetic": phonetic,
                "pronunciation": pronunciation,
            }
            if i % 10 == 0:
                CACHE_PATH.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")
                print(f"progress {i}/{len(selected)} cached={len(cache)}", flush=True)
            time.sleep(0.05)
        except Exception as err:
            CACHE_PATH.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")
            print(f"Failed on {word}: {err}", flush=True)
            time.sleep(1.2)

    CACHE_PATH.write_text(json.dumps(cache, ensure_ascii=False, indent=2), encoding="utf-8")
    ready = [w for w in selected if cache.get(w, {}).get("meaning")]
    print(f"Ready rows: {len(ready)}", flush=True)

    rows = []
    for idx, word in enumerate(ready):
        c = cache[word]
        definition = defs[word]
        rows.append(
            {
                "word": word,
                "pronunciation": c["pronunciation"],
                "phonetic": c["phonetic"],
                "partOfSpeech": c["partOfSpeech"],
                "meaning": c["meaning"],
                "exampleSentence": example_for(word, c["partOfSpeech"]),
                "difficulty": difficulty_for_rank(idx, len(ready)),
                "topic": assign_topic(word, definition),
            }
        )

    body = ",\n".join(
        "  {\n"
        f'    word: "{esc(r["word"])}",\n'
        f'    pronunciation: "{esc(r["pronunciation"])}",\n'
        f'    phonetic: "{esc(r["phonetic"])}",\n'
        f'    partOfSpeech: "{r["partOfSpeech"]}",\n'
        f'    meaning: "{esc(r["meaning"])}",\n'
        f'    exampleSentence: "{esc(r["exampleSentence"])}",\n'
        f'    difficulty: "{r["difficulty"]}",\n'
        f'    topic: "{r["topic"]}",\n'
        "  }"
        for r in rows
    )

    OUT_PATH.write_text(
        "import type { ToeicVocabularySeed } from \"@/db/seed-data/toeic-vocabulary\";\n\n"
        f"/** Extra TOEIC catalog lemmas (~{len(rows)}) from TSL 1.1 (freq order). */\n"
        "export const toeicVocabularyExtraSeed: ToeicVocabularySeed[] = [\n"
        f"{body}\n"
        "];\n",
        encoding="utf-8",
    )
    print(f"Wrote {len(rows)} -> {OUT_PATH}", flush=True)
    by_topic: dict[str, int] = {}
    for r in rows:
        by_topic[r["topic"]] = by_topic.get(r["topic"], 0) + 1
    print(json.dumps(by_topic, ensure_ascii=False, indent=2), flush=True)


if __name__ == "__main__":
    main()
