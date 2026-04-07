import { defineTable, column } from "astro:db";
import { User } from "./_user";

export const Image = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    ownerId: column.number({ references: () => User.columns.id }),
    approvedId: column.number({
      optional: true,
      references: () => User.columns.id,
    }),
    md5sum: column.text({ unique: true }),
    dayOfWeek: column.text({ enum: ["0", "1", "2", "3", "4", "5", "6"] }),
    size: column.number(),
    width: column.number(),
    height: column.number(),
    createdAt: column.date(),
    updatedAt: column.date(),
    deletedAt: column.date({ optional: true }),
  },
  indexes: [
    {
      on: ["id", "ownerId", "approvedId"],
    },
  ],
});
