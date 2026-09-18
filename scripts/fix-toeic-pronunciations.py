#!/usr/bin/env python3
"""Rewrite TOEIC-extra pronunciations from the English word (ASCII, hyphenated)."""

from __future__ import annotations

import re
from pathlib import Path

PATH = Path("src/db/seed-data/toeic-vocabulary-extra.ts")

# Manual overrides for clearer learner spellings.
OVERRIDES = {
    "auto": "AW-toh",
    "airport": "AIR-port",
    "vacation": "vay-KAY-shuhn",
    "mister": "MIS-ter",
    "depart": "dih-PART",
    "exit": "EG-zit",
    "tag": "TAG",
}


def pronounce(word: str) -> str:
    if word in OVERRIDES:
        return OVERRIDES[word]

    w = re.sub(r"[^a-zA-Z]", "", word).lower()
    if not w:
        return word.upper()

    # Split into rough syllables: consonant* + vowel+
    parts = re.findall(r"[^aeiouy]*[aeiouy]+(?:ng|ck|[bcdfghjklmnpqrstvwxz])?|[^aeiouy]+$", w)
    parts = [p for p in parts if p]
    if not parts:
        return w.upper()

    # Prefer stress on first syllable for short words, second for longer.
    stress = 0 if len(parts) <= 2 else 1
    out = []
    for i, part in enumerate(parts):
        out.append(part.upper() if i == stress else part.lower())
    return "-".join(out)


def main() -> None:
    text = PATH.read_text(encoding="utf-8")

    def repl(match: re.Match[str]) -> str:
        word, phonetic, pos, meaning, example = match.groups()
        return (
            f'word: "{word}",\n'
            f'    pronunciation: "{pronounce(word)}",\n'
            f'    phonetic: "{phonetic}",\n'
            f'    partOfSpeech: "{pos}",\n'
            f'    meaning: "{meaning}",\n'
            f'    exampleSentence: "{example}"'
        )

    pattern = re.compile(
        r'word: "([^"]+)",\s*'
        r'pronunciation: "[^"]*",\s*'
        r'phonetic: "([^"]*)",\s*'
        r'partOfSpeech: "([^"]+)",\s*'
        r'meaning: "([^"]*)",\s*'
        r'exampleSentence: "([^"]*)"',
    )
    new_text, n = pattern.subn(repl, text)
    PATH.write_text(new_text, encoding="utf-8")
    print(f"updated {n}")
    for w in ("auto", "airport", "depart", "exit", "vacation"):
        m = re.search(
            rf'word: "{w}",\s*pronunciation: "([^"]*)",\s*phonetic: "([^"]*)".*?meaning: "([^"]*)"',
            new_text,
            re.S,
        )
        print(w, "=>", m.groups() if m else None)


if __name__ == "__main__":
    main()
