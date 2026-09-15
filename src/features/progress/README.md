# features/progress

Dashboard stats, streaks (AD-09), daily activity aggregation, and Phase 1
achievements (spec §9 / §21).

| File | Role |
| --- | --- |
| `queries.ts` | Server-only reads: daily goal, streak, continue lesson, skill overview, recent activity, recommendations, overall stats, achievements |
| `streak.ts` | Pure streak math + greeting helpers (timezone-aware calendar days) |
| `achievements.ts` | Achievement definitions `{ key, title, description, check(stats) }` |
| `actions.ts` | `evaluateAchievements` — idempotent unlock writes to `user_achievements` |
| `components/` | `/progress` UI: overall stats, charts, streak calendar, achievement list |
| `types.ts` | Shared DTOs for dashboard + progress |

Achievements are evaluated after lesson complete, vocabulary save, quiz submit,
and study-time heartbeats (for the 7-day streak).
