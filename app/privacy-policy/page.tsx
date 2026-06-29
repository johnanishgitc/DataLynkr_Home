import Link from "next/link";
import { LogoSvg } from "@/components/LogoSvg";
import JsonLd from "@/components/JsonLd";
import SeoBreadcrumbs from "@/components/SeoBreadcrumbs";
import { breadcrumbJsonLd, buildPageMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "Review the DataLynkr Privacy Policy. Learn how we collect, use, store, and safeguard your personal information and business data.",
  path: "/privacy-policy",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy-policy" },
];

export default function PrivacyPage() {
  return (
    <div className="bg-[#f7f9fc] text-on-surface antialiased overflow-x-hidden min-h-screen flex flex-col pt-16">
      <JsonLd
        data={webPageJsonLd({
          path: "/privacy-policy",
          name: "DataLynkr Privacy Policy",
          description:
            "How DataLynkr collects, uses, and protects personal information and business data.",
        })}
      />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      {/* Header Navbar */}
      <header className="w-full bg-white shadow-sm border-b border-zinc-200 py-3 md:py-4 px-4 md:px-6 lg:px-12 flex items-center justify-between z-50 fixed top-0 left-0">
        <Link
          href="/"
          className="flex items-center gap-3 transition-transform hover:scale-105 active:scale-95"
        >
          <div className="h-10 w-auto">
            <LogoSvg className="h-10 w-auto" />
          </div>
          <span className="text-3xl font-medium tracking-tighter text-black headline-font">
            DataLynkr
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden sm:inline-block text-[14px] font-bold text-zinc-600 hover:text-primary transition-colors"
          >
            Login
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center bg-primary hover:bg-[#15275e] text-white rounded-full transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary w-10 h-10 group"
            title="Return Home"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
              home
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content Box */}
      <main className="flex-grow w-full max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 flex justify-center animate-fade-in relative z-10">
        {/* Decorative Glow */}
        <div className="absolute inset-0 bg-primary opacity-[0.03] rounded-3xl blur-3xl w-full h-full -z-10 pointer-events-none"></div>

        <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-black/5 p-6 md:p-10 lg:p-14 w-full prose prose-zinc prose-base md:prose-lg min-w-full">
          <div className="text-center mb-10 pb-10 border-b border-zinc-100">
            <SeoBreadcrumbs items={breadcrumbs} className="justify-center mb-6" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold headline-font text-zinc-900 mb-2 m-0 mt-0">
              Privacy Policy
            </h1>
            <p className="text-zinc-500 font-medium m-0">Last Updated: February 23, 2026</p>
          </div>

          <h2>1. Introduction</h2>
          <p>
            Welcome to <strong>DataLynkr</strong> (by IT Catalyst Software (I) Pvt Ltd). We are
            committed to protecting your privacy and ensuring the security of your personal
            information. This Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you use our services.
          </p>
          <p>
            By using our services, you agree to the collection and use of information in
            accordance with this policy. If you do not agree with our policies and practices,
            please do not use our services.
          </p>

          <h2>2. Information We Collect</h2>

          <h3>2.1 Personal Information</h3>
          <p>We may collect the following types of personal information:</p>
          <ul>
            <li>Name and contact information (email address, phone number)</li>
            <li>Account credentials and authentication information</li>
            <li>Company information and business details</li>
            <li>Payment and billing information</li>
            <li>Usage data and preferences</li>
          </ul>

          <h3>2.2 Business Data</h3>
          <p>
            As part of our Tally integration services, we may process business data including but
            not limited to:
          </p>
          <ul>
            <li>Financial records and transactions</li>
            <li>Customer and vendor information</li>
            <li>Inventory and stock data</li>
            <li>Sales and purchase orders</li>
            <li>Ledger entries and vouchers</li>
          </ul>
          <p>
            <strong>The user/subscriber retains ownership of their &quot;Business Data&quot; always.</strong>
          </p>

          <h2>3. How We Use Your Information</h2>
          <p>We use the collected information for the following purposes:</p>
          <ul>
            <li>To provide, maintain, and improve our services</li>
            <li>To process transactions and manage your account</li>
            <li>To communicate with you about your account and our services</li>
            <li>To provide customer support and respond to inquiries</li>
            <li>To detect, prevent, and address technical issues and security threats</li>
            <li>To comply with legal obligations and enforce our terms</li>
            <li>To send you updates, newsletters, and promotional materials (with your consent)</li>
          </ul>

          <h2>4. Data Storage and Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your
            personal information against unauthorized access, alteration, disclosure, or
            destruction. However, no method of transmission over the Internet or electronic
            storage is 100% secure.
          </p>
          <p>
            Your data is stored securely and is only accessible to authorized personnel who need
            access to perform their duties. We use encryption, secure servers, and other
            industry-standard security practices (like &quot;OAuth&quot; or &quot;Encrypted API Tunnels&quot;) to
            safeguard your information.
          </p>
          <p>We also maintain Audit logs of all users access with details and is available to you through datalynkr.</p>

          <h2>5. Data Sharing and Disclosure</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may
            share your information only in the following circumstances:
          </p>
          <ul>
            <li>With your explicit consent</li>
            <li>To comply with legal obligations or respond to lawful requests</li>
            <li>To protect our rights, privacy, safety, or property</li>
            <li>
              With service providers who assist us in operating our services (under strict
              confidentiality agreements)
            </li>
            <li>In connection with a business transfer, merger, or acquisition</li>
          </ul>

          <h2>6. Your Rights and Choices</h2>
          <p>You have the following rights regarding your personal information:</p>
          <ul>
            <li>
              <strong>Access:</strong> Request access to your personal data
            </li>
            <li>
              <strong>Correction:</strong> Request correction of inaccurate or incomplete data
            </li>
            <li>
              <strong>Deletion:</strong> Request deletion of your personal data
            </li>
            <li>
              <strong>Objection:</strong> Object to processing of your personal data
            </li>
            <li>
              <strong>Portability:</strong> Request transfer of your data to another service
            </li>
            <li>
              <strong>Withdrawal:</strong> Withdraw consent where processing is based on consent
            </li>
          </ul>
          <p>To exercise these rights, please contact us using the information provided in the &quot;Contact Us&quot; section below.</p>

          <h2>7. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our service and
            store certain information. You can instruct your browser to refuse all cookies or to
            indicate when a cookie is being sent. However, if you do not accept cookies, you may
            not be able to use some portions of our service.
          </p>

          <h2>8. Data Retention</h2>
          <p>
            We retain your personal information only for as long as necessary to fulfill the
            purposes outlined in this Privacy Policy, unless a longer retention period is
            required or permitted by law. When we no longer need your information, we will
            securely delete or anonymize it.
          </p>

          <h2>9. Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under the age of 18. We do not
            knowingly collect personal information from children. If you become aware that a
            child has provided us with personal information, please contact us immediately.
          </p>

          <h2>10. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any
            changes by posting the new Privacy Policy on this page and updating the &quot;Last
            Updated&quot; date. You are advised to review this Privacy Policy periodically for any
            changes.
          </p>

          <h2>11. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:</p>
          <div className="bg-zinc-50 border-l-[3px] border-[#1f3a89] p-4 rounded-r-lg mt-4 text-zinc-700 italic">
            <strong>Email:</strong>{" "}
            <a href="mailto:privacy@datalynkr.com" className="text-primary hover:underline">
              privacy@datalynkr.com
            </a>
            <br />
            <strong>Address:</strong>
            <br />
            IT Catalyst Software (I) Pvt Ltd
            <br />
            278, 3rd Floor, MKP Road, Padmanabhanagar,
            <br />
            Bangalore – 560070, India
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-zinc-200 py-8 flex flex-col items-center justify-center gap-4 text-[13px] text-zinc-500 mt-auto shadow-[0_-4px_10px_rgb(0,0,0,0.02)] relative z-10">
        <div className="flex items-center gap-1.5">
          <span>©</span>
          <span className="font-bold">
            <span style={{ color: "#e46b0c" }}>IT</span>{" "}
            <span style={{ color: "black" }}>Catalyst</span>
          </span>
          <span>Software India Pvt Ltd. 2026.</span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/privacy-policy"
            className="text-primary font-bold hover:text-[#15275e] transition-colors pb-1 border-b-[2px] border-primary"
          >
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="text-zinc-500 font-medium hover:text-primary transition-colors">
            Terms of Service
          </Link>
          <Link href="/support" className="text-zinc-500 font-medium hover:text-primary transition-colors">
            Support
          </Link>
        </div>
      </footer>
    </div>
  );
}
