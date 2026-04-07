FROM node:22-alpine AS base
WORKDIR /app


FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++
COPY package.json yarn.lock ./
RUN corepack enable && yarn install --frozen-lockfile


FROM base AS builder
ENV ASTRO_DATABASE_FILE=file:///app/.db/content.db
ENV ASTRO_DB_REMOTE_URL=file:///app/.db/content.db
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

RUN apk add --no-cache tzdata libc6-compat \
    && cp /usr/share/zoneinfo/Europe/Chisinau /etc/localtime \
    && echo "Europe/Chisinau" > /etc/timezone \
    && apk del tzdata

RUN addgroup -g 1001 -S nodejs && adduser -S astro -u 1001 -G nodejs

COPY --from=deps --chown=astro:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=astro:nodejs /app/dist ./dist
COPY --from=builder --chown=astro:nodejs /app/.astro ./.astro
COPY --chown=astro:nodejs ./db ./db
COPY --chown=astro:nodejs ./astro.config.mjs ./tsconfig.json ./package.json ./

RUN mkdir -p /app/.db && chown astro:nodejs /app/.db

USER astro

EXPOSE 4321

VOLUME ["/app/.db"]

# La startup: aplica schema (creeaza fisierul daca nu exista, aplica ALTER TABLE
# pentru schimbari aditive, esueaza pe data-loss fara --force-reset), apoi server.
CMD ["sh", "-c", "node_modules/.bin/astro db push --remote && exec node ./dist/server/entry.mjs"]
