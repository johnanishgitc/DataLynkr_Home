import ContactClient from "./ContactClient";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, buildPageMetadata, contactPageJsonLd } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact DataLynkr - Request a Free Tally App Demo",
  description:
    "Get in touch with DataLynkr for a free demo, pricing details, partnership queries, or general support questions. Speak to our Tally integration experts today.",
  path: "/contact",
  keywords: [
    "contact DataLynkr",
    "book Tally mobile demo",
    "speak to Tally experts",
    "DataLynkr sales query",
    "Tally integration consultancy",
    "DataLynkr support contact",
  ],
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageJsonLd()} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <ContactClient />
    </>
  );
}
