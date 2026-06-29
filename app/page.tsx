import HomeClient from "./HomeClient";
import JsonLd from "@/components/JsonLd";
import {
  buildPageMetadata,
  faqPageJsonLd,
  HOME_DESCRIPTION,
  HOME_FAQ,
  HOME_TITLE,
  productJsonLd,
  siteNavigationJsonLd,
  softwareApplicationJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
  keywords: [
    "Tally ERP integration",
    "TallyPrime mobile app",
    "real-time Tally browser access",
    "remote Tally access",
    "Tally extension for sales",
    "DataLynkr Tally",
    "Tally dynamic dashboard",
    "remote TallyPrime access",
  ],
});

const homeWebPageJsonLd = webPageJsonLd({
  path: "/",
  name: HOME_TITLE,
  description: HOME_DESCRIPTION,
  speakableSelectors: ["#hero-headline", "#faq"],
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd()} />
      <JsonLd data={productJsonLd()} />
      <JsonLd data={faqPageJsonLd(HOME_FAQ)} />
      <JsonLd data={homeWebPageJsonLd} />
      <JsonLd data={siteNavigationJsonLd()} />
      <HomeClient />
    </>
  );
}
