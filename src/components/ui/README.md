# components/ui

shadcn/ui primitives (generated via `npx shadcn@latest add <component>`, style `new-york`). This
project pins Tailwind v3, so the CLI's own output uses the older `forwardRef` pattern — every file
here is hand-aligned to the `data-slot`-based function-component pattern the Phase 01 primitives
(`button.tsx`, `card.tsx`, `input.tsx`, ...) already use, so re-running the CLI on an existing
component means re-applying that same style, not a blind overwrite.
