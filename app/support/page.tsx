import SupportClient from "./SupportClient";
import JsonLd from "@/components/JsonLd";
import {
  breadcrumbJsonLd,
  buildPageMetadata,
  faqPageJsonLd,
  howToConnectTallyJsonLd,
  SUPPORT_FAQ,
  webPageJsonLd,
} from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "DataLynkr Support Center - Troubleshooting & Guides",
  description:
    "Need help with your DataLynkr account, Tally sync, order placement, or permissions? Access support resources, submit a ticket, or contact our team.",
  path: "/support",
  keywords: [
    "DataLynkr support center",
    "troubleshoot Tally sync",
    "install Tally connector",
    "DataLynkr help desk",
    "Tally integration support",
    "DataLynkr dynamic permissions help",
  ],
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Support", path: "/support" },
];

export default function SupportPage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(SUPPORT_FAQ)} />
      <JsonLd data={howToConnectTallyJsonLd()} />
      <JsonLd
        data={webPageJsonLd({
          path: "/support",
          name: "DataLynkr Support",
          description:
            "Get help connecting DataLynkr to Tally, resolving sync issues, and managing your account.",
        })}
      />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <SupportClient />
    </>
  );
}
