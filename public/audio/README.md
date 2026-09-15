# Audio files

## Listening (`listening/*.mp3`)

Real TTS recordings for the five Phase 10 listening lessons, named to match
`src/db/seed-data/listening.ts` (`audioUrl`):

| File | Approx. duration |
|------|------------------|
| `ordering-coffee.mp3` | ~32s |
| `small-talk-at-work.mp3` | ~31s |
| `airport-check-in.mp3` | ~35s |
| `asking-for-directions.mp3` | ~27s |
| `university-lecture-intro.mp3` | ~40s |

Generated to match each lesson transcript (not silent placeholders). Seed
`durationSeconds` values track these lengths.

## Vocabulary (`vocab/*.mp3`)

Optional. `vocabularies.audio_url` is nullable; the client falls back to the
Web Speech API when null (AD-04).
