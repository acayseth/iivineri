FROM node:22-alpine AS base
WORKDIR /app

FROM base AS deps
ENV NODE_ENV=production
ENV ASTRO_TELEMETRY_DISABLED=1
WORKDIR /app
RUN apk add --no-cache libc6-compat python3 make g++
COPY package.json yarn.lock ./
RUN corepack enable && yarn install --frozen-lockfile


FROM base AS builder
ENV NODE_ENV=production
ENV ASTRO_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx astro build --remote


FROM base AS runner
ENV NODE_ENV=production
ENV TZ=Europe/Chisinau
ENV HOST=0.0.0.0
ENV PORT=4321
ENV ASTRO_TELEMETRY_DISABLED=1
RUN apk add --no-cache tzdata libc6-compat
RUN addgroup -g 1001 -S nodejs && \
    adduser -S astro -u 1001 -G nodejs && \
    chown astro:nodejs /app
COPY --from=deps --chown=astro:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=astro:nodejs /app/dist ./dist
COPY --from=builder --chown=astro:nodejs /app/astro.config.mjs ./astro.config.mjs
COPY --chown=astro:nodejs ./db ./db
COPY --chown=astro:nodejs ./docker-entrypoint.sh ./
RUN mkdir -p /app/.db && chown astro:nodejs /app/.db
USER astro
EXPOSE 4321
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "./dist/server/entry.mjs"]
