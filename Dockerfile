FROM node:18-alpine AS deps

ENV NEXT_PUBLIC_PROJECT_URL=$NEXT_PUBLIC_PROJECT_URL
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
ENV GIPHY_API_KEY=$GIPHY_API_KEY
ENV GIPHY_RATING=$GIPHY_RATING
ENV GIPHY_TAG_IS_FRIDAY=$GIPHY_TAG_IS_FRIDAY
ENV GIPHY_TAG_IS_NOT_FRIDAY=$GIPHY_TAG_IS_NOT_FRIDAY

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM node:18-alpine AS builder

ENV NEXT_PUBLIC_PROJECT_URL=$NEXT_PUBLIC_PROJECT_URL
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
ENV GIPHY_API_KEY=$GIPHY_API_KEY
ENV GIPHY_RATING=$GIPHY_RATING
ENV GIPHY_TAG_IS_FRIDAY=$GIPHY_TAG_IS_FRIDAY
ENV GIPHY_TAG_IS_NOT_FRIDAY=$GIPHY_TAG_IS_NOT_FRIDAY

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN yarn run build

FROM node:18-alpine AS runner

ENV NEXT_PUBLIC_PROJECT_URL=$NEXT_PUBLIC_PROJECT_URL
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
ENV GIPHY_API_KEY=$GIPHY_API_KEY
ENV GIPHY_RATING=$GIPHY_RATING
ENV GIPHY_TAG_IS_FRIDAY=$GIPHY_TAG_IS_FRIDAY
ENV GIPHY_TAG_IS_NOT_FRIDAY=$GIPHY_TAG_IS_NOT_FRIDAY

WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 80
ENV PORT 80
CMD ["node", "server.js"]
