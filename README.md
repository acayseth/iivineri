<p align="center">
  <img src="https://user-images.githubusercontent.com/16132740/68576250-6f689b80-0476-11ea-9d09-c2fe7b00f149.png" width="188" alt="logo">
  <br>
  <br>
  <img src="https://img.shields.io/badge/Astro-6.1-FF5D01?style=plastic&logo=astro" alt="astro">
  <img src="https://img.shields.io/badge/Preact-10-673AB8?style=plastic&logo=preact" alt="preact">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=plastic&logo=tailwind-css" alt="tailwindcss">
  <img src="https://img.shields.io/badge/DaisyUI-5-1AD1A5?style=plastic&logo=daisyui" alt="daisyui">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=plastic&logo=typescript" alt="typescript">
  <img src="https://img.shields.io/badge/SQLite-3-003B57?style=plastic&logo=sqlite" alt="sqlite">
  <img src="https://img.shields.io/badge/Thumbor-7.7-000000?style=plastic" alt="thumbor">
  <img src="https://img.shields.io/badge/Argon2-2-6C3483?style=plastic" alt="argon2">
  <img src="https://img.shields.io/badge/License-%20GNU--3.0-blue" alt="license">
</p>

## Despre proiect

iivineri este un proiect mic si jucaus care porneste de la o intrebare:
**„Oare azi este vineri?"**

Un exemplu ca si ideile simple pot avea identitate si executie buna.
Pentru ca vinerea nu se deploy.

## Tehnologii

| Tehnologie | Rol |
|---|---|
| [Astro](https://astro.build) | Framework web, SSR, routing, middleware, actions |
| [Preact](https://preactjs.com) | Componente interactive (upload imagini) |
| [TypeScript](https://www.typescriptlang.org) | Limbaj principal |
| [Tailwind CSS 4](https://tailwindcss.com) | Stilizare |
| [DaisyUI 5](https://daisyui.com) | Componente UI |
| [Drizzle ORM](https://orm.drizzle.team) | ORM pentru baza de date |
| [SQLite](https://www.sqlite.org) (via better-sqlite3) | Baza de date |
| [Argon2](https://github.com/nicolo-ribaudo/node-argon2) (@node-rs/argon2) | Hash parole cu pepper (APP_SECRET) |
| [Thumbor](https://www.thumbor.org) | Stocare, resize, blur, smart crop, conversie WebP |
| [Redis](https://redis.io) | Cache (Thumbor) |
| [Docker](https://www.docker.com) | Containerizare servicii (Thumbor, Redis) |

## Confidentialitate

- Fara tracking.
- Fara analytics.
- Fara colectare de date.

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

```bash
# .env
ASTRO_DATABASE_FILE=.astro/content.db
APP_SECRET=<cheie secreta pentru hash parole>
THUMBOR_URL=http://10.10.20.10:8000
THUMBOR_KEY=<cheie HMAC pentru Thumbor>
```

## Comenzi

| Comanda | Descriere |
|---|---|
| `yarn install` | Instaleaza dependentele |
| `yarn dev` | Porneste serverul de dezvoltare (`localhost:4321`) |
| `yarn build` | Build pentru productie (`./dist/`) |
| `yarn preview` | Preview build local |
| `./tool up -d` | Porneste containerele Docker (Thumbor, Redis) |
| `./tool down` | Opreste containerele Docker |

## Contribuie

Ai o idee? Te provocam la un PR.

### Planuri de viitor

- Suport pentru incarcarea fisierelor video (MP4).
- Moderare si filtrare de continut pentru a mentine calitatea si siguranta resursei.
- Extinderea contributiilor: pe langa PR-uri, comunitatea va putea participa si prin continut vizual si multimedia.

## Filosofie

- Nu toate proiectele trebuie sa fie complexe ca sa fie memorabile.
- Un proiect inutil, facut bine.
- Mic ca idee. Mare ca stil.
- O intrebare. Un raspuns.
