"use server";

import { headers } from "next/headers";
import { APIError } from "better-auth";
import { auth } from "@/lib/auth";
import { loginSchema, registerSchema } from "./schemas";

type ActionResult = { ok: true } | { ok: false; error: string };

const GENERIC_ERROR = "Something went wrong. Please try again.";

/**
 * Registers a new user and signs them in (better-auth issues the session
 * cookie via the `nextCookies()` plugin — see `src/lib/auth.ts`).
 *
 * Both forms call this instead of `authClient.signUp.email` directly (AD-06:
 * Server Actions are the default for mutations) — the request never
 * leaves the server, and this is the one place the Zod rules and the
 * friendly-error mapping live.
 */
export async function registerAction(input: unknown): Promise<ActionResult> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? GENERIC_ERROR };
  }

  const { name, email, password } = parsed.data;

  try {
    await auth.api.signUpEmail({
      body: { name, email, password },
      headers: await headers(),
    });
    return { ok: true };
  } catch (error) {
    // Never leak the underlying Postgres unique-constraint error (spec §34) —
    // map it to a friendly message instead. better-auth's sign-up route
    // throws "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL" (verified against a
    // real duplicate sign-up); "USER_ALREADY_EXISTS" is also handled in case
    // another code path throws the shorter code.
    const duplicateEmailCodes = ["USER_ALREADY_EXISTS", "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL"];
    if (error instanceof APIError && duplicateEmailCodes.includes(error.body?.code ?? "")) {
      return { ok: false, error: "An account with this email already exists." };
    }
    console.error("registerAction failed:", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}

/** Signs an existing user in. See `registerAction` for why this is a Server Action. */
export async function loginAction(input: unknown): Promise<ActionResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? GENERIC_ERROR };
  }

  const { email, password, rememberMe } = parsed.data;

  try {
    await auth.api.signInEmail({
      body: { email, password, rememberMe },
      headers: await headers(),
    });
    return { ok: true };
  } catch (error) {
    // Deliberately generic — never reveal whether the email exists (spec §34).
    if (error instanceof APIError) {
      return { ok: false, error: "Email or password is incorrect." };
    }
    console.error("loginAction failed:", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}

/** Ends the current session. Called from the `AppShell`'s `UserMenu`/`AppHeader` (Phase 05). */
export async function logoutAction(): Promise<ActionResult> {
  try {
    await auth.api.signOut({ headers: await headers() });
    return { ok: true };
  } catch (error) {
    console.error("logoutAction failed:", error);
    return { ok: false, error: GENERIC_ERROR };
  }
}
