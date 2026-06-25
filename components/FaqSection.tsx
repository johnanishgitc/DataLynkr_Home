"use client";

import { useEffect, useRef } from "react";
import type { FaqItem } from "@/lib/seo";
import { initFaqAccordion } from "@/lib/initFaqAccordion";

interface FaqSectionProps {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
  id?: string;
  className?: string;
  /** Home page FAQ matches code.html (two columns + accordion buttons) */
  layout?: "default" | "home";
}

function FeatureFaqSection({
  items,
  title,
  subtitle,
  id,
  className,
  sectionRef,
  twoColumn = false,
}: {
  items: FaqItem[];
  title: string;
  subtitle?: string;
  id: string;
  className: string;
  sectionRef: React.RefObject<HTMLElement | null>;
  twoColumn?: boolean;
}) {
  const header = (
    <div className="text-center mb-12 md:mb-16">
      <h2
        id={`${id}-heading`}
        className="headline-font text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-600 text-sm md:text-base mt-4 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );

  if (twoColumn) {
    const splitAt = 12;
    const leftItems = items.slice(0, splitAt);
    const rightItems = items.slice(splitAt);

    return (
      <section
        ref={sectionRef}
        id={id}
        aria-labelledby={`${id}-heading`}
        className={`w-full bg-white py-16 md:py-24 px-6 md:px-12 lg:px-24 relative z-10 reveal-fade-up ${className}`}
      >
        <div className="max-w-6xl mx-auto">
          {header}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              {leftItems.map((item) => (
                <FaqAccordionItem key={item.question} item={item} />
              ))}
            </div>
            <div className="space-y-4">
              {rightItems.map((item) => (
                <FaqAccordionItem key={item.question} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`w-full bg-white py-16 md:py-24 px-6 md:px-12 lg:px-24 relative z-10 reveal-fade-up ${className}`}
    >
      <div className="max-w-4xl mx-auto">
        {header}
        <div className="space-y-4">
          {items.map((item) => (
            <FaqAccordionItem key={item.question} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqAccordionItem({ item }: { item: FaqItem }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
      <button
        type="button"
        suppressHydrationWarning
        className="faq-toggle-btn w-full px-6 py-5 flex items-center justify-between text-left font-bold text-slate-800 hover:text-blue-600 transition-colors focus:outline-none"
      >
        <span className="text-sm md:text-base pr-4">{item.question}</span>
        <span className="faq-icon material-symbols-outlined text-slate-400 transition-transform duration-300 select-none">
          keyboard_arrow_down
        </span>
      </button>
      <div className="faq-content max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
        <div
          className="px-6 pb-6 pt-1 text-xs md:text-sm text-slate-500 leading-relaxed border-t border-slate-50/50"
          dangerouslySetInnerHTML={{ __html: item.answer }}
        />
      </div>
    </div>
  );
}

/** Visible FAQ section — content matches WebPage hasPart / FAQPage JSON-LD (plain text in schema). */
export default function FaqSection({
  items,
  title = "Frequently Asked Questions",
  subtitle,
  id = "faq",
  className = "",
  layout = "default",
}: FaqSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    return initFaqAccordion(root);
  }, [items, layout]);

  if (items.length === 0) return null;

  if (layout === "home") {
    return (
      <FeatureFaqSection
        items={items}
        title={title}
        subtitle={subtitle}
        id={id}
        className={className}
        sectionRef={sectionRef}
        twoColumn
      />
    );
  }

  return (
    <FeatureFaqSection
      items={items}
      title={title}
      subtitle={subtitle}
      id={id}
      className={className}
      sectionRef={sectionRef}
    />
  );
}
