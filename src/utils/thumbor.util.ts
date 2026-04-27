import { createHmac } from "node:crypto";
const THUMBOR_URL = process.env.THUMBOR_URL!;
const THUMBOR_KEY = process.env.THUMBOR_KEY!;

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
  // Resize la 1x1 ocoleste limitarea gifsicle (filtrele blur sunt ignorate
  // pe GIF-uri animate). Browser-ul scaleaza la dimensiunea finala via CSS.
  const path = `${imageId}/${nickname}.webp`;
  const part = `1x1/filters:format(webp)/${path}`;
  return `${THUMBOR_URL}/${sign(part)}/${part}`;
}

export function thumborClean(imageId: string, nickname: string): string {
  return thumborImageUrl("600x600", `${imageId}/${nickname}.webp`, true);
}

export function thumborOg(imageId: string, nickname: string): string {
  return thumborImageUrl("1200x630", `${imageId}/${nickname}.webp`, true);
}
