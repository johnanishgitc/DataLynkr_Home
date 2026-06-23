import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { aboutPageJsonLd, breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "About DataLynkr",
  description:
    "DataLynkr is built by a team with over three decades of experience delivering Tally solutions. Learn about our mission to extend Tally ERP beyond the accounts department.",
  path: "/about",
  keywords: [
    "about DataLynkr",
    "IT Catalyst Software India",
    "Tally integration experts",
    "Tally development team",
    "DataLynkr mission",
    "Tally ERP solution developers",
  ],
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutPageJsonLd()} />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <Navbar showHomeIcon={true} />

      <main className="flex-grow bg-white px-6 md:px-8 py-24 md:py-32 pb-20 md:pb-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="headline-font text-4xl md:text-5xl lg:text-6xl font-bold text-[#1f3a89] mb-8 md:mb-12 text-center">
            About DataLynkr
          </h1>

          <div className="font-body text-zinc-700 text-base md:text-lg lg:text-xl leading-relaxed space-y-6 md:space-y-8">
            <p>
              DataLynkr is built by a team with over three decades of experience
              delivering Tally solutions to businesses across industries in India.
            </p>

            <p>
              Over the years, we noticed a clear gap: while Tally is powerful,
              it’s often limited to in-office desktops and mainly used by finance
              teams. Sales, operations, and field teams were disconnected,
              missing real-time information and capabilities they need to act
              quickly and make informed decisions.
            </p>

            <p>
              We created DataLynkr to bridge that gap — to bring Tally
              capabilities to the entire organization, anywhere, anytime. Tally
              is seen as a data entry system, but Datalynkr changes that. By
              providing real-time access, we enable sales teams, managers and
              accounting to work together seamlessly, placing orders directly to
              Tally, improving workflows, accelerating approvals, and ensuring
              every decision is based on the latest information with zero lag.
            </p>

            <p>
              For business owners, DataLynkr offers dynamic dashboards and
              real-time insights, helping them monitor performance and make
              confident, data-driven decisions from anywhere.
            </p>

            <div className="bg-blue-50/50 p-6 md:p-8 rounded-2xl border border-blue-100 my-8 md:my-10 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 text-blue-100 opacity-50 transform rotate-12">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "8rem" }}
                >
                  verified_user
                </span>
              </div>
              <div className="relative z-10">
                <p className="font-medium text-[#1f3a89] mb-0">
                  At the same time, we respect your data. DataLynkr does not store
                  any customer data on our servers. All information is fetched
                  directly from your Tally system, ensuring your data remains
                  secure, private, and under your control.
                </p>
              </div>
            </div>

            <p>
              Our mission is simple: To empower companies hungry for growth by
              enabling every team to contribute, access, and leverage Tally data
              and capabilities — transforming daily activity into insights that
              fuel smarter decisions in the present and for the future.
            </p>

            <p className="font-bold text-white text-lg md:text-xl border-l-4 border-[#f1c74b] pl-4 md:pl-6 py-6 mt-8 md:mt-12 bg-primary rounded-r-lg shadow-lg">
              With DataLynkr, businesses can break free from the limits of Tally
              systems, empower their teams, and improve operational efficiency —
              without compromising data privacy.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
