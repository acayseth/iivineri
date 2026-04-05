const clean = (value: string): string => value.trim().replace(/\/+$/, "");

export const gl = (path: `/${string}`, absolute?: string): string => {
  if (absolute) {
    return clean(`${absolute}${path}`);
  }

  const base = import.meta.env.SITE ?? "http://localhost:4321";
  return clean(`${base}${path}`);
};
