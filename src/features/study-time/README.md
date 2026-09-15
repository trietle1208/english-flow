# features/study-time

Study-time heartbeat (AD-08). Used by the lesson page (Phase 08); listening/quiz will reuse the same hook later.

- `useStudyHeartbeat.ts` — client: every 60s while the tab is visible
- `actions.ts` — `recordStudyTime` (caps at 2 minutes per heartbeat, ignores spam)
