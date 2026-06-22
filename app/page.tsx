import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, siteOrigin } from "@/lib/site";

export const metadata: Metadata = {
  title: "DataLynkr - Take Tally Beyond The Finance Team",
  description:
    "DataLynkr extends Tally beyond the accounts department. Give your sales teams, managers, operations, and customers secure real-time access to Tally data from mobile and browser — anywhere, anytime.",
  alternates: { canonical: siteOrigin() },
};

const softwareJsonLd = {
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
  publisher: {
    "@type": "Organization",
    "@id": `${siteOrigin()}/#organization`,
  },
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is DataLynkr?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DataLynkr extends Tally beyond the accounts department, giving sales teams, managers, operations staff, customers, and business owners secure access to live Tally data from anywhere. All information is fetched directly from Tally in real time — no customer data is stored on DataLynkr servers.",
      },
    },
    {
      "@type": "Question",
      name: "Who is DataLynkr for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DataLynkr is built for any business that uses Tally as its ERP. It serves Sales Teams (place orders, create invoices from the field), Managers & Owners (monitor operations, approve transactions), Accounts & Finance Teams (maintain financial control while enabling collaboration), Operations Teams (improve inventory visibility), and Customers (access invoices, outstanding balances, self-service portals). Key industries supported include Manufacturing, Distribution, Wholesale, Retail, Trading, and Services.",
      },
    },
    {
      "@type": "Question",
      name: "How does DataLynkr work with Tally?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DataLynkr connects directly to your Tally ERP in real time via secure encrypted API tunnels. It reads and writes data to Tally without requiring any changes to your existing Tally setup. All data stays within your control — DataLynkr does not store your business data on its servers.",
      },
    },
    {
      "@type": "Question",
      name: "What features does DataLynkr offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DataLynkr offers 11 key features: Sales Order Management, Invoice Creation, Extend a Portal for Your Customers, Modern B-Commerce Ordering, Authorization Workflows, Dynamic Dashboards, Payments & Collections, Stock Summary, Custom Reports, Daily Ledger Reports, and Offline Transactions.",
      },
    },
    {
      "@type": "Question",
      name: "How much does DataLynkr cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DataLynkr plans start at just ₹300/month per user. Visit datalynkr.com/pricing for detailed pricing information.",
      },
    },
    {
      "@type": "Question",
      name: "How does DataLynkr ensure data security and privacy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DataLynkr connects to Tally ERP via secure, end-to-end encrypted API tunnels. We respect your data privacy: no transaction data or customer lists are stored on our servers. All information remains on your local Tally database under your full control.",
      },
    },
    {
      "@type": "Question",
      name: "Can I enter transactions offline using DataLynkr?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, DataLynkr supports Offline Transactions. Your sales team can place orders, view inventory, and log customer interactions without an active internet connection. Once online, the app automatically queues and syncs all offline activities directly to Tally.",
      },
    },
    {
      "@type": "Question",
      name: "Does DataLynkr work with TallyPrime?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, DataLynkr is fully compatible with Tally ERP 9, TallyPrime, and TallyPrime Edit Log. It integrates seamlessly without requiring any modifications to your existing Tally license or database setup.",
      },
    },
    {
      "@type": "Question",
      name: "How do approval and authorization workflows work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DataLynkr has a custom Authorization Workflow feature. Transactions entered by field sales staff can be marked as pending. Managers or accounts teams can review, approve, or reject these transactions from their dashboard before they are permanently written to Tally.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={softwareJsonLd} />
      <JsonLd data={faqJsonLd} />
      <HomeClient />
    </>
  );
}
