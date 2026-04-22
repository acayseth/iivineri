import type { ActionAPIContext } from "astro:actions";
import { ActionError } from "astro:actions";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

/**
 * Extracts the real client IP behind a reverse proxy (Traefik).
 * Priority: X-Real-Ip → X-Forwarded-For (first IP) → clientAddress.
 */
export function getClientIp(ctx: ActionAPIContext): string {
  const realIp = ctx.request.headers.get("x-real-ip");
  if (realIp) return realIp;

  const xff = ctx.request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();

  return ctx.clientAddress;
}

/**
 * Redis-backed fixed-window rate limiter keyed by IP + action name.
 * Uses INCR + PEXPIRE for atomic counter with auto-expiry.
 */
export async function rateLimit(
  ip: string,
  action: string,
  maxAttempts: number,
  windowMs: number,
): Promise<void> {
  const key = `rl:${action}:${ip}`;

  const count = await redis.incr(key);

  if (count === 1) {
    await redis.pexpire(key, windowMs);
  }

  if (count > maxAttempts) {
    const ttl = await redis.pttl(key);
    const waitSeconds = Math.ceil(Math.max(ttl, 1000) / 1000);
    throw new ActionError({
      code: "TOO_MANY_REQUESTS",
      message: `Prea multe incercari. Reincearca in ${waitSeconds} ${waitSeconds === 1 ? "secunda" : "secunde"}`,
    });
  }
}
