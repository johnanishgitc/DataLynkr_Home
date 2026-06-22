"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { legacyHrefToRoute } from "@/lib/legacyHrefToRoute";

/**
 * Intercepts clicks on legacy .html anchor links (from old static pages still
 * cached or served from the server) and routes through Next.js instead.
 */
export default function LegacyLinkInterceptor() {
  const router = useRouter();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = (event.target as Element | null)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      const route = legacyHrefToRoute(href);
      if (!route) return;

      event.preventDefault();
      router.push(route);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
