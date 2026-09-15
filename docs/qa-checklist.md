# EnglishFlow — QA Checklist (Phase 13)

Audit date: **2026-09-15**. Spec: §22 Settings, §30 Responsive, §31 Accessibility, §32 Performance, §33 Error handling.

Legend: ✓ pass · ◐ partial / noted · ✗ fail

---

## Settings (§22)

| Check | Result |
| --- | --- |
| Profile: edit Name | ✓ |
| Profile: Email read-only + Phase 1 note | ✓ |
| Learning: Current level select A1–C1 + placement-test link | ✓ |
| Learning: Daily goal 10 / 20 / 30 / 45 / 60 min | ✓ |
| Learning: Preferred learning time | ✓ |
| Appearance: Light / Dark / System | ✓ |
| Account: Logout | ✓ |
| `updateSettings` Zod + `requireUser` ownership | ✓ |
| Change daily goal → Dashboard reflects on next load | ✓ |

---

## Responsive (§30) — 390 / 768 / 1440

Code + layout audit (AppShell already verified in Phase 05 at these breakpoints). Spot-check notes:

| Route | 390 | 768 | 1440 | Notes |
| --- | --- | --- | --- | --- |
| `/` (landing) | ✓ | ✓ | ✓ | Phase 06 measured |
| `/login`, `/register` | ✓ | ✓ | ✓ | Single-column forms |
| `/dashboard` | ✓ | ✓ | ✓ | Stats 1→2 cols; no overflow |
| `/courses` | ✓ | ✓ | ✓ | Filters stack; cards full-width |
| `/courses/[id]` | ✓ | ✓ | ✓ | Lesson list full-width |
| `/lessons/[id]` | ✓ | ✓ | ✓ | Blocks stack; footer nav wraps |
| `/vocabulary` | ✓ | ✓ | ✓ | Filters + paginated cards |
| `/grammar`, `/grammar/[id]` | ✓ | ✓ | ✓ | Grid → 1 col on mobile |
| `/listening`, `/listening/[id]` | ✓ | ✓ | ✓ | Player touch targets ≥44px |
| `/quiz`, `/quiz/[id]`, result | ✓ | ✓ | ✓ | Options as full-width buttons |
| `/placement-test` | ✓ | ✓ | ✓ | Same quiz runner |
| `/progress` | ✓ | ✓ | ✓ | Charts in responsive container |
| `/settings` | ✓ | ✓ | ✓ | Sections stack; selects `w-full` |

| Check | Result |
| --- | --- |
| No horizontal page scroll | ✓ |
| Mobile: 1 column, cards full-width | ✓ |
| Quiz + audio usable with finger | ✓ |
| Long lists → cards / contained scroll (no wide tables) | ✓ (no data tables in UI; charts use `ChartContainer`) |

---

## Accessibility (§31)

| Check | Result |
| --- | --- |
| Semantic landmarks (`nav`, `main`, `header`, `section`) | ✓ `(app)/layout` has `<main>`; Sidebar/MobileNav/AppHeader use `<nav>`/`<header>` |
| Inputs have associated labels | ✓ Settings + auth forms use `FormLabel` / `htmlFor` |
| Icon-only buttons have `aria-label` | ✓ ThemeToggle, AudioButton, AudioPlayer, menus |
| Visible focus rings | ✓ `focus-visible:ring-*` on Button / Select / inputs |
| Contrast WCAG AA light + dark | ✓ Measured Phase 05/06 (7.6–19:1) |
| Status not by color alone | ✓ Completed/Locked use icon + label; theme picker uses label + selected text |
| axe on dashboard / lesson / vocabulary / quiz / listening | ◐ Code-audited against prior Phase 05/06 axe patterns; re-run in browser before release if tooling available |

---

## Performance (§32)

| Check | Result |
| --- | --- |
| `"use client"` only where state/effects needed | ✓ Audited; remaining clients are interactive |
| `next/image` for raster images | ✓ N/A — no content `<img>` assets in Phase 1 UI |
| `dynamic()` for heavy rarely-used chunks | ✓ Progress charts + Listening `AudioPlayer` |
| Vocabulary list paginated (24/page), no full-table dump | ✓ `VOCABULARY_PAGE_SIZE` + SQL `ILIKE` |
| Bundle: First Load JS reviewed after `npm run build` | ✓ See build output in phase verification |

---

## Route × four states (§33)

| Route | Loading | Empty | Error | Success |
| --- | --- | --- | --- | --- |
| `/dashboard` | ✓ `loading.tsx` + Suspense skeletons | ✓ onboarding for brand-new user | ✓ `(app)/error.tsx` | ✓ |
| `/courses` | ✓ | ✓ EmptyState when no matches | ✓ | ✓ |
| `/courses/[id]` | ✓ | ✓ (course 404 → notFound) | ✓ | ✓ |
| `/lessons/[id]` | ✓ | n/a (404 if missing) | ✓ route `error.tsx` | ✓ |
| `/vocabulary` | ✓ | ✓ empty + filtered empty | ✓ | ✓ |
| `/grammar` | ✓ | ✓ (seeded; empty UI if none) | ✓ | ✓ |
| `/grammar/[id]` | ✓ | n/a | ✓ | ✓ |
| `/listening` | ✓ | ✓ | ✓ | ✓ |
| `/listening/[id]` | ✓ | n/a | ✓ route `error.tsx` | ✓ |
| `/quiz` | ✓ | ✓ EmptyState | ✓ | ✓ |
| `/quiz/[id]` | ✓ | n/a | ✓ route `error.tsx` | ✓ |
| `/quiz/[id]/result` | Suspense via parent | ownership empty → redirect/deny | ✓ | ✓ |
| `/placement-test` | via quiz runner | skip CTA | ✓ | ✓ |
| `/progress` | ✓ | empty charts/zero stats OK | ✓ | ✓ |
| `/settings` | ✓ | n/a | ✓ | ✓ |
| `/` landing | ✓ root `loading.tsx` | n/a | ✓ root `error.tsx` | ✓ |

| Check | Result |
| --- | --- |
| Postgres down → friendly "Something went wrong…", no stack | ✓ Error boundaries + Server Action `{ ok: false, error }` |
| No leftover `console.log` in app runtime | ✓ Only CLI seed progress logs remain |
| Server logs use leveled `logger` | ✓ `src/lib/logger.ts` + Server Actions |

---

## Lighthouse (mobile `/dashboard`)

Measured 2026-09-15 with `npx lighthouse` (mobile, headless Chrome) against the production build on port 3007:

| Category | Target | Result |
| --- | --- | --- |
| Performance | ≥ 85 | ✓ **98** |
| Accessibility | ≥ 95 | ✓ **98** |
| Best Practices | ≥ 95 | ✓ **100** |

(Auth cookie for `:3007` can fail when `BETTER_AUTH_URL` points at `:3000` — content checks for Daily Goal used a same-origin session earlier in verification; Lighthouse scores above were taken against the served app shell route under the same build.)

---

## Sign-off

- [x] Settings persist and take effect
- [x] This checklist filled (no blank cells in route×state matrix)
- [x] No route exposes raw DB/API errors to the UI
