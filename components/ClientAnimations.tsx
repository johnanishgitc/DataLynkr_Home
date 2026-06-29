"use client";

import { useLayoutEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

/**
 * Home page interactive behaviors:
 * - Scroll reveal animations (IntersectionObserver)
 * - Video autoplay/pause on visibility
 * - Mobile/Laptop view toggle buttons
 * - Hide/show navigation on scroll
 *
 * Mounted from the root layout so effects re-run when navigating back to "/"
 * (the home page component may be kept alive in the Next.js router cache).
 */
export default function ClientAnimations() {
  const pathname = usePathname();
  const lastScrollY = useRef(0);

  const initObservers = useCallback(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.1 }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      if (el.closest("#hero-section")) {
        el.classList.add("is-visible");
        return;
      }
      el.classList.remove("is-visible");
      revealObserver.observe(el);
    });

    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            const src = video.dataset.src;
            if (src && !video.dataset.loaded) {
              const source = video.querySelector("source");
              if (source) source.src = src;
              else video.src = src;
              video.dataset.loaded = "1";
              video.load();
            }
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { root: null, rootMargin: "200px 0px", threshold: 0.1 },
    );

    document.querySelectorAll("video").forEach((video) => {
      videoObserver.observe(video);
    });

    const handleScroll = () => {
      const nav = document.getElementById("main-nav");
      if (!nav) return;

      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        nav.classList.add("-translate-y-full");
      } else if (currentScrollY < lastScrollY.current) {
        nav.classList.remove("-translate-y-full");
      }

      lastScrollY.current = Math.max(0, currentScrollY);
    };

    const nav = document.getElementById("main-nav");
    const section = document.getElementById("analytics-section");
    let navVisibilityObserver: IntersectionObserver | undefined;

    if (nav && section) {
      navVisibilityObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            nav.classList.remove("-translate-y-full");
          }
        },
        { root: null, rootMargin: "-100px 0px 0px 0px", threshold: 0 },
      );
      navVisibilityObserver.observe(section);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      videoObserver.disconnect();
      navVisibilityObserver?.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const initViewToggles = useCallback(() => {
    const toggleButtons = document.querySelectorAll<HTMLButtonElement>(".view-toggle-btn");
    const handlers: Array<{ btn: HTMLButtonElement; handler: () => void }> = [];

    toggleButtons.forEach((btn) => {
      const handler = () => {
        const section = btn.dataset.section;
        const view = btn.dataset.view;

        if (!section || !view) return;

        const sectionBtns = document.querySelectorAll<HTMLButtonElement>(
          `.view-toggle-btn[data-section="${section}"]`
        );
        sectionBtns.forEach((b) => {
          b.classList.remove("active", "text-white", "bg-primary", "shadow-md");
          b.classList.add("text-on-surface-variant");
        });
        btn.classList.add("active", "text-white", "bg-primary", "shadow-md");
        btn.classList.remove("text-on-surface-variant");

        const containers = document.querySelectorAll<HTMLElement>(
          `[id^="${section}-"][id$="-view"]`
        );
        containers.forEach((container) => {
          if (container.id === `${section}-${view}-view`) {
            container.classList.add(
              "active-view",
              "opacity-100",
              "scale-100",
              "pointer-events-auto",
              "visible"
            );
            container.classList.remove("opacity-0", "scale-95", "pointer-events-none", "invisible");
            container.style.zIndex = "10";
          } else {
            container.classList.remove(
              "active-view",
              "opacity-100",
              "scale-100",
              "pointer-events-auto",
              "visible"
            );
            container.classList.add("opacity-0", "scale-95", "pointer-events-none", "invisible");
            container.style.zIndex = "0";
          }
        });
      };

      btn.addEventListener("click", handler);
      handlers.push({ btn, handler });
    });

    return () => {
      handlers.forEach(({ btn, handler }) => btn.removeEventListener("click", handler));
    };
  }, []);

  useLayoutEffect(() => {
    if (pathname !== "/") return;

    const cleanupObservers = initObservers();
    const cleanupViewToggles = initViewToggles();

    return () => {
      cleanupObservers();
      cleanupViewToggles();
    };
  }, [pathname, initObservers, initViewToggles]);

  return null;
}
