"use client";

import { createAuthClient } from "better-auth/react";
import { env } from "@/env";

/**
 * Client-side better-auth helpers. Registration/login/logout themselves go
 * through Server Actions in `src/features/auth/actions.ts` (AD-06) — this
 * client is for reactive session state in Client Components (e.g. showing
 * the signed-in user in the app shell without a full page reload).
 */
export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_APP_URL,
});

export const { useSession } = authClient;
