#!/bin/sh
set -e
# Named volume for node_modules starts empty and hides image deps —
# install once (or whenever next is missing after a wipe).
if [ ! -x node_modules/.bin/next ]; then
  echo "Installing dependencies into container volume..."
  npm ci
fi
# `npm run dev` already passes --turbopack: first-route compile is seconds,
# not 30–40s (webpack in Docker).
exec npm run dev -- -H 0.0.0.0
