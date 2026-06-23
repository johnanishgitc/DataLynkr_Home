import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/seo";

interface SeoBreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function SeoBreadcrumbs({ items, className = "" }: SeoBreadcrumbsProps) {
  if (items.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className={`text-sm font-body ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5 text-slate-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {index > 0 && (
                <span className="material-symbols-outlined text-base text-slate-300" aria-hidden="true">
                  chevron_right
                </span>
              )}
              {isLast ? (
                <span aria-current="page" className="text-slate-700 font-medium">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-[#1F3A89] transition-colors">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
