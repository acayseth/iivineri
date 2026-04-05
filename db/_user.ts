import { defineTable, column } from "astro:db";

export const User = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    root: column.boolean({ default: false }),
    nickname: column.text(),
    email: column.text(),
    password_hash: column.text(),
    createdAt: column.date(),
    deletedAt: column.date({ optional: true }),
  },
  indexes: [
    {
      on: ["nickname", "email", "deletedAt"],
      unique: true,
    },
  ],
});
