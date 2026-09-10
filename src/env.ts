/**
 * Validated environment variables (AD-10).
 *
 * Parsed once, at process startup, from `process.env`. Import `env` instead
 * of reading `process.env` directly anywhere else in the codebase — that way
 * a missing/invalid variable fails fast with a readable message instead of
 * surfacing as `undefined` deep inside a query or auth call.
 *
 * `next.config.ts` imports this module so validation also runs at build
 * time, before a broken deploy can happen.
 */
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z
    .string({ message: "DATABASE_URL is required. Copy .env.example to .env and fill it in." })
    .min(1, "DATABASE_URL is required. Copy .env.example to .env and fill it in.")
    .url("DATABASE_URL must be a valid postgresql:// connection string."),

  NEXT_PUBLIC_APP_URL: z
    .string()
    .min(1, "NEXT_PUBLIC_APP_URL is required.")
    .url("NEXT_PUBLIC_APP_URL must be a valid URL.")
    .default("http://localhost:3000"),

  // Required from Phase 04 (auth) onward — better-auth uses this to sign/encrypt
  // session tokens. Generate with: openssl rand -base64 32
  BETTER_AUTH_SECRET: z
    .string({ message: "BETTER_AUTH_SECRET is required. Generate with: openssl rand -base64 32" })
    .min(1, "BETTER_AUTH_SECRET is required. Generate with: openssl rand -base64 32"),
  BETTER_AUTH_URL: z
    .string({ message: "BETTER_AUTH_URL is required." })
    .min(1, "BETTER_AUTH_URL is required.")
    .url("BETTER_AUTH_URL must be a valid URL.")
    .default("http://localhost:3000"),
});

/**
 * Set by the Docker builder stage only (`Dockerfile`). `next build` runs
 * inside the image without a real database reachable, so real validation is
 * skipped there; the runtime container gets its real env vars from
 * `docker-compose.yml` and is never started with this flag set.
 */
const skipValidation = process.env.SKIP_ENV_VALIDATION === "1";

function loadEnv(): z.infer<typeof envSchema> {
  if (skipValidation) {
    return process.env as unknown as z.infer<typeof envSchema>;
  }

  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n");

    throw new Error(
      `❌ Invalid environment variables:\n${issues}\n\nCheck your .env against .env.example.`,
    );
  }

  return parsed.data;
}

export const env = loadEnv();
