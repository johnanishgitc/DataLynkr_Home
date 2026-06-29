import { FEATURE_SLUGS as FEATURE_SLUG_LIST } from "@/lib/feature-slugs";
import { basePath } from "@/lib/site";

export const FEATURE_SLUGS = new Set<string>(FEATURE_SLUG_LIST);

const TOP_LEVEL_PAGES: Record<string, string> = {
  about: "/about",
  pricing: "/pricing",
  contact: "/contact",
  support: "/support",
  login: "/login",
  privacy: "/privacy-policy",
  terms: "/terms-of-service",
  changepswd: "/changepswd",
};

/** Map a legacy .html href to the matching Next.js route path. */
export function legacyHrefToRoute(href: string, resolveBase?: string): string | null {
  if (!href || !href.includes(".html")) return null;
  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return null;

  try {
    const base =
      resolveBase ?? (typeof window !== "undefined" ? window.location.href : undefined);
    if (!base) return null;

    const url = new URL(href, base);
    let path = url.pathname;

    if (basePath && path.startsWith(basePath)) {
      path = path.slice(basePath.length) || "/";
    }

    if (!path.endsWith(".html")) return null;

    path = path.replace(/\.html$/, "");
    if (!path.startsWith("/")) path = `/${path}`;

    if (path === "/code" || path === "/code/") return "/";
    if (path.startsWith("/features/")) return path.replace(/\/$/, "") || "/";

    const slug = path.replace(/^\//, "").replace(/\/$/, "");
    if (FEATURE_SLUGS.has(slug)) return `/features/${slug}`;
    if (TOP_LEVEL_PAGES[slug]) return TOP_LEVEL_PAGES[slug];

    return path.replace(/\/$/, "") || "/";
  } catch {
    return null;
  }
}

/** Rewrite legacy .html href attributes inside a DOM subtree. */
export function rewriteLegacyAnchors(root: ParentNode): void {
  root.querySelectorAll("a[href]").forEach((anchor) => {
    const href = anchor.getAttribute("href");
    if (!href) return;

    const route = legacyHrefToRoute(href);
    if (route) anchor.setAttribute("href", route);
  });
}
