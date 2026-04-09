import { db, User } from "astro:db";
import { hash } from "@node-rs/argon2";

const ARGON_OPTS = { memoryCost: 19456, timeCost: 2, parallelism: 1 };
const SECRET_BUF = Buffer.from(process.env.APP_SECRET!);

// https://astro.build/db/seed
export default async function seed() {}
