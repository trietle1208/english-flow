import { execSync } from "node:child_process";
import path from "node:path";

/**
 * Ensure the dedicated test DB exists and is migrated+seeded before workers
 * start. Skip with `E2E_SKIP_DB_RESET=1` when iterating on a warm DB.
 */
export default function globalSetup(): void {
  if (process.env.E2E_SKIP_DB_RESET === "1") {
    console.log("[e2e] Skipping DB reset (E2E_SKIP_DB_RESET=1)");
    return;
  }

  const script = path.join(__dirname, "..", "scripts", "reset-test-db.mjs");
  execSync(`node "${script}"`, {
    stdio: "inherit",
    env: process.env,
  });
}
