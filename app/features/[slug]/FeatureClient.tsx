"use client";

import { useEffect, useRef } from "react";
import { rewriteLegacyAnchors } from "@/lib/legacyHrefToRoute";
import { initFaqAccordion } from "@/lib/initFaqAccordion";

interface FeatureClientProps {
  slug: string;
  body: string;
  styles: string[];
  scripts: string[];
}

export default function FeatureClient({ slug, body, styles, scripts }: FeatureClientProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      rewriteLegacyAnchors(contentRef.current);
    }
  }, [body, slug]);

  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const timeouts = new Set<number>();
    const intervals = new Set<number>();

    const originalSetTimeout = window.setTimeout.bind(window);
    const originalSetInterval = window.setInterval.bind(window);
    const originalClearTimeout = window.clearTimeout.bind(window);
    const originalClearInterval = window.clearInterval.bind(window);

    window.setTimeout = ((handler: TimerHandler, delay?: number, ...args: unknown[]) => {
      const id = originalSetTimeout(handler, delay ?? 0, ...args) as unknown as number;
      timeouts.add(id);
      return id;
    }) as typeof window.setTimeout;

    window.setInterval = ((handler: TimerHandler, delay?: number, ...args: unknown[]) => {
      const id = originalSetInterval(handler, delay ?? 0, ...args) as unknown as number;
      intervals.add(id);
      return id;
    }) as typeof window.setInterval;

    window.clearTimeout = ((id?: number) => {
      if (id !== undefined) timeouts.delete(id);
      originalClearTimeout(id);
    }) as typeof window.clearTimeout;

    window.clearInterval = ((id?: number) => {
      if (id !== undefined) intervals.delete(id);
      originalClearInterval(id);
    }) as typeof window.clearInterval;

    const initPageObservers = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      root.querySelectorAll(".reveal-on-scroll").forEach((el) => {
        observer.observe(el);
      });

      return () => observer.disconnect();
    };

    const cleanupObservers = initPageObservers();
    const cleanupFaqAccordion = initFaqAccordion(root);

    const runPageScripts = () => {
      const originalAddEventListener = document.addEventListener.bind(document);
      document.addEventListener = function (
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions
      ) {
        if (type === "DOMContentLoaded" && document.readyState !== "loading") {
          if (typeof listener === "function") {
            listener.call(document, new Event("DOMContentLoaded"));
          } else if (listener && "handleEvent" in listener) {
            listener.handleEvent(new Event("DOMContentLoaded"));
          }
          return;
        }
        return originalAddEventListener(type, listener, options);
      };

      try {
        scripts.forEach((scriptText) => {
          try {
            const funcRegex = /function\s+([a-zA-Z0-9_]+)\s*\(/g;
            const declaredFunctions: string[] = [];
            let m;
            while ((m = funcRegex.exec(scriptText)) !== null) {
              declaredFunctions.push(m[1]);
            }

            let processedScript = scriptText;
            declaredFunctions.forEach((funcName) => {
              processedScript = processedScript.replace(
                new RegExp(`\\bfunction\\s+${funcName}\\s*\\(`, "g"),
                `window.${funcName} = function(`
              );
            });

            const fn = new Function(processedScript);
            fn();
          } catch (err) {
            console.error(`Error running inline script for feature ${slug}:`, err);
          }
        });
      } finally {
        document.addEventListener = originalAddEventListener;
      }
    };

    runPageScripts();

    return () => {
      cleanupObservers();
      cleanupFaqAccordion();

      timeouts.forEach((id) => originalClearTimeout(id));
      intervals.forEach((id) => originalClearInterval(id));
      timeouts.clear();
      intervals.clear();

      window.setTimeout = originalSetTimeout;
      window.setInterval = originalSetInterval;
      window.clearTimeout = originalClearTimeout;
      window.clearInterval = originalClearInterval;

      root.querySelectorAll("video").forEach((video) => {
        video.pause();
      });

      scripts.forEach((scriptText) => {
        const funcRegex = /function\s+([a-zA-Z0-9_]+)\s*\(/g;
        let m;
        while ((m = funcRegex.exec(scriptText)) !== null) {
          const funcName = m[1];
          if (typeof window !== "undefined") {
            delete (window as unknown as { [key: string]: unknown })[funcName];
          }
        }
      });
    };
  }, [slug, scripts]);

  return (
    <>
      {styles.map((styleContent, idx) => (
        <style key={idx} dangerouslySetInnerHTML={{ __html: styleContent }} />
      ))}

      <div
        ref={contentRef}
        className="cdn-tailwind-content"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </>
  );
}
