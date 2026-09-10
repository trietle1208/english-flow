/**
 * Password complexity rule (spec §34): at least 8 characters, at least one
 * letter and one digit.
 *
 * better-auth only enforces `minPasswordLength` itself (see `src/lib/auth.ts`),
 * which has no concept of "must contain a letter and a number" — so this
 * lives here and is checked from two places: `registerSchema` (Zod, for the
 * client form) and `emailAndPassword.password.hash` in `src/lib/auth.ts`.
 * The latter is what actually makes the rule unbypassable — it runs for
 * every sign-up, including a request sent straight to
 * `/api/auth/sign-up/email` that skips our Server Action and its Zod check.
 */
export function isPasswordComplexEnough(password: string): boolean {
  return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
}

export const PASSWORD_COMPLEXITY_MESSAGE =
  "Password must be at least 8 characters and contain a letter and a number.";
