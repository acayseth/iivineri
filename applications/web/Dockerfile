FROM node:20-alpine AS base
RUN apk update
RUN apk add --no-cache libc6-compat

FROM base AS builder
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY . .
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    else echo "Lockfile [yarn.lock] not found." && exit 1; \
    fi
RUN yarn install
RUN yarn build

FROM base AS sourcer
WORKDIR /app
COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/.next/static /app/static

FROM base AS runner
ENV PORT 80
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
COPY --from=sourcer --chown=nextjs:nodejs . .
USER nextjs
EXPOSE 80
CMD ["node", "server.js"]
