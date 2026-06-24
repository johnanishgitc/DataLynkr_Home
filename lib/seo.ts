import type { Metadata } from "next";
import { absoluteUrl, siteOrigin } from "@/lib/site";

export type FaqItem = { question: string; answer: string };

export type BreadcrumbItem = { name: string; path: string };

/** Default social / OG preview image */
export const DEFAULT_OG_IMAGE = absoluteUrl("/resources/poster_images/orders_laptop.webp");

export function buildPageMetadata(options: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
  ogType?: "website" | "article";
  keywords?: string[];
}): Metadata {
  const {
    title,
    description,
    path,
    ogImage = DEFAULT_OG_IMAGE,
    noIndex = false,
    ogType = "website",
    keywords,
  } = options;
  const url = path === "/" ? siteOrigin() : absoluteUrl(path);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : {}),
    openGraph: {
      type: ogType,
      locale: "en_IN",
      url,
      siteName: "DataLynkr",
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteOrigin()}/#website`,
    name: "DataLynkr",
    url: siteOrigin(),
    description:
      "DataLynkr extends Tally ERP beyond the accounts department with real-time mobile and browser access for sales, operations, and management teams.",
    publisher: { "@id": `${siteOrigin()}/#organization` },
    inLanguage: "en-IN",
  };
}

export function webPageJsonLd(options: {
  path: string;
  name: string;
  description: string;
  speakableSelectors?: string[];
}) {
  const url = options.path === "/" ? siteOrigin() : absoluteUrl(options.path);
  const page: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: options.name,
    description: options.description,
    isPartOf: { "@id": `${siteOrigin()}/#website` },
    about: { "@id": `${siteOrigin()}/#software` },
    inLanguage: "en-IN",
  };

  if (options.speakableSelectors?.length) {
    page.speakable = {
      "@type": "SpeakableSpecification",
      cssSelector: options.speakableSelectors,
    };
  }

  return page;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? siteOrigin() : absoluteUrl(item.path),
    })),
  };
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${absoluteUrl("/contact")}#contactpage`,
    url: absoluteUrl("/contact"),
    name: "Contact DataLynkr",
    description:
      "Contact DataLynkr for demos, pricing, partnerships, or support. Speak with our Tally integration experts.",
    isPartOf: { "@id": `${siteOrigin()}/#website` },
    mainEntity: { "@id": `${siteOrigin()}/#organization` },
  };
}

export function aboutPageJsonLd() {
  return webPageJsonLd({
    path: "/about",
    name: "About DataLynkr",
    description:
      "Learn about DataLynkr's mission to extend Tally ERP beyond the accounts department for sales, operations, and leadership teams.",
  });
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteOrigin()}/#software`,
    name: "DataLynkr",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Android, iOS",
    logo: absoluteUrl("/logo.svg"),
    url: siteOrigin(),
    downloadUrl: "https://play.google.com/store/apps/details?id=com.datalynkr",
    description:
      "DataLynkr extends Tally ERP beyond the accounts department, giving sales teams, managers, operations, customers, and business owners secure real-time access to live Tally data from mobile and browser. It operates via secure, encrypted tunnels without storing your business data on external servers.",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: "300",
      offerCount: "3",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/pricing"),
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "300",
        priceCurrency: "INR",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: "1",
          unitCode: "MON",
        },
      },
    },
    publisher: { "@id": `${siteOrigin()}/#organization` },
    screenshot: [
      absoluteUrl("/resources/poster_images/orders_laptop.webp"),
      absoluteUrl("/resources/poster_images/extendportal.webp"),
      absoluteUrl("/resources/poster_images/invoice_laptop.webp"),
      absoluteUrl("/resources/poster_images/approvals_laptop.webp"),
    ],
    featureList: [
      "Sales Order Management",
      "Invoice Creation",
      "Customer Portals",
      "Authorization Workflows",
      "Dynamic Dashboards",
      "Payments & Collections",
      "Stock Summary",
      "Custom Reports",
      "Daily Ledger Reports",
      "Offline Transactions",
      "Modern B-Commerce Ordering",
    ],
  };
}

export const HOME_FAQ: FaqItem[] = [
  {
    question: "What is DataLynkr?",
    answer:
      "DataLynkr extends Tally beyond the accounts department, giving sales teams, managers, operations staff, customers, and business owners secure access to live Tally data from anywhere. All information is fetched directly from Tally in real time — no customer data is stored on DataLynkr servers.",
  },
  {
    question: "Who is DataLynkr for?",
    answer:
      "DataLynkr is built for any business that uses Tally as its ERP. It serves Sales Teams (place orders, create invoices from the field), Managers & Owners (monitor operations, approve transactions), Accounts & Finance Teams (maintain financial control while enabling collaboration), Operations Teams (improve inventory visibility), and Customers (access invoices, outstanding balances, self-service portals). Key industries supported include Manufacturing, Distribution, Wholesale, Retail, Trading, and Services.",
  },
  {
    question: "How does DataLynkr work with Tally?",
    answer:
      "DataLynkr connects directly to your Tally ERP in real time via secure encrypted API tunnels. It reads and writes data to Tally without requiring any changes to your existing Tally setup. All data stays within your control — DataLynkr does not store your business data on its servers.",
  },
  {
    question: "What features does DataLynkr offer?",
    answer:
      "DataLynkr offers 11 key features: Sales Order Management, Invoice Creation, Extend a Portal for Your Customers, Modern B-Commerce Ordering, Authorization Workflows, Dynamic Dashboards, Payments & Collections, Stock Summary, Custom Reports, Daily Ledger Reports, and Offline Transactions.",
  },
  {
    question: "How much does DataLynkr cost?",
    answer: `DataLynkr plans start at just ₹300/month per user. Visit ${absoluteUrl("/pricing")} for detailed pricing information.`,
  },
  {
    question: "How does DataLynkr ensure data security and privacy?",
    answer:
      "DataLynkr connects to Tally ERP via secure, end-to-end encrypted API tunnels. We respect your data privacy: no transaction data or customer lists are stored on our servers. All information remains on your local Tally database under your full control.",
  },
  {
    question: "Can I enter transactions offline using DataLynkr?",
    answer:
      "Yes, DataLynkr supports Offline Transactions. Your sales team can place orders, view inventory, and log customer interactions without an active internet connection. Once online, the app automatically queues and syncs all offline activities directly to Tally.",
  },
  {
    question: "Does DataLynkr work with TallyPrime?",
    answer:
      "Yes, DataLynkr is fully compatible with Tally ERP 9, TallyPrime, and TallyPrime Edit Log. It integrates seamlessly without requiring any modifications to your existing Tally license or database setup.",
  },
  {
    question: "How do approval and authorization workflows work?",
    answer:
      "DataLynkr has a custom Authorization Workflow feature. Transactions entered by field sales staff can be marked as pending. Managers or accounts teams can review, approve, or reject these transactions from their dashboard before they are permanently written to Tally.",
  },
  {
    question: "Can DataLynkr connect to other ERPs like Zoho Books, Busy ERP, Marg ERP, or SAP?",
    answer:
      "DataLynkr is built primarily to integrate seamlessly with Tally ERP 9, TallyPrime, and TallyPrime Edit Log. However, if you are currently using Zoho Books, Busy ERP, Marg ERP, SAP, or other ERP systems and require custom mobile or web integrations for your sales reps, collections agents, or B2B dealer ordering portals, please reach out to our team to discuss custom API integration possibilities.",
  },
  {
    question: "Why should I use Tally + DataLynkr instead of migrating to a cloud-based ERP like Zoho Books?",
    answer:
      "Migrating your entire business data and training your staff on a new cloud-based ERP like Zoho Books is highly disruptive, expensive, and time-consuming. DataLynkr gives you the best of both worlds: you keep your secure, robust, and familiar offline-first desktop accounting (Tally) while instantly enabling real-time cloud mobile/web access for your field sales, operations, and management teams.",
  },
  {
    question: "Does DataLynkr offer field sales capabilities comparable to enterprise ERP solutions?",
    answer:
      "Yes. DataLynkr extends Tally with advanced features found in premium enterprise ERP solutions (such as SAP Business One or Oracle NetSuite), including multi-level transaction authorization workflows, real-time multi-godown stock summary, credit limit validation, and live sales performance dashboards—all at a fraction of the cost.",
  },
  {
    question: "Is DataLynkr a replacement for ERP systems?",
    answer:
      "No, DataLynkr is not a replacement. It is a secure, real-time extension companion that unlocks the capabilities of your existing ERP (Tally) and extends it to the web and mobile devices for non-accounting users (like customers, distributors, sales executives, and business owners).",
  },
];

export const PRICING_FAQ: FaqItem[] = [
  {
    question: "How much does DataLynkr cost per user?",
    answer:
      "DataLynkr subscription plans start at ₹300 per user per month. Silver, Gold, Diamond, and Enterprise tiers are available based on team size and feature requirements.",
  },
  {
    question: "Is there a free trial for DataLynkr?",
    answer:
      "Yes, DataLynkr offers a 14-day free trial with no credit card required. You can connect your Tally and explore features before subscribing.",
  },
  {
    question: "Can I pay annually for DataLynkr?",
    answer:
      "Yes, annual billing is available on all plans. Annual subscriptions typically offer savings compared to monthly billing.",
  },
  {
    question: "Does DataLynkr pricing include external customer portal users?",
    answer:
      "Each plan includes a set number of free external portal users per internal user. Check the plan details on the pricing page for exact limits.",
  },
];

export const SUPPORT_FAQ: FaqItem[] = [
  {
    question: "How do I connect DataLynkr to my Tally ERP?",
    answer:
      "DataLynkr connects to Tally via a secure connector installed on the machine running Tally. Setup typically takes about 5 minutes. Contact support or request a demo for guided onboarding.",
  },
  {
    question: "What should I do if DataLynkr is not syncing with Tally?",
    answer:
      "First, verify that Tally is running and the DataLynkr connector service is active. Check your internet connection and firewall settings. If the issue persists, submit a support ticket with your company name and error details.",
  },
  {
    question: "How do I reset my DataLynkr portal password?",
    answer:
      "Use the Change Password page in the portal or contact your company administrator. For account lockouts, email support@datalynkr.com with your registered email address.",
  },
  {
    question: "Does DataLynkr support TallyPrime and Tally ERP 9?",
    answer:
      "Yes, DataLynkr is compatible with Tally ERP 9, TallyPrime, and TallyPrime Edit Log without modifying your existing Tally license or database.",
  },
];

export function pricingOffersJsonLd(
  plans: Array<{ name: string; description: string; monthly_price: string; min_users: number; max_users: number }>,
) {
  if (plans.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "DataLynkr Subscription",
    description: "Tally ERP mobile and browser extension for sales, operations, and management teams.",
    brand: { "@type": "Brand", name: "DataLynkr" },
    url: absoluteUrl("/pricing"),
    offers: plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      description: plan.description,
      price: plan.monthly_price,
      priceCurrency: "INR",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/pricing"),
      eligibleQuantity: {
        "@type": "QuantitativeValue",
        minValue: plan.min_users,
        maxValue: plan.max_users >= 9999 ? undefined : plan.max_users,
        unitText: "users",
      },
    })),
  };
}

export function howToConnectTallyJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to connect DataLynkr to Tally ERP",
    description:
      "Step-by-step guide to connect DataLynkr with your Tally ERP for real-time mobile and browser access.",
    totalTime: "PT5M",
    tool: [{ "@type": "HowToTool", name: "Tally ERP 9 or TallyPrime" }],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Request a demo or sign up",
        text: "Register on DataLynkr or contact sales@datalynkr.com to start your free trial.",
        url: absoluteUrl("/contact"),
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Install the Tally connector",
        text: "Install the DataLynkr connector on the computer where Tally ERP is running. The connector creates a secure encrypted tunnel.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Configure users and permissions",
        text: "Set up internal users, roles, and optional customer portal access from the DataLynkr admin panel.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Access Tally from mobile or browser",
        text: "Log in to the DataLynkr portal or mobile app to place orders, create invoices, view dashboards, and approve workflows in real time.",
        url: absoluteUrl("/login"),
      },
    ],
  };
}
