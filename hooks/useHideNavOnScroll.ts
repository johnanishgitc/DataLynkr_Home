"use client";

import { useEffect, useRef, type RefObject } from "react";

const MIN_SCROLL = 64;

/**
 * Hides a fixed nav when scrolling down and reveals it when scrolling up.
 */
export function useHideNavOnScroll(
  enabled: boolean,
  navRef: RefObject<HTMLElement | null>
) {
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const nav = navRef.current;
    if (!nav) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= MIN_SCROLL) {
        nav.classList.remove("-translate-y-full");
      } else if (currentScrollY > lastScrollY.current) {
        nav.classList.add("-translate-y-full");
      } else if (currentScrollY < lastScrollY.current) {
        nav.classList.remove("-translate-y-full");
      }

      lastScrollY.current = Math.max(0, currentScrollY);
    };

    nav.classList.remove("-translate-y-full");
    lastScrollY.current = window.scrollY;

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      nav.classList.remove("-translate-y-full");
    };
  }, [enabled, navRef]);
}
