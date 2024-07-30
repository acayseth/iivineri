ARG NEXT_PUBLIC_DOMAIN

FROM node:20-alpine AS base

FROM base AS builder
ENV NODE_ENV=production
ENV TURBO_TELEMETRY_DISABLED=1
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN yarn global add turbo@^2
COPY . .
RUN turbo prune web --docker

FROM base AS installer
ENV NODE_ENV=production
ENV TURBO_TELEMETRY_DISABLED=1
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi
COPY --from=builder /app/out/full/ .
RUN yarn global add turbo@^2
RUN turbo run build --filter=web

FROM base AS runner
ENV PORT=3000
ENV NODE_ENV=production
ENV TURBO_TELEMETRY_DISABLED=1
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 next
USER next
COPY --from=installer --chown=next:nodejs /app/applications/web/public ./public
COPY --from=installer --chown=next:nodejs /app/applications/web/.next/standalone/node_modules ./node_modules
COPY --from=installer --chown=next:nodejs /app/applications/web/.next/standalone/applications/web/.next ./.next
COPY --from=installer --chown=next:nodejs /app/applications/web/.next/standalone/applications/web/server.js ./server.js
COPY --from=installer --chown=next:nodejs /app/applications/web/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
