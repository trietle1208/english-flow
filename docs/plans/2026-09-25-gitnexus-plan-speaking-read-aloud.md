# GitNexus Engineering Plan

> Task: Non-AI speaking MVP — read-aloud, Web Speech / local record, compare to transcript.
> Evidence verified at commit 5fd673ba8dc52c93dc5e7da14fed037055221e02; GitNexus index fresh (same commit; refresh skipped, freshness:accept).
> Evidence provenance schema 2; global dirty digest sha256:c343ab3e163051a88359265a016efa0878977260c9c25d732b5fd96c07af1c24; cited-path manifest 22 sorted entries; exact generated plan path excluded.

## Objective (§1)

Ship `/speaking` practice: learner reads a prompt aloud, hears a model (file or Web Speech TTS), optionally records locally, and sees a **word-overlap** compare against the transcript. **No** pronunciation model, Whisper, or audio upload. Persist recognized text + server-recomputed score.

## Current Behaviour (§2–3) — architecture folded in

No speaking routes, tables, or `SpeechRecognition` usage `[verified]`. `skillEnum` already includes `"speaking"` (`src/db/schema/enums.ts:7-13`) but **zero** seed lessons use it `[verified]`. `PROGRESS_SKILLS` is vocab/grammar/listening/reading only (`src/features/progress/queries.ts:36`); dashboard accent maps already accept `speaking` `[verified]`. Listening is the clone target: catalog + `/listening/[id]` + `ListeningStudySession` + `TranscriptPanel` (hidden-by-default) + quiz (`src/app/(app)/listening/[lessonId]/page.tsx:35-82`) `[verified]`. Model audio today is **playback only**: `AudioButton` file-or-`speechSynthesis` (`src/components/shared/AudioButton.tsx:19-55`, AD-04) `[verified]`. Fill-blank normalize is the compare primitive: trim/lower/collapse (`src/features/quiz/engine.ts:52-55`) `[verified]`. `user_progress` is **course-lesson** FK only (`src/db/schema/progress.ts:8-16`) `[verified]`. `features/future/` is reserved empty — do not put this feature there `[verified]`. Nav has no speaking item; i18n `skills.speaking` already exists (`messages/en.json:59`) `[verified]`.

## Findings (§4–5)

- `[graph]` `query` speaking/audio: processes center on `AudioPlayer` / `ListeningLessonPage` / `TranscriptPanel`; no recognition flow.
- `[graph]` `impact` `AudioButton.tsx` upstream: risk LOW, **d=1=4** (Flashcard, VocabularyCard, VocabularyItem, PlayPrompt) — **do not edit** AudioButton.
- `[graph]` `impact` `skillEnum` upstream: risk UNKNOWN / 0 callers — **do not change** the enum; text search confirms only `lessons.skill` uses it and no `"speaking"` seed rows.
- `[verified]` `useStudyHeartbeat` already used by lessons/quiz/flashcards — reuse on speaking session.
- PDG slice skipped: compact feature, no `--pdg` layer; no single existing function is the change center.

## Proposed Changes (§6)

1. **New schema** `src/db/schema/speaking.ts` (export from `src/db/schema/index.ts`): `speaking_prompts` (`slug`, `title`, `prompt_text`, `cefr_level`, `difficulty`, optional `audio_url`) + `user_speaking_attempts` (`user_id`, `prompt_id`, `recognized_text`, `overlap_percent`, `created_at`). Do not hang on `lessons` / `user_progress`.
2. **`src/features/speaking/`** (not `future/`): `compare.ts` word-token overlap using `normalizeBlankAnswer`; `queries.ts` list/detail + last attempt; `actions.ts` `submitSpeakingAttempt` (`requireUser` → Zod → **recompute score server-side** → insert → `revalidatePath`); `schemas.ts`.
3. **UI**: `/speaking` + `/speaking/[promptId]` mirroring listening; prompt **always visible**; reuse `AudioButton` for model; new client `SpeechPractice.tsx` — `SpeechRecognition`/`webkitSpeechRecognition` `en-US` for recognized text; optional `MediaRecorder` **blob URL only** (no upload); unsupported-ASR empty state still allows listen + local playback without score.
4. **Shell**: add `speaking` to `NavLabelKey` + `mainNav` after listening (`src/config/navigation.ts`); `nav.speaking` in `messages/en.json` + `vi.json`; protect `/speaking` in `src/middleware.ts` `PROTECTED_PATHS` + `matcher`.
5. **Seed**: 8–12 original short prompts A1–B1 (`PRODUCTION_ALLOWED`); optional `audio_url` null → TTS. Wire `useStudyHeartbeat` on the session.
6. **Do not**: change `AudioButton`, `skillEnum`, `PROGRESS_SKILLS`/charts, upload audio, add AI scoring, scrape ESL sites.

## Implementation Sequence (§7)

1. Schema + migrate + seed (tree still boots; no UI yet).
2. `compare.ts` + Vitest (`src/features/speaking/compare.test.ts`).
3. queries/actions/schemas.
4. Pages + `SpeechPractice` + i18n + nav + middleware.
5. `npx tsc --noEmit && npm run lint && npm run test && npm run build`.

Step notes: Chrome/Edge ASR is the happy path; Safari may lack recognition — UI must degrade. Mic permission denial is an empty/error state, not a thrown page.

## Test Strategy (§8)

- **New** `src/features/speaking/compare.test.ts` (pattern `src/features/quiz/engine.test.ts`): `"Beautiful Day"` vs `"beautiful  day"` → 100; extra/missing words; punctuation/case; empty recognized → 0.
- Action reject: unauthenticated / unknown prompt / empty text.
- Manual: Chrome listen → speak → highlighted diff; deny-mic; no-ASR browser.
- Optional later: Playwright skip-if-no-mic. Commands: `npm run test`, `npm run lint`, `npm run build` (`package.json:10,20,8`).

## Implementation Context (§11)

```yaml
implementation_context:
  task_summary: "Non-AI /speaking read-aloud: TTS + local record + server-scored word overlap"
  evidence_provenance:
    schema_version: 2
    head_commit: "5fd673ba8dc52c93dc5e7da14fed037055221e02"
    generated_plan_path: "docs/plans/2026-09-25-gitnexus-plan-speaking-read-aloud.md"
    global_dirty_digest:
      algorithm: sha256
      canonicalization: "gitnexus-evidence-provenance-v2 NUL-framed UTF-8 records"
      value: c343ab3e163051a88359265a016efa0878977260c9c25d732b5fd96c07af1c24
    cited_path_manifest: # 22 entries; full layer digests from snapshot helper (schema 2)
      - {path: docs/plan/00-architecture-decisions.md, state: clean, head_digest: "sha256:5690538de61377fe5d3b2686f0cb3075e290965c23cff094cc20e0e86cdd7813", index_digest: "sha256:5690538de61377fe5d3b2686f0cb3075e290965c23cff094cc20e0e86cdd7813", worktree_digest: "sha256:5690538de61377fe5d3b2686f0cb3075e290965c23cff094cc20e0e86cdd7813", untracked_digest: absent, rename_from: null, rename_to: null, object_kind: {head: regular, index: regular, worktree: regular, untracked: absent}}
      - {path: messages/en.json, state: clean, head_digest: "sha256:e9ee51f0a87636cf28e61ea1d627afabf8a70f221507360d46cb32073896a947", index_digest: "sha256:e9ee51f0a87636cf28e61ea1d627afabf8a70f221507360d46cb32073896a947", worktree_digest: "sha256:e9ee51f0a87636cf28e61ea1d627afabf8a70f221507360d46cb32073896a947", untracked_digest: absent, rename_from: null, rename_to: null, object_kind: {head: regular, index: regular, worktree: regular, untracked: absent}}
      - {path: package.json, state: clean, head_digest: "sha256:032a279e2cdd6a8fdf541a6bff0d096ddb3c45eee1e4cdacd636b4495f3a6e84", index_digest: "sha256:032a279e2cdd6a8fdf541a6bff0d096ddb3c45eee1e4cdacd636b4495f3a6e84", worktree_digest: "sha256:032a279e2cdd6a8fdf541a6bff0d096ddb3c45eee1e4cdacd636b4495f3a6e84", untracked_digest: absent, rename_from: null, rename_to: null, object_kind: {head: regular, index: regular, worktree: regular, untracked: absent}}
      - {path: "src/app/(app)/listening/[lessonId]/page.tsx", state: clean, head_digest: "sha256:07a8ef935accfe5a2a1dadefff34d1f480eeaacb88c66a809abc02fd29ebc52c", index_digest: "sha256:07a8ef935accfe5a2a1dadefff34d1f480eeaacb88c66a809abc02fd29ebc52c", worktree_digest: "sha256:07a8ef935accfe5a2a1dadefff34d1f480eeaacb88c66a809abc02fd29ebc52c", untracked_digest: absent, rename_from: null, rename_to: null, object_kind: {head: regular, index: regular, worktree: regular, untracked: absent}}
      - {path: src/components/layout/AppHeader.tsx, state: clean, head_digest: "sha256:4ca08615a1d8b1b6ae0973074ffea9538aa1dbe0eb900d36a28837a129e8251e", index_digest: "sha256:4ca08615a1d8b1b6ae0973074ffea9538aa1dbe0eb900d36a28837a129e8251e", worktree_digest: "sha256:4ca08615a1d8b1b6ae0973074ffea9538aa1dbe0eb900d36a28837a129e8251e", untracked_digest: absent, rename_from: null, rename_to: null, object_kind: {head: regular, index: regular, worktree: regular, untracked: absent}}
      - {path: src/components/layout/Sidebar.tsx, state: clean, head_digest: "sha256:d0fb0e879c4e057dd86511a4d0e18258830534b6d7d4f54eaee5e0c346ff857f", index_digest: "sha256:d0fb0e879c4e057dd86511a4d0e18258830534b6d7d4f54eaee5e0c346ff857f", worktree_digest: "sha256:d0fb0e879c4e057dd86511a4d0e18258830534b6d7d4f54eaee5e0c346ff857f", untracked_digest: absent, rename_from: null, rename_to: null, object_kind: {head: regular, index: regular, worktree: regular, untracked: absent}}
      - {path: src/components/shared/AudioButton.tsx, state: clean, head_digest: "sha256:a8c6f8867bd2260c4ab46cf27eede6c04b4dfc6db89a71df86e0c02b11442969", index_digest: "sha256:a8c6f8867bd2260c4ab46cf27eede6c04b4dfc6db89a71df86e0c02b11442969", worktree_digest: "sha256:a8c6f8867bd2260c4ab46cf27eede6c04b4dfc6db89a71df86e0c02b11442969", untracked_digest: absent, rename_from: null, rename_to: null, object_kind: {head: regular, index: regular, worktree: regular, untracked: absent}}
      - {path: src/config/navigation.ts, state: clean, head_digest: "sha256:7efe4a1d6824f5c162f59e78a92a9a3576062c9f6990fb6d4f58abcbfb6674a5", index_digest: "sha256:7efe4a1d6824f5c162f59e78a92a9a3576062c9f6990fb6d4f58abcbfb6674a5", worktree_digest: "sha256:7efe4a1d6824f5c162f59e78a92a9a3576062c9f6990fb6d4f58abcbfb6674a5", untracked_digest: absent, rename_from: null, rename_to: null, object_kind: {head: regular, index: regular, worktree: regular, untracked: absent}}
      - {path: src/db/schema/enums.ts, state: clean, head_digest: "sha256:a59d14b3bdc4cd7f6821515d818a9bef0b06b170b9b00eae8cfddcac982f64d0", index_digest: "sha256:a59d14b3bdc4cd7f6821515d818a9bef0b06b170b9b00eae8cfddcac982f64d0", worktree_digest: "sha256:a59d14b3bdc4cd7f6821515d818a9bef0b06b170b9b00eae8cfddcac982f64d0", untracked_digest: absent, rename_from: null, rename_to: null, object_kind: {head: regular, index: regular, worktree: regular, untracked: absent}}
      - {path: src/db/schema/index.ts, state: clean, head_digest: "sha256:42e71c1696f5924bacb87dbe6f1193417fa09027464a8682ff15c7b3a3e2d512", index_digest: "sha256:42e71c1696f5924bacb87dbe6f1193417fa09027464a8682ff15c7b3a3e2d512", worktree_digest: "sha256:42e71c1696f5924bacb87dbe6f1193417fa09027464a8682ff15c7b3a3e2d512", untracked_digest: absent, rename_from: null, rename_to: null, object_kind: {head: regular, index: regular, worktree: regular, untracked: absent}}
      - {path: src/db/schema/lessons.ts, state: clean, head_digest: "sha256:07f2fa063191688e78e7c06ee06f378cab83b1bc85888d1268ca29d906f77a30", index_digest: "sha256:07f2fa063191688e78e7c06ee06f378cab83b1bc85888d1268ca29d906f77a30", worktree_digest: "sha256:07f2fa063191688e78e7c06ee06f378cab83b1bc85888d1268ca29d906f77a30", untracked_digest: absent, rename_from: null, rename_to: null, object_kind: {head: regular, index: regular, worktree: regular, untracked: absent}}
      - {path: src/db/schema/listening.ts, state: clean, head_digest: "sha256:7280a3f2e390ecc44f04820cd423bc0c2e5a18fc195a2969802812f145a71e43", index_digest: "sha256:7280a3f2e390ecc44f04820cd423bc0c2e5a18fc195a2969802812f145a71e43", worktree_digest: "sha256:7280a3f2e390ecc44f04820cd423bc0c2e5a18fc195a2969802812f145a71e43", untracked_digest: absent, rename_from: null, rename_to: null, object_kind: {head: regular, index: regular, worktree: regular, untracked: absent}}
      - {path: src/db/schema/progress.ts, state: clean, head_digest: "sha256:1454d3f9219fd5f23873a3c4c0b08f4ca2eac373230f6143d2fe62690a9071cc", index_digest: "sha256:1454d3f9219fd5f23873a3c4c0b08f4ca2eac373230f6143d2fe62690a9071cc", worktree_digest: "sha256:1454d3f9219fd5f23873a3c4c0b08f4ca2eac373230f6143d2fe62690a9071cc", untracked_digest: absent, rename_from: null, rename_to: null, object_kind: {head: regular, index: regular, worktree: regular, untracked: absent}}
      - {path: src/features/future/README.md, state: clean, head_digest: "sha256:7bd5951abed781d5e7250062c21a247d7d5301f86e523ea822a0a75f0d51431d", index_digest: "sha256:7bd5951abed781d5e7250062c21a247d7d5301f86e523ea822a0a75f0d51431d", worktree_digest: "sha256:7bd5951abed781d5e7250062c21a247d7d5301f86e523ea822a0a75f0d51431d", untracked_digest: absent, rename_from: null, rename_to: null, object_kind: {head: regular, index: regular, worktree: regular, untracked: absent}}
      - {path: src/features/listening/actions.ts, state: clean, head_digest: "sha256:46c21ed4e02111b04b0ffabc9f32862c561c4ddcedc71a0fb76497d4f78265da", index_digest: "sha256:46c21ed4e02111b04b0ffabc9f32862c561c4ddcedc71a0fb76497d4f78265da", worktree_digest: "sha256:46c21ed4e02111b04b0ffabc9f32862c561c4ddcedc71a0fb76497d4f78265da", untracked_digest: absent, rename_from: null, rename_to: null, object_kind: {head: regular, index: regular, worktree: regular, untracked: absent}}
      - {path: src/features/listening/components/TranscriptPanel.tsx, state: clean, head_digest: "sha256:99645e3a4f611e45178d07cd7d4d0269f09ee88f18b893fbe3991913d61c84f7", index_digest: "sha256:99645e3a4f611e45178d07cd7d4d0269f09ee88f18b893fbe3991913d61c84f7", worktree_digest: "sha256:99645e3a4f611e45178d07cd7d4d0269f09ee88f18b893fbe3991913d61c84f7", untracked_digest: absent, rename_from: null, rename_to: null, object_kind: {head: regular, index: regular, worktree: regular, untracked: absent}}
      - {path: src/features/progress/queries.ts, state: clean, head_digest: "sha256:4fdfb059cf9c3f3422031962d48ff22f5650909136308a34b25d5c48ec16baee", index_digest: "sha256:4fdfb059cf9c3f3422031962d48ff22f5650909136308a34b25d5c48ec16baee", worktree_digest: "sha256:4fdfb059cf9c3f3422031962d48ff22f5650909136308a34b25d5c48ec16baee", untracked_digest: absent, rename_from: null, rename_to: null, object_kind: {head: regular, index: regular, worktree: regular, untracked: absent}}
      - {path: src/features/progress/types.ts, state: clean, head_digest: "sha256:4ec15b9739df7a58155136255f0436a615a4d945676376e2443af2696d52e4b9", index_digest: "sha256:4ec15b9739df7a58155136255f0436a615a4d945676376e2443af2696d52e4b9", worktree_digest: "sha256:4ec15b9739df7a58155136255f0436a615a4d945676376e2443af2696d52e4b9", untracked_digest: absent, rename_from: null, rename_to: null, object_kind: {head: regular, index: regular, worktree: regular, untracked: absent}}
      - {path: src/features/quiz/engine.test.ts, state: clean, head_digest: "sha256:cb9ce40bb71c4786d981e1d897bf77a632eb084395f5352198846fb7f8373d3c", index_digest: "sha256:cb9ce40bb71c4786d981e1d897bf77a632eb084395f5352198846fb7f8373d3c", worktree_digest: "sha256:cb9ce40bb71c4786d981e1d897bf77a632eb084395f5352198846fb7f8373d3c", untracked_digest: absent, rename_from: null, rename_to: null, object_kind: {head: regular, index: regular, worktree: regular, untracked: absent}}
      - {path: src/features/quiz/engine.ts, state: clean, head_digest: "sha256:b998d4a7545b5d0697d3cd439104ea2cb3b75d9cea7b2342616f48a29b8f154a", index_digest: "sha256:b998d4a7545b5d0697d3cd439104ea2cb3b75d9cea7b2342616f48a29b8f154a", worktree_digest: "sha256:b998d4a7545b5d0697d3cd439104ea2cb3b75d9cea7b2342616f48a29b8f154a", untracked_digest: absent, rename_from: null, rename_to: null, object_kind: {head: regular, index: regular, worktree: regular, untracked: absent}}
      - {path: src/features/study-time/useStudyHeartbeat.ts, state: clean, head_digest: "sha256:c11652ab0838ca389939e411526a4e3f86b432cf0cdaef32045ffc99d7cd6781", index_digest: "sha256:c11652ab0838ca389939e411526a4e3f86b432cf0cdaef32045ffc99d7cd6781", worktree_digest: "sha256:c11652ab0838ca389939e411526a4e3f86b432cf0cdaef32045ffc99d7cd6781", untracked_digest: absent, rename_from: null, rename_to: null, object_kind: {head: regular, index: regular, worktree: regular, untracked: absent}}
      - {path: src/middleware.ts, state: clean, head_digest: "sha256:c3c3ecaa9f4588d5a3dcfbaa2d28b40ecb97c5a92e2c5c8d5ad33978b4e7b618", index_digest: "sha256:c3c3ecaa9f4588d5a3dcfbaa2d28b40ecb97c5a92e2c5c8d5ad33978b4e7b618", worktree_digest: "sha256:c3c3ecaa9f4588d5a3dcfbaa2d28b40ecb97c5a92e2c5c8d5ad33978b4e7b618", untracked_digest: absent, rename_from: null, rename_to: null, object_kind: {head: regular, index: regular, worktree: regular, untracked: absent}}
  files_to_modify:
    - file: src/db/schema/speaking.ts
      symbols: [speakingPrompts, userSpeakingAttempts]
      intended_change: new tables
    - file: src/db/schema/index.ts
      symbols: []
      intended_change: re-export speaking
    - file: src/features/speaking/*
      symbols: [compareTranscript, submitSpeakingAttempt, SpeechPractice]
      intended_change: new feature folder
    - file: src/config/navigation.ts
      symbols: [NavLabelKey, mainNav]
      intended_change: add speaking after listening
    - file: src/middleware.ts
      symbols: [PROTECTED_PATHS, config]
      intended_change: protect /speaking
    - file: messages/en.json
      symbols: []
      intended_change: nav.speaking + speaking.*
    - file: messages/vi.json
      symbols: []
      intended_change: same keys
    - file: src/db/seed.ts
      symbols: [seedSpeakingPrompts]
      intended_change: 8-12 original prompts
  tests:
    - file: src/features/speaking/compare.test.ts
      scenarios:
        - "Beautiful Day vs beautiful  day → 100 overlap"
        - "missing/extra tokens reduce percent; empty → 0"
  verification_commands:
    - npm run test
    - npm run lint
    - npm run build
  assumptions:
    - "Check: Chromium SpeechRecognition is acceptable as v1 primary ASR (HOW: caniuse + SpeechPractice unsupported state)."
    - "Check: word-overlap is enough vs phoneme scoring (HOW: product accept; model later)."
  open_questions:
    - "Complete threshold (e.g. overlap >= 70) vs always save attempt."
  avoid:
    - Do not edit AudioButton (4 vocab d=1 importers)
    - Do not change skillEnum or ProgressSkill charts in this phase
    - Do not upload recordings or call cloud ASR/TTS
    - Do not implement in features/future/
    - Do not put speaking rows on user_progress (lesson FK)
```

## Assumptions and Open Questions (§12)

Assumed: browser Web Speech Recognition is the v1 ASR; Firefox/Safari degrade to listen + local playback. Assumed: overlap % is learner-facing, not CEFR. Deferred: pronunciation model, Whisper, Progress skill chart for speaking, course lessons with `skill=speaking`, e2e mic, VOA/Gutenberg prompts.

Open: pass threshold for “completed” badge; whether to store token-diff JSON.

## Definition of Done (§13)

`/speaking` lists seeded prompts; session plays model via existing `AudioButton`; recognition (when supported) shows highlighted transcript compare; submit stores server-scored attempt; no audio leaves the browser; `npm run test` / `lint` / `build` pass; no AudioButton/`skillEnum` edits.
