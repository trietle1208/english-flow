# (marketing)

Public routes — no auth required, not gated by `middleware.ts`. Currently just `/` (spec §6):
`layout.tsx` renders the shared `Header`/`Footer` frame, `page.tsx` assembles `Hero` → `Features` →
`HowItWorks` → `FinalCTA` from `src/features/marketing/components/` and carries the page's SEO
metadata (title, description, OpenGraph, Twitter card). Both `Header` and `Hero`/`FinalCTA` call
`getCurrentUser()` themselves to swap their CTA to "Go to Dashboard" for a signed-in visitor.
