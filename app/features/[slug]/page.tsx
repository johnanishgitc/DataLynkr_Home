import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FeatureClient from "./FeatureClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/FaqSection";
import { rewriteLegacyHtmlLinks } from "@/lib/rewriteHtmlLinks";
import { absoluteUrl, basePath } from "@/lib/site";
import {
  FEATURE_OG_IMAGES,
  featureBreadcrumbJsonLd,
  featureWebPageJsonLd,
  getFeatureFaqItems,
  getFeatureKeywords,
  getFeatureSchemas,
} from "@/lib/featureSchemas";
import { buildPageMetadata } from "@/lib/seo";

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

// Generate static build params for pre-rendering
export async function generateStaticParams() {
  return AVAILABLE_SLUGS.map((slug) => ({ slug }));
}

// Generate dynamic metadata for each page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = getFeatureData(slug);
  if (!data) return {};

  return buildPageMetadata({
    title: data.title,
    description: data.description,
    path: `/features/${slug}`,
    ogImage: absoluteUrl(FEATURE_OG_IMAGES[slug] ?? "/resources/poster_images/orders_laptop.webp"),
    keywords: getFeatureKeywords(slug),
  });
}

export default async function FeaturePage({ params }: PageProps) {
  const { slug } = await params;
  const data = getFeatureData(slug);

  if (!data) {
    notFound();
  }

  const schemas = getFeatureSchemas(slug);
  const faqItems = getFeatureFaqItems(slug);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {schemas.video && <JsonLd data={schemas.video} />}
      {schemas.faq && <JsonLd data={schemas.faq} />}
      <JsonLd data={featureWebPageJsonLd(slug, data.title, data.description)} />
      <JsonLd data={featureBreadcrumbJsonLd(slug, data.title)} />

      <Navbar
        showCenterBrand={false}
        showLoginButton={false}
        showHomeIcon={true}
        hideOnScroll
      />
      <div className="feature-page-main flex-grow flex flex-col">
        <FeatureClient
          slug={slug}
          body={data.body}
          styles={data.styles}
          scripts={data.scripts}
        />
        {faqItems.length > 0 && (
          <FaqSection
            items={faqItems}
            title={`${data.title} — FAQ`}
            className="bg-white"
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
