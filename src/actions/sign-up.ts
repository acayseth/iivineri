import { defineAction, ActionError } from "astro:actions";
import { z } from "astro/zod";
import { db, User, eq, or, and, isNull } from "astro:db";
import { nicknameSchema, passwordSchema, hashPassword } from "./_shared";

export const signUp = defineAction({
  accept: "form",
  input: z
    .object({
      nickname: nicknameSchema,
      email: z.string().email("Email invalid"),
      password: passwordSchema,
      confirmPassword: z.string().min(8, "Minim 8 caractere"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Parolele nu coincid",
      path: ["confirmPassword"],
    }),
  handler: async ({ nickname, email, password }, ctx) => {
    const existing = await db
      .select({ id: User.id })
      .from(User)
      .where(
        and(
          or(eq(User.email, email), eq(User.nickname, nickname)),
          isNull(User.deletedAt)
        )
      )
      .get();

    if (existing) {
      throw new ActionError({
        code: "CONFLICT",
        message: "Email sau nume de utilizator deja exista",
      });
    }

    const passwordHash = await hashPassword(password);

    const [user] = await db.insert(User).values({
      nickname,
      email,
      password_hash: passwordHash,
      createdAt: new Date(),
    }).returning({ id: User.id });

    ctx.session?.set("userId", user.id);

    return { success: true };
  },
});
