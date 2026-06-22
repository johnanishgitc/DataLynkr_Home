import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FeatureClient from "./FeatureClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { rewriteLegacyHtmlLinks } from "@/lib/rewriteHtmlLinks";
import { basePath } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const AVAILABLE_SLUGS = [
  "authorization-workflows",
  "custom-reports",
  "daily-ledger-reports",
  "dynamic-dashboards",
  "extend-portal-customers",
  "invoice-creation",
  "modern-bcommerce-ordering",
  "offline-transactions",
  "payments-collections",
  "sales-order-management",
  "stock-summary",
];

// Helper to read and extract data from feature HTML files
function getFeatureData(slug: string) {
  if (!AVAILABLE_SLUGS.includes(slug)) {
    return null;
  }

  try {
    const filePath = path.join(process.cwd(), "feature-html", `${slug}.html`);
    const rawHtml = fs.readFileSync(filePath, "utf-8");

    // Clean resource paths (../resources/ -> /Hometest/resources/ in production)
    let html = rawHtml.replace(/\.\.\/resources\//g, `${basePath}/resources/`);

    // Map HTML link references to corresponding Next.js routes
    html = rewriteLegacyHtmlLinks(html);

    // Extract title
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    let title = titleMatch ? titleMatch[1].trim() : "Feature";
    // Strip trailing "| DataLynkr" or similar if present
    title = title.replace(/\s*\|\s*DataLynkr/i, "");

    // Extract description
    const descMatch =
      html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) ||
      html.match(/<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i);
    const description = descMatch ? descMatch[1].trim() : "";

    // Extract styles
    const styles: string[] = [];
    const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    let match;
    while ((match = styleRegex.exec(html)) !== null) {
      styles.push(match[1]);
    }

    // Extract scripts
    const scripts: string[] = [];
    const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
    while ((match = scriptRegex.exec(html)) !== null) {
      const scriptContent = match[1].trim();
      // Only include inline scripts that are not source references or Tailwind configs
      if (
        scriptContent &&
        !match[0].includes("src=") &&
        !match[0].includes('id="tailwind-config"')
      ) {
        scripts.push(scriptContent);
      }
    }

    // Extract unique content between </nav> and <footer> to use unified React Navbar/Footer
    const navCloseIndex = html.indexOf("</nav>");
    const footerOpenIndex = html.indexOf("<footer");
    let body = html;

    if (navCloseIndex !== -1 && footerOpenIndex !== -1) {
      body = html.substring(navCloseIndex + 6, footerOpenIndex);
    } else {
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      body = bodyMatch ? bodyMatch[1] : html;
    }

    // Remove raw script tags from body to prevent script execution issues
    body = body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");

    return {
      title,
      description,
      body,
      styles,
      scripts,
    };
  } catch (error) {
    console.error(`Error loading HTML content for feature slug ${slug}:`, error);
    return null;
  }
}

// Structured schemas for feature pages to maximize SEO and AEO Rich Results
const FEATURE_SCHEMAS: Record<
  string,
  {
    video?: Record<string, unknown>;
    faq?: Record<string, unknown>;
  }
> = {
  "sales-order-management": {
    video: {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "DataLynkr - Sales Order Management Demo",
      "description": "Watch how DataLynkr's Sales Order Management feature enables your field sales team to place orders directly into Tally, verify real-time stock levels, and check customer credit status on mobile or browser.",
      "thumbnailUrl": [
        "https://datalynkr.com/resources/poster_images/orders.webp",
        "https://datalynkr.com/resources/poster_images/orders_laptop.webp"
      ],
      "uploadDate": "2026-06-19T10:00:00Z",
      "duration": "PT0M45S",
      "contentUrl": "https://datalynkr.com/resources/videos/orders.mp4",
      "embedUrl": "https://datalynkr.com/features/sales-order-management"
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can sales orders be approved before syncing to Tally?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, DataLynkr allows you to set up multi-level authorization workflows. Sales orders captured on mobile remain pending until approved by managers, after which they are written to Tally in real-time."
          }
        },
        {
          "@type": "Question",
          "name": "Does it support real-time stock checks?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, sales teams can check current stock levels, across multiple warehouses or companies, directly on their mobile devices before placing an order."
          }
        }
      ]
    }
  },
  "extend-portal-customers": {
    video: {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "DataLynkr - Customer Portal Demo",
      "description": "See how you can extend a secure customer portal with DataLynkr, allowing customers to view transaction history, download invoices, and check outstanding balances in real-time.",
      "thumbnailUrl": [
        "https://datalynkr.com/resources/poster_images/extendportal.webp"
      ],
      "uploadDate": "2026-06-19T10:00:00Z",
      "duration": "PT0M40S",
      "contentUrl": "https://datalynkr.com/resources/videos/extendportal.mp4",
      "embedUrl": "https://datalynkr.com/features/extend-portal-customers"
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What can customers do on the DataLynkr portal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Customers can view their account statement, download PDF invoices, check outstanding balances, and even place new orders directly, which syncs with Tally ERP."
          }
        },
        {
          "@type": "Question",
          "name": "Is customer data stored on the portal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, the portal reads directly from your Tally ERP via secure real-time connections. No customer data or transaction logs are stored on DataLynkr servers."
          }
        }
      ]
    }
  },
  "modern-bcommerce-ordering": {
    video: {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "DataLynkr - B2B E-Commerce Ordering Demo",
      "description": "Watch how DataLynkr provides a modern B-Commerce ordering screen for dealers and retail customers, syncing orders directly with Tally ERP.",
      "thumbnailUrl": [
        "https://datalynkr.com/resources/poster_images/bcomm.webp",
        "https://datalynkr.com/resources/poster_images/bcomm_laptop.webp"
      ],
      "uploadDate": "2026-06-19T10:00:00Z",
      "duration": "PT0M50S",
      "contentUrl": "https://datalynkr.com/resources/videos/bcomm.mp4",
      "embedUrl": "https://datalynkr.com/features/modern-bcommerce-ordering"
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does B2B Ordering sync with Tally?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Dealers or customers place orders via the self-service web ordering screen. These orders are written directly to your Tally database as pending sales orders for approval."
          }
        },
        {
          "@type": "Question",
          "name": "Can we set custom pricing rules for different dealers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, DataLynkr pulls the price lists, discounts, and customer group rates directly from your Tally ERP, ensuring every dealer sees their designated pricing."
          }
        }
      ]
    }
  },
  "invoice-creation": {
    video: {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "DataLynkr - Invoice Creation Demo",
      "description": "Learn how to create invoice drafts and print invoices directly from the field with DataLynkr, syncing transactions with Tally instantly.",
      "thumbnailUrl": [
        "https://datalynkr.com/resources/poster_images/invoice.webp",
        "https://datalynkr.com/resources/poster_images/invoice_laptop.webp"
      ],
      "uploadDate": "2026-06-19T10:00:00Z",
      "duration": "PT0M45S",
      "contentUrl": "https://datalynkr.com/resources/videos/invoice.mp4",
      "embedUrl": "https://datalynkr.com/features/invoice-creation"
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can field teams print invoices immediately?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, once an invoice is created, representatives can download a PDF or print it using standard Bluetooth or Wi-Fi printers on the spot."
          }
        },
        {
          "@type": "Question",
          "name": "Are tax rates automated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, CGST, SGST, IGST, and other tax parameters are auto-calculated in real time using the tax configuration established inside your Tally ERP."
          }
        }
      ]
    }
  },
  "authorization-workflows": {
    video: {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "DataLynkr - Authorization and Approval Workflows Demo",
      "description": "Watch how managers and accounting teams approve or reject transactions entered by field sales staff in real-time before they sync with Tally ERP.",
      "thumbnailUrl": [
        "https://datalynkr.com/resources/poster_images/approvals.webp",
        "https://datalynkr.com/resources/poster_images/approvals_laptop.webp"
      ],
      "uploadDate": "2026-06-19T10:00:00Z",
      "duration": "PT0M45S",
      "contentUrl": "https://datalynkr.com/resources/videos/approvals.mp4",
      "embedUrl": "https://datalynkr.com/features/authorization-workflows"
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can we set custom credit limits for approval triggers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can configure approval rules so that transactions exceeding a specific customer's credit limit, or containing custom discounts, are automatically sent for management approval."
          }
        },
        {
          "@type": "Question",
          "name": "How are approvers notified?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Approvers receive instant notifications on mobile or desktop via email or push notification, allowing them to review and authorize the transaction in seconds."
          }
        }
      ]
    }
  },
  "daily-ledger-reports": {
    video: {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "DataLynkr - Daily Ledger Reports Demo",
      "description": "A walkthrough of Daily Ledger Reports in DataLynkr, enabling sales teams and managers to track ledgers and outstanding balances on the go.",
      "thumbnailUrl": [
        "https://datalynkr.com/resources/poster_images/ledgers.webp",
        "https://datalynkr.com/resources/poster_images/ledgers_laptop.webp"
      ],
      "uploadDate": "2026-06-19T10:00:00Z",
      "duration": "PT0M40S",
      "contentUrl": "https://datalynkr.com/resources/videos/ledgers.mp4",
      "embedUrl": "https://datalynkr.com/features/daily-ledger-reports"
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Are the ledger details real-time?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, ledger balances and outstanding figures are queried in real time from your Tally ERP, ensuring your field team is always viewing up-to-date account statements."
          }
        },
        {
          "@type": "Question",
          "name": "Can sales agents share ledger reports with clients?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, agents can download ledger statements or outstanding bills report as a PDF and share them instantly via WhatsApp or Email."
          }
        }
      ]
    }
  },
  "offline-transactions": {
    video: {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "DataLynkr - Offline Transactions Demo",
      "description": "Watch how DataLynkr supports offline transaction entry, allowing sales teams to capture orders and customer details without internet access, syncing later with Tally.",
      "thumbnailUrl": [
        "https://datalynkr.com/resources/poster_images/offline.webp",
        "https://datalynkr.com/resources/poster_images/offline_laptop.webp"
      ],
      "uploadDate": "2026-06-19T10:00:00Z",
      "duration": "PT0M50S",
      "contentUrl": "https://datalynkr.com/resources/videos/offline.mp4",
      "embedUrl": "https://datalynkr.com/features/offline-transactions"
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What happens if there's no internet in the field?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "DataLynkr safely saves all entries locally on the mobile device. Once the device detects an internet connection, all saved transactions are synchronized back to your Tally system."
          }
        },
        {
          "@type": "Question",
          "name": "Is my data secure when stored offline?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, offline data stored locally on mobile devices is encrypted and can only be accessed by authenticated users within the secure DataLynkr app."
          }
        }
      ]
    }
  },
  "dynamic-dashboards": {
    video: {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "DataLynkr - Dynamic Business Dashboards Demo",
      "description": "See how business owners can monitor cash flow, sales trends, and key performance indicators in real-time with DataLynkr's custom dashboards.",
      "thumbnailUrl": [
        "https://datalynkr.com/resources/poster_images/dash.webp"
      ],
      "uploadDate": "2026-06-19T10:00:00Z",
      "duration": "PT0M45S",
      "contentUrl": "https://datalynkr.com/resources/videos/dash.mp4",
      "embedUrl": "https://datalynkr.com/features/dynamic-dashboards"
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can I customize the dashboard metrics?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, owners and managers can build custom visualizations, select key KPIs (e.g., total sales, cash flow, outstanding collections), and arrange cards to display the data that matters most."
          }
        },
        {
          "@type": "Question",
          "name": "Can we configure different dashboards for different users?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, user roles define dashboard views. Sales heads, area managers, and owners can have custom tailored metrics visible to them depending on their authorization levels."
          }
        }
      ]
    }
  },
  "payments-collections": {
    video: {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "DataLynkr - Payments and Collections Demo",
      "description": "Demonstration of payments collection tracking in DataLynkr, helping collections teams log payments and update Tally outstanding bills in real-time.",
      "thumbnailUrl": [
        "https://datalynkr.com/resources/poster_images/collections.webp",
        "https://datalynkr.com/resources/poster_images/collections_laptop.webp"
      ],
      "uploadDate": "2026-06-19T10:00:00Z",
      "duration": "PT0M45S",
      "contentUrl": "https://datalynkr.com/resources/videos/collections.mp4",
      "embedUrl": "https://datalynkr.com/features/payments-collections"
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can payments be matched against specific pending bills?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, collections teams can view outstanding bills for each customer and allocate received payments directly against those specific invoice numbers, syncing instantly to Tally."
          }
        },
        {
          "@type": "Question",
          "name": "Does it support logging check details or online payments?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, you can log payment method details (Cash, Check, Bank Transfer, UPI reference) and upload receipts directly to complete the entry."
          }
        }
      ]
    }
  },
  "stock-summary": {
    video: {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "name": "DataLynkr - Stock Summary and Inventory Visibility Demo",
      "description": "See how DataLynkr gives your sales and operations teams real-time visibility into Tally stock levels across multiple locations and companies.",
      "thumbnailUrl": [
        "https://datalynkr.com/resources/poster_images/stock.webp",
        "https://datalynkr.com/resources/poster_images/stock_laptop.webp"
      ],
      "uploadDate": "2026-06-19T10:00:00Z",
      "duration": "PT0M40S",
      "contentUrl": "https://datalynkr.com/resources/videos/stock.mp4",
      "embedUrl": "https://datalynkr.com/features/stock-summary"
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Does it support multiple godown/warehouse stock tracking?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, DataLynkr queries stock details at the godown, branch, or individual company level in real-time, matching the warehouse organization inside your Tally ERP."
          }
        },
        {
          "@type": "Question",
          "name": "Can users see item pictures or batch details?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, batch numbers, manufacturing/expiry dates, and custom item details configured in Tally are accessible to sales agents immediately."
          }
        }
      ]
    }
  },
  "custom-reports": {
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can we generate pivot tables from Tally data?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, DataLynkr marries the power of Excel pivot tables with live Tally data, allowing users to drill down, slice, and filter reports to analyze business operations."
          }
        },
        {
          "@type": "Question",
          "name": "Can reports be scheduled for auto-export?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, administrators can configure automated exports or save custom reporting templates for regular business performance analysis."
          }
        }
      ]
    }
  }
};

// Generate static build params for pre-rendering
export async function generateStaticParams() {
  return AVAILABLE_SLUGS.map((slug) => ({ slug }));
}

// Generate dynamic metadata for each page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getFeatureData(slug);
  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
  };
}

export default async function FeaturePage({ params }: PageProps) {
  const { slug } = await params;
  const data = getFeatureData(slug);

  if (!data) {
    notFound();
  }

  const schemas = FEATURE_SCHEMAS[slug] || {};

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {schemas.video && <JsonLd data={schemas.video} />}
      {schemas.faq && <JsonLd data={schemas.faq} />}
      
      <Navbar
        showCenterBrand={false}
        showLoginButton={false}
        showHomeIcon={true}
        hideOnScroll
      />
      {/* Spacer that matches the fixed navbar height (py-4 md:py-6 = ~82px mobile, ~98px desktop) */}
      <div className="feature-page-main flex-grow flex flex-col">
        <FeatureClient
          slug={slug}
          body={data.body}
          styles={data.styles}
          scripts={data.scripts}
        />
      </div>
      <Footer />
    </div>
  );
}
