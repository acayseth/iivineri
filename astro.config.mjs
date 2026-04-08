// @ts-check
import { defineConfig, envField, sessionDrivers } from "astro/config";
import { fileURLToPath, URL } from "node:url";
import { loadEnv } from "vite";

const { REDIS_URL } = loadEnv("", process.cwd(), "");

import tailwindcss from "@tailwindcss/vite";
import astroMetaTags from "astro-meta-tags";
import db from "@astrojs/db";
import node from "@astrojs/node";
import icon from "astro-icon";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  experimental: {
    rustCompiler: true,
  },
  site: "https://iivineri.org",
  env: {
    schema: {
      APP_SECRET: envField.string({ context: "server", access: "secret" }),
      THUMBOR_URL: envField.string({ context: "server", access: "secret" }),
      THUMBOR_KEY: envField.string({ context: "server", access: "secret" }),
      REDIS_URL: envField.string({ context: "server", access: "secret" }),
    },
    validateSecrets: false,
  },
  trailingSlash: "never",
  security: {
    checkOrigin: false,
  },
  output: "server",
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    plugins: [tailwindcss({ optimize: true })],
  },
  integrations: [
    astroMetaTags(),
    db(),
    preact(),
    icon({
      include: {
        lucide: [
          "sun",
          "moon",
          "log-in",
          "upload",
          "circle-check",
          "trash-2",
          "lock",
          "lock-open",
          "shield",
          "shield-off",
        ],
        "simple-icons": ["github"],
      },
    }),
  ],
  adapter: node({
    mode: "standalone",
  }),
  session: {
    driver: sessionDrivers.redis({
      url: REDIS_URL,
    }),
    cookie: {
      name: "_sid",
    },
    ttl: 60 * 60 * 24 * 365,
  },
});
