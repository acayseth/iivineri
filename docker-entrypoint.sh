#!/bin/sh
set -e

echo "[entrypoint] Running database migrations/seeds"
npx astro db push --remote

echo "[entrypoint] starting astro server"
exec "$@"
