import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with DataLynkr for a free demo, pricing details, partnership queries, or general support questions. Speak to our Tally integration experts today.",
};

export default function ContactPage() {
  return <ContactClient />;
}
