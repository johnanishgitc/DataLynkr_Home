"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Custom hook for scroll-reveal animations and video autoplay control.
 * Attach to a container ref and it will observe all `.reveal-on-scroll` elements
 * and all `<video>` elements within.
 */
export function useScrollAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);

  const initObservers = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scroll reveal observer
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

    container.querySelectorAll(".reveal-on-scroll").forEach((el) => {
      revealObserver.observe(el);
    });

    // Video playback observer
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.15 }
    );

    container.querySelectorAll("video").forEach((video) => {
      videoObserver.observe(video);
    });

    return () => {
      revealObserver.disconnect();
      videoObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const cleanup = initObservers();
    return cleanup;
  }, [initObservers]);

  return containerRef;
}
