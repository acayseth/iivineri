import { defineTable, column } from "astro:db";

export const ResetPassword = defineTable({
  columns: {
    email: column.text({ primaryKey: true }),
    token: column.text(),
    createdAt: column.date(),
  },
});
