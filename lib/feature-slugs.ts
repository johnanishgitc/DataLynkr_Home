/** All feature pages — keep in sync with app/features/[slug]/page.tsx and app/sitemap.ts */
export const FEATURE_SLUGS = [
  "sales-order-management",
  "extend-portal-customers",
  "modern-bcommerce-ordering",
  "invoice-creation",
  "authorization-workflows",
  "daily-ledger-reports",
  "offline-transactions",
  "dynamic-dashboards",
  "payments-collections",
  "stock-summary",
  "custom-reports",
] as const;

export type FeatureSlug = (typeof FEATURE_SLUGS)[number];
