import { defineAction, ActionError } from "astro:actions";
import { z } from "astro/zod";
import { db, User, eq, and, isNull } from "astro:db";

async function requireRoot(ctx: any): Promise<number> {
  const userId = await ctx.session?.get("userId");
  if (!userId) {
    throw new ActionError({ code: "UNAUTHORIZED", message: "Nu esti autentificat" });
  }

  const user = await db
    .select({ id: User.id, root: User.root })
    .from(User)
    .where(and(eq(User.id, userId), isNull(User.deletedAt)))
    .get();

  if (!user || !user.root) {
    throw new ActionError({ code: "FORBIDDEN", message: "Nu ai permisiuni" });
  }

  return user.id;
}

export const moderateUser = defineAction({
  accept: "form",
  input: z.object({
    targetUserId: z.coerce.number(),
    action: z.enum(["jail", "unjail", "promote", "demote"]),
    jailAt: z.string().optional(),
    jailMsg: z.string().max(200).optional(),
  }),
  handler: async ({ targetUserId, action, jailAt, jailMsg }, ctx) => {
    const adminId = await requireRoot(ctx);

    if (targetUserId === adminId) {
      throw new ActionError({ code: "BAD_REQUEST", message: "Nu te poti modera pe tine" });
    }

    const target = await db
      .select({ id: User.id })
      .from(User)
      .where(eq(User.id, targetUserId))
      .get();

    if (!target) {
      throw new ActionError({ code: "NOT_FOUND", message: "Utilizator negasit" });
    }

    switch (action) {
      case "jail": {
        if (!jailAt) {
          throw new ActionError({ code: "BAD_REQUEST", message: "Data este obligatorie" });
        }
        const jailDate = new Date(jailAt);
        if (jailDate <= new Date()) {
          throw new ActionError({ code: "BAD_REQUEST", message: "Data trebuie sa fie in viitor" });
        }
        await db.update(User).set({
          jailAt: jailDate,
          jailMsg: jailMsg || null,
        }).where(eq(User.id, targetUserId));
        break;
      }
      case "unjail":
        await db.update(User).set({ jailAt: null, jailMsg: null }).where(eq(User.id, targetUserId));
        break;
      case "promote":
        await db.update(User).set({ root: true }).where(eq(User.id, targetUserId));
        break;
      case "demote":
        await db.update(User).set({ root: false }).where(eq(User.id, targetUserId));
        break;
    }

    return { success: true };
  },
});
