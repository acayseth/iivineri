import type { APIContext } from "astro";
import { db, Image, User, eq, and, isNull } from "astro:db";
import { createHash } from "node:crypto";
import { THUMBOR_URL } from "astro:env/server";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const THUMBOR_TIMEOUT = 30_000; // 30s
const VALID_DAYS = ["0", "1", "2", "3", "4", "5", "6", "random_no_friday"];
const IMAGE_MAGIC = new Map([
  ["ffd8ff", "image/jpeg"],
  ["89504e47", "image/png"],
  ["47494638", "image/gif"],
  ["52494646", "image/webp"],
]);

function isValidImage(buffer: Buffer): boolean {
  const hex = buffer.subarray(0, 4).toString("hex");
  return Array.from(IMAGE_MAGIC.keys()).some((magic) => hex.startsWith(magic));
}

function isValidUUID(id: string): boolean {
  return /^[a-f0-9]{32}$/.test(id);
}

function jsonError(error: string, status: number) {
  return new Response(JSON.stringify({ error }), { status });
}

export async function POST(ctx: APIContext) {
  const userId = await ctx.session?.get("userId");
  if (!userId) {
    return jsonError("Nu esti autentificat", 401);
  }

  const thumborUrl = THUMBOR_URL;

  const formData = await ctx.request.formData();
  const file = formData.get("file") as File | null;
  const dayOfWeek = formData.get("dayOfWeek") as string | null;

  if (!file || !dayOfWeek) {
    return jsonError("Fisier si ziua saptamanii sunt obligatorii", 400);
  }

  if (!VALID_DAYS.includes(dayOfWeek)) {
    return jsonError("Zi invalida", 400);
  }

  const allowedTypes = ["image/png", "image/jpeg", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return jsonError("Doar PNG, JPEG si GIF sunt permise", 400);
  }

  if (file.size > MAX_SIZE) {
    return jsonError("Fisierul depaseste 10MB", 400);
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Validare magic bytes
  if (!isValidImage(buffer)) {
    return jsonError("Fisierul nu este o imagine valida", 400);
  }

  const user = await db
    .select({ nickname: User.nickname })
    .from(User)
    .where(and(eq(User.id, userId), isNull(User.deletedAt)))
    .get();

  if (!user) {
    return jsonError("Utilizator negasit", 404);
  }

  // SHA-256 pentru duplicate
  const hash = createHash("sha256").update(buffer).digest("hex");

  const existing = await db
    .select({ id: Image.id })
    .from(Image)
    .where(eq(Image.md5sum, hash))
    .get();

  if (existing) {
    return jsonError("Imaginea exista deja", 409);
  }

  // Upload la Thumbor cu timeout
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), THUMBOR_TIMEOUT);

  let thumborResponse: Response;
  try {
    thumborResponse = await fetch(`${thumborUrl}/image`, {
      method: "POST",
      headers: {
        "Content-Type": file.type,
        Slug: `${user.nickname}.webp`,
      },
      body: buffer,
      signal: controller.signal,
    });
  } catch (err) {
    return jsonError("Serverul de imagini nu raspunde", 502);
  } finally {
    clearTimeout(timeout);
  }

  if (!thumborResponse.ok) {
    return jsonError("Eroare la incarcarea imaginii", 502);
  }

  const thumborLocation = thumborResponse.headers.get("location");
  if (!thumborLocation) {
    return jsonError("Eroare la procesarea imaginii", 502);
  }

  // Extragem și validăm UUID-ul
  const imageId = thumborLocation.replace("/image/", "").split("/")[0];
  if (!isValidUUID(imageId)) {
    return jsonError("Eroare la procesarea imaginii", 502);
  }

  // Determinăm ziua efectivă
  let resolvedDay: string;
  if (dayOfWeek === "random_no_friday") {
    const noFriday = [0, 1, 2, 3, 4, 6];
    resolvedDay = String(noFriday[Math.floor(Math.random() * noFriday.length)]);
  } else {
    resolvedDay = dayOfWeek;
  }

  // Salvăm în DB cu error handling
  try {
    await db.insert(Image).values({
      id: imageId,
      ownerId: userId,
      md5sum: hash,
      dayOfWeek: resolvedDay as "0" | "1" | "2" | "3" | "4" | "5" | "6",
      size: buffer.length,
      width: 0,
      height: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch {
    return jsonError("Imaginea exista deja", 409);
  }

  return new Response(
    JSON.stringify({ success: true, id: imageId }),
    { status: 201 }
  );
}
