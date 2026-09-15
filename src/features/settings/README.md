# Settings

Profile, learning preferences, appearance, and account (spec §22).

| File | Role |
| --- | --- |
| `actions.ts` | `updateSettings` — Zod + ownership via `requireUser()` |
| `schemas.ts` / `constants.ts` | Daily goal options, preferred learning time, Zod |
| `components/SettingsForm.tsx` | Profile + Learning form |
| `components/AppearanceSection.tsx` | Light / Dark / System (next-themes, client-only) |
| `components/AccountSection.tsx` | Logout |

Email is read-only in Phase 1. Theme is not stored in Postgres.
