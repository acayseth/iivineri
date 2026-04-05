import { defineTable, column } from "astro:db";
import { User } from "./_user";

export const Session = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    userId: column.number({ references: () => User.columns.id }),
    ua: column.text({ optional: true }),
    ip: column.text({ optional: true }),
    createdAt: column.date(),
    lastActivity: column.date(),
  },
  indexes: [
    {
      on: ["id", "userId", "lastActivity"],
    },
  ],
});
