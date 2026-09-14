# features/auth

`schemas.ts` (Zod: `registerSchema`, `loginSchema`), `actions.ts` (Server Actions:
`registerAction`, `loginAction`, `logoutAction` — each wraps `auth.api.*`, see AD-06) and
`components/` (`RegisterForm`, `LoginForm`, `GoogleIcon`). `logoutAction` is called from
`components/layout/UserMenu.tsx` and `AppHeader.tsx` (Phase 05's `AppShell`), not from a
component in this folder. `requireUser()` / `getCurrentUser()` themselves live in
`src/lib/session.ts`, not here, since every feature needs them.
