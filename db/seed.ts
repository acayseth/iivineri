import { db, User } from "astro:db";
import { hash } from "@node-rs/argon2";

// https://astro.build/db/seed
export default async function seed() {
  const appSecret = process.env.APP_SECRET;
  if (!appSecret) {
    throw new Error("APP_SECRET not set in .env");
  }

  const argonOpts = {
    secret: Buffer.from(appSecret),
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  };

  await db.insert(User).values([
    {
      id: 1,
      nickname: "hellnet",
      email: "hellnet@iivineri.org",
      password_hash: await hash("hellnet", argonOpts),
      createdAt: new Date(),
      deletedAt: null,
    },
    {
      id: 2,
      nickname: "tigina",
      email: "tighina@iivineri.org",
      password_hash: await hash("hellnet", argonOpts),
      createdAt: new Date(),
      deletedAt: null,
    },
    {
      id: 3,
      nickname: "test.user",
      email: "test@exemplu.ro",
      password_hash: await hash("TestPass@@12", argonOpts),
      createdAt: new Date(),
      deletedAt: null,
    },
  ]);
}
