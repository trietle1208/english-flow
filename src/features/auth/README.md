# features/auth

`schemas.ts` (Zod: `registerSchema`, `loginSchema`), `actions.ts` (Server Actions:
`registerAction`, `loginAction`, `logoutAction` — each wraps `auth.api.*`, see AD-06) and
`components/` (`RegisterForm`, `LoginForm`, `LogoutButton`, `GoogleIcon`). `requireUser()` /
`getCurrentUser()` themselves live in `src/lib/session.ts`, not here, since every feature needs
them.
