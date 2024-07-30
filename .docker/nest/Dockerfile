FROM node:20-alpine AS base

FROM base AS builder
ENV TURBO_TELEMETRY_DISABLED=1
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN yarn global add turbo@^2
COPY . .
RUN turbo prune api --docker

FROM base AS installer
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
RUN yarn upgrade
COPY --from=builder /app/out/full/ .
RUN yarn global add turbo@^2
RUN turbo run build --filter=api

FROM base AS runner
ENV PORT=3000
ENV NODE_ENV=production
ENV TURBO_TELEMETRY_DISABLED=1
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nest
USER nest
COPY --from=installer --chown=nest:nodejs /app/applications/api/build ./
COPY --from=installer --chown=nest:nodejs /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "main.js"]
