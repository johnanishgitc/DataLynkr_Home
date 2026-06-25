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
  title: "DataLynkr Pricing - Plans from ₹1,800/user/year",
  description:
    "Explore DataLynkr subscription plans: Silver, Gold, Diamond, and Enterprise. Yearly plans from ₹1,800/user/year (₹3,600/year for smaller teams). Monthly billing also available. 14-day free trial, no credit card required.",
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
          name: "DataLynkr Pricing",
          description:
            "Compare DataLynkr subscription plans and choose the tier that fits your team size and Tally integration needs.",
        })}
      />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <PricingClient plans={plans} bankDetails={bankDetails} />
    </>
  );
}
