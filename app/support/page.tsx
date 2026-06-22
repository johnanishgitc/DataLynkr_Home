import type { Metadata } from "next";
import SupportClient from "./SupportClient";

export const metadata: Metadata = {
  title: "Get Support",
  description:
    "Need help with your DataLynkr account, order placement, sync issues, or permissions? Access our support resources, submit a ticket, or contact our support team.",
};

export default function SupportPage() {
  return <SupportClient />;
}
