import { defineAction, ActionError } from "astro:actions";
import { z } from "astro/zod";
import { db, User, eq, and, isNull } from "astro:db";
import { hashPassword, verifyPassword } from "./_shared";

const INVALID_CREDENTIALS = {
  code: "UNAUTHORIZED" as const,
  message: "Email sau parola incorecta",
};

export const signIn = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email("Email invalid"),
    password: z.string().min(1, "Parola este obligatorie"),
  }),
  handler: async ({ email, password }, ctx) => {
    const user = await db
      .select()
      .from(User)
      .where(and(eq(User.email, email), isNull(User.deletedAt)))
      .get();

    // Constant time: hash-uim parola chiar dacă userul nu există
    if (!user) {
      await hashPassword(password);
      throw new ActionError(INVALID_CREDENTIALS);
    }

    const valid = await verifyPassword(user.password_hash, password);

    if (!valid) {
      throw new ActionError(INVALID_CREDENTIALS);
    }

    if (user.jailAt && new Date(user.jailAt) > new Date()) {
      throw new ActionError({
        code: "FORBIDDEN",
        message: user.jailMsg || "Contul tau este suspendat temporar",
      });
    }

    ctx.session?.set("userId", user.id);

    return { success: true };
  },
});
