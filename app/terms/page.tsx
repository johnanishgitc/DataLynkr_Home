import Link from "next/link";
import { LogoSvg } from "@/components/LogoSvg";
import JsonLd from "@/components/JsonLd";
import SeoBreadcrumbs from "@/components/SeoBreadcrumbs";
import { breadcrumbJsonLd, buildPageMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Terms of Service",
  description:
    "Review the DataLynkr Terms of Service. Understand the rules, subscription payments, intellectual property policies, and liabilities associated with our Service.",
  path: "/terms",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Terms of Service", path: "/terms" },
];

export default function TermsPage() {
  return (
    <div className="bg-[#f7f9fc] text-on-surface antialiased overflow-x-hidden min-h-screen flex flex-col pt-16">
      <JsonLd
        data={webPageJsonLd({
          path: "/terms",
          name: "DataLynkr Terms of Service",
          description:
            "Terms and conditions governing use of the DataLynkr platform and services.",
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
              Terms of Service
            </h1>
            <p className="text-zinc-500 font-medium m-0">Last Updated: February 23, 2026</p>
          </div>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using DataLynkr (IT Catalyst Software (I) Pvt Ltd) services, you
            accept and agree to be bound by the terms and provision of this agreement. If you do
            not agree to abide by the above, please do not use this service.
          </p>
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of our website,
            applications, and services (collectively, the &quot;Service&quot;). Please read these Terms
            carefully before using our Service.
          </p>

          <h2>2. Description of Service</h2>
          <p>DataLynkr provides a platform for integrating and managing Tally accounting data, including but not limited to:</p>
          <ul>
            <li>Access to ledger information and vouchers</li>
            <li>Sales order management and processing</li>
            <li>Inventory and stock management</li>
            <li>Receivables and payables tracking</li>
            <li>Financial reporting and analytics</li>
            <li>Customer and vendor management</li>
          </ul>
          <p>We reserve the right to modify, suspend, or discontinue any part of the Service at any time with or without notice.</p>
          <p>DataLynkr is not affiliated with Tally Solutions Pvt. Ltd. We are not responsible for disruptions caused by updates, changes, or errors within the Tally software itself.</p>

          <h2>3. User Accounts and Registration</h2>

          <h3>3.1 Account Creation</h3>
          <p>To use certain features of our Service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.</p>

          <h3>3.2 Account Security</h3>
          <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to immediately notify us of any unauthorized use of your account or any other breach of security.</p>

          <h3>3.3 Account Termination</h3>
          <p>We reserve the right to suspend or terminate your account at any time for violation of these Terms or for any other reason we deem necessary to protect the integrity of our Service.</p>

          <h3>3.4 Usage Audit</h3>
          <p>DataLynkr reserves the right to monitor and audit your use of the Service to ensure compliance with your subscription plan and these Terms. If an audit reveals that you have underpaid fees or exceeded usage limits (such as the number of Tally companies or user seats), you agree to pay the additional fees at the then-current list price.</p>

          <h2>4. Acceptable Use</h2>
          <p>You agree not to use the Service to:</p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon the rights of others</li>
            <li>Transmit any malicious code, viruses, or harmful data</li>
            <li>Attempt to gain unauthorized access to our systems or networks</li>
            <li>Interfere with or disrupt the Service or servers</li>
            <li>Use the Service for any illegal or unauthorized purpose</li>
            <li>Copy, modify, or create derivative works of the Service</li>
            <li>Reverse engineer, decompile, or disassemble the Service</li>
            <li>Remove any proprietary notices or labels</li>
          </ul>

          <h2>5. Subscription and Payment</h2>

          <h3>5.1 Subscription Plans</h3>
          <p>We offer various subscription plans with different features and pricing. Subscription fees are billed in advance on a monthly or annual basis, as selected by you.</p>

          <h3>5.2 Payment Terms</h3>
          <p>All fees are non-refundable unless otherwise stated. You are responsible for providing valid payment information and authorizing us to charge your payment method for all fees.</p>

          <h3>5.3 Price Changes</h3>
          <p>We reserve the right to modify our pricing at any time. We will provide notice of any price changes, and you may cancel your subscription if you do not agree to the new pricing.</p>

          <h3>5.4 Cancellation</h3>
          <p>You may cancel your subscription at any time. Cancellation will take effect at the end of your current billing period. You will continue to have access to the Service until the end of your paid period.</p>
          <p>Upon termination or cancellation, you will have 30 days to export your data, after which DataLynkr reserves the right to delete all user data in accordance with our Privacy Policy.</p>

          <h2>6. Intellectual Property (The &quot;License&quot;)</h2>
          <p>The Service and its original content, features, and functionality are owned by DataLynkr and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
          <p>You retain ownership of any data you submit through the Service. By using the Service, you grant us a non-exclusive, world-wide, royalty-free license to use, store, and process your data solely as necessary to provide, maintain, and improve the Service for your benefit.</p>

          <h3>Intellectual Property (Addition)</h3>
          <p>Notwithstanding anything to the contrary, DataLynkr shall have the right to collect and analyze data and other information relating to the provision, use, and performance of various aspects of the Service. We may use such data in an anonymized and aggregated form to improve our algorithms, create industry benchmarks, and for other development purposes. This aggregate data does not identify you or your customers and is the sole property of DataLynkr.</p>

          <h2>7. Data and Privacy</h2>
          <p>Your use of the Service is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and protect your information.</p>
          <p>You are responsible for ensuring that any data you provide or process through the Service complies with applicable data protection laws and regulations.</p>

          <h2>8. Disclaimers and Limitations of Liability</h2>

          <h3>8.1 Service Availability</h3>
          <p>We strive to provide reliable and continuous access to the Service, but we do not guarantee that the Service will be available at all times or free from errors, interruptions, or security vulnerabilities.</p>

          <h3>8.2 Disclaimer of Warranties</h3>
          <p>THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.</p>
          <p>THE SERVICE IS A TOOL FOR DATA MANAGEMENT AND REPORTING. USERS ARE SOLELY RESPONSIBLE FOR VERIFYING THE ACCURACY OF FINANCIAL DATA BEFORE MAKING BUSINESS OR LEGAL DECISIONS. DATALYNKR IS NOT A SUBSTITUTE FOR PROFESSIONAL ACCOUNTING OR AUDIT SERVICES.</p>

          <h3>8.3 Limitation of Liability</h3>
          <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.</p>

          <h2>9. Indemnification</h2>
          <p>You agree to indemnify, defend, and hold harmless DataLynkr and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys&apos; fees, arising out of or in any way connected with your access to or use of the Service or your violation of these Terms.</p>

          <h2>10. Third-Party Services</h2>
          <p>Our Service may integrate with or link to third-party services, including Tally software and payment processors. We are not responsible for the availability, accuracy, or practices of third-party services. Your use of third-party services is subject to their respective terms and conditions.</p>

          <h2>11. Modifications to Terms</h2>
          <p>We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the new Terms on this page and updating the &quot;Last Updated&quot; date. Your continued use of the Service after such modifications constitutes your acceptance of the updated Terms.</p>

          <h2>12. Governing Law and Dispute Resolution</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of Bangalore, Karnataka, India, without regard to its conflict of law provisions. Any disputes arising out of or relating to these Terms or the Service shall be resolved through binding arbitration or in the courts of Bangalore, Karnataka, India.</p>

          <h2>13. Severability</h2>
          <p>If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.</p>

          <h2>14. Contact Information</h2>
          <p>If you have any questions about these Terms of Service, please contact us:</p>
          <div className="bg-zinc-50 border-l-[3px] border-[#1f3a89] p-4 rounded-r-lg mt-4 text-zinc-700 italic">
            <strong>Email:</strong>{" "}
            <a href="mailto:support@datalynkr.com" className="text-primary hover:underline">
              support@datalynkr.com
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

          <h2>15. Force Majeure</h2>
          <p>Neither party shall be liable for any failure or delay in performance under these Terms (except for payment obligations) due to causes beyond their reasonable control, including but not limited to: acts of God, war, riot, embargoes, acts of civil or military authorities, fire, floods, accidents, service outages resulting from third-party infrastructure (e.g., AWS, Azure), or failures of the Internet.</p>
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
          <Link href="/privacy" className="text-zinc-500 font-medium hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-primary font-bold hover:text-[#15275e] transition-colors pb-1 border-b-[2px] border-primary"
          >
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
