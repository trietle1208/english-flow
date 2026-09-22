#!/usr/bin/env python3
"""
Import a TOEIC-relevant subset from the licensed EN–VI SQLite dictionary
into EnglishFlow seed data.

Strategy (documented in docs/research/toeic-vocabulary-import.md):
  - Core lemmas: TOEIC Service List (TSL) 1.1 (CC BY-SA 4.0)
  - Expand to --target (~5000) with curated single-word lemmas from the
    EN–VI dictionary (quality + business-topic scoring) — not the full 104k
  - Lexical content (VI def, IPA, example): english-vietnamese-dictionary
    (Skypedia / MinhQND, CC BY-SA 4.0)
  - One sense per lemma; skip overlaps with general vocabularySeed
  - Topic assigned by keyword scoring into the five existing TOEIC topics

Usage:
  python3 scripts/import-toeic-from-en-vi-dict.py \\
    --db tmp/dictionary_en_vi.db \\
    --tsl tmp/tsl_11_alphabetized_description.txt \\
    --target 5000 \\
    --out src/db/seed-data/toeic-vocabulary-entries.json
"""

from __future__ import annotations

import argparse
import json
import re
import sqlite3
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

POS_MAP = {
    "N": "noun",
    "noun": "noun",
    "n": "noun",
    "V": "verb",
    "verb": "verb",
    "A": "adjective",
    "adj": "adjective",
    "D": "adverb",
    "adv": "adverb",
    "C": "conjunction",
    "P": "pronoun",
    "O": "interjection",
    "idiom": "phrase",
    "E": "preposition",
}

POS_PRIORITY = {
    "noun": 0,
    "verb": 1,
    "adjective": 2,
    "adverb": 3,
    "phrase": 4,
    "phrasal_verb": 4,
    "preposition": 5,
    "conjunction": 6,
    "pronoun": 7,
    "interjection": 8,
}

REGION_PRIORITY = {
    "US": 0,
    "NAmE": 1,
    "General-American": 2,
    "us": 3,
    None: 4,
    "": 4,
    "BrE": 5,
    "UK": 6,
    "uk": 7,
    "Received-Pronunciation": 8,
}

TOPIC_KEYWORDS: dict[str, set[str]] = {
    "office": {
        "office", "admin", "administrative", "administrator", "secretary",
        "clerk", "document", "file", "folder", "memo", "memorandum", "desk",
        "stationery", "printer", "photocopy", "copy", "fax", "email", "inbox",
        "archive", "record", "form", "template", "procedure", "policy",
        "regulation", "compliance", "equipment", "facility", "building",
        "workplace", "workbook", "workshop", "computer", "software", "hardware",
        "network", "wireless", "password", "schedule", "calendar", "appointment",
        "deadline", "task", "duty", "responsibility", "supervisor", "manager",
        "management", "executive", "director", "assistant", "receptionist",
        "correspondence", "letter", "envelope", "postage", "typewriter",
        "type", "draft", "revise", "edit", "proofread", "bind", "staple",
        "paperwork", "filing", "cabinet", "supply", "inventory", "asset",
    },
    "hr": {
        "hire", "hiring", "recruit", "recruitment", "applicant", "application",
        "interview", "resume", "résumé", "cv", "candidate", "employee",
        "employer", "employment", "personnel", "human", "resource", "hr",
        "salary", "wage", "payroll", "benefit", "pension", "retirement",
        "promotion", "promote", "trainee", "training", "orientation",
        "probation", "resign", "resignation", "retire", "layoff", "downsize",
        "dismiss", "termination", "fire", "staff", "workforce", "colleague",
        "coworker", "team", "morale", "motivation", "appraisal", "evaluation",
        "performance", "skill", "qualification", "certificate", "credential",
        "internship", "intern", "volunteer", "attendance", "absent", "absence",
        "leave", "vacation", "holiday", "overtime", "flextime", "shift",
        "paycheck", "bonus", "incentive", "compensation", "insurance",
        "healthcare", "sick", "maternity", "paternity", "diversity",
        "discrimination", "harassment", "workplace",
    },
    "sales": {
        "sale", "sales", "sell", "selling", "buyer", "seller", "customer",
        "client", "consumer", "purchase", "buy", "order", "invoice", "bill",
        "receipt", "refund", "discount", "bargain", "deal", "offer", "price",
        "pricing", "cost", "profit", "revenue", "income", "expense", "budget",
        "finance", "financial", "accounting", "accountant", "audit", "tax",
        "bank", "banking", "loan", "credit", "debit", "payment", "pay",
        "currency", "exchange", "invest", "investment", "stock", "share",
        "market", "marketing", "advertise", "advertisement", "advertiser",
        "campaign", "brand", "product", "merchandise", "retail", "wholesale",
        "commerce", "commercial", "transaction", "contract", "negotiate",
        "negotiation", "quote", "quotation", "estimate", "warranty",
        "guarantee", "commission", "interest", "mortgage", "insurance",
        "claim", "premium", "deposit", "withdraw", "withdrawal", "balance",
        "statement", "ledger", "fiscal", "quarter", "annual", "yen",
    },
    "logistics": {
        "ship", "shipment", "shipping", "cargo", "freight", "load", "unload",
        "warehouse", "storage", "store", "inventory", "stock", "supply",
        "supplier", "vendor", "deliver", "delivery", "distribute",
        "distribution", "transport", "transportation", "truck", "lorry",
        "vehicle", "fleet", "route", "itinerary", "destination", "departure",
        "arrival", "airport", "airplane", "airline", "flight", "boarding",
        "baggage", "luggage", "customs", "import", "export", "port", "dock",
        "harbor", "harbour", "container", "package", "parcel", "packing",
        "pack", "label", "tracking", "logistics", "operation", "operations",
        "manufacture", "manufacturing", "factory", "plant", "production",
        "assembly", "raw", "material", "equipment", "machinery", "maintenance",
        "repair", "spare", "part", "quality", "inspection", "inspect",
        "defect", "delay", "schedule", "timetable", "transit", "carrier",
        "courier", "express", "urgent", "overnight",
    },
    "meetings": {
        "meeting", "conference", "seminar", "presentation", "present",
        "agenda", "minute", "minutes", "attend", "attendance", "attendee",
        "participant", "speaker", "audience", "discuss", "discussion",
        "debate", "propose", "proposal", "suggest", "suggestion", "opinion",
        "agree", "agreement", "disagree", "consensus", "vote", "decision",
        "decide", "resolve", "resolution", "negotiate", "negotiation",
        "bargain", "persuade", "convince", "announce", "announcement",
        "inform", "notify", "notification", "communicate", "communication",
        "correspond", "telephone", "call", "phone", "message", "memo",
        "briefing", "brief", "report", "summary", "summarize", "clarify",
        "clarify", "interrupt", "apology", "apologize", "thank", "greeting",
        "introduce", "introduction", "handshake", "appointment", "reservation",
        "book", "confirm", "confirmation", "cancel", "cancellation",
        "postpone", "reschedule", "delay", "follow-up", "followup",
        "feedback", "comment", "question", "answer", "respond", "response",
        "listen", "speak", "speech", "talk", "conversation", "dialogue",
        "workshop", "forum", "panel", "moderator", "chair", "chairman",
        "chairperson", "facilitate", "facilitator",
    },
}

# Words that should prefer a specific topic even if keywords are weak.
TOPIC_OVERRIDES: dict[str, str] = {
    "agenda": "meetings",
    "deadline": "office",
    "invoice": "sales",
    "shipment": "logistics",
    "salary": "hr",
    "hire": "hr",
    "recruit": "hr",
    "applicant": "hr",
    "interview": "hr",
    "negotiate": "sales",
    "discount": "sales",
    "warehouse": "logistics",
    "freight": "logistics",
    "cargo": "logistics",
    "presentation": "meetings",
    "conference": "meetings",
    "memo": "office",
    "secretary": "office",
}


def parse_tsl(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8-sig")
    words: list[str] = []
    for line in text.splitlines():
        m = re.match(r"^\s*\d+\.\s+(.+?)\s*$", line)
        if m:
            words.append(m.group(1).strip().lower())
    # Drop obvious non-lemmas / encoding oddities
    cleaned = []
    for w in words:
        if not w or w == "résumé":
            # try ascii fallback later via missing; keep if in DB as resume
            cleaned.append(w)
            continue
        cleaned.append(w)
    return cleaned


def load_general_vocab_words(vocab_path: Path) -> set[str]:
    text = vocab_path.read_text(encoding="utf-8")
    return {m.group(1).lower() for m in re.finditer(r'word:\s*"([^"]+)"', text)}


# Longest-first IPA phoneme → ASCII respelling (tokens, never cascading replace).
IPA_PHONEMES: list[tuple[str, str]] = [
    ("tʃ", "ch"),
    ("dʒ", "j"),
    ("θ", "th"),
    ("ð", "dh"),
    ("ʃ", "sh"),
    ("ʒ", "zh"),
    ("ŋ", "ng"),
    ("aɪ", "igh"),
    ("eɪ", "ay"),
    ("ɔɪ", "oy"),
    ("aʊ", "ow"),
    ("oʊ", "oh"),
    ("əʊ", "oh"),
    ("ɪə", "eer"),
    ("eə", "air"),
    ("ʊə", "oor"),
    ("iː", "ee"),
    ("uː", "oo"),
    ("ɑː", "ah"),
    ("ɔː", "aw"),
    ("ɜː", "ur"),
    ("æ", "a"),
    ("ɑ", "ah"),
    ("ɒ", "o"),
    ("ɔ", "aw"),
    ("ə", "uh"),
    ("ɜ", "ur"),
    ("ɛ", "e"),
    ("ɪ", "i"),
    ("i", "ee"),
    ("ʊ", "oo"),
    ("u", "oo"),
    ("ʌ", "uh"),
    ("e", "e"),
    ("p", "p"),
    ("b", "b"),
    ("t", "t"),
    ("d", "d"),
    ("k", "k"),
    ("g", "g"),
    ("f", "f"),
    ("v", "v"),
    ("s", "s"),
    ("z", "z"),
    ("h", "h"),
    ("m", "m"),
    ("n", "n"),
    ("l", "l"),
    ("r", "r"),
    ("w", "w"),
    ("j", "y"),
    ("x", "kh"),
]

BUSINESS_VI_HINTS = (
    "lương",
    "hạn cuối",
    "thời hạn",
    "hóa đơn",
    "danh đơn",
    "nghị sự",
    "nghị trình",
    "đàm phán",
    "thương lượng",
    "thuê",
    "nhân công",
    "nhân viên",
    "hàng hoá",
    "hàng hóa",
    "vận chuyển",
    "gửi hàng",
    "họp",
    "hội nghị",
    "lịch trình",
    "văn phòng",
    "công ty",
    "khách hàng",
    "thanh toán",
    "ngân hàng",
    "hợp đồng",
    "doanh",
    "kinh doanh",
    "tuyển",
    "phỏng vấn",
    "lịch làm",
)


def normalize_ipa(ipa: str | None) -> str | None:
    if not ipa:
        return None
    s = ipa.strip()
    if not s:
        return None
    # Drop parenthetical optional sounds markers lightly
    if not s.startswith("/"):
        s = "/" + s
    if not s.endswith("/"):
        s = s + "/"
    return s


def ipa_to_pronunciation(word: str, ipa: str | None) -> str:
    """Best-effort learner respelling (ASCII). Prefer readable over perfect."""
    if not ipa:
        return _fallback_pronunciation(word)

    raw = ipa.strip().strip("/")
    phone_map = dict(IPA_PHONEMES)
    vowel_ascii = {
        "a",
        "ah",
        "aw",
        "e",
        "ee",
        "i",
        "o",
        "oh",
        "oo",
        "oy",
        "ow",
        "ay",
        "igh",
        "uh",
        "ur",
        "air",
        "eer",
        "oor",
    }

    # Tokenize into ('stress'|'phone', value)
    tokens: list[tuple[str, str]] = []
    i = 0
    while i < len(raw):
        ch = raw[i]
        if ch in "ˈ'":
            tokens.append(("stress", "primary"))
            i += 1
            continue
        if ch == "ˌ":
            tokens.append(("stress", "secondary"))
            i += 1
            continue
        if ch == ".":
            tokens.append(("break", "."))
            i += 1
            continue
        if ch in "()[] :ː":
            i += 1
            continue
        matched = False
        for phone, _ascii in IPA_PHONEMES:
            if raw.startswith(phone, i):
                tokens.append(("phone", phone))
                i += len(phone)
                matched = True
                break
        if not matched:
            i += 1

    if not any(k == "phone" for k, _ in tokens):
        return _fallback_pronunciation(word)

    # Build phone list with syllable breaks from explicit markers OR vowel nuclei.
    chunks: list[list[str]] = [[]]
    stress_on_chunk: list[bool] = [False]
    pending_stress = False
    saw_primary = False

    def new_chunk(stressed: bool) -> None:
        if chunks[-1]:
            chunks.append([])
            stress_on_chunk.append(stressed)
        else:
            stress_on_chunk[-1] = stressed or stress_on_chunk[-1]

    for kind, val in tokens:
        if kind == "stress":
            pending_stress = True
            if val == "primary":
                saw_primary = True
            continue
        if kind == "break":
            new_chunk(False)
            continue
        # phone
        ascii_phone = phone_map[val]
        is_vowel = ascii_phone in vowel_ascii
        if pending_stress:
            new_chunk(True)
            pending_stress = False
        elif is_vowel and chunks[-1] and any(
            phone_map.get(p, p) in vowel_ascii for p in chunks[-1]
        ):
            # New vowel nucleus → new syllable; keep last consonant as onset if any
            onset: list[str] = []
            while chunks[-1] and phone_map.get(chunks[-1][-1], "") not in vowel_ascii:
                onset.insert(0, chunks[-1].pop())
            if not chunks[-1]:
                # all consonants belonged to onset — keep them here if first chunk empty
                pass
            chunks.append(onset)
            stress_on_chunk.append(False)
        chunks[-1].append(val)

    # Drop empty
    paired = [(c, s) for c, s in zip(chunks, stress_on_chunk) if c]
    if not paired:
        return _fallback_pronunciation(word)

    if not saw_primary:
        # Stress the first syllable with a vowel
        for idx, (c, _) in enumerate(paired):
            if any(phone_map[p] in vowel_ascii for p in c):
                paired[idx] = (c, True)
                break

    out: list[str] = []
    for phones, is_stressed in paired:
        spelled = "".join(phone_map[p] for p in phones)
        if not spelled:
            continue
        out.append(spelled.upper() if is_stressed else spelled.lower())
    return "-".join(out) if out else _fallback_pronunciation(word)


def _fallback_pronunciation(word: str) -> str:
    parts = re.split(r"[\s\-]+", word)
    if len(parts) == 1:
        return word.upper()
    return "-".join(
        p.upper() if i == len(parts) - 1 else p.lower() for i, p in enumerate(parts)
    )


def clean_definition(text: str) -> str:
    s = text.strip()
    s = re.sub(r"^[,;\s]+", "", s)
    s = re.sub(r"\s+", " ", s)
    # Drop leading parenthetical labels but keep body when short label
    return s.strip()


def definition_quality(defn: str, sense_index: int = 0) -> int:
    """Lower is better."""
    s = defn.strip()
    low = s.lower()
    score = sense_index * 3  # prefer earlier (usually primary) senses
    if s.startswith(",") or s.startswith(";"):
        score += 50
    if low.startswith("(như)"):
        score += 40
    if "thơ ca" in low or "kinh thánh" in low or "văn học" in low:
        score += 25
    if "nhà tù" in low or ("tù" in low and "hạn" not in low and "thời hạn" not in low):
        score += 35
    if "từ lóng" in low:
        score += 15
    if any(h in low for h in BUSINESS_VI_HINTS):
        score -= 28
    if len(s) < 3:
        score += 30
    if len(s) > 180:
        score += 10
    # Prefer concise learner-friendly defs
    score += max(0, (len(s) - 80) // 20)
    return score


def example_contains_word(example: str, word: str) -> bool:
    if not example:
        return False
    # Allow plural/tense light match via word boundary on stem-ish
    pattern = re.compile(rf"\b{re.escape(word)}\w*\b", re.IGNORECASE)
    return bool(pattern.search(example))


def pick_pronunciation(rows: list[tuple[str | None, str | None]]) -> str | None:
    """rows: (ipa, region)"""
    if not rows:
        return None
    ranked = sorted(
        rows,
        key=lambda r: REGION_PRIORITY.get(r[1], 50),
    )
    return normalize_ipa(ranked[0][0])


def assign_topic(word: str, meaning: str, example: str) -> str:
    if word in TOPIC_OVERRIDES:
        return TOPIC_OVERRIDES[word]

    blob = f"{word} {meaning} {example}".lower()
    scores: dict[str, int] = {t: 0 for t in TOPIC_KEYWORDS}
    for topic, kws in TOPIC_KEYWORDS.items():
        for kw in kws:
            if kw in blob:
                # exact word match weighs more
                if re.search(rf"\b{re.escape(kw)}\b", blob):
                    scores[topic] += 3
                else:
                    scores[topic] += 1
            if kw == word:
                scores[topic] += 5

    best = max(scores.items(), key=lambda kv: kv[1])
    if best[1] <= 0:
        # Stable fallback spread by first letter so chips aren't empty
        bucket = ord(word[0]) % 5
        return ["office", "hr", "sales", "logistics", "meetings"][bucket]
    return best[0]


def assign_difficulty(word: str, rank: int) -> str:
    # TSL list order is alphabetical here, so use morphology + length
    hard_suffixes = (
        "tion", "sion", "ment", "ance", "ence", "ivity", "ology",
        "ative", "ative", "ical", "ially", "ously", "ively",
    )
    if any(word.endswith(s) for s in hard_suffixes) or len(word) >= 11:
        return "hard"
    if len(word) <= 5 and "-" not in word and " " not in word:
        return "easy"
    if len(word) <= 7:
        return "medium"
    return "hard" if len(word) >= 10 else "medium"


def fetch_senses(cur: sqlite3.Cursor, word: str) -> list[dict]:
    # Try exact, then common spelling variants
    candidates = [word]
    if word == "résumé":
        candidates.extend(["resume", "résumé"])
    if word.endswith("person"):
        candidates.append(word)
    if "-" in word:
        candidates.append(word.replace("-", ""))
        candidates.append(word.replace("-", " "))

    wid = None
    used = word
    for c in candidates:
        row = cur.execute("SELECT id, word FROM words WHERE word = ?", (c,)).fetchone()
        if row:
            wid, used = row
            break
    if wid is None:
        return []

    defs = cur.execute(
        """
        SELECT d.pos, d.sub_pos, d.definition, wd.example
        FROM word_definitions wd
        JOIN definitions d ON wd.definition_id = d.id
        WHERE wd.word_id = ?
        """,
        (wid,),
    ).fetchall()

    prons = cur.execute(
        "SELECT ipa, region FROM pronunciations WHERE word_id = ?",
        (wid,),
    ).fetchall()
    ipa = pick_pronunciation([(p[0], p[1]) for p in prons])

    senses = []
    for idx, (pos, sub_pos, definition, example) in enumerate(defs):
        mapped = POS_MAP.get(pos or "")
        if not mapped:
            continue
        # Prefer phrasal_verb when sub_pos hints
        if mapped == "verb" and sub_pos and "phrasal" in (sub_pos or "").lower():
            mapped = "phrasal_verb"
        if " " in used and mapped == "verb":
            mapped = "phrasal_verb"
        defn = clean_definition(definition or "")
        ex = (example or "").strip()
        if not defn or not ex:
            continue
        senses.append(
            {
                "word": used,
                "pos": mapped,
                "meaning": defn,
                "example": ex,
                "ipa": ipa,
                "quality": definition_quality(defn, sense_index=idx),
                "ex_quality": example_quality(ex, used),
                "ex_hit": example_contains_word(ex, used),
            }
        )
    return senses


def example_quality(example: str, word: str) -> int:
    """Lower is better."""
    s = example.strip()
    low = s.lower()
    score = 0
    if f"the word {word}" in low or "is used in english" in low:
        score += 60
    if len(s) < 20:
        score += 15
    if len(s) > 140:
        score += 8
    if not example_contains_word(s, word):
        score += 40
    return score


def pick_best_sense(senses: list[dict]) -> dict | None:
    if not senses:
        return None
    senses = sorted(
        senses,
        key=lambda s: (
            s["quality"] + s.get("ex_quality", 0),
            POS_PRIORITY.get(s["pos"], 9),
            len(s["meaning"]),
        ),
    )
    return senses[0]


def list_fill_candidates(cur: sqlite3.Cursor, exclude: set[str], limit: int) -> list[str]:
    """
    Ranked single-word lemmas from the dictionary to expand beyond TSL.
    Prefer shorter common-looking forms and words that hit topic keywords.
    """
    if limit <= 0:
        return []

    topic_words: set[str] = set()
    for kws in TOPIC_KEYWORDS.values():
        topic_words.update(kws)
    topic_words.update(TOPIC_OVERRIDES.keys())

    rows = cur.execute(
        """
        SELECT DISTINCT w.word
        FROM words w
        JOIN word_definitions wd ON w.id = wd.word_id
        JOIN definitions d ON wd.definition_id = d.id
        WHERE w.word GLOB '[a-z][a-z]*'
          AND length(w.word) BETWEEN 3 AND 12
          AND instr(w.word, ' ') = 0
          AND instr(w.word, '-') = 0
          AND instr(w.word, "'") = 0
          AND d.pos IN ('N', 'V', 'A', 'D')
          AND wd.example IS NOT NULL
          AND length(trim(wd.example)) >= 20
        """
    ).fetchall()

    scored: list[tuple[int, int, str]] = []
    for (word,) in rows:
        w = word.lower().strip()
        if not w or w in exclude:
            continue
        if not re.fullmatch(r"[a-z]+", w):
            continue
        # Prefer business/topic hits, then shorter lemmas (often higher frequency).
        score = 0
        if w in topic_words:
            score += 50
        for kw in topic_words:
            if len(kw) >= 4 and (w.startswith(kw) or kw.startswith(w)):
                score += 8
                break
        # Mild length preference (4–8 letter "core" vocab)
        if 4 <= len(w) <= 8:
            score += 5
        elif len(w) <= 3:
            score -= 2
        scored.append((-score, len(w), w))

    scored.sort()
    out: list[str] = []
    seen: set[str] = set()
    for _neg, _ln, w in scored:
        if w in seen:
            continue
        seen.add(w)
        out.append(w)
        if len(out) >= limit:
            break
    return out


def build_entry(
    cur: sqlite3.Cursor,
    lemma: str,
    skip: set[str],
    rank: int,
) -> tuple[dict | None, str | None]:
    """
    Returns (entry, skip_reason). skip_reason is 'existing' | 'missing' | None.
    """
    if lemma in skip:
        return None, "existing"
    senses = fetch_senses(cur, lemma)
    best = pick_best_sense(senses)
    if not best:
        return None, "missing"
    word = best["word"]
    if word.lower() in skip:
        return None, "existing"

    phonetic = best["ipa"] or f"/{word}/"
    return (
        {
            "word": word,
            "pronunciation": ipa_to_pronunciation(word, best["ipa"]),
            "phonetic": phonetic,
            "partOfSpeech": best["pos"],
            "meaning": best["meaning"],
            "exampleSentence": best["example"],
            "difficulty": assign_difficulty(word, rank),
            "topic": assign_topic(word, best["meaning"], best["example"]),
        },
        None,
    )


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--db", type=Path, default=ROOT / "tmp" / "dictionary_en_vi.db")
    ap.add_argument(
        "--tsl",
        type=Path,
        default=ROOT / "tmp" / "tsl_11_alphabetized_description.txt",
    )
    ap.add_argument(
        "--vocab",
        type=Path,
        default=ROOT / "src" / "db" / "seed-data" / "vocabulary.ts",
    )
    ap.add_argument(
        "--out",
        type=Path,
        default=ROOT / "src" / "db" / "seed-data" / "toeic-vocabulary-entries.json",
    )
    ap.add_argument(
        "--target",
        type=int,
        default=5000,
        help="Target catalog size (TSL first, then curated dictionary fill).",
    )
    args = ap.parse_args()

    if not args.db.exists():
        print(f"Missing DB: {args.db}", file=sys.stderr)
        return 1
    if not args.tsl.exists():
        print(f"Missing TSL list: {args.tsl}", file=sys.stderr)
        return 1

    tsl = parse_tsl(args.tsl)
    skip = load_general_vocab_words(args.vocab)
    con = sqlite3.connect(args.db)
    cur = con.cursor()

    rows: list[dict] = []
    missing: list[str] = []
    skipped_existing: list[str] = []
    topic_counts: dict[str, int] = {t: 0 for t in TOPIC_KEYWORDS}
    seen: set[str] = set()
    tsl_kept = 0
    fill_kept = 0

    def accept(entry: dict) -> bool:
        key = entry["word"].lower()
        if key in seen or key in skip:
            return False
        seen.add(key)
        topic_counts[entry["topic"]] = topic_counts.get(entry["topic"], 0) + 1
        rows.append(entry)
        return True

    # 1) Core: TSL
    for rank, lemma in enumerate(tsl, start=1):
        entry, reason = build_entry(cur, lemma, skip, rank)
        if reason == "existing":
            skipped_existing.append(lemma)
            continue
        if reason == "missing":
            missing.append(lemma)
            continue
        assert entry is not None
        if accept(entry):
            tsl_kept += 1

    # 2) Expand from dictionary until --target
    need = max(0, args.target - len(rows))
    if need > 0:
        # Ask for extra candidates — some will fail sense quality checks.
        candidates = list_fill_candidates(
            cur, exclude=seen | skip, limit=need * 3 + 500
        )
        print(f"Fill candidates pooled: {len(candidates)} (need {need})")
        for rank, lemma in enumerate(candidates, start=10_000):
            if len(rows) >= args.target:
                break
            entry, reason = build_entry(cur, lemma, skip, rank)
            if reason or entry is None:
                continue
            if accept(entry):
                fill_kept += 1

    unique_rows = sorted(rows, key=lambda r: (r["topic"], r["word"]))

    # JSON avoids TS2590 ("union type too complex") on large object literals.
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(
        json.dumps(unique_rows, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(f"Wrote {len(unique_rows)} entries → {args.out}")
    print(f"Target: {args.target}")
    print(f"TSL lemmas: {len(tsl)} → kept {tsl_kept}")
    print(f"Dictionary fill kept: {fill_kept}")
    print(f"Skipped (already in vocabularySeed): {len(skipped_existing)}")
    print(f"Missing from dictionary (TSL): {len(missing)}")
    print("By topic:", json.dumps(topic_counts, ensure_ascii=False))
    if missing:
        print("Missing sample:", ", ".join(missing[:25]))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
