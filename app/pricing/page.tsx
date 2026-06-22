import type { Metadata } from "next";
import PricingClient from "./PricingClient";
import { getPricingData } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Explore DataLynkr subscription plans: Silver, Gold, Diamond, and Enterprise. Select the pricing plan that matches your team size and Tally integration requirements.",
};

export default async function PricingPage() {
  const { plans, bankDetails } = await getPricingData();

  return <PricingClient plans={plans} bankDetails={bankDetails} />;
}
