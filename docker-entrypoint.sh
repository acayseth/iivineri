#!/bin/sh
set -e

echo "[entrypoint] Running database migrations/seeds"
node_modules/.bin/astro db push --remote --seeds

echo "[entrypoint] starting astro server"
exec "$@"
