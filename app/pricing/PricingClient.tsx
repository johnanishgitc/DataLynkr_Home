"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";
import { PRICING_FAQ } from "@/lib/seo";
import {
  type BankDetails,
  type PricingSlab,
  formatPrice,
  formatUserRange,
} from "@/lib/pricing";

type PricingClientProps = {
  plans: PricingSlab[];
  bankDetails: BankDetails | null;
};

const delayClasses = ["delay-100", "delay-200", "delay-300", "delay-400", "delay-500", "delay-600"];

export default function PricingClient({ plans, bankDetails }: PricingClientProps) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly");

  const activeBtnClass =
    "bg-blue-600 text-white text-[13px] font-semibold py-2 px-8 rounded cursor-default shadow transition-all";
  const inactiveBtnClass =
    "text-slate-500 text-[13px] font-semibold py-2 px-8 rounded hover:text-slate-800 transition-all";

  return (
    <div className="cdn-tailwind-content pricing-page bg-[#F4F6F9] min-h-screen text-slate-800 antialiased relative overflow-x-hidden">
      {/* Decorative Floating Elements */}
      <div className="fixed top-0 right-0 -mr-32 -mt-32 w-[30rem] h-[30rem] bg-[#1F3A89] opacity-[0.05] rounded-full blur-[100px] animate-float pointer-events-none z-0"></div>
      <div className="fixed bottom-0 left-0 -ml-32 -mb-32 w-[40rem] h-[40rem] bg-[#f1c74b] opacity-[0.03] rounded-full blur-[120px] animate-float-delayed pointer-events-none z-0"></div>

      {/* Navbar — transparent/static to match pricing.html */}
      <Navbar showHomeIcon={true} staticNav transparentNav />

      {/* Header */}
      <div className="text-center mt-4 mb-12 relative z-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-800 mb-2 tracking-tight leading-tight reveal-scale-in">
          Subscription Plan
        </h1>
        <p className="text-slate-500 text-sm mb-6 reveal-fade-up delay-100">
          Select the plan that best fits your needs
        </p>

        {/* Billing Period Toggle */}
        <div className="flex justify-center reveal-fade-up delay-200">
          <div className="bg-white p-1 rounded-lg shadow-sm border border-slate-200 inline-flex items-center">
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={billingPeriod === "yearly" ? activeBtnClass : inactiveBtnClass}
            >
              Yearly
            </button>
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={billingPeriod === "monthly" ? activeBtnClass : inactiveBtnClass}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mb-8 relative z-10 reveal-fade-up delay-300">
        <h2 className="text-xl font-bold text-slate-700">Subscription Plans</h2>
      </div>

      {/* Grid Container */}
      <div className="max-w-[85rem] mx-auto px-4 md:px-8 relative z-10 pb-16">
        {plans.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-500 text-sm">
              Unable to load pricing plans right now.{" "}
              <Link href="/contact" className="text-blue-600 font-semibold hover:text-blue-700">
                Contact us
              </Link>{" "}
              for details.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {plans.map((plan, index) => {
              const isYearly = billingPeriod === "yearly";
              const price = isYearly ? plan.yearly_price : plan.monthly_price;
              const secondaryPrice = isYearly
                ? `₹${formatPrice(String(Number.parseFloat(plan.yearly_price) / 12))}/month`
                : `₹${formatPrice(plan.yearly_price)}/year`;

              return (
                <div
                  key={plan.id}
                  className={`bg-white rounded-xl p-6 md:p-8 shadow-sm border border-slate-200 flex flex-col h-full hover:shadow-md transition-all hover:-translate-y-1 duration-300 reveal-fade-up ${
                    delayClasses[index] ?? "delay-100"
                  }`}
                >
                  <h3 className="text-xl font-bold text-slate-800 mb-3 shrink-0">{plan.name}</h3>
                  <p className="text-slate-500 text-xs mb-6 md:mb-8 leading-relaxed line-clamp-4 min-h-[4.75rem] overflow-hidden">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-1 mb-1 shrink-0">
                    <span className="text-xl font-semibold text-slate-700">₹</span>
                    <span className="text-4xl font-extrabold text-slate-800 tracking-tight">
                      {formatPrice(price)}
                    </span>
                    <span className="text-slate-500 text-xs font-medium">
                      {isYearly ? "/year" : "/month"}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium mb-8">
                    {secondaryPrice}
                  </div>
                  <div className="mt-auto border-t border-slate-100 pt-6 space-y-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">User Range:</span>
                      <span className="font-bold text-slate-800">
                        {formatUserRange(plan.min_users, plan.max_users)}
                      </span>
                    </div>
                    <div className="flex justify-between items-start text-xs gap-4">
                      <span className="text-slate-500">Free External Users Per Internal User:</span>
                      <span className="font-bold text-slate-800 whitespace-nowrap">
                        {plan.free_external_users_per_internal_user}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {bankDetails && (
        <div className="max-w-3xl mx-auto px-4 md:px-8 relative z-10 pb-12 reveal-fade-up delay-500">
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Payment Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-500 text-xs">Account Holder</p>
                <p className="font-semibold text-slate-800">{bankDetails.account_holder_name}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Bank</p>
                <p className="font-semibold text-slate-800">{bankDetails.bank_name}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Account Number</p>
                <p className="font-semibold text-slate-800">{bankDetails.account_number}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">IFSC Code</p>
                <p className="font-semibold text-slate-800">{bankDetails.ifsc_code}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Branch</p>
                <p className="font-semibold text-slate-800">{bankDetails.branch_name}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">UPI ID</p>
                <p className="font-semibold text-slate-800">{bankDetails.upi_id}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Get in Touch with Sales */}
      <div className="text-center mt-12 mb-20 relative z-10 reveal-fade-up delay-700">
        <p className="text-slate-500 text-sm">
          Need a custom solution or enterprise-level support?{" "}
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-blue-600 font-semibold hover:text-blue-700 transition-colors group"
          >
            Get in Touch With Sales
            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </p>
      </div>

      <FaqSection
        items={PRICING_FAQ}
        title="Frequently Asked Questions"
        subtitle="Got questions about our pricing plans? We've got answers."
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
