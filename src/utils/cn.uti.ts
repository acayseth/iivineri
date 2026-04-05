import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...values: ClassValue[]): string | undefined => {
  const result = twMerge(clsx(values));
  if (!result) {
    return undefined;
  }
  return result;
};
