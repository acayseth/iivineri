import { z } from "astro/zod";
import { ActionError } from "astro:actions";
import { hash, verify } from "@node-rs/argon2";

export const nicknameSchema = z
  .string()
  .min(4, "Minim 4 caractere")
  .max(16, "Maxim 16 caractere")
  .regex(/^[a-zA-Z0-9.]+$/, "Doar litere latine, cifre si punct")
  .refine((v) => !v.startsWith("."), "Nu poate incepe cu punct")
  .refine((v) => !v.endsWith("."), "Nu poate termina cu punct")
  .refine((v) => !v.includes(".."), "Nu se pot folosi puncte consecutive")
  .refine((v) => {
    const digits = v.replace(/[^0-9]/g, "").length;
    const letters = v.replace(/[^a-zA-Z]/g, "").length;
    return digits <= letters;
  }, "Cifrele nu pot fi mai multe decat literele");

export const passwordSchema = z
  .string()
  .min(8, "Minim 8 caractere")
  .refine((v) => (v.match(/[A-Z]/g) || []).length >= 2, "Minim 2 litere mari")
  .refine((v) => (v.match(/[0-9]/g) || []).length >= 2, "Minim 2 cifre")
  .refine((v) => (v.match(/[^a-zA-Z0-9]/g) || []).length >= 2, "Minim 2 simboluri");

const ARGON_OPTS = { memoryCost: 19456, timeCost: 2, parallelism: 1 };

function getAppSecret(): string {
  const secret = process.env.APP_SECRET;
  if (!secret) {
    throw new ActionError({ code: "INTERNAL_SERVER_ERROR", message: "Configurare server invalida" });
  }
  return secret;
}

export async function hashPassword(password: string): Promise<string> {
  return hash(password, { ...ARGON_OPTS, secret: Buffer.from(getAppSecret()) });
}

export async function verifyPassword(passwordHash: string, password: string): Promise<boolean> {
  return verify(passwordHash, password, { secret: Buffer.from(getAppSecret()) });
}
