import HomeClient from "./HomeClient";
import JsonLd from "@/components/JsonLd";
import {
  buildPageMetadata,
  faqPageJsonLd,
  HOME_FAQ,
  productJsonLd,
  softwareApplicationJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "DataLynkr - Take Tally Beyond The Finance Team",
  description:
    "DataLynkr extends Tally beyond the accounts department. Give your sales teams, managers, operations, and customers secure real-time access to Tally data from mobile and browser — anywhere, anytime.",
  path: "/",
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
  name: "DataLynkr - Take Tally Beyond The Finance Team",
  description:
    "DataLynkr extends Tally ERP beyond the accounts department with real-time mobile and browser access for sales, operations, and management teams.",
  speakableSelectors: ["#hero-headline", "#faq"],
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={softwareApplicationJsonLd()} />
      <JsonLd data={productJsonLd()} />
      <JsonLd data={faqPageJsonLd(HOME_FAQ)} />
      <JsonLd data={homeWebPageJsonLd} />
      <HomeClient />
    </>
  );
}
