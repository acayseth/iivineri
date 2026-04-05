// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath, URL } from "node:url";

import tailwindcss from "@tailwindcss/vite";

import astroMetaTags from "astro-meta-tags";

import db from "@astrojs/db";

import node from "@astrojs/node";
import icon from "astro-icon";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://iivineri.org",
  output: "server",
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    plugins: [tailwindcss()],
  },
  integrations: [
    astroMetaTags(),
    db(),
    preact(),
    icon({
      include: {
        lucide: ["sun", "moon", "log-in"],
        "simple-icons": ["github"],
      },
    }),
  ],
  adapter: node({
    mode: "standalone",
  }),
  session: {
    ttl: 60 * 60 * 24 * 30, // 30 zile
  },
});
