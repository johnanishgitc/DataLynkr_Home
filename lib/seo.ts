import type { Metadata } from "next";
import { absoluteUrl, IT_CATALYST_URL, siteOrigin } from "@/lib/site";

export type FaqItem = { question: string; answer: string };

export type BreadcrumbItem = { name: string; path: string };

/** Strip HTML from FAQ answers before JSON-LD output — keeps UI markup out of AEO/RAG parsers. */
export function faqAnswerForSchema(answer: string): string {
  return answer
    .replace(/<br\s*\/?>/gi, "\n\n")
    .replace(/<\/?(strong|em|b|i|p|ul|ol)>/gi, "")
    .replace(/<li>/gi, "- ")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function faqQuestionsForSchema(items: FaqItem[]) {
  return items.map((item) => ({
    "@type": "Question" as const,
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer" as const,
      text: faqAnswerForSchema(item.answer),
    },
  }));
}

/** Default social / OG preview image */
export const DEFAULT_OG_IMAGE = absoluteUrl("/resources/poster_images/orders_laptop.webp");

export const HOME_TITLE =
  "DataLynkr | Live Tally Data Access & Business Automation Platform";

export const HOME_DESCRIPTION =
  "DataLynkr enables every team to access live Tally data, execute workflows, and make better decisions from anywhere—without changing the way you work in Tally.";

/** Primary navigation targets that influence Google sitelink selection. */
export const SITELINK_PAGES = [
  {
    name: "Sales Order & Invoicing",
    path: "/features/sales-order-management",
    description:
      "Create Tally sales orders and invoices from anywhere with live data, approval workflows, and real-time inventory visibility.",
  },
  {
    name: "Customer Portal",
    path: "/features/extend-portal-customers",
    description:
      "Give customers secure access to invoices, outstanding balances, orders, and payments directly from Tally.",
  },
  {
    name: "ECommerce Style B2B Ordering Portal",
    path: "/features/modern-bcommerce-ordering",
    description:
      "Create an e-commerce style ordering experience powered by Tally products, pricing, and inventory.",
  },
  {
    name: "Business Dashboards",
    path: "/features/dynamic-dashboards",
    description:
      "Turn live Tally data into interactive dashboards for sales, receivables, payables, and business insights.",
  },
  {
    name: "Payments & Collections",
    path: "/features/payments-collections",
    description:
      "Manage collections, vendor payments, and expenses with mobile workflows connected to Tally Real-Time.",
  },
  {
    name: "Custom Reports",
    path: "/features/custom-reports",
    description:
      "Build dynamic reports from live Tally data using drag-and-drop reporting tools.",
  },
  {
    name: "Pricing",
    path: "/pricing",
    description:
      "DataLynkr pricing plans for connecting teams with live Tally data.",
  },
  {
    name: "Contact Us",
    path: "/contact",
    description:
      "Contact DataLynkr for demos, Tally integration, and business automation solutions.",
  },
  {
    name: "Customer Login",
    path: "/login",
    description: "Login to your secure DataLynkr account.",
  },
] as const;

export function siteNavigationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "DataLynkr Solutions",
    itemListElement: SITELINK_PAGES.map((page, index) => ({
      "@type": "SiteNavigationElement",
      position: index + 1,
      name: page.name,
      description: page.description,
      url: absoluteUrl(page.path),
    })),
  };
}

export function buildPageMetadata(options: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
  absoluteTitle?: boolean;
  ogType?: "website" | "article";
  keywords?: string[];
}): Metadata {
  const {
    title,
    description,
    path,
    ogImage = DEFAULT_OG_IMAGE,
    noIndex = false,
    absoluteTitle = false,
    ogType = "website",
    keywords,
  } = options;
  const url = path === "/" ? siteOrigin() : absoluteUrl(path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
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
    mainEntity: faqQuestionsForSchema(items),
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteOrigin()}/#website`,
    name: "DataLynkr",
    url: siteOrigin(),
    description: HOME_DESCRIPTION,
    publisher: { "@id": `${siteOrigin()}/#organization` },
    inLanguage: "en-IN",
  };
}

export function webPageJsonLd(options: {
  path: string;
  name: string;
  description: string;
  speakableSelectors?: string[];
  faqItems?: FaqItem[];
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

  if (options.faqItems?.length) {
    page.hasPart = faqQuestionsForSchema(options.faqItems);
  }

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
    name: "Contact Us",
    description:
      "Contact DataLynkr for demos, Tally integration, and business automation solutions.",
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

/** Public per-user/year pricing shown on /pricing (Silver ₹3,600 → Enterprise ₹1,800). */
export function datalynkrAggregateOffer() {
  return {
    "@type": "AggregateOffer" as const,
    priceCurrency: "INR",
    lowPrice: "1800",
    highPrice: "3600",
    offerCount: "4",
    availability: "https://schema.org/InStock",
    url: absoluteUrl("/pricing"),
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "3600",
      priceCurrency: "INR",
      referenceQuantity: {
        "@type": "QuantitativeValue",
        value: "1",
        unitCode: "ANN",
      },
    },
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteOrigin()}/#software`,
    name: "DataLynkr",
    applicationCategory: "BusinessApplication",
    creator: {
      "@type": "Organization",
      name: "IT Catalyst Software India Pvt Ltd",
      url: IT_CATALYST_URL,
    },
    operatingSystem: "Windows, Web, Android, iOS",
    logo: absoluteUrl("/logo.svg"),
    url: siteOrigin(),
    downloadUrl: "https://play.google.com/store/apps/details?id=com.datalynkr",
    description:
      "DataLynkr extends Tally ERP beyond the accounts department, giving sales teams, managers, operations, customers, and business owners secure real-time access to live Tally data from mobile and browser. It operates via secure, encrypted tunnels without storing your business data on external servers.",
    offers: datalynkrAggregateOffer(),
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

export function productJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteOrigin()}/#product`,
    name: "DataLynkr",
    brand: {
      "@type": "Brand",
      name: "DataLynkr",
    },
    category: "Tally ERP Integration Software",
    description:
      "DataLynkr extends Tally ERP beyond the accounts department, giving sales teams, managers, operations, customers, and business owners secure real-time access to live Tally data from mobile and browser.",
    logo: absoluteUrl("/logo.svg"),
    image: absoluteUrl("/resources/poster_images/orders_laptop.webp"),
    offers: datalynkrAggregateOffer(),
    manufacturer: { "@id": `${siteOrigin()}/#organization` },
  };
}

export const HOME_FAQ: FaqItem[] = [
  {
    question: "What is DataLynkr?",
    answer:
      "<strong>DataLynkr is a business management platform that extends Tally beyond accounting.</strong> It connects with your existing Tally setup and gives sales teams, managers, customers, and business owners access to real-time business information such as inventory, orders, invoices, reports, dashboards, and approvals from mobile and web.<br/><br/>DataLynkr helps businesses turn Tally into a complete operational platform without replacing their existing ERP.",
  },
  {
    question: "How does DataLynkr work with Tally?",
    answer:
      "DataLynkr works alongside Tally by connecting with your existing Tally data and making important business information accessible outside the accounting department.<br/><br/>Businesses can continue using Tally as their accounting system while DataLynkr enables other teams to access live information such as stock availability, customer balances, sales orders, reports, and approvals.",
  },
  {
    question: "Can I access Tally from mobile?",
    answer:
      "Yes. DataLynkr allows users to access Tally-based business information from mobile devices and browsers.<br/><br/>Sales teams can check stock, view customer information, create orders, track transactions, and access important business updates without being physically present at the office.",
  },
  {
    question: "Can sales teams use Tally without accounting access?",
    answer:
      "Yes. DataLynkr allows businesses to give sales teams access to the information they need without giving them direct access to Tally.<br/><br/>Salespeople can view inventory, customer details, outstanding balances, pricing information, and create orders while keeping accounting data controlled through permissions.",
  },
  {
    question: "Does DataLynkr work with TallyPrime?",
    answer:
      "Yes. DataLynkr works with TallyPrime and helps businesses extend TallyPrime capabilities beyond traditional accounting workflows.<br/><br/>Businesses can continue using TallyPrime while giving sales, operations, and management teams access to real-time business information.",
  },
  {
    question: "Does DataLynkr store my business data?",
    answer:
      "No. DataLynkr is designed to work with your existing Tally environment rather than creating a separate disconnected business database.<br/><br/>Your Tally system remains the source of truth while DataLynkr provides access, workflows, dashboards, and business tools around that information.",
  },
  {
    question: "Can DataLynkr create invoices from mobile?",
    answer:
      "Yes. DataLynkr allows authorized users to create invoices from mobile or web interfaces.<br/><br/>This helps businesses reduce delays by allowing sales teams and field teams to generate invoices closer to the point of transaction while maintaining connection with the Tally workflow.",
  },
  {
    question: "Can customers place orders online through Tally?",
    answer:
      "Yes. With DataLynkr, businesses can provide customers with a digital ordering experience connected with their Tally data.<br/><br/>Customers can browse products, place orders, and access relevant information while businesses maintain centralized control through their existing Tally system.",
  },
  {
    question: "Can DataLynkr work offline?",
    answer:
      "Yes. DataLynkr supports offline workflows that allow users to continue working even when internet connectivity is unavailable.<br/><br/>Transactions created during offline periods can synchronize automatically once connectivity is restored.",
  },
  {
    question: "Can DataLynkr replace Excel reports?",
    answer:
      "Yes, for many business reporting needs.<br/><br/>Instead of manually exporting data from Tally into Excel, businesses can create live reports and dashboards using current Tally information. This reduces manual work and helps teams make decisions using updated data.",
  },
  {
    question: "Can I create custom reports from Tally data?",
    answer:
      "Yes. DataLynkr allows businesses to create customized reports using live Tally data.<br/><br/>Users can build reports based on their business requirements instead of depending on repeated Excel exports or manually prepared reports.",
  },
  {
    question: "How does DataLynkr help distributors?",
    answer:
      "DataLynkr helps distributors improve sales and operations by giving teams real-time access to inventory, customer information, orders, payments, and reports.<br/><br/>Distributors can provide customers with digital ordering options, reduce manual order processing, improve sales visibility, and respond faster to customer requirements.",
  },
  {
    question: "How does DataLynkr help manufacturers?",
    answer:
      "DataLynkr helps manufacturers connect production, sales, inventory, and management teams with the information they need.<br/><br/>Manufacturers can improve visibility into stock levels, sales demand, orders, approvals, and business performance while continuing to use Tally as their core ERP.",
  },
  {
    question: "How does DataLynkr improve sales efficiency?",
    answer:
      "DataLynkr improves sales efficiency by reducing dependency on the office for information.<br/><br/>Sales teams can instantly check product availability, customer history, outstanding balances, and create orders while interacting with customers.<br/><br/>This helps salespeople respond faster, reduce delays, and close more opportunities.",
  },
  {
    question: "How much does DataLynkr cost?",
    answer:
      "DataLynkr pricing starts at ₹3,600/year per user (₹300/month equivalent).<br/><br/>Pricing depends on the number of users and the features required by your business. Businesses can choose yearly or monthly billing based on their sales, reporting, workflow, and customer access requirements.",
  },
  {
    question: "What problem does DataLynkr solve?",
    answer:
      "DataLynkr solves the problem of businesses having valuable information trapped inside Tally. It enables teams outside accounts to access inventory, customer balances, orders, invoices, reports, approvals, and dashboards without depending on the finance team for every update.",
  },
  {
    question: "Who is DataLynkr built for?",
    answer:
      "DataLynkr is built for businesses using Tally ERP that want their sales, operations, management, and customers to access business information in real time.<br/><br/>It is especially useful for:<br/>- Manufacturers<br/>- Distributors<br/>- Wholesalers<br/>- Retail businesses<br/>- Trading companies<br/>- Service businesses",
  },
  {
    question: "Can DataLynkr replace Tally?",
    answer:
      "No. DataLynkr works alongside Tally. Tally remains the accounting and ERP system while DataLynkr extends its capabilities by making information accessible to other teams.",
  },
  {
    question: "How does DataLynkr connect with Tally?",
    answer:
      "DataLynkr connects with Tally and allows businesses to access and manage live Tally information through mobile and browser interfaces.",
  },
  {
    question: "Does DataLynkr require changing my Tally workflow?",
    answer:
      "No. Businesses can continue using Tally as they do today while giving other teams access to the information they need.",
  },
  {
    question: "Does DataLynkr store my Tally data?",
    answer:
      "No. DataLynkr is designed so that business information remains connected to the customer's Tally environment instead of being stored as a separate database on DataLynkr servers.",
  },
  {
    question: "Is DataLynkr a cloud ERP?",
    answer:
      "DataLynkr is not a replacement ERP. It is a real-time business access layer that extends your existing Tally ERP capabilities.",
  },
  {
    question: "Can I access Tally data from mobile?",
    answer:
      "Yes. DataLynkr allows users to access Tally-based business information through mobile and browser access.",
  },
];

export const PRICING_FAQ: FaqItem[] = [
  {
    question: "What are the pricing options?",
    answer:
      "DataLynkr only offers Yearly subscriptions plans based on user count and feature requirements.",
  },
  {
    question: "Are there any setup fees?",
    answer:
      "Basic setups have no additional fee, while custom integrations or dedicated deployments may involve configuration charges.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes. You can upgrade DataLynkr anytime. Contact sales team for downgrade, or add/remove user licenses as your business requirements change.",
  },
];

export const SUPPORT_FAQ: FaqItem[] = [
  {
    question: "Where is my Tally data stored?",
    answer:
      "Your data remains on your local Tally server. DataLynkr only retrieves and caches the necessary information to serve your users securely.",
  },
  {
    question: "Is my data secure during transmission?",
    answer:
      "Yes. All data transmitted between your Tally server, DataLynkr servers, and user devices is encrypted using industry-standard protocols.",
  },
  {
    question: "What happens if my server goes offline?",
    answer:
      "If your local Tally server goes offline, users can still access cached data and perform offline actions, but live updates will pause until connectivity is restored.",
  },
];

/** Offer price validity — end of next calendar year, rolled forward automatically. */
export function pricingOfferValidUntil(): string {
  return `${new Date().getFullYear() + 1}-12-31`;
}

export function pricingOffersJsonLd(
  plans: Array<{
    name: string;
    description: string;
    monthly_price: string;
    yearly_price: string;
    min_users: number;
    max_users: number;
  }>,
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
      price: plan.yearly_price,
      priceCurrency: "INR",
      priceValidUntil: pricingOfferValidUntil(),
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/pricing"),
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: plan.yearly_price,
        priceCurrency: "INR",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: "1",
          unitCode: "ANN",
        },
      },
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
        itemListElement: [
          {
            "@type": "HowToDirection",
            text: "Visit the DataLynkr contact page or email sales@datalynkr.com to request a demo.",
          },
          {
            "@type": "HowToDirection",
            text: "Complete registration to start your 14-day free trial.",
          },
        ],
        url: absoluteUrl("/contact"),
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Install the Tally connector",
        itemListElement: [
          {
            "@type": "HowToDirection",
            text: "Download the DataLynkr connector on the primary PC where Tally ERP or TallyPrime is installed.",
          },
          {
            "@type": "HowToDirection",
            text: "Run the installer and verify the secure encrypted tunnel status displays as connected.",
          },
        ],
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Configure users and permissions",
        itemListElement: [
          {
            "@type": "HowToDirection",
            text: "Open the DataLynkr admin panel and create internal user accounts.",
          },
          {
            "@type": "HowToDirection",
            text: "Assign roles and permissions for sales, operations, and optional customer portal access.",
          },
        ],
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Access Tally from mobile or browser",
        itemListElement: [
          {
            "@type": "HowToDirection",
            text: "Log in to the DataLynkr web portal or mobile app with your assigned credentials.",
          },
          {
            "@type": "HowToDirection",
            text: "Place orders, create invoices, view dashboards, and approve workflows using live Tally data.",
          },
        ],
        url: absoluteUrl("/login"),
      },
    ],
    result: {
      "@type": "Thing",
      name: "Live Tally access from mobile and browser",
      description:
        "Teams can view inventory, customer balances, orders, and reports in real time without direct Tally accounting access.",
    },
  };
}
