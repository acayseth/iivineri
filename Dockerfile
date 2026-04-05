# syntax=docker/dockerfile:1

# ============================================
# Base
# ============================================
FROM node:22-alpine AS base
ENV NODE_ENV=production
WORKDIR /app

# ============================================
# Dependencies
# ============================================
FROM base AS deps
COPY package.json yarn.lock ./
RUN --mount=type=cache,target=/root/.yarn \
    yarn install --frozen-lockfile --production=false

# ============================================
# Builder
# ============================================
FROM deps AS builder
COPY . .
ARG APP_SECRET
ARG THUMBOR_URL
ARG THUMBOR_KEY
RUN node ./node_modules/.bin/astro build

# ============================================
# Runner
# ============================================
FROM base AS runner

RUN apk add --no-cache tini && \
    addgroup -g 1001 -S astro && \
    adduser -S astro -u 1001 -G astro && \
    mkdir -p /app/data && \
    chown -R astro:astro /app

COPY --from=deps --chown=astro:astro /app/node_modules ./node_modules
COPY --from=builder --chown=astro:astro /app/package.json ./
COPY --from=builder --chown=astro:astro /app/dist ./dist
COPY --from=builder --chown=astro:astro /app/db ./db

ENV HOST=0.0.0.0
ENV PORT=3000
ENV ASTRO_DATABASE_FILE=/app/data/content.db

USER astro

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD ["wget", "-qO-", "http://localhost:3000/"]

EXPOSE 3000

ENTRYPOINT ["tini", "--"]
CMD ["node", "./dist/server/entry.mjs"]
