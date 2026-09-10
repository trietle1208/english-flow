# syntax=docker/dockerfile:1

# ---- deps: install dependencies only (cached separately from source) ----
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder: compile the production build ----
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
# No real database is reachable during the image build — skip src/env.ts
# validation here; the runtime container gets real env vars from
# docker-compose.yml and is never started with this flag set.
ENV SKIP_ENV_VALIDATION=1

RUN npm run build

# ---- runner: minimal production image ----
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
# `output: "standalone"` (next.config.ts) traces only the files server.js
# actually needs, so the image doesn't carry the full node_modules tree.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
