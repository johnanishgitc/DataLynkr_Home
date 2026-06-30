import { basePath } from "@/lib/site";

/** Rewrite legacy static .html hrefs to Next.js routes (used when parsing feature HTML). */
export function rewriteLegacyHtmlLinks(html: string): string {
  const bp = basePath || "";

  return html
    .replace(/href=["'](?:\.\.\/)?code\.html["']/gi, `href="${bp || "/"}"`)
    .replace(/href=["'](?:\.\.\/)?about\.html["']/gi, `href="${bp}/about"`)
    .replace(/href=["'](?:\.\.\/)?pricing\.html["']/gi, `href="${bp}/pricing"`)
    .replace(/href=["'](?:\.\.\/)?contact\.html["']/gi, `href="${bp}/contact"`)
    .replace(/href=["'](?:\.\.\/)?support\.html["']/gi, `href="${bp}/support"`)
    .replace(/href=["'](?:\.\.\/)?login\.html["']/gi, `href="${bp}/login"`)
    .replace(/href=["'](?:\.\.\/)?privacy\.html["']/gi, `href="${bp}/privacy-policy"`)
    .replace(/href=["'](?:\.\.\/)?terms\.html["']/gi, `href="${bp}/terms-of-service"`)
    .replace(/href=["'](?:\.\.\/)?changepswd\.html["']/gi, `href="${bp}/reset-password"`)
    .replace(
      /href=["'](?:\.\.\/)?(?:features\/)?([a-z0-9-]+)\.html["']/gi,
      `href="${bp}/features/$1"`
    );
}
