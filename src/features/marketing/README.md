# features/marketing

`components/` only — the landing page (spec §6) has no reads/mutations of its own, so there's no
`queries.ts`/`actions.ts`/`schemas.ts` here (rule "no premature abstraction"). `Header`, `Hero`,
`Features`, `HowItWorks`, `FinalCTA`, `Footer` are composed by `src/app/(marketing)/layout.tsx` and
`page.tsx`.
