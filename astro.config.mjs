// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import astroMetaTags from "astro-meta-tags";
import db from "@astrojs/db";
import node from "@astrojs/node";
import icon from "astro-icon";
import preact from "@astrojs/preact";
import { loadEnv } from "vite";

// https://astro.build/config
export default defineConfig({
  experimental: {
    rustCompiler: true,
  },
  site: "https://iivineri.org",
  trailingSlash: "never",
  security: {
    checkOrigin: false,
  },
  output: "server",
  vite: {
    define: {
      "import.meta.env.ASTRO_DB_REMOTE_URL": "process.env.ASTRO_DB_REMOTE_URL",
      "import.meta.env.REDIS_URL": "process.env.REDIS_URL",
    },
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
    driver: {
      entrypoint: new URL("./src/session-driver.js", import.meta.url),
    },
    cookie: {
      name: "_sid",
    },
    ttl: 60 * 60 * 24 * 365,
  },
});
