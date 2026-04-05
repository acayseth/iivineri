import { defineAction, ActionError } from "astro:actions";
import { z } from "astro/zod";
import { db, User, ResetPassword, eq, and, isNull, gte } from "astro:db";
import { randomBytes } from "node:crypto";

export const forgotPassword = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email("Email invalid"),
  }),
  handler: async ({ email }) => {
    const user = await db
      .select({ id: User.id })
      .from(User)
      .where(and(eq(User.email, email), isNull(User.deletedAt)))
      .get();

    if (!user) {
      return { success: true };
    }

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const existing = await db
      .select({ createdAt: ResetPassword.createdAt })
      .from(ResetPassword)
      .where(
        and(
          eq(ResetPassword.email, email),
          gte(ResetPassword.createdAt, fiveMinutesAgo)
        )
      )
      .get();

    if (existing) {
      const waitSeconds = Math.ceil(
        (existing.createdAt.getTime() + 5 * 60 * 1000 - Date.now()) / 1000
      );
      const waitMinutes = Math.ceil(waitSeconds / 60);
      throw new ActionError({
        code: "TOO_MANY_REQUESTS",
        message: `Poti retrimite emailul in ${waitMinutes} ${waitMinutes === 1 ? "minut" : "minute"}`,
      });
    }

    const token = randomBytes(32).toString("hex");

    await db.delete(ResetPassword).where(eq(ResetPassword.email, email));
    await db.insert(ResetPassword).values({
      email,
      token,
      createdAt: new Date(),
    });

    // TODO: trimite email cu link-ul de resetare
    // Link: /reset-password?token=${token}
    if (import.meta.env.DEV) {
      console.log(`[DEV ONLY] Reset link: /reset-password?token=${token}`);
    }

    return { success: true };
  },
});
