import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
// Validates process.env at startup/build time and fails fast with a
// readable error if a required variable is missing or malformed (AD-10).
import "./src/env";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Slim, self-contained production image for the Dockerfile's `runner`
  // stage — only the files actually needed to run `node server.js`.
  output: "standalone",
};

export default withNextIntl(nextConfig);
