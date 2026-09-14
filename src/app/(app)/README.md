# (app)

Every authenticated route. `layout.tsx` calls `requireUser()` (Phase 04) so every nested page is
gated on a real session, then renders the Phase 05 `AppShell`: `Sidebar` (≥768px, icon-only until
1024px) + `AppHeader`/`MobileNav` (<768px) from `src/components/layout/`. Every route the sidebar
links to (`dashboard/`, `courses/`, `vocabulary/`, `grammar/`, `listening/`, `quiz/`, `progress/`)
plus `settings/` (reachable from `UserMenu`) is currently a Phase 05 placeholder — `PageHeader` +
`EmptyState` saying which later phase builds it. `placement-test/` is the Phase 04 onboarding
placeholder. `error.tsx`/`loading.tsx` here are the authenticated-shell versions (spec §33) — they
render inside `layout.tsx`, so the shell chrome stays visible.
