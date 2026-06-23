import type { FaqItem } from "@/lib/seo";

interface FaqSectionProps {
  items: FaqItem[];
  title?: string;
  subtitle?: string;
  id?: string;
  className?: string;
}

/** Visible FAQ section — must match JSON-LD FAQPage content for rich results / AEO compliance */
export default function FaqSection({
  items,
  title = "Frequently Asked Questions",
  subtitle,
  id = "faq",
  className = "",
}: FaqSectionProps) {
  if (items.length === 0) return null;

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`py-16 md:py-24 px-6 md:px-16 lg:px-24 bg-slate-50 border-t border-slate-100 ${className}`}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 md:mb-12 space-y-3">
          <h2
            id={`${id}-heading`}
            className="headline-font text-3xl md:text-4xl font-bold text-[#1F3A89]"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="font-body text-slate-600 text-base md:text-lg">{subtitle}</p>
          )}
        </div>
        <dl className="space-y-3">
          {items.map((item) => (
            <details
              key={item.question}
              className="group bg-white border border-slate-200 rounded-xl overflow-hidden open:shadow-sm open:border-[#1F3A89]/20 transition-all"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4 md:px-6 md:py-5 font-body font-semibold text-slate-800 hover:text-[#1F3A89] transition-colors [&::-webkit-details-marker]:hidden">
                <dt className="text-sm md:text-base">{item.question}</dt>
                <span
                  className="material-symbols-outlined text-[#1F3A89] shrink-0 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                >
                  expand_more
                </span>
              </summary>
              <dd className="px-5 pb-4 md:px-6 md:pb-5 font-body text-sm md:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                {item.answer}
              </dd>
            </details>
          ))}
        </dl>
      </div>
    </section>
  );
}
