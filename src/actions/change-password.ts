import { defineAction, ActionError } from "astro:actions";
import { z } from "astro/zod";
import { db, User, eq, and, isNull } from "astro:db";
import { passwordSchema, hashPassword, verifyPassword } from "./_shared";

export const changePassword = defineAction({
  accept: "form",
  input: z
    .object({
      currentPassword: z.string().min(1, "Parola curenta este obligatorie"),
      password: passwordSchema,
      confirmPassword: z.string().min(8, "Minim 8 caractere"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Parolele nu coincid",
      path: ["confirmPassword"],
    }),
  handler: async ({ currentPassword, password }, ctx) => {
    const userId = await ctx.session?.get("userId");
    if (!userId) {
      throw new ActionError({ code: "UNAUTHORIZED", message: "Nu esti autentificat" });
    }

    const user = await db
      .select()
      .from(User)
      .where(and(eq(User.id, userId), isNull(User.deletedAt)))
      .get();

    if (!user) {
      throw new ActionError({ code: "NOT_FOUND", message: "Utilizator negasit" });
    }

    const valid = await verifyPassword(user.password_hash, currentPassword);

    if (!valid) {
      throw new ActionError({ code: "UNAUTHORIZED", message: "Parola curenta este incorecta" });
    }

    const passwordHash = await hashPassword(password);

    await db
      .update(User)
      .set({ password_hash: passwordHash })
      .where(eq(User.id, userId));

    // Regenerăm sesiunea — invalidăm alte dispozitive
    ctx.session?.destroy();
    ctx.session?.set("userId", userId);

    return { success: true };
  },
});
