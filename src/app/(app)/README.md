# (app)

Every authenticated route. `layout.tsx` calls `requireUser()` (Phase 04) so every nested page is
gated on a real session; it currently renders a bare header with a Logout button as a stand-in —
Phase 05 replaces that with the full `AppShell` (sidebar + mobile nav). `dashboard/` and
`placement-test/` are Phase 04 placeholders proving the auth redirects work end-to-end; Phase 12
and Phase 11 build their real content.
