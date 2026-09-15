# features/vocabulary

Personal vocabulary (Phase 09, spec §13–§16).

- `components/VocabularyItem.tsx` — shared row used in lessons
- `components/SaveVocabularyButton.tsx` — optimistic Save ⭐ ↔ Saved
- `components/VocabularyCard.tsx` — My Vocabulary card (play / learned / remove)
- `components/VocabularyFilters.tsx` / `VocabularyStats.tsx` / `VocabularyList.tsx`
- `queries.ts` — paginated list + aggregate stats (SQL only, never full-table fetch)
- `actions.ts` — `saveVocabulary` / `removeVocabulary` / `toggleLearned` / `recordVocabularyReview`

Saving creates a `user_vocabularies` link only — vocabulary content is never copied.
