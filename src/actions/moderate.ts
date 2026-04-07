import { defineAction, ActionError } from "astro:actions";
import { z } from "astro/zod";
import { db, User, Image, eq, and, isNull } from "astro:db";

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

export const approveImage = defineAction({
  accept: "form",
  input: z.object({
    imageId: z.string().min(1),
  }),
  handler: async ({ imageId }, ctx) => {
    const adminId = await requireRoot(ctx);

    await db
      .update(Image)
      .set({ approvedId: adminId, updatedAt: new Date() })
      .where(and(eq(Image.id, imageId), isNull(Image.deletedAt)));

    return { success: true };
  },
});

export const rejectImage = defineAction({
  accept: "form",
  input: z.object({
    imageId: z.string().min(1),
  }),
  handler: async ({ imageId }, ctx) => {
    await requireRoot(ctx);

    const now = new Date();
    await db
      .update(Image)
      .set({ deletedAt: now, updatedAt: now })
      .where(and(eq(Image.id, imageId), isNull(Image.deletedAt)));

    return { success: true };
  },
});
