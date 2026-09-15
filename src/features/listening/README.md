# features/listening

Listening catalog, custom audio player, transcript panel, and comprehension
quiz (spec §18 / Phase 10).

- `queries.ts` — list + detail (completion from `quiz_attempts`)
- Comprehension quiz uses shared `QuizRunner` from `features/quiz`
- `components/AudioPlayer.tsx` — play/pause, seek, volume, speed, keyboard a11y
- `components/TranscriptPanel.tsx` — hidden by default; timed highlight when cues exist
- `transcript.ts` — client-safe `[mm:ss]` cue parser
