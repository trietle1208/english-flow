# Feedback (Góp Ý)

Signed-in learners review EnglishFlow and send suggestions, bugs, or content notes.

| File | Role |
| --- | --- |
| `actions.ts` | `submitFeedback` — `requireUser` + Zod |
| `queries.ts` | Own history + public reviews (no emails) |
| `schemas.ts` / `constants.ts` | Categories, statuses, Zod |
| `components/FeedbackForm.tsx` | Submit form |
| `components/FeedbackList.tsx` | The learner's own notes |
| `components/PublicReviews.tsx` | Shared reviews from other learners |

There is no admin inbox in this pass — status stays `new` until a later owner tool. Read rows in Drizzle Studio.
