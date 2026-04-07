import { defineMiddleware } from "astro:middleware";

const authPages = ["/sign-in", "/sign-up", "/forgot-password", "/reset-password"];

export const onRequest = defineMiddleware(async (ctx, next) => {
  if (ctx.request.method === "POST") {
    console.log("[DEBUG POST]", {
      pathname: ctx.url.pathname,
      "url.origin": ctx.url.origin,
      origin: ctx.request.headers.get("origin"),
      host: ctx.request.headers.get("host"),
      "x-forwarded-proto": ctx.request.headers.get("x-forwarded-proto"),
      "x-forwarded-host": ctx.request.headers.get("x-forwarded-host"),
      "x-forwarded-for": ctx.request.headers.get("x-forwarded-for"),
      referer: ctx.request.headers.get("referer"),
    });
  }

  const userId = await ctx.session?.get("userId");

  if (userId) {
    ctx.locals.userId = userId;

    const path = ctx.url.pathname.replace(/\/+$/, "") || "/";
    if (authPages.includes(path)) {
      return ctx.redirect("/");
    }
  }

  return next();
});
