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
        "$argon2id$v=19$m=19456,t=2,p=1$0S31TyVmqky6i/YMVPEt4Q$P+mbnpAAs+4y5b3Rf/2f9rHByXJPQPjeLjDcV46NH+M",
      createdAt: new Date(),
      deletedAt: null,
    },
    {
      id: 2,
      root: true,
      nickname: "tigina",
      email: "tighina@iivineri.org",
      password_hash:
        "$argon2id$v=19$m=19456,t=2,p=1$0S31TyVmqky6i/YMVPEt4Q$P+mbnpAAs+4y5b3Rf/2f9rHByXJPQPjeLjDcV46NH+M",
      createdAt: new Date(),
      deletedAt: null,
    },
  ]);
}
