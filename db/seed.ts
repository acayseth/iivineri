import { db, User } from "astro:db";
import { hash } from "@node-rs/argon2";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(User).values([
    {
      id: 1,
      root: true,
      nickname: "hellnet",
      email: "hellnet@iivineri.org",
      password_hash:
        "$argon2id$v=19$m=19456,t=2,p=1$3aO/RcXmFVCddx9tODE44w$YebjX3dgUcgWlRGT07sShsGMxJmb8IIWi4FT6BAXUIw",
      createdAt: new Date(),
      deletedAt: null,
    },
    {
      id: 2,
      root: true,
      nickname: "tigina",
      email: "tighina@iivineri.org",
      password_hash:
        "$argon2id$v=19$m=19456,t=2,p=1$vnZMarTCyli/theXmLyIhA$OpdFJqPZdsKC5bRnVs8hlBbXqb8qZ9yeibyfSQzPDrs",
      createdAt: new Date(),
      deletedAt: null,
    },
  ]);
}
