FROM node:22-alpine AS base
WORKDIR /app


FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++
COPY package.json yarn.lock ./
RUN corepack enable && yarn install --frozen-lockfile


FROM base AS builder

ENV ASTRO_DATABASE_FILE=file:///app/.db/content.db
ENV ASTRO_DB_REMOTE_URL=file:///app/.db/content.db
ENV APP_SECRET=APP_SUPER_SECRET
ENV THUMBOR_URL=http://10.10.20.10:8000
ENV THUMBOR_KEY=THUMBOR_SECURE_KEY_4ERT

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN node_modules/.bin/astro build --remote


FROM base AS runner

ENV NODE_ENV=production
ENV TZ=Europe/Chisinau
ENV HOST=0.0.0.0
ENV PORT=4321
ENV ASTRO_DATABASE_FILE=file:///app/.db/content.db
ENV ASTRO_DB_REMOTE_URL=file:///app/.db/content.db
ENV APP_SECRET=APP_SUPER_SECRET
ENV THUMBOR_URL=http://10.10.20.10:8000
ENV THUMBOR_KEY=THUMBOR_SECURE_KEY_4ERT

RUN apk add --no-cache tzdata libc6-compat \
    && cp /usr/share/zoneinfo/Europe/Chisinau /etc/localtime \
    && echo "Europe/Chisinau" > /etc/timezone \
    && apk del tzdata

RUN addgroup -g 1001 -S nodejs && adduser -S astro -u 1001 -G nodejs \
    && chown astro:nodejs /app

COPY --from=deps --chown=astro:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=astro:nodejs /app/dist ./dist
COPY --from=builder --chown=astro:nodejs /app/.astro ./.astro
COPY --chown=astro:nodejs ./db ./db
COPY --chown=astro:nodejs ./astro.config.mjs ./tsconfig.json ./package.json ./

RUN mkdir -p /app/.db && chown astro:nodejs /app/.db

USER astro

EXPOSE 4321

ENTRYPOINT ["/bin/sh", "-c", "node_modules/.bin/astro db push --remote && exec \"$@\"", "--"]
CMD ["node", "./dist/server/entry.mjs"]
