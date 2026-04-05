import { defineMiddleware } from "astro:middleware";

const authPages = ["/sign-in", "/sign-up", "/forgot-password", "/reset-password"];

export const onRequest = defineMiddleware(async (ctx, next) => {
  const userId = await ctx.session?.get("userId");

  if (userId) {
    ctx.locals.userId = userId;

    const path = ctx.url.pathname.replace(/\/+$/, "") || "/";
    if (authPages.includes(path)) {
      return ctx.redirect("/");
    }
  }

  const response = await next();

  // Security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
});
