# features/placement-test

CEFR placement test (Phase 11 / spec §8).

- `queries.ts` — load test without correctness flags; latest attempt for settings
- `actions.ts` — `submitPlacementTest` scores, writes `placement_test_attempts`, updates `users.cefr_level`
- `thresholds.ts` — score → A1…C1 bands (shared with seed)
- `components/PlacementTestSession.tsx` — intro → runner → result + Skip for now
