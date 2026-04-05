import type { APIContext } from "astro";

export async function POST(ctx: APIContext) {
  ctx.session?.destroy();
  return ctx.redirect("/");
}
