import { createHmac } from "node:crypto";

const thumborUrl = import.meta.env.THUMBOR_URL;
const thumborKey = import.meta.env.THUMBOR_KEY;

function sign(urlPart: string): string {
  return createHmac("sha1", thumborKey)
    .update(urlPart)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function thumborSigned(imagePath: string, options: string = ""): string {
  const urlPart = options ? `${options}/${imagePath}` : imagePath;
  const sig = sign(urlPart);
  return `${thumborUrl}/${sig}/${urlPart}`;
}

export function thumborBlurred(imageId: string, nickname: string): string {
  return thumborSigned(`${imageId}/${nickname}.webp`, "300x300/smart/filters:blur(50):format(webp)");
}

export function thumborClean(imageId: string, nickname: string): string {
  return thumborSigned(`${imageId}/${nickname}.webp`, "600x600/smart/filters:format(webp)");
}
