import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

/**
 * The only Route Handler in the app (AD-06) — better-auth's own endpoints
 * (`/api/auth/sign-up/email`, `/api/auth/get-session`, ...) must be callable
 * outside React, so they can't be Server Actions.
 */
export const { GET, POST } = toNextJsHandler(auth);
