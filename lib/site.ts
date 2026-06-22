const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://datalynkr.com").replace(
  /\/$/,
  "",
);

export const basePath =
  process.env.NODE_ENV === "production"
    ? "/Hometest"
    : (process.env.NEXT_PUBLIC_BASE_PATH || "");

export function siteOrigin(): string {
  return `${siteUrl}${basePath}`;
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteOrigin()}${normalized}`;
}
