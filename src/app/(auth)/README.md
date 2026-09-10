# (auth)

`/login`, `/register`, `/forgot-password` (static explainer, no email sending in Phase 1). Public
routes — `middleware.ts` redirects `/login` and `/register` to `/dashboard` if already
authenticated. Populated in Phase 04.
