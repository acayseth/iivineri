import { createHmac } from "node:crypto";
import { THUMBOR_URL, THUMBOR_KEY } from "astro:env/server";

function sign(urlPart: string): string {
  return createHmac("sha1", THUMBOR_KEY)
    .update(urlPart)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export function thumborImageUrl(
  size: string,
  path: `${string}/${string}.webp`,
  isApproved: boolean,
): string {
  const filters = isApproved ? "format(webp)" : "blur(80):format(webp)";
  const part = `${size}/smart/filters:${filters}/${path}`;
  return `${THUMBOR_URL}/${sign(part)}/${part}`;
}

export function thumborBlurred(imageId: string, nickname: string): string {
  return thumborImageUrl("300x300", `${imageId}/${nickname}.webp`, false);
}

export function thumborClean(imageId: string, nickname: string): string {
  return thumborImageUrl("600x600", `${imageId}/${nickname}.webp`, true);
}

export function thumborOg(imageId: string, nickname: string): string {
  return thumborImageUrl("1200x630", `${imageId}/${nickname}.webp`, true);
}
