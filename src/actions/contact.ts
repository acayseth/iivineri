import { defineAction, ActionError } from "astro:actions";
import { z } from "astro/zod";
import { db, Contact } from "astro:db";

export const contactUs = defineAction({
  accept: "form",
  input: z.object({
    name: z.string().min(2, "Minim 2 caractere").max(100),
    email: z.string().email("Email invalid"),
    message: z.string().min(10, "Minim 10 caractere").max(2000),
  }),
  handler: async ({ name, email, message }) => {
    await db.insert(Contact).values({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    return { success: true };
  },
});
