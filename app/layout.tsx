import type { Metadata, Viewport } from "next";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import ClientAnimations from "@/components/ClientAnimations";
import LegacyLinkInterceptor from "@/components/LegacyLinkInterceptor";
import { SidebarProvider } from "@/components/SidebarContext";
import { SidebarPanel } from "@/components/Sidebar";
import { absoluteUrl, siteOrigin, basePath } from "@/lib/site";
import { DEFAULT_OG_IMAGE, HOME_DESCRIPTION, HOME_TITLE, webSiteJsonLd } from "@/lib/seo";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  title: {
    default: HOME_TITLE,
    template: "%s | DataLynkr",
  },
  icons: {
    icon: [{ url: `${basePath}/logo.svg`, type: "image/svg+xml" }],
    shortcut: `${basePath}/logo.svg`,
    apple: `${basePath}/logo.svg`,
  },
  description: HOME_DESCRIPTION,
  keywords: [
    // Core Brand & Product
    "DataLynkr",
    "DataLynkr app",
    "DataLynkr mobile",
    "DataLynkr portal",
    "DataLynkr connector",
    
    // Tally Specific Solutions
    "Tally",
    "Tally integration",
    "Tally mobile",
    "Tally ERP",
    "Tally ERP 9",
    "TallyPrime",
    "TallyPrime Edit Log",
    "Tally solutions",
    "Tally ERP mobile",
    "Tally on mobile",
    "Tally cloud",
    "Tally cloud access",
    "Tally remote access",
    "TallyPrime on Android",
    "TallyPrime on iOS",
    "Tally ERP mobile app",
    "Tally iOS app",
    "Tally API connector",
    "Tally Prime mobile app free download",
    "Tally data sync mobile",
    "Tally reports on mobile",
    "Tally custom reports",
    "Tally sales order app",
    "Tally invoicing mobile",
    "Tally outstanding on WhatsApp",
    "share Tally ledger PDF",
    "Tally godown management",
    "Tally multi-company mobile",
    "Tally remote entry app",
    "Tally mobile billing software",
    "Tally synchronization tool",
    "secure Tally tunnel",
    "Tally real-time sync",
    "Tally mobile dashboard",
    "Tally online access",
    "Tally virtual office",
    "Tally access anywhere",
    "Tally on phone",
    "Tally remote control",
    "Tally web access",
    "Tally ERP remote connection",
    "Tally mobile view",
    "Tally ERP mobile viewer",
    "Tally application for android",
    "Tally connector tool",
    "Tally remote login",
    "Tally developer API",
    "Tally data extraction",
    
    // Competitor ERP Systems & Alternatives
    "Zoho",
    "Zoho Books",
    "Zoho Books alternative",
    "Zoho Books mobile app",
    "Zoho Books client portal",
    "Zoho Books vs Tally",
    "Zoho Books sales orders",
    "Zoho Books billing app",
    "Busy ERP",
    "Busy ERP mobile",
    "Busy ERP cloud",
    "Busy accounting software",
    "Busy ERP sales app",
    "Marg ERP",
    "Marg ERP mobile app",
    "Marg ERP billing",
    "Marg ERP vs Tally",
    "Marg mobile order app",
    "SAP",
    "SAP Business One",
    "SAP Business One mobile",
    "SAP B1 extension",
    "SAP Business One cloud",
    "SAP mobile app for sales",
    "SAP B1 sales order app",
    "SAP Business One connector",
    "Oracle NetSuite",
    "Oracle NetSuite mobile",
    "Odoo",
    "Odoo mobile app",
    "QuickBooks online alternative",
    "QuickBooks mobile app",
    "Vyapar app for PC",
    "Vyapar mobile billing",
    "Vyapar billing software",
    "Vyapar alternative",
    "Marg billing software",
    "Tally vs Busy",
    "Tally vs Marg",
    "Tally vs Zoho",
    "Tally vs SAP Business One",
    "ERP comparison India",
    "cloud ERP alternatives",
    "SME ERP comparison",
    "enterprise ERP alternatives",
    "mobile ERP comparison",
    "Tally competitor",
    "top accounting software India",
    "best billing app for distributor",
    "wholesale billing software mobile",
    
    // Generic ERP & Enterprise Solutions
    "ERP solutions",
    "ERP enterprise solutions",
    "ERP software",
    "cloud ERP solutions",
    "mobile ERP software",
    "ERP for small business",
    "ERP for SME",
    "enterprise resource planning",
    "ERP application",
    "ERP web portal",
    "field sales ERP",
    "distributor ERP software",
    "wholesale ERP system",
    "manufacturing ERP mobile",
    "retail ERP software",
    "ERP order management",
    "ERP billing app",
    "ERP inventory system",
    "real-time ERP sync",
    "mobile client portal for ERP",
    "B2B e-commerce ERP integration",
    "ERP workflow automation",
    "transaction approval ERP app",
    "multi-level authorization ERP",
    "ERP reporting tools",
    "ERP dashboard mobile",
    "custom ERP reports",
    "sales force automation ERP",
    "ERP sales tracking",
    "mobile SFA ERP",
    "ERP payments collection",
    "outstanding bill tracker ERP",
    "ERP ledger viewer",
    "offline ERP app",
    "offline sales order app",
    "ERP database sync",
    "secure ERP tunnel",
    "ERP API integration",
    "ERP software India",
    "business management software",
    "enterprise billing portal",
    "B2B ordering portal ERP",
    "custom ERP software development",
    "web based ERP portal",
    "real time ERP connector",
    "cross platform ERP application",
    "cloud database ERP",
    "ERP API builder",
    "ERP system integration services",
    "ERP client login portal",
    "ERP for distributors",
    "ERP for manufacturers",
    
    // Feature & Industry Specific Keywords
    "B-Commerce",
    "sales order management",
    "invoice creation",
    "business dashboards",
    "mobile sales order entry",
    "Bluetooth receipt printing app",
    "on the spot invoicing",
    "real time stock summary",
    "godown inventory tracker",
    "multi warehouse stock app",
    "GST billing software mobile",
    "e-way bill generation mobile",
    "sales rep tracking app",
    "customer self-service app",
    "client ledger statement PDF",
    "WhatsApp ledger sharing",
    "payment collection tracker",
    "field collection app",
    "customer outstanding reminder",
    "authorization workflow tool",
    "credit limit check app",
    "sales approval system",
    "sales performance dashboard",
    "business owner KPI dashboard",
    "sales manager monitoring app",
    "daily ledger reporting",
    "wholesale dealer ordering app",
    "distributor booking app",
    "offline billing software",
    "mobile inventory app",
    "field force automation",
    "sales executive ordering app",
    "order booking app for distributors",
    "B2B sales portal",
    "dealer management app",
    "distributor self service portal",
    "retailer order booking app",
    "Godown stock checking app",
    "ledger outstanding tracking app",
    "sales dispatch management",
    "credit limit warning system",
    "order dispatch tracker",
    "field collections management software",
    "digital ledger copy WhatsApp",
    "payment collection entry app",
    "multi user Tally mobile",
    "Tally remote user license alternative",
    "safe Tally cloud hosting alternative"
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
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: HOME_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
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
    "https://www.linkedin.com/company/it-catalyst-software-india-private-limited/",
    "https://www.youtube.com/@datalynkr",
    "https://www.instagram.com/datalynkr",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Tiny inline script to enable progressive-enhancement scroll animations.
            Without this class, .reveal-on-scroll content stays visible (no blank page). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js-ready')" }} />
        {/* Preload mobile LCP image (first feature section poster, visible immediately on mobile) */}
        <link rel="preload" as="image" href={`${basePath}/resources/poster_images/orders.webp`} fetchPriority="high" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Wix fonts early; Material Symbols deferred (1MB+ icon font) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              function addStyle(href){
                var l=document.createElement("link");
                l.rel="stylesheet";l.href=href;l.media="print";
                l.onload=function(){l.media="all";};
                document.head.appendChild(l);
              }
              addStyle("https://fonts.googleapis.com/css2?family=Wix+Madefor+Display:wght@400..800&family=Wix+Madefor+Text:wght@400..800&display=swap");
              function loadSymbols(){
                addStyle("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");
              }
              if("requestIdleCallback" in window){requestIdleCallback(loadSymbols);}
              else{setTimeout(loadSymbols,1500);}
            })();`,
          }}
        />
        <link rel="shortcut icon" href={`${basePath}/logo.svg`} type="image/svg+xml" />
        <link rel="icon" href={`${basePath}/logo.svg`} type="image/svg+xml" />
        {/* When JS is disabled, override all animation-gated visibility so content is shown */}
        <noscript>
          <style>{`
            .reveal-on-scroll { opacity: 1 !important; }
            .reveal-on-scroll.reveal-fade-up,
            .reveal-on-scroll.reveal-fade-in-left,
            .reveal-on-scroll.reveal-fade-in-right,
            .reveal-on-scroll.reveal-scale-in {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
          `}</style>
          <link
            href="https://fonts.googleapis.com/css2?family=Wix+Madefor+Display:wght@400..800&family=Wix+Madefor+Text:wght@400..800&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
            rel="stylesheet"
          />
        </noscript>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={webSiteJsonLd()} />
      </head>
      <body className="bg-white text-on-surface antialiased overflow-x-hidden">
        <SidebarProvider>
          <SidebarPanel />
          <LegacyLinkInterceptor />
          <ClientAnimations />
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
