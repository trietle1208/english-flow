# features/dashboard

Dashboard presentation components (spec §9). Data comes from
`src/features/progress/queries.ts` — this folder is UI only.

| Component | Purpose |
| --- | --- |
| `DailyGoalCard` | Today’s minutes vs `daily_goal_minutes` |
| `StreakCard` | Current streak + 7-day activity dots |
| `ContinueLearningCard` | Large CTA to the in-progress / next lesson |
| `ContinueLearningEmpty` | Caught-up state when nothing is left to continue |
| `SkillOverview` | Vocabulary / Grammar / Listening / Reading cards |
| `RecentActivity` | Merged lesson / quiz / vocab feed (max 8) |
| `RecommendedLessons` | CEFR + weakest-skill suggestions |
| `DashboardOnboarding` | Brand-new user CTAs (placement / first course) |
| `DashboardSkeletons` | Suspense fallbacks per block |
