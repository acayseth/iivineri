import { defineMiddleware } from "astro:middleware";
import { db, User, eq, and, isNull } from "astro:db";

const authPages = ["/sign-in", "/sign-up", "/forgot-password", "/reset-password"];

export const onRequest = defineMiddleware(async (ctx, next) => {
  const userId = await ctx.session?.get("userId");

  if (userId) {
    const user = await db
      .select({ id: User.id, jailAt: User.jailAt })
      .from(User)
      .where(and(eq(User.id, userId), isNull(User.deletedAt)))
      .get();

    if (!user || (user.jailAt && new Date(user.jailAt) > new Date())) {
      ctx.session?.destroy();
      return ctx.redirect("/sign-in");
    }

    ctx.locals.userId = userId;

    const path = ctx.url.pathname.replace(/\/+$/, "") || "/";
    if (authPages.includes(path)) {
      return ctx.redirect("/");
    }
  }

  return next();
});
