import PricingClient from "./PricingClient";
import JsonLd from "@/components/JsonLd";
import { getPricingData } from "@/lib/pricing";
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  faqPageJsonLd,
  PRICING_FAQ,
  pricingOffersJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Pricing",
  description:
    "DataLynkr pricing plans for connecting teams with live Tally data.",
  path: "/pricing",
  keywords: [
    "DataLynkr pricing plans",
    "Tally mobile app subscription",
    "affordable Tally integration cost",
    "DataLynkr free trial",
    "Tally extension pricing",
    "DataLynkr pricing packages",
  ],
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
];

export default async function PricingPage() {
  const { plans, bankDetails } = await getPricingData();
  const offersSchema = pricingOffersJsonLd(plans);

  return (
    <>
      {offersSchema && <JsonLd data={offersSchema} />}
      <JsonLd data={faqPageJsonLd(PRICING_FAQ)} />
      <JsonLd
        data={webPageJsonLd({
          path: "/pricing",
          name: "Pricing",
          description:
            "DataLynkr pricing plans for connecting teams with live Tally data.",
        })}
      />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <PricingClient plans={plans} bankDetails={bankDetails} />
    </>
  );
}
