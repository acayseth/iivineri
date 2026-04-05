import { defineAction, ActionError } from "astro:actions";
import { z } from "astro/zod";
import { db, User, eq, and, isNull } from "astro:db";
import { verifyPassword } from "./_shared";

export const deleteAccount = defineAction({
  accept: "form",
  input: z.object({
    currentPassword: z.string().min(1, "Parola este obligatorie"),
  }),
  handler: async ({ currentPassword }, ctx) => {
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
      throw new ActionError({ code: "UNAUTHORIZED", message: "Parola este incorecta" });
    }

    await db
      .update(User)
      .set({ deletedAt: new Date() })
      .where(eq(User.id, userId));

    ctx.session?.destroy();

    return { success: true };
  },
});
