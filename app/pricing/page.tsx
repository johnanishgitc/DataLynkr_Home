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
    "Explore DataLynkr subscription plans: Silver, Gold, Diamond, and Enterprise. Plans start at ₹300/month per user. 14-day free trial, no credit card required.",
  path: "/pricing",
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
