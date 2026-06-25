import { absoluteUrl, siteOrigin } from "@/lib/site";
import { datalynkrAggregateOffer, faqQuestionsForSchema, type FaqItem } from "@/lib/seo";

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
    creator: { "@id": `${siteOrigin()}/#organization` },
    publisher: {
      "@type": "Organization",
      "@id": `${siteOrigin()}/#organization`,
      name: "DataLynkr",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.svg"),
      },
    },
    about: { "@id": `${siteOrigin()}/#software` },
    isPartOf: { "@id": `${absoluteUrl(`/features/${slug}`)}#feature` },
  };
}

const FEATURE_FAQ: Record<string, FaqItem[]> = {
  "sales-order-management": [
    {
      question: "How do I sync field orders into Tally instantly?",
      answer:
        "With DataLynkr, field sales teams create orders on mobile or browser and those orders synchronize with Tally in real time. Stock levels, customer credit limits, and order status update automatically without manual re-entry in Tally.",
    },
    {
      question:
        "What is the best secure mobile app for field managers to view real-time TallyPrime inventory without accounting access?",
      answer:
        "DataLynkr lets field managers and sales teams view live TallyPrime inventory, customer balances, and pricing through role-based permissions, without granting direct access to the accounting module in Tally.",
    },
    {
      question: "Can sales teams check customer balances?",
      answer:
        "Yes, DataLynkr allows sales teams to view customer details including outstanding balances, credit limits, and historical ledger reports, helping them make informed decisions in the field.",
    },
    {
      question: "Can sales teams check inventory levels?",
      answer:
        "Yes, DataLynkr allows sales teams to view real-time inventory levels including available stock, batch details, and pricing without needing direct Tally access.",
    },
    {
      question: "Can sales teams check pending orders?",
      answer:
        "Yes, DataLynkr allows sales teams to view pending orders, delivery statuses, and pending approvals directly from their mobile or web app.",
    },
    {
      question: "Can sales teams check customer outstanding?",
      answer:
        "Yes, sales teams can view customer balances and outstanding invoices on-the-go to assist in collections.",
    },
    {
      question: "Can sales teams create orders?",
      answer:
        "Yes, DataLynkr allows sales teams to create sales orders from mobile or web interfaces which sync back to Tally automatically.",
    },
    {
      question: "Can sales teams access Tally reports?",
      answer:
        "Yes, managers can configure permissions to grant sales teams access to specific sales and outstanding reports.",
    },
    {
      question: "Can I track order status?",
      answer:
        "Yes, DataLynkr allows businesses to track sales orders from creation to approval, dispatch, and billing, keeping everyone updated.",
    },
    {
      question: "Can sales orders sync with Tally?",
      answer:
        "Yes. Sales orders created in DataLynkr synchronize with Tally to reduce duplicate entry and administrative workload.",
    },
    {
      question: "Can I configure order approvals?",
      answer:
        "Yes. DataLynkr includes approval workflows that allow businesses to require authorization for orders before they are processed in Tally.",
    },
    {
      question: "Can customers place orders?",
      answer:
        "Yes, using our dedicated Customer Portal or B-Commerce Ordering features, which link directly back to Tally.",
    },
  ],
  "extend-portal-customers": [
    {
      question: "What is the Customer Portal?",
      answer:
        "The Customer Portal is a self-service space where customers can log in to view their orders, invoices, ledger balances, and place new orders.",
    },
    {
      question: "Can customers view their ledger statement?",
      answer:
        "Yes. Customers can access and download their account statement and outstanding bill details directly.",
    },
    {
      question: "Can customers track their order status?",
      answer:
        "Yes. Customers can check the real-time status of their orders from placement to invoicing.",
    },
    {
      question: "Can I control what information customers see?",
      answer:
        "Yes. You can configure permissions to determine what data, pricing, and features are visible to each customer.",
    },
  ],
  "modern-bcommerce-ordering": [
    {
      question: "What is B-Commerce ordering?",
      answer:
        "It is a digital ordering tool designed for business-to-business transactions, allowing distributors, retailers, or partners to place orders online.",
    },
    {
      question: "Can I set custom pricing for different customers?",
      answer:
        "Yes. DataLynkr supports Tally price lists and rates, showing customers their specific pricing.",
    },
    {
      question: "Does it support minimum order quantities?",
      answer:
        "Yes. You can configure order rules, including minimum quantities or value, before order submission.",
    },
    {
      question: "Are orders sent to Tally automatically?",
      answer:
        "Yes, orders can either sync directly or pass through an approval workflow before entering Tally.",
    },
  ],
  "invoice-creation": [
    {
      question: "Can I create invoices directly from the field?",
      answer:
        "Yes. Authorized users can generate invoices from mobile or web interfaces, reducing billing delays.",
    },
    {
      question: "Does it support print formats?",
      answer:
        "Yes. You can print or share invoices as PDFs via WhatsApp, email, or other channels.",
    },
    {
      question: "How does it sync with Tally?",
      answer:
        "Invoices created in DataLynkr sync with your Tally setup, maintaining consistent accounting records.",
    },
  ],
  "authorization-workflows": [
    {
      question: "How do approval workflows work?",
      answer:
        "You can create rules requiring specific transactions (like high-value orders or discounts) to be approved by managers before being sent to Tally.",
    },
    {
      question: "Can managers approve transactions from mobile?",
      answer:
        "Yes. Managers receive notifications and can review, approve, or reject transactions from their mobile devices or browsers.",
    },
    {
      question: "Can I set up multi-level approvals?",
      answer:
        "Yes. Workflows can be configured with multiple approval levels based on transaction value, department, or user roles.",
    },
    {
      question: "What happens if a transaction is rejected?",
      answer:
        "The transaction is marked as rejected, and the creator is notified with comments for necessary corrections.",
    },
  ],
  "daily-ledger-reports": [
    {
      question: "Can I view party ledger details?",
      answer:
        "Yes. You can search for customers and view their complete ledger transactions, opening balances, and closing balances.",
    },
    {
      question: "How frequently does ledger data update?",
      answer:
        "Ledger data updates in real-time as transactions are recorded in your connected Tally database.",
    },
    {
      question: "Can I share ledger copies?",
      answer:
        "Yes. You can export ledger reports as PDFs or Excel sheets and share them via email or WhatsApp.",
    },
  ],
  "offline-transactions": [
    {
      question: "How does offline mode work?",
      answer:
        "Users can access downloaded customer lists, product details, and create transactions without internet access.",
    },
    {
      question: "When does data synchronize?",
      answer:
        "Transactions created offline are saved locally and synchronized automatically once internet connectivity is restored.",
    },
    {
      question: "Are stock levels accurate offline?",
      answer:
        "Stock levels reflect the last synchronized state. Offline transactions are validated against that data to prevent discrepancies.",
    },
  ],
  "dynamic-dashboards": [
    {
      question: "What kind of dashboards are available?",
      answer:
        "DataLynkr provides visual dashboards for sales performance, inventory levels, collections, and overall business metrics.",
    },
    {
      question: "Is dashboard data real-time?",
      answer:
        "Yes. The dashboards reflect updated information from your connected Tally database.",
    },
    {
      question: "Can I customize dashboards for different users?",
      answer:
        "Yes. Managers, sales teams, and business owners can have access to different dashboards tailored to their roles.",
    },
  ],
  "payments-collections": [
    {
      question: "Can I record payments from the field?",
      answer:
        "Yes. Sales and collection teams can enter payment receipts, cash collections, or bank details directly from the mobile app.",
    },
    {
      question: "Does it support digital payment links?",
      answer:
        "Yes. You can share payment links with customers to collect payments via digital methods.",
    },
    {
      question: "How do collections update in Tally?",
      answer:
        "Recorded receipts sync with Tally to update ledger accounts and clear outstanding balances.",
    },
  ],
  "stock-summary": [
    {
      question: "Can I check live stock levels?",
      answer:
        "Yes. DataLynkr shows current inventory levels, including stock in hand and available quantities across different locations.",
    },
    {
      question: "Does it support multiple godowns or locations?",
      answer:
        "Yes. If you use multiple locations in Tally, DataLynkr displays stock details by godown.",
    },
    {
      question: "Can I see item images and details?",
      answer:
        "Yes. You can add images and descriptions to items to help sales teams and customers identify products.",
    },
  ],
  "custom-reports": [
    {
      question: "What reports can I access?",
      answer:
        "You can view sales reports, customer outstanding statements, stock summaries, ledger transactions, and custom business reports.",
    },
    {
      question: "Can I export reports?",
      answer:
        "Yes. Reports can be exported or shared as PDFs and spreadsheets.",
    },
    {
      question: "Can I view historical Tally data?",
      answer:
        "Yes. You can run reports covering historical periods available in your Tally company.",
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

const FEATURE_SOFTWARE: Record<string, { name: string; featureList: string[] }> = {
  "sales-order-management": {
    name: "Sales Order Management",
    featureList: [
      "Mobile sales order creation",
      "Real-time Tally synchronization",
      "Stock visibility",
      "Customer credit limit checks",
      "Order status tracking",
    ],
  },
  "extend-portal-customers": {
    name: "Customer Portal",
    featureList: [
      "Self-service customer login",
      "Ledger statement access",
      "Order status tracking",
      "Configurable customer permissions",
    ],
  },
  "modern-bcommerce-ordering": {
    name: "B-Commerce Ordering",
    featureList: [
      "B2B digital ordering screen",
      "Tally price list support",
      "Minimum order quantity rules",
      "Automatic Tally order sync",
    ],
  },
  "invoice-creation": {
    name: "Invoice Creation",
    featureList: [
      "Field invoice creation",
      "PDF print and share",
      "Real-time Tally synchronization",
    ],
  },
  "authorization-workflows": {
    name: "Authorization Workflows",
    featureList: [
      "Configurable approval rules",
      "Mobile manager approvals",
      "Multi-level authorization",
      "Rejection notifications",
    ],
  },
  "daily-ledger-reports": {
    name: "Daily Ledger Reports",
    featureList: [
      "Party ledger details",
      "Real-time balance updates",
      "PDF and Excel export",
    ],
  },
  "offline-transactions": {
    name: "Offline Transactions",
    featureList: [
      "Offline order entry",
      "Automatic sync on reconnect",
      "Cached stock validation",
    ],
  },
  "dynamic-dashboards": {
    name: "Dynamic Dashboards",
    featureList: [
      "Sales and inventory KPIs",
      "Real-time Tally data",
      "Role-based dashboard access",
    ],
  },
  "payments-collections": {
    name: "Payments and Collections",
    featureList: [
      "Field payment receipt entry",
      "Digital payment links",
      "Tally outstanding bill updates",
    ],
  },
  "stock-summary": {
    name: "Stock Summary",
    featureList: [
      "Live inventory levels",
      "Multi-godown stock visibility",
      "Item images and details",
    ],
  },
  "custom-reports": {
    name: "Custom Reports",
    featureList: [
      "Custom report builder",
      "Live pivot-style views",
      "PDF and spreadsheet export",
    ],
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

const FEATURE_FAQ_SUBTITLES: Record<string, string> = {
  "authorization-workflows": "Got questions about Approval Workflows? We've got answers.",
  "custom-reports": "Got questions about Reports? We've got answers.",
  "daily-ledger-reports": "Got questions about Daily Ledger Reports? We've got answers.",
  "dynamic-dashboards": "Got questions about Dashboards & Analytics? We've got answers.",
  "extend-portal-customers": "Got questions about the Customer Portal? We've got answers.",
  "invoice-creation": "Got questions about Invoice Creation? We've got answers.",
  "modern-bcommerce-ordering": "Got questions about B-Commerce Ordering? We've got answers.",
  "offline-transactions": "Got questions about Offline Mode? We've got answers.",
  "payments-collections": "Got questions about Payments & Collections? We've got answers.",
  "sales-order-management": "Got questions about Sales Team & Order Management? We've got answers.",
  "stock-summary": "Got questions about Inventory Management? We've got answers.",
};

export function getFeatureKeywords(slug: string): string[] {
  return FEATURE_KEYWORDS[slug] ?? [];
}

export function getFeatureFaqItems(slug: string): FaqItem[] {
  return FEATURE_FAQ[slug] ?? [];
}

export function getFeatureFaqSubtitle(slug: string): string {
  return FEATURE_FAQ_SUBTITLES[slug] ?? "";
}

export function featureSoftwareJsonLd(slug: string, description: string) {
  const meta = FEATURE_SOFTWARE[slug];
  if (!meta) return null;

  const ogImage = FEATURE_OG_IMAGES[slug] ?? "/resources/poster_images/orders_laptop.webp";
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${absoluteUrl(`/features/${slug}`)}#feature`,
    name: `DataLynkr ${meta.name}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Windows, Web, Android, iOS",
    description,
    url: absoluteUrl(`/features/${slug}`),
    isPartOf: { "@id": `${siteOrigin()}/#software` },
    author: { "@id": `${siteOrigin()}/#organization` },
    featureList: meta.featureList,
    keywords: FEATURE_KEYWORDS[slug],
    offers: datalynkrAggregateOffer(),
    screenshot: absoluteUrl(ogImage),
  };
}

export function getFeatureSchemas(slug: string, description: string) {
  const videoMeta = FEATURE_VIDEOS[slug];
  const result: {
    video?: Record<string, unknown>;
    softwareFeature?: Record<string, unknown>;
  } = {};

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

  const softwareFeature = featureSoftwareJsonLd(slug, description);
  if (softwareFeature) {
    result.softwareFeature = softwareFeature;
  }

  return result;
}

export function featureWebPageJsonLd(
  slug: string,
  name: string,
  description: string,
  faqItems: FaqItem[] = [],
) {
  const ogImage = FEATURE_OG_IMAGES[slug] ?? "/resources/poster_images/orders_laptop.webp";
  const page: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(`/features/${slug}`)}#webpage`,
    url: absoluteUrl(`/features/${slug}`),
    name,
    description,
    isPartOf: { "@id": `${siteOrigin()}/#website` },
    about: { "@id": `${siteOrigin()}/#software` },
    mainEntity: { "@id": `${absoluteUrl(`/features/${slug}`)}#feature` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(ogImage),
    },
  };

  if (faqItems.length > 0) {
    page.hasPart = faqQuestionsForSchema(faqItems);
  }

  return page;
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
