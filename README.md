<p align="center">
  <img src="https://user-images.githubusercontent.com/16132740/68576250-6f689b80-0476-11ea-9d09-c2fe7b00f149.png" width="188" alt="logo">
  <br>
  <br>
  <img src="https://img.shields.io/badge/Node.js-22-339933?style=plastic&logo=nodedotjs" alt="node">
  <img src="https://img.shields.io/badge/Astro-6.1-FF5D01?style=plastic&logo=astro" alt="astro">
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=plastic&logo=vite" alt="vite">
  <img src="https://img.shields.io/badge/Preact-10-673AB8?style=plastic&logo=preact" alt="preact">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=plastic&logo=typescript" alt="typescript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=plastic&logo=tailwind-css" alt="tailwindcss">
  <img src="https://img.shields.io/badge/DaisyUI-5-1AD1A5?style=plastic&logo=daisyui" alt="daisyui">
  <img src="https://img.shields.io/badge/Drizzle_ORM-0.45-C5F74F?style=plastic&logo=drizzle" alt="drizzle">
  <img src="https://img.shields.io/badge/libSQL-0.24-4FF8D2?style=plastic&logo=turso" alt="libsql">
  <img src="https://img.shields.io/badge/Redis-8-DC382D?style=plastic&logo=redis" alt="redis">
  <img src="https://img.shields.io/badge/Thumbor-7.7-000000?style=plastic" alt="thumbor">
  <img src="https://img.shields.io/badge/Docker-27-2496ED?style=plastic&logo=docker" alt="docker">
  <img src="https://img.shields.io/badge/Argon2-2-6C3483?style=plastic" alt="argon2">
  <img src="https://img.shields.io/badge/Vitest-4-6E9F18?style=plastic&logo=vitest" alt="vitest">
  <img src="https://img.shields.io/badge/Lucide_Icons-1.2-F56565?style=plastic" alt="lucide">
  <img src="https://img.shields.io/badge/Onest_Font-1-000000?style=plastic&logo=googlefonts" alt="onest">
  <img src="https://img.shields.io/badge/Simple_Icons-14-111111?style=plastic&logo=simpleicons" alt="simple-icons">
  <img src="https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?style=plastic&logo=githubactions" alt="github-actions">
  <img src="https://img.shields.io/badge/Kubernetes-1.35-326CE5?style=plastic&logo=kubernetes" alt="kubernetes">
  <img src="https://img.shields.io/badge/License-%20GNU--3.0-blue" alt="license">
</p>

## Despre proiect

iivineri este un proiect mic si jucaus care porneste de la o intrebare:
**„Oare azi este vineri?"**

Un exemplu ca si ideile simple pot avea identitate si executie buna.
Pentru ca vinerea nu se deploy.

## Confidentialitate

- Fara tracking.
- Fara analytics.
- Fara colectare de date.

## Contribuie

Ai o idee? Te provocam la un PR.

### Planuri de viitor

- [ ] Suport pentru incarcarea fisierelor video (MP4).
- [x] Moderare si filtrare de continut pentru a mentine calitatea si siguranta resursei.
- [ ] **Pen Testing** — audit de securitate pentru identificarea vulnerabilitatilor (autentificare, upload, API endpoints, etc).
- [ ] **E2E Testing** — teste end-to-end cu Playwright pentru a valida fluxurile principale (sign-up, sign-in, upload, galerie, etc).
- [ ] **Unit Testing** — teste unitare pentru actiuni, utilitare si logica de business (ex: generare token, hash parole, etc).

## Comenzi

| Comanda | Descriere |
|---|---|
| `yarn install` | Instaleaza dependentele |
| `./tool up -d` | Porneste containerele Docker (sqld, Thumbor, Redis) |
| `yarn astro db push --remote` | Ruleaza migratiile bazei de date |
| `yarn dev --remote` | Porneste serverul de dezvoltare (`localhost:4321`) |
| `yarn build --remote` | Build pentru productie (`./dist/`) |
| `./tool down` | Opreste containerele Docker |

## Filosofie

- Nu toate proiectele trebuie sa fie complexe ca sa fie memorabile.
- Un proiect inutil, facut bine.
- Mic ca idee. Mare ca stil.
- O intrebare. Un raspuns.

## Structura

```
astrofront/
  src/
    actions/          # Astro actions (signUp, signIn, forgotPassword, etc.)
    components/       # Componente Astro + Preact
    layouts/          # Layout principal
    middleware.ts     # Sesiuni, redirect autentificare
    pages/
      api/            # API endpoints (upload, logout)
      sign-in/        # Autentificare
      sign-up/        # Creare cont
      forgot-password/# Resetare parola (cerere)
      reset-password/ # Resetare parola (formular)
      profile/        # Profil utilizator
      upload/         # Upload imagini
      gallery/        # Galerie imagini cu paginare si filtrare
    utils/            # Utilitare (thumbor HMAC, etc.)
  db/
    _user.ts          # Schema User
    _session.ts       # Schema Session
    _image.ts         # Schema Image
    _reset_password.ts# Schema ResetPassword
    config.ts         # Configurare DB
    seed.ts           # Date initiale
```

## Configurare

### 1. Copiaza fisierul de environment

```bash
cp .env.example .env
```

### 2. Variabile de environment

| Variabila | Folosita de | Descriere | Generare |
|---|---|---|---|
| `APP_SECRET` | Astro | Pepper pentru hash-ul parolelor (Argon2) | `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `ASTRO_DB_REMOTE_URL` | Astro | Adresa serverului sqld | Default: `http://10.10.20.10:8080` |
| `ASTRO_DB_APP_TOKEN` | Astro | Token JWT Ed25519 pentru autentificare sqld | `node scripts/generate-sqld-token.cjs` |
| `THUMBOR_URL` | Astro | Adresa serverului Thumbor | Default: `http://10.10.20.10:8000` |
| `THUMBOR_KEY` | Astro | Cheie HMAC pentru URL-uri Thumbor semnate | `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `REDIS_URL` | Astro | Adresa serverului Redis (sesiuni) | Default: `redis://10.10.20.10:6379` |
| `SQLD_AUTH_JWT_KEY` | sqld (Docker) | Cheie publica Ed25519 cu care sqld verifica token-urile | `node scripts/generate-sqld-token.cjs` |

### 3. Generare secrete

**APP_SECRET** si **THUMBOR_KEY** — chei random de 32 bytes:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**SQLD_AUTH_JWT_KEY** si **ASTRO_DB_APP_TOKEN** — pereche de chei Ed25519 + JWT:

```bash
node scripts/generate-sqld-token.cjs
```

Scriptul genereaza o pereche de chei Ed25519 si produce doua valori:

```
SQLD_AUTH_JWT_KEY=<cheie publica Ed25519 in base64url>
ASTRO_DB_APP_TOKEN=<JWT semnat cu cheia privata Ed25519>
```

> **Important:** Ambele valori trebuie generate impreuna (din acelasi run) — cheia privata nu este salvata.


### 4. Docker (GitHub Packages)

```bash
docker run -d -p 4321:4321 \
  -e APP_SECRET="..." \
  -e ASTRO_DB_REMOTE_URL="..." \
  -e ASTRO_DB_APP_TOKEN="..." \
  -e THUMBOR_URL="..." \
  -e THUMBOR_KEY="..." \
  -e REDIS_URL="..." \
  -e SQLD_AUTH_JWT_KEY="..." \
  ghcr.io/acayseth/iivineri:latest
```