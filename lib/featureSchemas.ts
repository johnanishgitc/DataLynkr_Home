import { absoluteUrl, siteOrigin } from "@/lib/site";
import type { FaqItem } from "@/lib/seo";

function videoObject(
  slug: string,
  name: string,
  description: string,
  thumbnails: string[],
  videoFile: string,
  duration: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: thumbnails.map((t) => absoluteUrl(t)),
    uploadDate: "2026-06-19T10:00:00Z",
    duration,
    contentUrl: absoluteUrl(videoFile),
    embedUrl: absoluteUrl(`/features/${slug}`),
  };
}

function faqSchema(items: FaqItem[]) {
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

const FEATURE_FAQ: Record<string, FaqItem[]> = {
  "sales-order-management": [
    {
      question: "Can sales orders be approved before syncing to Tally?",
      answer:
        "Yes, DataLynkr allows you to set up multi-level authorization workflows. Sales orders captured on mobile remain pending until approved by managers, after which they are written to Tally in real-time.",
    },
    {
      question: "Does it support real-time stock checks?",
      answer:
        "Yes, sales teams can check current stock levels, across multiple warehouses or companies, directly on their mobile devices before placing an order.",
    },
  ],
  "extend-portal-customers": [
    {
      question: "What can customers do on the DataLynkr portal?",
      answer:
        "Customers can view their account statement, download PDF invoices, check outstanding balances, and even place new orders directly, which syncs with Tally ERP.",
    },
    {
      question: "Is customer data stored on the portal?",
      answer:
        "No, the portal reads directly from your Tally ERP via secure real-time connections. No customer data or transaction logs are stored on DataLynkr servers.",
    },
  ],
  "modern-bcommerce-ordering": [
    {
      question: "How does B2B Ordering sync with Tally?",
      answer:
        "Dealers or customers place orders via the self-service web ordering screen. These orders are written directly to your Tally database as pending sales orders for approval.",
    },
    {
      question: "Can we set custom pricing rules for different dealers?",
      answer:
        "Yes, DataLynkr pulls the price lists, discounts, and customer group rates directly from your Tally ERP, ensuring every dealer sees their designated pricing.",
    },
  ],
  "invoice-creation": [
    {
      question: "Can field teams print invoices immediately?",
      answer:
        "Yes, once an invoice is created, representatives can download a PDF or print it using standard Bluetooth or Wi-Fi printers on the spot.",
    },
    {
      question: "Are tax rates automated?",
      answer:
        "Yes, CGST, SGST, IGST, and other tax parameters are auto-calculated in real time using the tax configuration established inside your Tally ERP.",
    },
  ],
  "authorization-workflows": [
    {
      question: "Can we set custom credit limits for approval triggers?",
      answer:
        "Yes, you can configure approval rules so that transactions exceeding a specific customer's credit limit, or containing custom discounts, are automatically sent for management approval.",
    },
    {
      question: "How are approvers notified?",
      answer:
        "Approvers receive instant notifications on mobile or desktop via email or push notification, allowing them to review and authorize the transaction in seconds.",
    },
  ],
  "daily-ledger-reports": [
    {
      question: "Are the ledger details real-time?",
      answer:
        "Yes, ledger balances and outstanding figures are queried in real time from your Tally ERP, ensuring your field team is always viewing up-to-date account statements.",
    },
    {
      question: "Can sales agents share ledger reports with clients?",
      answer:
        "Yes, agents can download ledger statements or outstanding bills report as a PDF and share them instantly via WhatsApp or Email.",
    },
  ],
  "offline-transactions": [
    {
      question: "What happens if there's no internet in the field?",
      answer:
        "DataLynkr safely saves all entries locally on the mobile device. Once the device detects an internet connection, all saved transactions are synchronized back to your Tally system.",
    },
    {
      question: "Is my data secure when stored offline?",
      answer:
        "Yes, offline data stored locally on mobile devices is encrypted and can only be accessed by authenticated users within the secure DataLynkr app.",
    },
  ],
  "dynamic-dashboards": [
    {
      question: "Can I customize the dashboard metrics?",
      answer:
        "Yes, owners and managers can build custom visualizations, select key KPIs (e.g., total sales, cash flow, outstanding collections), and arrange cards to display the data that matters most.",
    },
    {
      question: "Can we configure different dashboards for different users?",
      answer:
        "Yes, user roles define dashboard views. Sales heads, area managers, and owners can have custom tailored metrics visible to them depending on their authorization levels.",
    },
  ],
  "payments-collections": [
    {
      question: "Can payments be matched against specific pending bills?",
      answer:
        "Yes, collections teams can view outstanding bills for each customer and allocate received payments directly against those specific invoice numbers, syncing instantly to Tally.",
    },
    {
      question: "Does it support logging check details or online payments?",
      answer:
        "Yes, you can log payment method details (Cash, Check, Bank Transfer, UPI reference) and upload receipts directly to complete the entry.",
    },
  ],
  "stock-summary": [
    {
      question: "Does it support multiple godown/warehouse stock tracking?",
      answer:
        "Yes, DataLynkr queries stock details at the godown, branch, or individual company level in real-time, matching the warehouse organization inside your Tally ERP.",
    },
    {
      question: "Can users see item pictures or batch details?",
      answer:
        "Yes, batch numbers, manufacturing/expiry dates, and custom item details configured in Tally are accessible to sales agents immediately.",
    },
  ],
  "custom-reports": [
    {
      question: "Can we generate pivot tables from Tally data?",
      answer:
        "Yes, DataLynkr marries the power of Excel pivot tables with live Tally data, allowing users to drill down, slice, and filter reports to analyze business operations.",
    },
    {
      question: "Can reports be scheduled for auto-export?",
      answer:
        "Yes, administrators can configure automated exports or save custom reporting templates for regular business performance analysis.",
    },
  ],
};

const FEATURE_VIDEOS: Record<
  string,
  { name: string; description: string; thumbnails: string[]; videoFile: string; duration: string }
> = {
  "sales-order-management": {
    name: "DataLynkr - Sales Order Management Demo",
    description:
      "Watch how DataLynkr's Sales Order Management feature enables your field sales team to place orders directly into Tally, verify real-time stock levels, and check customer credit status on mobile or browser.",
    thumbnails: ["/resources/poster_images/orders.webp", "/resources/poster_images/orders_laptop.webp"],
    videoFile: "/resources/videos/orders.mp4",
    duration: "PT0M45S",
  },
  "extend-portal-customers": {
    name: "DataLynkr - Customer Portal Demo",
    description:
      "See how you can extend a secure customer portal with DataLynkr, allowing customers to view transaction history, download invoices, and check outstanding balances in real-time.",
    thumbnails: ["/resources/poster_images/extendportal.webp"],
    videoFile: "/resources/videos/extendportal.mp4",
    duration: "PT0M40S",
  },
  "modern-bcommerce-ordering": {
    name: "DataLynkr - B2B E-Commerce Ordering Demo",
    description:
      "Watch how DataLynkr provides a modern B-Commerce ordering screen for dealers and retail customers, syncing orders directly with Tally ERP.",
    thumbnails: ["/resources/poster_images/bcomm.webp", "/resources/poster_images/bcomm_laptop.webp"],
    videoFile: "/resources/videos/bcomm.mp4",
    duration: "PT0M50S",
  },
  "invoice-creation": {
    name: "DataLynkr - Invoice Creation Demo",
    description:
      "Learn how to create invoice drafts and print invoices directly from the field with DataLynkr, syncing transactions with Tally instantly.",
    thumbnails: ["/resources/poster_images/invoice.webp", "/resources/poster_images/invoice_laptop.webp"],
    videoFile: "/resources/videos/invoice.mp4",
    duration: "PT0M45S",
  },
  "authorization-workflows": {
    name: "DataLynkr - Authorization and Approval Workflows Demo",
    description:
      "Watch how managers and accounting teams approve or reject transactions entered by field sales staff in real-time before they sync with Tally ERP.",
    thumbnails: ["/resources/poster_images/approvals.webp", "/resources/poster_images/approvals_laptop.webp"],
    videoFile: "/resources/videos/approvals.mp4",
    duration: "PT0M45S",
  },
  "daily-ledger-reports": {
    name: "DataLynkr - Daily Ledger Reports Demo",
    description:
      "A walkthrough of Daily Ledger Reports in DataLynkr, enabling sales teams and managers to track ledgers and outstanding balances on the go.",
    thumbnails: ["/resources/poster_images/ledgers.webp", "/resources/poster_images/ledgers_laptop.webp"],
    videoFile: "/resources/videos/ledgers.mp4",
    duration: "PT0M40S",
  },
  "offline-transactions": {
    name: "DataLynkr - Offline Transactions Demo",
    description:
      "Watch how DataLynkr supports offline transaction entry, allowing sales teams to capture orders and customer details without internet access, syncing later with Tally.",
    thumbnails: ["/resources/poster_images/offline.webp", "/resources/poster_images/offline_laptop.webp"],
    videoFile: "/resources/videos/offline.mp4",
    duration: "PT0M50S",
  },
  "dynamic-dashboards": {
    name: "DataLynkr - Dynamic Business Dashboards Demo",
    description:
      "See how business owners can monitor cash flow, sales trends, and key performance indicators in real-time with DataLynkr's custom dashboards.",
    thumbnails: ["/resources/poster_images/dash.webp"],
    videoFile: "/resources/videos/dash.mp4",
    duration: "PT0M45S",
  },
  "payments-collections": {
    name: "DataLynkr - Payments and Collections Demo",
    description:
      "Demonstration of payments collection tracking in DataLynkr, helping collections teams log payments and update Tally outstanding bills in real-time.",
    thumbnails: [
      "/resources/poster_images/collections.webp",
      "/resources/poster_images/collections_laptop.webp",
    ],
    videoFile: "/resources/videos/collections.mp4",
    duration: "PT0M45S",
  },
  "stock-summary": {
    name: "DataLynkr - Stock Summary and Inventory Visibility Demo",
    description:
      "See how DataLynkr gives your sales and operations teams real-time visibility into Tally stock levels across multiple locations and companies.",
    thumbnails: ["/resources/poster_images/stock.webp", "/resources/poster_images/stock_laptop.webp"],
    videoFile: "/resources/videos/stock.mp4",
    duration: "PT0M40S",
  },
  "custom-reports": {
    name: "DataLynkr - Custom Reports Demo",
    description:
      "See how DataLynkr lets you build custom reports and pivot-style views from live Tally data without Excel exports.",
    thumbnails: ["/resources/poster_images/dealer_growth.webp"],
    videoFile: "/resources/videos/dealer_growth.mp4",
    duration: "PT0M45S",
  },
};

export const FEATURE_OG_IMAGES: Record<string, string> = {
  "sales-order-management": "/resources/poster_images/orders_laptop.webp",
  "extend-portal-customers": "/resources/poster_images/extendportal.webp",
  "modern-bcommerce-ordering": "/resources/poster_images/bcomm_laptop.webp",
  "invoice-creation": "/resources/poster_images/invoice_laptop.webp",
  "authorization-workflows": "/resources/poster_images/approvals_laptop.webp",
  "daily-ledger-reports": "/resources/poster_images/ledgers_laptop.webp",
  "offline-transactions": "/resources/poster_images/offline_laptop.webp",
  "dynamic-dashboards": "/resources/poster_images/dash.webp",
  "payments-collections": "/resources/poster_images/collections_laptop.webp",
  "stock-summary": "/resources/poster_images/stock_laptop.webp",
  "custom-reports": "/resources/poster_images/dealer_growth.webp",
};

export const FEATURE_KEYWORDS: Record<string, string[]> = {
  "sales-order-management": [
    "Tally sales order app",
    "mobile sales order for Tally",
    "Tally ERP order capture",
    "real-time sales order TallyPrime",
    "DataLynkr sales order",
    "Tally remote sales entry",
    "Zoho Books sales orders alternative",
    "Busy ERP order capture app",
    "SAP Business One sales order mobile",
    "Marg ERP sales executive app",
    "mobile order booking app for ERP",
    "enterprise sales order management software",
  ],
  "extend-portal-customers": [
    "Tally customer portal",
    "self-service client portal Tally",
    "download Tally invoices online",
    "Tally customer ledger access",
    "customer outstanding statement Tally",
    "Zoho Books client portal alternative",
    "Busy ERP customer portal",
    "Marg ERP dealer portal",
    "B2B customer login ERP",
    "self service dealer app ERP",
    "enterprise customer portal integration",
  ],
  "modern-bcommerce-ordering": [
    "B2B ordering screen Tally",
    "B2B dealer ordering Tally",
    "distributor order entry Tally",
    "Tally ecommerce sync",
    "Tally digital catalog",
    "distributor ordering system Zoho Books alternative",
    "Busy ERP B2B ordering",
    "Marg ERP dealer catalog app",
    "digital ordering portal for SAP B1",
    "B2B e-commerce platform for ERP",
  ],
  "invoice-creation": [
    "Tally mobile invoicing",
    "print Tally invoices Bluetooth",
    "field invoice creation Tally",
    "on-the-spot invoicing TallyPrime",
    "tax calculation Tally mobile",
    "Zoho Books mobile invoicing alternative",
    "Busy ERP billing software mobile",
    "Marg ERP billing app comparison",
    "Bluetooth billing for ERP",
    "field force invoicing app ERP",
  ],
  "authorization-workflows": [
    "Tally transaction approvals",
    "multi-level authorization Tally ERP",
    "remote Tally approval workflow",
    "Tally credit limit controls",
    "Tally transaction check",
    "SAP Business One transaction approvals mobile",
    "credit limit control app Zoho Books",
    "multi level workflows Busy ERP",
    "remote ERP approval tool",
    "enterprise transaction approval software",
  ],
  "daily-ledger-reports": [
    "Tally ledger balance mobile",
    "live outstanding bills Tally",
    "share Tally ledger WhatsApp",
    "Tally outstanding reports app",
    "Tally ledger statement PDF",
    "ledger statement PDF Zoho Books alternative",
    "share client ledger WhatsApp Busy ERP",
    "outstanding bills Marg ERP mobile",
    "remote ledger check SAP B1",
    "daily ERP ledger reports",
  ],
  "offline-transactions": [
    "Tally offline order entry",
    "offline Tally app",
    "sync offline transactions Tally",
    "no-internet Tally orders",
    "Tally field offline sync",
    "offline billing app Zoho Books alternative",
    "Marg ERP offline sales",
    "Busy ERP offline synchronizer",
    "offline sales order book app",
    "no connection ERP sync software",
  ],
  "dynamic-dashboards": [
    "Tally business dashboard",
    "live Tally KPIs",
    "Tally cash flow monitor",
    "real-time Tally owner report",
    "Tally sales trend graph",
    "business dashboard Zoho Books vs Tally",
    "live KPIs SAP Business One alternative",
    "owner dashboard Busy ERP Marg",
    "mobile ERP graphs analytics",
    "enterprise BI dashboard mobile",
  ],
  "payments-collections": [
    "Tally payment collections app",
    "match outstanding bills Tally",
    "log customer payments Tally",
    "collections tracking TallyERP",
    "Tally receipt entry mobile",
    "payment collections app Zoho Books alternative",
    "Busy ERP collection entry app",
    "Marg ERP outstanding tracking",
    "receipt entry mobile app ERP",
    "field payments tracking software",
  ],
  "stock-summary": [
    "Tally live inventory app",
    "multi-godown stock tracker",
    "real-time stock check Tally",
    "Tally batch tracking mobile",
    "Tally warehouse stock summary",
    "godown stock tracker Zoho Books alternative",
    "multi godown warehouse Busy ERP",
    "Marg ERP inventory checking app",
    "live warehouse summary SAP B1",
    "real-time ERP stock check app",
  ],
  "custom-reports": [
    "Tally custom reports builder",
    "live Tally pivot tables",
    "Tally reports on mobile",
    "business intelligence for Tally",
    "Tally spreadsheet analytics",
    "live pivot tables Marg ERP Busy ERP alternative",
    "SAP Business One spreadsheet analytics",
    "business intelligence reports Zoho Books app",
    "custom reporting builder ERP",
    "ad-hoc ERP reports on mobile",
  ],
};

export function getFeatureKeywords(slug: string): string[] {
  return FEATURE_KEYWORDS[slug] ?? [];
}

export function getFeatureFaqItems(slug: string): FaqItem[] {
  return FEATURE_FAQ[slug] ?? [];
}

export function getFeatureSchemas(slug: string): {
  video?: Record<string, unknown>;
  faq?: Record<string, unknown>;
} {
  const faqItems = FEATURE_FAQ[slug];
  const videoMeta = FEATURE_VIDEOS[slug];
  const result: { video?: Record<string, unknown>; faq?: Record<string, unknown> } = {};

  if (videoMeta) {
    result.video = videoObject(
      slug,
      videoMeta.name,
      videoMeta.description,
      videoMeta.thumbnails,
      videoMeta.videoFile,
      videoMeta.duration,
    );
  }

  if (faqItems?.length) {
    result.faq = faqSchema(faqItems);
  }

  return result;
}

export function featureWebPageJsonLd(slug: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(`/features/${slug}`)}#webpage`,
    url: absoluteUrl(`/features/${slug}`),
    name,
    description,
    isPartOf: { "@id": `${siteOrigin()}/#website` },
    about: { "@id": `${siteOrigin()}/#software` },
  };
}

export function featureBreadcrumbJsonLd(slug: string, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteOrigin() },
      { "@type": "ListItem", position: 2, name: name, item: absoluteUrl(`/features/${slug}`) },
    ],
  };
}
