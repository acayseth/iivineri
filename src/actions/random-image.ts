import { defineAction } from "astro:actions";
import { db, Image, User, eq, ne, and, isNotNull, isNull, sql } from "astro:db";
import { thumborClean } from "@/utils/thumbor.util";

export const randomImage = defineAction({
  handler: async () => {
    const jsDay = new Date().getDay();
    const fridayFilter = jsDay === 5
      ? eq(Image.dayOfWeek, "5")
      : ne(Image.dayOfWeek, "5");

    const img = await db
      .select({ id: Image.id, ownerId: Image.ownerId })
      .from(Image)
      .where(and(isNotNull(Image.approvedId), isNull(Image.deletedAt), fridayFilter))
      .orderBy(sql`random()`)
      .limit(1)
      .get();

    if (!img) {
      return { id: null, url: null };
    }

    const owner = await db
      .select({ nickname: User.nickname })
      .from(User)
      .where(eq(User.id, img.ownerId))
      .get();

    return { id: img.id, url: thumborClean(img.id, owner?.nickname || "user") };
  },
});
