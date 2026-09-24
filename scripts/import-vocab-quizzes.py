#!/usr/bin/env python3
"""
Generate standalone vocabulary quizzes from licensed seed catalogs.

Does NOT overwrite hand-written quizzes in src/db/seed-data/quizzes.ts
(those slugs are referenced by lesson exercise blocks). Output uses the
`vocab-generated-` slug prefix and is loaded only by seed.ts.

Sources (already in-repo, already attributed in content_sources):
  - general: src/db/seed-data/vocabulary.ts  (EnglishFlow original)
  - toeic:   src/db/seed-data/toeic-vocabulary-entries.json
             TSL 1.1 ∩ EN–VI dictionary, CC BY-SA 4.0

Question types match quizzes schema: multiple_choice / true_false / fill_blank.
Explanations are generated (not copied from any MCC dataset).

TOEIC dump quality is uneven — rows are kept only when the lemma appears in
the example sentence and the Vietnamese gloss is short enough to be a prompt.

Usage:
  python3 scripts/import-vocab-quizzes.py --dry-run
  python3 scripts/import-vocab-quizzes.py
  python3 scripts/import-vocab-quizzes.py --catalog general --per-quiz 6
  npm run quiz:import-vocab && npm run db:seed
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import sys
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Iterable, Literal, TypedDict

ROOT = Path(__file__).resolve().parents[1]
GENERAL_TS = ROOT / "src/db/seed-data/vocabulary.ts"
TOEIC_JSON = ROOT / "src/db/seed-data/toeic-vocabulary-entries.json"
DEFAULT_OUT = ROOT / "src/db/seed-data/vocab-quizzes.generated.json"

SLUG_PREFIX = "vocab-generated"
MIN_DISTRACTORS = 3
MIN_GROUP = 6

THEME_RE = re.compile(r"// ---\s*(.+?)\s*---")
ENTRY_RE = re.compile(
    r'\{\s*word:\s*"(?P<word>(?:\\.|[^"\\])*)"'
    r".*?"
    r'partOfSpeech:\s*"(?P<pos>[^"]+)"'
    r".*?"
    r'meaning:\s*"(?P<meaning>(?:\\.|[^"\\])*)"'
    r".*?"
    r'exampleSentence:\s*"(?P<example>(?:\\.|[^"\\])*)"'
    r".*?"
    r'difficulty:\s*"(?P<difficulty>[^"]+)"',
)

TOEIC_TOPIC_META: dict[str, tuple[str, str]] = {
    "office": ("Office & admin", "Văn phòng"),
    "hr": ("Hiring & HR", "Nhân sự"),
    "sales": ("Sales & finance", "Kinh doanh"),
    "logistics": ("Logistics & ops", "Vận hành"),
    "meetings": ("Meetings & comms", "Họp & giao tiếp"),
}

# Comment headings in vocabulary.ts → (slug, title). Unlisted themes slugify as-is.
GENERAL_THEME_META: dict[str, tuple[str, str]] = {
    "Daily routine (Everyday English)": ("daily-routine", "Everyday English · Daily routine"),
    "Family & home": ("family-home", "Everyday English · Family & home"),
    "Food & drink": ("food-drink", "Everyday English · Food & drink"),
    "Conversation & feelings (English Conversation)": ("conversation", "English Conversation · Feelings"),
    "Travel (English for Travel)": ("travel", "English for Travel"),
    "General verbs & connectors (Essential Grammar)": ("connectors", "Essential Grammar · Verbs & connectors"),
    "Academic English": ("academic", "Academic English"),
    "More everyday vocabulary to reach the ≥100 target": ("everyday-extra", "Everyday English · Extra"),
}

PREFERRED_POS = {"noun", "verb", "adjective", "adverb", "phrasal_verb", "phrase"}
TOEIC_DISTRACTOR_POOL = 40
META_GLOSS_RE = re.compile(
    r"(số nhiều của|plural of|quá khứ của|past of|phân từ|participle|gerund of|dạng của)",
    re.IGNORECASE,
)
LEMMA_RE = re.compile(r"^[a-z]+(?:-[a-z]+)?$")


class VocabItem(TypedDict):
    word: str
    pos: str
    meaning: str
    example: str
    difficulty: str
    catalog: Literal["general", "toeic"]
    group: str
    group_title: str
    attribution: str


class QuizAnswer(TypedDict):
    content: str
    isCorrect: bool


class QuizQuestion(TypedDict):
    type: str
    prompt: str
    explanation: str
    answers: list[QuizAnswer]


class QuizOut(TypedDict):
    slug: str
    title: str
    description: str
    questions: list[QuizQuestion]


def unescape_ts_string(value: str) -> str:
    return bytes(value, "utf-8").decode("unicode_escape") if "\\" in value else value


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return slug or "misc"


def primary_meaning(meaning: str) -> str:
    text = re.split(r"[.;]", meaning.strip())[0].strip()
    text = re.sub(r"\s+", " ", text).strip(" .")
    if len(text) > 72:
        trimmed = text[:69].rsplit(" ", 1)[0]
        text = f"{trimmed}…"
    return text


def lemma_in_sentence(word: str, sentence: str) -> bool:
    pattern = rf"(?<![A-Za-z]){re.escape(word)}(?![A-Za-z])"
    return re.search(pattern, sentence, flags=re.IGNORECASE) is not None


def blank_sentence(word: str, sentence: str) -> str:
    pattern = rf"(?<![A-Za-z]){re.escape(word)}(?![A-Za-z])"
    return re.sub(pattern, "______", sentence, count=1, flags=re.IGNORECASE)


def stable_key(*parts: str) -> str:
    return hashlib.sha256("|".join(parts).encode("utf-8")).hexdigest()


def stable_shuffle(items: list[str], key: str) -> list[str]:
    return sorted(items, key=lambda item: stable_key(key, item))


def parse_general_vocabulary(path: Path) -> list[VocabItem]:
    items: list[VocabItem] = []
    theme = "General vocabulary"
    for line in path.read_text(encoding="utf-8").splitlines():
        theme_match = THEME_RE.search(line)
        if theme_match:
            theme = theme_match.group(1).strip()
            continue
        entry = ENTRY_RE.search(line)
        if not entry:
            continue
        word = unescape_ts_string(entry.group("word")).strip()
        meaning = unescape_ts_string(entry.group("meaning")).strip()
        example = unescape_ts_string(entry.group("example")).strip()
        group_slug, group_title = GENERAL_THEME_META.get(
            theme,
            (slugify(theme.split("(")[0]), theme),
        )
        items.append(
            {
                "word": word,
                "pos": entry.group("pos"),
                "meaning": meaning,
                "example": example,
                "difficulty": entry.group("difficulty"),
                "catalog": "general",
                "group": group_slug,
                "group_title": group_title,
                "attribution": "EnglishFlow original vocabulary seed (human-reviewed).",
            }
        )
    return items


def parse_toeic_vocabulary(path: Path) -> list[VocabItem]:
    raw = json.loads(path.read_text(encoding="utf-8"))
    items: list[VocabItem] = []
    for row in raw:
        topic = str(row.get("topic") or "")
        if topic not in TOEIC_TOPIC_META:
            continue
        label_en, label_vi = TOEIC_TOPIC_META[topic]
        items.append(
            {
                "word": str(row.get("word") or "").strip(),
                "pos": str(row.get("partOfSpeech") or "").strip(),
                "meaning": str(row.get("meaning") or "").strip(),
                "example": str(row.get("exampleSentence") or "").strip(),
                "difficulty": str(row.get("difficulty") or "medium"),
                "catalog": "toeic",
                "group": f"toeic-{topic}",
                "group_title": f"TOEIC · {label_vi} · {label_en}",
                "attribution": (
                    "Headwords from TOEIC Service List (TSL) 1.1 (Browne & Culligan, "
                    "2016) and lexical content from the English–Vietnamese Dictionary "
                    "(Skypedia / MinhQND), both CC BY-SA 4.0."
                ),
            }
        )
    return items


def is_usable(item: VocabItem, *, require_lemma_in_example: bool) -> bool:
    word = item["word"]
    meaning = primary_meaning(item["meaning"])
    example = item["example"].strip()
    if item["pos"] not in PREFERRED_POS:
        return False
    if not (2 <= len(word) <= 40):
        return False
    if not (4 <= len(meaning) <= 72):
        return False
    if not (16 <= len(example) <= 180):
        return False
    if word.lower() == meaning.lower():
        return False
    if META_GLOSS_RE.search(item["meaning"]):
        return False
    if require_lemma_in_example and not lemma_in_sentence(word, example):
        return False
    if item["catalog"] == "toeic":
        if not LEMMA_RE.fullmatch(word):
            return False
        if word.endswith("ing") and item["pos"] in {"verb", "noun"} and len(word) > 6:
            return False
        if word.endswith("ed") and item["pos"] == "verb" and len(word) > 5:
            return False
    return True


def quality_score(item: VocabItem) -> tuple[int, str]:
    score = 0
    if lemma_in_sentence(item["word"], item["example"]):
        score += 5
    if item["pos"] in {"noun", "verb", "adjective"}:
        score += 2
    meaning_len = len(primary_meaning(item["meaning"]))
    if 4 <= meaning_len <= 40:
        score += 2
    if item["difficulty"] == "medium":
        score += 1
    if " " not in item["word"]:
        score += 1
    if item["catalog"] == "toeic":
        word = item["word"]
        if word.endswith("ly"):
            score -= 4
        if re.search(r"(weed|wort|monger)$", word):
            score -= 5
        if word.endswith(("able", "ible")) and word not in {"available", "responsible"}:
            score -= 3
        if word.endswith("less") and word not in {"regardless"}:
            score -= 2
    return (-score, item["word"].lower())


def pick_distractors(target: VocabItem, pool: list[VocabItem], key: str) -> list[VocabItem]:
    target_meaning = primary_meaning(target["meaning"]).casefold()
    same_pos: list[VocabItem] = []
    others: list[VocabItem] = []
    seen: set[str] = {target["word"].casefold()}
    for item in pool:
        word_key = item["word"].casefold()
        if word_key in seen:
            continue
        if primary_meaning(item["meaning"]).casefold() == target_meaning:
            continue
        seen.add(word_key)
        if item["pos"] == target["pos"]:
            same_pos.append(item)
        else:
            others.append(item)
    ranked = sorted(same_pos + others, key=lambda item: stable_key(key, item["word"]))
    return ranked[:MIN_DISTRACTORS]


def make_multiple_choice(target: VocabItem, distractors: list[VocabItem]) -> QuizQuestion:
    meaning = primary_meaning(target["meaning"])
    options = [target["word"], *[item["word"] for item in distractors]]
    shuffled = stable_shuffle(options, f"mc|{target['word']}|{meaning}")
    return {
        "type": "multiple_choice",
        "prompt": f'Which word means "{meaning}"?',
        "explanation": f'"{target["word"]}" ({target["pos"]}) means "{meaning}".',
        "answers": [{"content": option, "isCorrect": option == target["word"]} for option in shuffled],
    }


def make_true_false(target: VocabItem, distractors: list[VocabItem], *, index: int) -> QuizQuestion:
    meaning = primary_meaning(target["meaning"])
    say_true = index % 2 == 0
    if say_true:
        prompt = f'"{target["word"]}" means "{meaning}".'
        explanation = f'True — "{target["word"]}" ({target["pos"]}) means "{meaning}".'
        answers = [
            {"content": "True", "isCorrect": True},
            {"content": "False", "isCorrect": False},
        ]
    else:
        wrong = primary_meaning(distractors[0]["meaning"])
        prompt = f'"{target["word"]}" means "{wrong}".'
        explanation = (
            f'False — "{target["word"]}" means "{meaning}", not "{wrong}".'
        )
        answers = [
            {"content": "True", "isCorrect": False},
            {"content": "False", "isCorrect": True},
        ]
    return {
        "type": "true_false",
        "prompt": prompt,
        "explanation": explanation,
        "answers": answers,
    }


def make_fill_blank(target: VocabItem) -> QuizQuestion | None:
    if not lemma_in_sentence(target["word"], target["example"]):
        return None
    meaning = primary_meaning(target["meaning"])
    return {
        "type": "fill_blank",
        "prompt": blank_sentence(target["word"], target["example"]),
        "explanation": f'The missing word is "{target["word"]}" ({target["pos"]}): "{meaning}".',
        "answers": [{"content": target["word"], "isCorrect": True}],
    }


def build_quiz(group_items: list[VocabItem], *, per_quiz: int) -> QuizOut | None:
    if len(group_items) < MIN_GROUP:
        return None

    first = group_items[0]
    group = first["group"]
    slug = f"{SLUG_PREFIX}-{group}"
    title = f"{first['group_title']} — Vocabulary Practice"

    ranked = sorted(group_items, key=quality_score)
    pool = ranked[:TOEIC_DISTRACTOR_POOL] if first["catalog"] == "toeic" else ranked
    questions: list[QuizQuestion] = []
    used_words: set[str] = set()
    cycle = ("multiple_choice", "multiple_choice", "true_false", "fill_blank")

    for item in pool:
        if len(questions) >= per_quiz:
            break
        if item["word"].casefold() in used_words:
            continue
        distractors = pick_distractors(item, pool, f"{slug}|{item['word']}")
        if len(distractors) < MIN_DISTRACTORS:
            continue

        wanted = cycle[len(questions) % len(cycle)]
        question: QuizQuestion | None
        if wanted == "fill_blank":
            question = make_fill_blank(item)
            if question is None:
                question = make_multiple_choice(item, distractors)
        elif wanted == "true_false":
            question = make_true_false(item, distractors, index=len(questions))
        else:
            question = make_multiple_choice(item, distractors)

        questions.append(question)
        used_words.add(item["word"].casefold())

    if len(questions) < 4:
        return None

    return {
        "slug": slug,
        "title": title,
        "description": (
            f"Practice {len(questions)} words from this topic. {first['attribution']} "
            "Generated locally; review before treating as final content."
        ),
        "questions": questions,
    }


def collect_items(catalog: str) -> list[VocabItem]:
    items: list[VocabItem] = []
    if catalog in {"general", "all"}:
        if not GENERAL_TS.exists():
            raise FileNotFoundError(GENERAL_TS)
        items.extend(parse_general_vocabulary(GENERAL_TS))
    if catalog in {"toeic", "all"}:
        if not TOEIC_JSON.exists():
            raise FileNotFoundError(TOEIC_JSON)
        items.extend(parse_toeic_vocabulary(TOEIC_JSON))
    return items


def generate_quizzes(items: Iterable[VocabItem], *, per_quiz: int) -> tuple[list[QuizOut], dict[str, int]]:
    stats = {"read": 0, "kept": 0, "skipped_quality": 0, "groups": 0, "quizzes": 0, "questions": 0}
    grouped: dict[str, list[VocabItem]] = defaultdict(list)

    for item in items:
        stats["read"] += 1
        require_lemma = item["catalog"] == "toeic"
        if not is_usable(item, require_lemma_in_example=require_lemma):
            stats["skipped_quality"] += 1
            continue
        stats["kept"] += 1
        grouped[f"{item['catalog']}:{item['group']}"].append(item)

    quizzes: list[QuizOut] = []
    for key in sorted(grouped):
        stats["groups"] += 1
        quiz = build_quiz(grouped[key], per_quiz=per_quiz)
        if not quiz:
            continue
        quizzes.append(quiz)
        stats["quizzes"] += 1
        stats["questions"] += len(quiz["questions"])

    return quizzes, stats


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--catalog", choices=("general", "toeic", "all"), default="all")
    parser.add_argument("--per-quiz", type=int, default=8, help="Max questions per topic quiz (default 8)")
    parser.add_argument("--out", type=Path, default=DEFAULT_OUT)
    parser.add_argument("--dry-run", action="store_true", help="Print summary and sample items; do not write")
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv)
    if args.per_quiz < 4:
        print("--per-quiz must be at least 4", file=sys.stderr)
        return 2

    quizzes, stats = generate_quizzes(collect_items(args.catalog), per_quiz=args.per_quiz)
    payload = {
        "generatedBy": "scripts/import-vocab-quizzes.py",
        "generatedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "catalog": args.catalog,
        "perQuiz": args.per_quiz,
        "slugPrefix": SLUG_PREFIX,
        "note": (
            "Standalone catalog quizzes. Does not replace coursePracticeQuizzes. "
            "TOEIC rows require the lemma to appear in the example sentence."
        ),
        "stats": stats,
        "quizzes": quizzes,
    }

    print(
        "vocab→quiz: "
        f"read={stats['read']} kept={stats['kept']} skipped_quality={stats['skipped_quality']} "
        f"groups={stats['groups']} quizzes={stats['quizzes']} questions={stats['questions']}"
    )
    for quiz in quizzes:
        print(f"  {quiz['slug']}: {len(quiz['questions'])}q — {quiz['title']}")

    if args.dry_run:
        if quizzes:
            sample = quizzes[0]["questions"][0]
            print("\nSample question:")
            print(json.dumps(sample, ensure_ascii=False, indent=2))
        return 0

    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {args.out.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    assert lemma_in_sentence("chore", "Washing dishes is my least favorite chore.")
    assert not lemma_in_sentence("ably", "She moved abli through the narrow hall.")
    assert blank_sentence("landlord", "The landlord fixed the window.") == "The ______ fixed the window."
    raise SystemExit(main())
