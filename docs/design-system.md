# Design System

Short reference for `src/app/globals.css` / `tailwind.config.ts`. Spec §29 (UI Design System),
§30 (Responsive), §31 (Accessibility). See [phase-05-app-shell-design-system.md](plan/phase-05-app-shell-design-system.md)
for the phase that built this.

## Principle

> "Color mainly communicates: primary actions, success, warning, error, learning progress." (§29)

Two consequences, applied everywhere:

1. **Never rely on color alone for state.** An active nav item also gets a left indicator bar +
   bold text. A correct/incorrect quiz answer also gets an icon (✓/✗). A disabled control also
   gets reduced opacity + `cursor-not-allowed` (§31).
2. **Skill colors are not status colors.** `--skill-vocabulary/grammar/listening/reading` (used for
   the Dashboard/Progress "Skill Overview" cards, §10/§28) live in a distinct cyan→blue→violet→
   magenta hue family, deliberately kept away from `--success`/`--warning`/`--destructive`'s
   red/orange/green range — a skill card should never accidentally read as a status signal.

## Tokens (`globals.css`, light + `.dark` variants)

| Token                            | Use for                                                            |
| --------------------------------- | ------------------------------------------------------------------- |
| `--background` / `--foreground`   | Page background / default text                                     |
| `--card`, `--popover`             | Surfaces raised one level (cards, dropdowns, dialogs)                |
| `--primary`                       | Primary actions only — main CTA buttons, active nav indicator, links |
| `--secondary`, `--muted`, `--accent` | Low-emphasis surfaces/text, hover backgrounds                    |
| `--destructive`                   | Errors, destructive actions (delete, logout)                       |
| `--success`                       | Completed/correct/streak-kept                                      |
| `--warning`                       | At-risk goal, near quiz attempt limit                               |
| `--border` / `--input` / `--ring` | Borders, form field borders, focus rings                            |
| `--skill-vocabulary/grammar/listening/reading` | Per-skill progress rings/bars/charts (never status)     |
| `--chart-1..5`                    | Recharts series (AD-05), decorative only — not status               |

All colors are defined once on `:root` and once on `.dark`; components reference the Tailwind
utility (`bg-primary`, `text-muted-foreground`, …), never a raw `oklch(...)` value, so dark mode
never needs a second pass.

## Scale

- **Radius**: `--radius: 0.625rem` (`rounded-lg`). `rounded-md`/`rounded-sm` derive from it
  (`calc(var(--radius) - 2px/4px)`) — don't hardcode a different radius.
- **Spacing**: Tailwind's default scale, no custom values. Page padding: `px-4 sm:px-6 lg:px-8`.
- **Shadow**: only two levels, both used sparingly (§29 "avoid excessive shadows) —
  - `shadow-sm`: resting surfaces (`Card`, `Button`).
  - `shadow-md`: transient overlays (`Dialog`, `Sheet`, `DropdownMenu`, `Select`).
  - Never `shadow-lg`/`shadow-xl`/`shadow-2xl`.

## Components

shadcn/ui primitives in `src/components/ui/` (button, input, select, card, badge, tabs, progress,
dialog, dropdown-menu, sonner (toast), tooltip, skeleton, separator, avatar, sheet, scroll-area,
label, form, checkbox) cover spec §29's component list. Cross-feature composites live in
`src/components/shared/`:

| Component      | Use for                                                              |
| --------------- | ---------------------------------------------------------------------- |
| `PageHeader`    | Title + description + action slot, top of every `(app)` page           |
| `EmptyState`    | Icon + title + description + CTA — empty lists, "coming soon" placeholders |
| `ErrorState`    | Used by every `error.tsx` — generic message + Retry, never a raw error  |
| `StatCard`      | Label + value + delta/subtext + optional progress bar                  |
| `SectionCard`   | Titled card section (Dashboard "Recent Activity", Progress charts)     |
| `ProgressRing`  | Circular % indicator for skill/CEFR breakdowns                         |

## Theme

`next-themes` (`src/components/theme/ThemeProvider.tsx`, `attribute="class"`) drives the `.dark`
class Tailwind's `darkMode: "class"` expects. `ThemeToggle` (Light/Dark/System) lives in the
sidebar's bottom row and the mobile drawer today; `/settings` (Phase 13) reuses the same component.

## Navigation

`src/config/navigation.ts` is the single source of truth for the 7 sidebar items (spec §4) and
which 4 of them repeat in the mobile bottom tab bar. Add a route there, not by hardcoding a link in
`Sidebar`/`MobileNav`/`AppHeader`.
