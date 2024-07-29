ARG NEXT_PUBLIC_DOMAIN

FROM node:20-alpine AS base
RUN apk update
RUN apk add --no-cache libc6-compat
RUN yarn global add turbo@2.0.9

# Build stage
FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1
ENV TURBO_TELEMETRY_DISABLED=1
WORKDIR /app
COPY . .
RUN turbo prune web --docker

# Install dependencies
FROM base AS installer
ENV NEXT_TELEMETRY_DISABLED=1
ENV TURBO_TELEMETRY_DISABLED=1
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Finalize build
FROM base AS final
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV TURBO_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_DOMAIN=${NEXT_PUBLIC_DOMAIN}
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
RUN turbo run build --filter=web

# Run stage
FROM base AS runner
ENV PORT=80
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV TURBO_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_DOMAIN=${NEXT_PUBLIC_DOMAIN}
WORKDIR /app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
COPY --from=final --chown=nextjs:nodejs /app/applications/web/public ./public
COPY --from=final --chown=nextjs:nodejs /app/applications/web/.next/standalone/node_modules ./node_modules
COPY --from=final --chown=nextjs:nodejs /app/applications/web/.next/standalone/applications/web/.next ./.next
COPY --from=final --chown=nextjs:nodejs /app/applications/web/.next/standalone/applications/web/server.js ./server.js
COPY --from=final --chown=nextjs:nodejs /app/applications/web/.next/static ./.next/static
USER nextjs
EXPOSE 80
CMD ["node", "server.js"]