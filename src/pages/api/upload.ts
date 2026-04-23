import type { APIContext } from "astro";
import { db, Image, User, eq, and, isNull } from "astro:db";
import { createHash, randomUUID } from "node:crypto";
import { imageSize } from "image-size";
import { putImage } from "@/utils/rustfs.util";


const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const VALID_DAYS = ["0", "1", "2", "3", "4", "5", "6", "random_no_friday"];
const IMAGE_MAGIC = new Map([
  ["ffd8ff", "image/jpeg"],
  ["89504e47", "image/png"],
  ["47494638", "image/gif"],
]);

function detectMimeType(buffer: Buffer): string | null {
  const hex = buffer.subarray(0, 4).toString("hex");
  for (const [magic, mime] of IMAGE_MAGIC) {
    if (hex.startsWith(magic)) return mime;
  }
  return null;
}

function jsonError(error: string, status: number) {
  return new Response(JSON.stringify({ error }), { status });
}

export async function POST(ctx: APIContext) {
  const userId = await ctx.session?.get("userId");
  if (!userId) {
    return jsonError("Nu esti autentificat", 401);
  }

  const formData = await ctx.request.formData();
  const file = formData.get("file") as File | null;
  const dayOfWeek = formData.get("dayOfWeek") as string | null;

  if (!file || !dayOfWeek) {
    return jsonError("Fisier si ziua saptamanii sunt obligatorii", 400);
  }

  if (!VALID_DAYS.includes(dayOfWeek)) {
    return jsonError("Zi invalida", 400);
  }

  if (file.size > MAX_SIZE) {
    return jsonError("Fisierul depaseste 10MB", 400);
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Validare magic bytes si detectie Content-Type
  const mimeType = detectMimeType(buffer);
  if (!mimeType) {
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

  const imageId = randomUUID().replaceAll("-", "");
  const key = `${imageId}/${user.nickname}.webp`;

  try {
    await putImage(key, buffer, mimeType);
  } catch {
    return jsonError("Serverul de imagini nu raspunde", 502);
  }

  // Determinăm ziua efectivă
  let resolvedDay: string;
  if (dayOfWeek === "random_no_friday") {
    const noFriday = [0, 1, 2, 3, 4, 6];
    resolvedDay = String(noFriday[Math.floor(Math.random() * noFriday.length)]);
  } else {
    resolvedDay = dayOfWeek;
  }

  // Extragem dimensiunile reale din buffer
  const dimensions = imageSize(buffer);
  const width = dimensions.width ?? 0;
  const height = dimensions.height ?? 0;

  // Salvăm în DB cu error handling
  try {
    await db.insert(Image).values({
      id: imageId,
      ownerId: userId,
      md5sum: hash,
      dayOfWeek: resolvedDay as "0" | "1" | "2" | "3" | "4" | "5" | "6",
      size: buffer.length,
      width,
      height,
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
