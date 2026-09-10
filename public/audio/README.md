# Audio files — not yet added

`vocabularies.audio_url` and `listening_lessons.audio_url` reference paths
under this directory (`vocab/*.mp3`, `listening/*.mp3`), but **no audio
files exist here yet**. This sandbox has no TTS binary and no network access
to license real recordings, so generating them wasn't possible during
Phase 03 — see [docs/plan/phase-03-schema-seed.md](../../docs/plan/phase-03-schema-seed.md)
for the seeded `audio_url` values that expect files here.

What still needs to happen, on a machine that can produce/record real audio,
before Phase 10 (Listening) ships:

- `vocab/*.mp3` — optional; `vocabularies.audio_url` is nullable and the
  client already falls back to the Web Speech API when it's null (AD-04), so
  this can be filled in gradually.
- `listening/*.mp3` — required; add one real recording per file named in
  `src/db/seed-data/listening.ts` (`audioUrl` field), matching each lesson's
  `durationSeconds` and transcript, then re-run `npm run db:seed`.

Do not commit placeholder/silent audio here — CLAUDE.md's "No fake content"
rule applies to audio the same way it applies to text.
