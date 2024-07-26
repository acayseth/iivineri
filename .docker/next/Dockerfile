FROM node:20-alpine AS base
RUN apk update
RUN apk add --no-cache libc6-compat

FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1
ENV TURBO_TELEMETRY_DISABLED=1
WORKDIR /app
RUN yarn global add turbo@1.13.4
COPY . .
RUN turbo prune --scope=web --docker

FROM base AS installer
ENV NEXT_TELEMETRY_DISABLED=1
ENV TURBO_TELEMETRY_DISABLED=1
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS sourcer
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV TURBO_TELEMETRY_DISABLED=1
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
RUN yarn turbo run build --scope=web --include-dependencies --no-deps

FROM base AS runner
ENV PORT=3000
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV TURBO_TELEMETRY_DISABLED=1
WORKDIR /app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
COPY --from=sourcer --chown=nextjs:nodejs /app/applications/web/public ./public
COPY --from=sourcer --chown=nextjs:nodejs /app/applications/web/.next/standalone/node_modules ./node_modules
COPY --from=sourcer --chown=nextjs:nodejs /app/applications/web/.next/standalone/applications/web/.next ./.next
COPY --from=sourcer --chown=nextjs:nodejs /app/applications/web/.next/standalone/applications/web/server.js ./server.js
COPY --from=sourcer --chown=nextjs:nodejs /app/applications/web/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]