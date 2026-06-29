import ContactClient from "./ContactClient";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, buildPageMetadata, contactPageJsonLd } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Contact Us",
  description:
    "Contact DataLynkr for demos, Tally integration, and business automation solutions.",
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
