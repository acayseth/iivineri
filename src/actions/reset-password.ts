import { defineAction, ActionError } from "astro:actions";
import { z } from "astro/zod";
import { db, User, ResetPassword, eq, and, gte } from "astro:db";
import { passwordSchema, hashPassword } from "./_shared";
import { rateLimit, getClientIp } from "@/utils/rate-limit.util";

export const resetPassword = defineAction({
  accept: "form",
  input: z
    .object({
      token: z.string().min(1, "Token invalid"),
      password: passwordSchema,
      confirmPassword: z.string().min(8, "Minim 8 caractere"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Parolele nu coincid",
      path: ["confirmPassword"],
    }),
  handler: async ({ token, password }, ctx) => {
    await rateLimit(getClientIp(ctx), "resetPassword", 5, 15 * 60 * 1000);

    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    const resetRequest = await db
      .select()
      .from(ResetPassword)
      .where(
        and(
          eq(ResetPassword.token, token),
          gte(ResetPassword.createdAt, thirtyMinutesAgo)
        )
      )
      .get();

    if (!resetRequest) {
      throw new ActionError({
        code: "NOT_FOUND",
        message: "Link-ul de resetare este invalid sau a expirat",
      });
    }

    const passwordHash = await hashPassword(password);

    await db
      .update(User)
      .set({ password_hash: passwordHash })
      .where(eq(User.email, resetRequest.email));

    await db.delete(ResetPassword).where(eq(ResetPassword.email, resetRequest.email));

    return { success: true };
  },
});
