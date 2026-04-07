# syntax=docker/dockerfile:1.7

# ---------- Builder ----------
FROM node:22-alpine AS builder

WORKDIR /app

# Toolchain pentru compilarea binarelor native (better-sqlite3, @node-rs/argon2)
RUN apk add --no-cache python3 make g++ libc6-compat

COPY package.json yarn.lock ./
RUN corepack enable && yarn install --frozen-lockfile

COPY . .

# Build direct cu binarul astro (yarn build foloseste --env-file=.env, care nu exista in imagine)
RUN node_modules/.bin/astro build


# ---------- Runner ----------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV TZ=Europe/Chisinau
ENV HOST=0.0.0.0
ENV PORT=4321
ENV ASTRO_DATABASE_FILE=/app/.astro/content.db

# Timezone Europe/Chisinau la nivel de OS si Node
RUN apk add --no-cache tzdata libc6-compat \
    && cp /usr/share/zoneinfo/Europe/Chisinau /etc/localtime \
    && echo "Europe/Chisinau" > /etc/timezone \
    && apk del tzdata

# Doar dependintele de productie (build deps adaugate temporar pentru native modules)
COPY package.json yarn.lock ./
RUN corepack enable \
    && apk add --no-cache --virtual .build-deps python3 make g++ \
    && yarn install --frozen-lockfile --production \
    && apk del .build-deps \
    && yarn cache clean \
    && rm -rf /tmp/*

# Artefactele de build
COPY --from=builder /app/dist ./dist
# Baza de date SQLite generata de astro:db (schema fara seed)
COPY --from=builder /app/.astro ./.astro

# Rulare ca user non-root
RUN chown -R node:node /app
USER node

EXPOSE 4321

# Pentru persistenta intre deploy-uri monteaza un volum pe /app/.astro
VOLUME ["/app/.astro"]

CMD ["node", "./dist/server/entry.mjs"]
