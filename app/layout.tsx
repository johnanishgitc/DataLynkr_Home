import type { Metadata } from "next";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import ClientAnimations from "@/components/ClientAnimations";
import LegacyLinkInterceptor from "@/components/LegacyLinkInterceptor";
import { absoluteUrl, siteOrigin, basePath } from "@/lib/site";
import { DEFAULT_OG_IMAGE, webSiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  title: {
    default: "DataLynkr - Take Tally Beyond The Finance Team",
    template: "%s | DataLynkr",
  },
  icons: {
    icon: [{ url: `${basePath}/logo.svg`, type: "image/svg+xml" }],
    shortcut: `${basePath}/logo.svg`,
    apple: `${basePath}/logo.svg`,
  },
  description:
    "DataLynkr extends Tally beyond the accounts department. Give your sales teams, managers, operations, and customers secure real-time access to Tally data from mobile and browser — anywhere, anytime.",
  keywords: [
    "DataLynkr",
    "Tally",
    "Tally integration",
    "Tally mobile",
    "Tally ERP",
    "sales order management",
    "invoice creation",
    "B-Commerce",
    "business dashboards",
    "Tally cloud access",
  ],
  authors: [{ name: "IT Catalyst Software India Pvt Ltd" }],
  creator: "IT Catalyst Software India Pvt Ltd",
  publisher: "IT Catalyst Software India Pvt Ltd",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  applicationName: "DataLynkr",
  category: "business",
  manifest: absoluteUrl("/manifest.webmanifest"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteOrigin(),
    siteName: "DataLynkr",
    title: "DataLynkr - Take Tally Beyond The Finance Team",
    description:
      "Empower every team with real-time access to Tally. From orders and approvals to payments, insights, and execution — anywhere, anytime.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "DataLynkr - Take Tally Beyond The Finance Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DataLynkr - Take Tally Beyond The Finance Team",
    description:
      "Extend Tally to your entire organization. Sales orders, invoices, dashboards, and more — from mobile and browser.",
    images: [DEFAULT_OG_IMAGE],
  },
};

// Organization JSON-LD for AEO
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteOrigin()}/#organization`,
  name: "IT Catalyst Software India Pvt Ltd",
  legalName: "IT Catalyst Software India Pvt Ltd",
  brand: {
    "@type": "Brand",
    name: "DataLynkr",
    logo: absoluteUrl("/logo.svg"),
  },
  url: siteOrigin(),
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/logo.svg"),
    caption: "DataLynkr Logo",
  },
  sameAs: [
    "https://play.google.com/store/apps/details?id=com.datalynkr",
    "https://www.linkedin.com/company/it-catalyst",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-9741911520",
      contactType: "sales",
      email: "sales@datalynkr.com",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+91-9741911520",
      contactType: "customer support",
      email: "support@datalynkr.com",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "278, MK, Puttalingiah Rd, Padmanabhanagar",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560070",
    addressCountry: "IN",
  },
  foundingDate: "2000",
  description:
    "DataLynkr extends Tally beyond the accounts department, giving sales teams, managers, operations, customers, and business owners secure real-time access to Tally data from mobile and browser.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Wix+Madefor+Display:wght@400..800&family=Wix+Madefor+Text:wght@400..800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href={`${basePath}/logo.svg`} type="image/svg+xml" />
        <link rel="icon" href={`${basePath}/logo.svg`} type="image/svg+xml" />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={webSiteJsonLd()} />
      </head>
      <body className="bg-white text-on-surface antialiased overflow-x-hidden animate-fade-in">
        <LegacyLinkInterceptor />
        <ClientAnimations />
        {children}
      </body>
    </html>
  );
}
