# components/layout

The Phase 05 `AppShell` chrome, composed by `src/app/(app)/layout.tsx`:

- `Sidebar` — desktop (≥1024px, icon+label) / tablet (768–1023px, icon+tooltip) nav, hidden below 768px.
- `AppHeader` — mobile-only (<768px) compact header; its avatar opens a `Sheet` drawer with the nav
  items that don't fit `MobileNav`'s 4 tabs, plus Settings/Theme/Logout.
- `MobileNav` — mobile-only (<768px) fixed bottom tab bar (Dashboard/Courses/Vocabulary/Progress).
- `UserMenu` — avatar → dropdown (name, email, Settings, Logout), used by `Sidebar`'s bottom row.

All four read nav items from `src/config/navigation.ts` — add a route there, not here.
