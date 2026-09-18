#!/usr/bin/env python3
"""Fix broken IPA-as-pronunciation spellings + a few known bad glosses in TOEIC extra seed."""

from __future__ import annotations

import re
from pathlib import Path

PATH = Path("src/db/seed-data/toeic-vocabulary-extra.ts")

# Longest-first IPA → approx English respelling (learner-facing, not linguistic-perfect).
IPA_REPLACEMENTS = [
    ("tʃ", "ch"),
    ("dʒ", "j"),
    ("ʃ", "sh"),
    ("ʒ", "zh"),
    ("θ", "th"),
    ("ð", "dh"),
    ("ŋ", "ng"),
    ("eɪ", "ay"),
    ("aɪ", "eye"),
    ("ɔɪ", "oy"),
    ("aʊ", "ow"),
    ("oʊ", "oh"),
    ("ɪɹ", "eer"),
    ("ɛɹ", "air"),
    ("ʊɹ", "oor"),
    ("ɔɹ", "or"),
    ("ɑɹ", "ar"),
    ("ɝ", "er"),
    ("ɚ", "er"),
    ("æ", "a"),
    ("ɑ", "ah"),
    ("ɒ", "o"),
    ("ɔ", "aw"),
    ("ə", "uh"),
    ("ʌ", "uh"),
    ("ɪ", "i"),
    ("i", "ee"),
    ("ʊ", "oo"),
    ("u", "oo"),
    ("ɛ", "e"),
    ("e", "eh"),
    ("ɹ", "r"),
    ("ɫ", "l"),
    ("ɫ", "l"),
    ("ɡ", "g"),
    ("j", "y"),
    ("ʍ", "wh"),
    ("ʔ", ""),
    ("ː", ""),
    (".", "-"),
    (" ", "-"),
]

MEANING_FIXES = {
    "auto": "ô tô, xe hơi (cách nói tắt)",
    "tag": "nhãn, thẻ gắn",
    "depart": "khởi hành, rời đi",
    "exit": "lối ra; rời khỏi",
}

EXAMPLE_FIXES = {
    "auto": "We rented an auto for the weekend trip.",
    "tag": "Please attach a name tag to your luggage.",
    "depart": "The flight will depart at noon.",
    "exit": "Please use the emergency exit on the left.",
}


def ipa_to_pronunciation(word: str, phonetic: str) -> str:
    s = phonetic.strip().strip("/")
    s = s.replace("ˈ", "|").replace("ˌ", "|")
    for src, dst in IPA_REPLACEMENTS:
        s = s.replace(src, dst)
    # Drop leftover non-ascii / odd marks
    s = re.sub(r"[^a-zA-Z|\-]+", "", s)
    s = re.sub(r"\|+", "|", s).strip("|")
    parts = [p for p in re.split(r"[|\-]+", s) if p]
    if not parts:
        return word.upper()
    out = []
    for i, part in enumerate(parts):
        out.append(part.upper() if i == 0 else part.lower())
    return "-".join(out)


def main() -> None:
    text = PATH.read_text(encoding="utf-8")

    def repl(match: re.Match[str]) -> str:
        word = match.group(1)
        phonetic = match.group(3)
        pos = match.group(4)
        meaning = match.group(5)
        example = match.group(6)

        pronunciation = ipa_to_pronunciation(word, phonetic)
        if word in MEANING_FIXES:
            meaning = MEANING_FIXES[word]
        if word in EXAMPLE_FIXES:
            example = EXAMPLE_FIXES[word]

        return (
            f'word: "{word}",\n'
            f'    pronunciation: "{pronunciation}",\n'
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

    # Fix group indexing - phonetic is group 2 in pattern above wait:
    # groups: 1 word, 2 phonetic, 3 pos, 4 meaning, 5 example
    def repl2(match: re.Match[str]) -> str:
        word, phonetic, pos, meaning, example = match.groups()
        pronunciation = ipa_to_pronunciation(word, phonetic)
        if word in MEANING_FIXES:
            meaning = MEANING_FIXES[word]
        if word in EXAMPLE_FIXES:
            example = EXAMPLE_FIXES[word]
        return (
            f'word: "{word}",\n'
            f'    pronunciation: "{pronunciation}",\n'
            f'    phonetic: "{phonetic}",\n'
            f'    partOfSpeech: "{pos}",\n'
            f'    meaning: "{meaning}",\n'
            f'    exampleSentence: "{example}"'
        )

    new_text, n = pattern.subn(repl2, text)
    PATH.write_text(new_text, encoding="utf-8")
    print(f"updated {n} entries in {PATH}")

    # spot-check auto
    m = re.search(
        r'word: "auto",\s*pronunciation: "([^"]*)",\s*phonetic: "([^"]*)",\s*partOfSpeech: "([^"]+)",\s*meaning: "([^"]*)",\s*exampleSentence: "([^"]*)"',
        new_text,
    )
    print("auto =>", m.groups() if m else None)


if __name__ == "__main__":
    main()
