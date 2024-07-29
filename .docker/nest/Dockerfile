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
RUN turbo prune --scope=api --docker

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
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
RUN turbo run build --filter=api
CMD ["ls", "-la"]

# Run stage
#FROM base AS runner
#ENV PORT=80
#ENV NODE_ENV=production
#ENV NEXT_TELEMETRY_DISABLED=1
#ENV TURBO_TELEMETRY_DISABLED=1
#WORKDIR /app
#RUN addgroup -g 1001 -S nodejs
#RUN adduser -S nestjs -u 1001
#COPY --from=final --chown=nestjs:nodejs /app/applications/api/dist .
#COPY --from=final --chown=nextjs:nodejs /app/applications/api/node_modules ./node_modules
#USER nestjs
#EXPOSE 80
#CMD ["node", "main.js"]