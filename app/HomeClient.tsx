"use client";

import { basePath } from "@/lib/site";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomeClient() {
  // Controlled state for Mobile / Laptop view toggles
  const [activeViews, setActiveViews] = useState<Record<string, "mobile" | "laptop">>({
    "sales-order": "mobile",
    bcommerce: "mobile",
    invoice: "mobile",
    workflows: "mobile",
    ledgers: "mobile",
    offline: "mobile",
    payments: "mobile",
    stock: "mobile",
  });

  const toggleView = (section: string, view: "mobile" | "laptop") => {
    setActiveViews((prev) => ({ ...prev, [section]: view }));
  };

  const renderToggleButtons = (sectionId: string) => {
    const active = activeViews[sectionId];
    return (
      <div className="flex justify-center mb-8 relative z-20">
        <div className="bg-slate-200/80 backdrop-blur-md rounded-full p-1 flex items-center shadow-inner border border-white/40">
          <button
            type="button"
            onClick={() => toggleView(sectionId, "mobile")}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${
              active === "mobile"
                ? "text-white bg-primary shadow-md"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Mobile
          </button>
          <button
            type="button"
            onClick={() => toggleView(sectionId, "laptop")}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${
              active === "laptop"
                ? "text-white bg-primary shadow-md"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            Laptop
          </button>
        </div>
      </div>
    );
  };

  const getContainerClass = (sectionId: string, view: "mobile" | "laptop") => {
    const isActive = activeViews[sectionId] === view;
    return `col-start-1 row-start-1 w-full flex justify-center transition-all duration-500 ease-out ${
      isActive
        ? "opacity-100 scale-100 pointer-events-auto z-10 visible"
        : "opacity-0 scale-95 pointer-events-none z-0 invisible"
    }`;
  };

  return (
    <>
      {/* Navbar */}
      <Navbar showCenterBrand showLoginButton showHomeIcon={false} />

      {/* Main Content Canvas */}
      <main className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-24 md:pt-20 bg-white relative">
        {/* Hero Section */}
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-8 items-center">
          <div className="space-y-6 relative z-20">
            {/* Primary Headline */}
            <div className="space-y-4">
              <h1 className="headline-font text-5xl md:text-7xl lg:text-6xl xl:text-7xl font-normal leading-tight tracking-tighter text-black reveal-on-scroll reveal-fade-up">
                Take Tally
                <br />
                Beyond The Finance Team
              </h1>
              {/* Subhead Tonal Lead */}
              <div className="pt-6 space-y-2 text-primary headline-font font-bold text-base md:text-lg lg:text-xl uppercase tracking-[0.2em]">
                <p className="reveal-on-scroll reveal-fade-up delay-100">FROM YOUR MOBILE AND BROWSER</p>
                <p className="reveal-on-scroll reveal-fade-up delay-200">BY YOUR SALES TEAM</p>
                <p className="reveal-on-scroll reveal-fade-up delay-300">BY YOUR LEADERSHIP TEAM</p>
                <p className="reveal-on-scroll reveal-fade-up delay-400">STAY CONNECTED</p>
                <p className="reveal-on-scroll reveal-fade-up delay-500">ANYWHERE</p>
                <p className="reveal-on-scroll reveal-fade-up delay-700">RIGHT NOW</p>
              </div>
            </div>
            {/* Hero CTA */}
            <div className="reveal-on-scroll reveal-fade-up delay-600 pt-6 max-w-xl">
              {/* Live Status Badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-[#1F3A89] border border-blue-100/80 rounded-full px-3 py-1 text-xs font-semibold">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#1F3A89]"></span>
                  </span>
                  Supercharge Your Tally
                </span>
                <span className="text-xs text-slate-500 font-medium">Setup takes only 5 minutes</span>
              </div>

              {/* Inline Email Form */}
              <form
                className="flex flex-col sm:flex-row gap-3 bg-white p-1.5 border border-slate-200 rounded-2xl shadow-[0_12px_24px_rgba(31,58,137,0.04)] focus-within:border-[#1F3A89] focus-within:ring-4 focus-within:ring-[#1F3A89]/5 transition-all duration-300"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const emailInput = form.elements.namedItem("email") as HTMLInputElement;
                  window.location.href = `/login?signup=true&email=${encodeURIComponent(emailInput.value)}`;
                }}
              >
                <div className="relative flex-1 flex items-center min-w-0 pl-3">
                  <span className="material-symbols-outlined text-slate-400 text-lg">mail</span>
                  <input
                    type="email"
                    name="email"
                    id="cta-email"
                    placeholder="Enter your business email"
                    required
                    className="w-full bg-transparent border-0 py-3 pl-2 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-0"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#1F3A89] hover:bg-[#152960] active:scale-[0.98] text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shrink-0 shadow-md shadow-[#1F3A89]/10 cursor-pointer"
                >
                  <span>Get Started for Free</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </form>

              {/* Trust indicators */}
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 pl-2">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                  No credit card required
                </span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                  14-day free trial
                </span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-emerald-500 text-base">check_circle</span>
                  Get Your Tally Connected
                </span>
              </div>

              {/* Google Play Store Button */}
              <div className="mt-5 pl-2">
                <a
                  href="https://play.google.com/store/apps/details?id=com.datalynkr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={basePath + "/resources/googlestore.svg"} alt="Get it on Google Play" className="h-12 w-auto" />
                </a>
              </div>
            </div>
          </div>

          {/* Hero Visuals (Glassmorphic Cascade Concept) */}
          <div className="hidden lg:flex relative h-full w-full items-center justify-center min-h-[600px] reveal-on-scroll reveal-fade-in-right">
            {/* Background Gradient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-sky-400/20 to-blue-500/20 rounded-full blur-[80px] animate-pulse"></div>

            {/* The Cascade Group */}
            <div className="relative w-full max-w-[500px] h-[500px] group">
              {/* Top Left Card (Analytics / Cash Flow) */}
              <div className="absolute top-4 left-2 w-[220px] bg-[#1F3A89] text-white rounded-[24px] shadow-[0_20px_40px_rgba(31,58,137,0.3)] border border-white/20 p-4 transform scale-90 -translate-x-8 -translate-y-4 group-hover:-translate-x-12 group-hover:-translate-y-8 transition-all duration-700 ease-out z-10 animate-float-delayed">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#F1C74B] text-sm">trending_up</span>
                  </div>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-emerald-400">Cash Flow</span>
                </div>
                <p className="text-xl font-bold headline-font">₹8.2M</p>
                <p className="text-[9px] text-white/60 mb-2">+12% vs last week</p>
                {/* Mini Sparkline */}
                <div className="w-full h-8 flex items-end gap-1">
                  <div className="w-full bg-white/20 h-[30%] rounded-t-sm"></div>
                  <div className="w-full bg-white/20 h-[45%] rounded-t-sm"></div>
                  <div className="w-full bg-white/20 h-[25%] rounded-t-sm"></div>
                  <div className="w-full bg-[#F1C74B] h-[80%] rounded-t-sm relative">
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Back Card (Approvals / Workflow) */}
              <div className="absolute top-8 right-8 w-[280px] bg-slate-50/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.05)] border border-white p-5 transform scale-90 translate-x-4 -translate-y-4 group-hover:translate-x-12 group-hover:-translate-y-8 transition-all duration-700 ease-out z-10 animate-float">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center border border-emerald-200/50">
                    <span className="material-symbols-outlined text-emerald-600">verified</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Invoice Approved</h4>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">Auto-Workflow</p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <div className="h-2 w-full bg-slate-200/80 rounded-full"></div>
                  <div className="h-2 w-4/5 bg-slate-200/80 rounded-full"></div>
                  <div className="h-2 w-2/3 bg-slate-200/80 rounded-full"></div>
                </div>
              </div>

              {/* Middle Card (DataLynkr Engine Core) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-white/95 backdrop-blur-xl rounded-[32px] border border-white shadow-[0_40px_80px_rgba(31,58,137,0.15)] p-6 flex flex-col items-center justify-center transform group-hover:scale-105 transition-all duration-700 ease-out z-20 animate-float">
                <div className="absolute inset-0 border-2 border-dashed border-[#1F3A89]/20 rounded-[32px] animate-[spin_20s_linear_infinite]"></div>
                <div className="w-24 h-24 bg-gradient-to-br from-[#1F3A89] to-[#0F1D44] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#1F3A89]/30 mb-6 relative z-10">
                  <span className="material-symbols-outlined text-white text-5xl">sync_alt</span>
                  {/* Beeping dot */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 headline-font text-center relative z-10">DataLynkr Engine</h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2 relative z-10">Tally Real-Time</p>
              </div>

              {/* Bottom Right Card (Payments) */}
              <div className="absolute bottom-6 right-2 w-[200px] bg-slate-900 text-white rounded-[24px] shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-slate-700 p-4 transform scale-95 translate-x-8 translate-y-6 group-hover:translate-x-12 group-hover:translate-y-10 transition-all duration-700 ease-out z-30 animate-float-fast">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-emerald-400 text-sm">payments</span>
                  </div>
                  <span className="text-[9px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">Paid</span>
                </div>
                <p className="text-[10px] text-slate-400 mb-0.5">Inv #8932</p>
                <p className="text-lg font-bold headline-font mb-2">₹1,45,000</p>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center overflow-hidden">
                    <span className="material-symbols-outlined text-[10px] text-slate-400">domain</span>
                  </div>
                  <span className="text-[9px] text-slate-500 font-medium">Acme Corp</span>
                </div>
              </div>

              {/* Front Card (Mobile Order / B-Commerce) */}
              <div className="absolute -bottom-6 left-0 w-[260px] bg-white/95 backdrop-blur-2xl rounded-[28px] shadow-[0_30px_60px_rgba(0,0,0,0.15)] border-2 border-white p-5 transform scale-105 -translate-x-4 translate-y-6 group-hover:-translate-x-10 group-hover:translate-y-12 transition-all duration-700 ease-out z-30 animate-float">
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-800">New Sales Order</p>
                  <span className="text-[9px] font-bold bg-[#F1C74B]/20 text-amber-700 px-2.5 py-1 rounded-md">Just Now</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 overflow-hidden relative group-hover:bg-slate-100 transition-colors border border-slate-200/60 shadow-sm">
                    <span className="material-symbols-outlined text-slate-400">inventory_2</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800 leading-tight">Premium Widgets</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Qty: 250 units</p>
                  </div>
                </div>
                <div className="mt-5 flex gap-2">
                  <button className="flex-1 bg-[#1F3A89] text-white text-[10px] font-bold py-2 rounded-lg hover:bg-[#0F1D44] transition-colors shadow-md shadow-[#1F3A89]/20 cursor-pointer">Process</button>
                  <button className="flex-1 bg-slate-100 text-slate-600 text-[10px] font-bold py-2 rounded-lg hover:bg-slate-200 transition-colors border border-slate-200/50 cursor-pointer">Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* What & Who Section */}
      <section id="what-and-who" className="py-16 md:py-24 lg:py-32 px-6 md:px-16 lg:px-24 bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: What is DataLynkr? */}
            <div className="lg:col-span-6 space-y-6 reveal-on-scroll reveal-fade-up">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2">
                  <div className="h-px w-8 bg-[#1f3a89]"></div>
                  <span className="text-[#1f3a89] font-bold headline-font uppercase tracking-widest text-sm">Overview</span>
                </div>
                <h2 className="headline-font text-3xl md:text-4xl font-extrabold text-[#1F3A89] leading-tight">
                  What is DataLynkr?
                </h2>
                <p className="font-body text-slate-600 leading-relaxed text-base md:text-lg">
                  DataLynkr extends Tally beyond the accounts department, giving sales teams, managers, operations staff, customers, and business owners secure access to live Tally data from anywhere.
                </p>
              </div>

              {/* 8 capability cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {[
                  { icon: "receipt_long", label: "Sales Orders & Invoicing", href: "#sales-order-management" },
                  { icon: "supervised_user_circle", label: "Customer Portals", href: "#extend-portal-customers" },
                  { icon: "shopping_cart", label: "E-Commerce Order screen", href: "#modern-bcommerce-ordering" },
                  { icon: "rule", label: "Approval Workflows", href: "#authorization-workflows" },
                  { icon: "dashboard", label: "Business Dashboards", href: "#dynamic-dashboards" },
                  { icon: "payments", label: "Payments and collections", href: "#payments-collections" },
                  { icon: "inventory_2", label: "Live Inventory Visibility", href: "#stock-summary" },
                  { icon: "insert_chart", label: "Custom Reports", href: "#custom-reports" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-[#1F3A89]/30 hover:bg-[#1F3A89]/5 hover:shadow-sm transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1F3A89] group-hover:bg-[#1F3A89] group-hover:text-white flex items-center justify-center shrink-0 transition-colors duration-300">
                      <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    </div>
                    <span className="font-body font-semibold text-slate-800 text-sm group-hover:text-[#1F3A89] transition-colors duration-300">
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>

              {/* Note */}
              <div className="flex items-start gap-2.5 p-4 rounded-xl bg-emerald-50/30 border border-emerald-100 text-[13px] text-emerald-800 font-body">
                <span className="material-symbols-outlined text-emerald-600 text-lg shrink-0">verified_user</span>
                <p>All information is fetched directly from Tally in real time. No customer data is stored on DataLynkr servers.</p>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <Link
                    href="/pricing"
                    className="group inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#1F3A89] to-[#2563EB] hover:from-[#152960] hover:to-[#1D4ED8] active:scale-[0.98] text-white font-bold text-base md:text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-[#1F3A89]/25 hover:shadow-xl hover:shadow-[#1F3A89]/35 hover:scale-[1.02] shrink-0"
                  >
                    <span>Simple, Affordable Pricing</span>
                    <span className="material-symbols-outlined text-lg md:text-xl transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
                  </Link>
                  <div className="flex items-center gap-2 px-1">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs text-slate-500 font-semibold font-body">Plans start at just 300/mo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Who is DataLynkr For? */}
            <div className="lg:col-span-6 space-y-6 reveal-on-scroll reveal-fade-up">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2">
                  <div className="h-px w-8 bg-amber-500"></div>
                  <span className="font-bold headline-font uppercase tracking-widest text-sm text-amber-700">Target Audience</span>
                </div>
                <h2 className="headline-font text-3xl md:text-4xl font-extrabold text-[#1F3A89] leading-tight">
                  Who is DataLynkr For?
                </h2>
                <p className="font-body text-slate-600 leading-relaxed text-base md:text-lg">
                  Built for any business that uses Tally as its ERP.
                </p>
              </div>

              {/* Audience list */}
              <div className="space-y-3.5">
                {[
                  { icon: "sell", title: "Sales Teams", desc: "Place orders, create invoices, collect payments, and access customer information from the field." },
                  { icon: "insights", title: "Managers & Owners", desc: "Monitor operations, approve transactions, and access real-time business insights." },
                  { icon: "account_balance", title: "Accounts & Finance Teams", desc: "Maintain financial control while enabling faster collaboration across departments." },
                  { icon: "local_shipping", title: "Operations Teams", desc: "Improve inventory visibility and coordinate order fulfillment more effectively." },
                  { icon: "shopping_bag", title: "Customers", desc: "Access invoices, outstanding balances, order history, and self-service ordering portals." },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl hover:border-[#F1C74B]/30 hover:bg-slate-50 transition-all duration-300 flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-xl">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-body font-bold text-slate-800 text-sm">{item.title}</h4>
                      <p className="font-body text-xs text-slate-500 leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Industry tags */}
              <div className="pt-2">
                <p className="font-body text-xs text-slate-400 font-bold uppercase tracking-wider mb-2.5">Key Industries Supported</p>
                <div className="flex flex-wrap gap-2">
                  {["Manufacturing", "Distribution", "Wholesale", "Retail", "Trading", "Services"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-50 border border-slate-100 text-slate-600 text-xs font-semibold rounded-full hover:border-[#F1C74B]/30 hover:bg-white transition-all cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Highlight Banner */}
          <div className="mt-16 bg-slate-50/70 border border-slate-100/80 rounded-[32px] p-8 md:p-12 lg:p-14 relative overflow-hidden reveal-on-scroll reveal-fade-up">
            {/* Soft background blur/glow accents */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px]"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
              {/* Left Content Column */}
              <div className="lg:col-span-4 space-y-4">
                <div className="inline-flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Enterprise Integration</span>
                </div>
                <h3 className="headline-font text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#1F3A89] leading-tight">
                  Transform Tally Into a Company-Wide Platform
                </h3>
                <p className="font-body text-slate-600 text-sm md:text-base leading-relaxed">
                  DataLynkr enables every team to access live Tally data, execute workflows, and make better decisions from anywhere—without changing the way you work in Tally.
                </p>
              </div>

              {/* Right Flow Diagram Column */}
              <div className="lg:col-span-8 bg-white/60 backdrop-blur-sm border border-slate-100 p-6 md:p-8 rounded-2xl shadow-sm flex items-center justify-center">
                <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-4 py-4 relative">
                  {/* Node 1: Tally ERP */}
                  <div className="w-40 lg:w-44 p-6 bg-white border border-slate-100 shadow-sm rounded-2xl flex flex-col items-center justify-center text-center relative z-10 transition-all duration-300 hover:border-blue-200 shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 mb-3 border border-slate-100">
                      <span className="material-symbols-outlined text-2xl">database</span>
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Data Source</span>
                    <h4 className="text-sm font-extrabold text-slate-800 mt-1">Tally ERP</h4>
                  </div>

                  {/* Connection 1 */}
                  <div className="flex flex-col items-center justify-center lg:w-16 shrink-0">
                    <div className="hidden lg:block w-16 h-0.5 bg-slate-100 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-4 h-full bg-[#1F3A89] rounded-full animate-[flowRight_2s_linear_infinite]"></div>
                    </div>
                    <div className="lg:hidden w-0.5 h-8 bg-slate-100 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-4 bg-[#1F3A89] rounded-full animate-[flowDown_2s_linear_infinite]"></div>
                    </div>
                  </div>

                  {/* Node 2: DataLynkr Hub */}
                  <div className="w-44 lg:w-48 p-7 bg-gradient-to-br from-[#1F3A89] to-[#0F1D44] shadow-md rounded-2xl flex flex-col items-center justify-center text-center relative z-10 border border-white/10 shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-[#F1C74B] mb-3 relative">
                      <span className="material-symbols-outlined text-3xl animate-[spin_8s_linear_infinite]">sync_alt</span>
                      <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
                      <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-400 rounded-full border border-[#1F3A89]"></span>
                    </div>
                    <span className="text-[9px] font-bold text-amber-300 uppercase tracking-widest">Real-time</span>
                    <h4 className="text-sm font-extrabold text-white mt-1">DataLynkr</h4>
                  </div>

                  {/* Connection 2 */}
                  <div className="flex flex-col items-center justify-center lg:w-16 shrink-0">
                    <div className="hidden lg:block w-16 h-0.5 bg-slate-100 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-4 h-full bg-[#F1C74B] rounded-full animate-[flowRight_2s_linear_infinite]"></div>
                    </div>
                    <div className="lg:hidden w-0.5 h-8 bg-slate-100 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-4 bg-[#F1C74B] rounded-full animate-[flowDown_2s_linear_infinite]"></div>
                    </div>
                  </div>

                  {/* Node 3: Connected Teams */}
                  <div className="flex flex-col gap-2 w-full lg:w-52 shrink-0">
                    {[
                      { icon: "sell", label: "Sales Teams" },
                      { icon: "local_shipping", label: "Operations" },
                      { icon: "account_balance", label: "Accounts" },
                      { icon: "insights", label: "Management" },
                      { icon: "shopping_bag", label: "Customers" },
                    ].map((team) => (
                      <div
                        key={team.label}
                        className="flex items-center gap-2.5 px-3.5 py-2 bg-white border border-slate-100 shadow-sm rounded-xl text-xs font-bold text-slate-700 transition-all hover:border-[#1F3A89]/20 hover:shadow-md"
                      >
                        <div className="w-6 h-6 rounded-md bg-blue-50 text-[#1F3A89] flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-sm">{team.icon}</span>
                        </div>
                        <span>{team.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section id="analytics-section" className="py-16 md:py-24 lg:py-32 px-6 md:px-16 lg:px-24 bg-gradient-to-br from-[#E6ECFD] to-[#f4f7ff]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-20 items-start">
            <div className="md:w-1/3 reveal-on-scroll reveal-fade-up">
              <h2 className="headline-font text-3xl md:text-4xl font-bold text-on-surface leading-tight">
                Precision Analytics
                <br />
                in the Palm
                <br />
                of Your Hand.
              </h2>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
              <div className="space-y-4 reveal-on-scroll reveal-fade-up delay-200">
                <div className="h-1 w-12 bg-primary"></div>
                <h3 className="headline-font font-bold text-xl">Your Data, Your Analytics</h3>
                <p className="text-on-surface-variant font-body leading-relaxed">
                  Create your own cards in the Dashboard. Choose the business indicators in a visualization that helps you make better decisions.
                </p>
              </div>
              <div className="space-y-4 reveal-on-scroll reveal-fade-up delay-200">
                <div className="h-1 w-12 bg-primary"></div>
                <h3 className="headline-font font-bold text-xl">Love Pivot Tables?</h3>
                <p className="text-on-surface-variant font-body leading-relaxed">
                  Create your Reports using any data from Tally. Now every Tally User&apos;s wish in their hand – The power of Pivot Tables and the data from Tally – married, now at your disposal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sales Order Management Section */}
      <section id="sales-order-management" className="py-16 md:py-24 lg:py-32 px-6 md:px-16 lg:px-24 bg-white border-y border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="space-y-12 reveal-on-scroll reveal-fade-up">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2">
                  <div className="h-px w-8 bg-[#1f3a89]"></div>
                  <span className="text-[#1f3a89] font-bold headline-font uppercase tracking-widest text-sm">Execution Engine</span>
                </div>
                <h2 className="headline-font text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface leading-tight">
                  Sales Order Management
                </h2>
                <h3 className="headline-font text-lg md:text-xl lg:text-2xl font-semibold text-primary">
                  Turn your sales team into a real-time execution engine.
                </h3>
                <p className="text-on-surface-variant font-body text-base md:text-lg leading-relaxed max-w-2xl">
                  No more missed opportunities, duplicate data and redundant software – now capture orders directly into your Tally with zero delay. Convert Orders to Invoices at the click of a button and also track what&apos;s pending to deliver, within tally.
                </p>
                <p className="text-on-surface-variant font-body text-base md:text-lg leading-relaxed max-w-2xl">
                  Empower your team to place orders directly from the field using mobile or desktop — with live inventory, customer insights, and built-in approval workflows.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
                <div className="space-y-6">
                  <h4 className="headline-font font-bold text-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-brand-accent">task_alt</span>
                    What you can do
                  </h4>
                  <ul className="space-y-4 font-body text-on-surface-variant">
                    {[
                      "Place orders instantly from anywhere",
                      "Check real-time stock across locations/Companies",
                      "View customer credit limits, overdue bills, and history",
                      "Capture orders using barcode/QR scanning",
                      "Submit orders for approval before final posting in Tally",
                      "Create quick draft orders for faster field operations",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="headline-font font-bold text-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-brand-accent">trending_up</span>
                    Why it matters
                  </h4>
                  <ul className="space-y-4 font-body text-on-surface-variant">
                    {[
                      "Faster order processing",
                      "Fewer errors and back-and-forth with accounts",
                      "Better coordination between sales and finance",
                      "Complete control with permission-based data access",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pt-4 hidden sm:block">
                <Link
                  href="/features/sales-order-management"
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-800 transition-all hover:shadow-lg hover:scale-105 active:scale-95 duration-300"
                >
                  <span>Explore More</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Media Container with Mobile/Laptop Toggle */}
            <div className="h-full flex flex-col items-center justify-center reveal-on-scroll reveal-fade-in-right w-full">
              {renderToggleButtons("sales-order")}
              <div className="grid w-full items-center">
                <div className={getContainerClass("sales-order", "mobile")}>
                  <div className="w-full max-w-[280px] aspect-[9/19] bg-black rounded-2xl border-[12px] border-zinc-900 shadow-2xl relative overflow-hidden group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={basePath + "/resources/poster_images/orders.webp"}
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain z-20 transition-opacity duration-300 pointer-events-none"
                    />
                    <video
                      width={720}
                      height={1600}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      poster={basePath + "/resources/poster_images/orders.webp"}
                      className="absolute inset-0 w-full h-full object-contain rounded-xl z-10"
                      onPlaying={(e) => e.currentTarget.previousElementSibling?.classList.add("opacity-0")}
                    >
                      <source src={basePath + "/resources/videos/orders.mp4"} type="video/mp4" />
                    </video>
                  </div>
                </div>
                <div className={getContainerClass("sales-order", "laptop")}>
                  <div className="relative w-full max-w-2xl group">
                    <div className="relative rounded-t-xl border-[4px] md:border-[8px] lg:border-[12px] border-zinc-900 bg-zinc-900 aspect-[16/10] overflow-hidden shadow-2xl">
                      <div className="absolute inset-0 bg-white flex flex-col">
                        <div className="absolute inset-0 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={basePath + "/resources/poster_images/orders_laptop.webp"}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-300 pointer-events-none"
                          />
                          <video
                            width={1920}
                            height={1200}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            poster={basePath + "/resources/poster_images/orders_laptop.webp"}
                            className="w-full h-full object-cover rounded-xl z-10"
                            onPlaying={(e) => e.currentTarget.previousElementSibling?.classList.add("opacity-0")}
                          >
                            <source src={basePath + "/resources/videos/orders_laptop.mp4"} type="video/mp4" />
                          </video>
                        </div>
                      </div>
                    </div>
                    <div className="relative h-4 bg-zinc-800 rounded-b-xl w-[105%] -left-[2.5%] shadow-xl"></div>
                    <div className="relative h-2 bg-zinc-700/50 rounded-b-2xl w-[80%] mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-only Explore Button */}
          <div className="pt-8 flex justify-center sm:hidden w-full">
            <Link
              href="/features/sales-order-management"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-800 transition-all hover:shadow-lg hover:scale-105 active:scale-95 duration-300"
            >
              <span>Explore More</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Portal Section */}
      <section id="extend-portal-customers" className="py-16 md:py-24 lg:py-32 px-6 md:px-16 lg:px-24 bg-gradient-to-r from-[#f4f7ff] via-[#E6ECFD] to-[#f4f7ff] border-b border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Laptop Mockup Column */}
            <div className="order-2 lg:order-1 flex items-center justify-center w-full reveal-on-scroll reveal-fade-in-left">
              <div className="relative w-full max-w-2xl group">
                <div className="relative rounded-t-xl border-[4px] md:border-[8px] lg:border-[12px] border-zinc-900 bg-zinc-900 aspect-[16/10] overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-white flex flex-col">
                    <div className="absolute inset-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={basePath + "/resources/poster_images/extendportal.webp"}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-300 pointer-events-none"
                      />
                      <video
                        width={1920}
                        height={1200}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        poster={basePath + "/resources/poster_images/extendportal.webp"}
                        className="w-full h-full object-cover"
                        onPlaying={(e) => e.currentTarget.previousElementSibling?.classList.add("opacity-0")}
                      >
                        <source src={basePath + "/resources/videos/extendportal.mp4"} type="video/mp4" />
                      </video>
                    </div>
                  </div>
                </div>
                <div className="relative h-4 bg-zinc-800 rounded-b-xl w-[105%] -left-[2.5%] shadow-xl"></div>
                <div className="relative h-2 bg-zinc-700/50 rounded-b-2xl w-[80%] mx-auto"></div>
              </div>
            </div>

            {/* Content Column */}
            <div className="order-1 lg:order-2 space-y-12 reveal-on-scroll reveal-fade-up">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2">
                  <div className="h-px w-8 bg-[#1f3a89]"></div>
                  <span className="text-[#1f3a89] font-bold headline-font uppercase tracking-widest text-sm">Self-Service Portal</span>
                </div>
                <h2 className="headline-font text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface leading-tight">
                  Extend a Portal for Your Customers
                </h2>
                <h3 className="headline-font text-lg md:text-xl lg:text-2xl font-semibold text-primary">
                  Give your customers direct, secure access to their business data.
                </h3>
                <p className="text-on-surface-variant font-body text-base md:text-lg leading-relaxed max-w-2xl">
                  Create a personalized, role-based portal where customers can view transactions, track orders, and place new requests — all powered by live Tally data. Give access to prices, stock availability, stock location details, outstandings, credit limit – ONLY if you want!
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
                <div className="space-y-6">
                  <h4 className="headline-font font-bold text-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-brand-accent">person_outline</span>
                    What your customers can do
                  </h4>
                  <ul className="space-y-4 font-body text-on-surface-variant">
                    {[
                      "View invoices, receipts, and transaction history",
                      "Track outstanding and overdue payments",
                      "Place orders independently",
                      "Upload documents and attachments",
                      "Monitor order status in real time",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="headline-font font-bold text-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-brand-accent">auto_awesome</span>
                    Why it matters
                  </h4>
                  <ul className="space-y-4 font-body text-on-surface-variant">
                    {[
                      "Reduce calls and manual follow-ups",
                      "Improve transparency and trust",
                      "Speed up order cycles and collections",
                      "Strengthen customer relationships",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pt-4 hidden sm:block">
                <Link
                  href="/features/extend-portal-customers"
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-800 transition-all hover:shadow-lg hover:scale-105 active:scale-95 duration-300"
                >
                  <span>Explore More</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile-only Explore Button */}
          <div className="pt-8 flex justify-center sm:hidden w-full">
            <Link
              href="/features/extend-portal-customers"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-800 transition-all hover:shadow-lg hover:scale-105 active:scale-95 duration-300"
            >
              <span>Explore More</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Modern B-Commerce Ordering Section */}
      <section id="modern-bcommerce-ordering" className="py-16 md:py-24 lg:py-32 px-6 md:px-16 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left Column: Content */}
            <div className="space-y-12 reveal-on-scroll reveal-fade-up">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2">
                  <div className="h-px w-8 bg-[#1f3a89]"></div>
                  <span className="text-[#1f3a89] font-bold headline-font uppercase tracking-widest text-sm">Next-Gen Experience</span>
                </div>
                <h2 className="headline-font text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface leading-tight">
                  Modern B-Commerce Ordering
                </h2>
                <h3 className="headline-font text-lg md:text-xl lg:text-2xl font-semibold text-primary">
                  Bring an e-commerce experience directly into your Tally system.
                </h3>
                <p className="text-on-surface-variant font-body text-base md:text-lg leading-relaxed max-w-2xl">
                  Showcase your products in a clean, modern catalog interface while ensuring every order flows directly into Tally instantly! — no duplication, no manual entry.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Key Capabilities List */}
                <div className="space-y-6">
                  <h4 className="headline-font font-bold text-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-brand-accent">shopping_basket</span>
                    Key capabilities
                  </h4>
                  <ul className="space-y-4 font-body text-on-surface-variant">
                    {[
                      "E-commerce-style product catalog with images and details",
                      "Real-time pricing and inventory from Tally",
                      "Orders automatically recorded in Tally",
                      "No need for separate systems or integrations",
                      "No more redundant systems or costly & broken integrations!",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Why it Matters List */}
                <div className="space-y-6">
                  <h4 className="headline-font font-bold text-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-brand-accent">rocket_launch</span>
                    Why it matters
                  </h4>
                  <ul className="space-y-4 font-body text-on-surface-variant">
                    {[
                      "Eliminate duplicate work",
                      "Reduce operational errors",
                      "Faster order-to-invoice cycle",
                      "Seamless buying experience for customers",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pt-4 hidden sm:block">
                <Link
                  href="/features/modern-bcommerce-ordering"
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-800 transition-all hover:shadow-lg hover:scale-105 active:scale-95 duration-300"
                >
                  <span>Explore More</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Media Container */}
            <div className="h-full flex flex-col items-center justify-center reveal-on-scroll reveal-fade-in-right w-full">
              {renderToggleButtons("bcommerce")}
              <div className="grid w-full items-center">
                <div className={getContainerClass("bcommerce", "mobile")}>
                  <div className="w-full max-w-[280px] aspect-[9/19] bg-zinc-900 rounded-2xl border-[10px] border-zinc-900 shadow-2xl relative overflow-hidden group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={basePath + "/resources/poster_images/bcomm.webp"}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-300 pointer-events-none"
                    />
                    <video
                      width={720}
                      height={1520}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      poster={basePath + "/resources/poster_images/bcomm.webp"}
                      className="absolute inset-0 w-full h-full object-cover rounded-xl z-10"
                      onPlaying={(e) => e.currentTarget.previousElementSibling?.classList.add("opacity-0")}
                    >
                      <source src={basePath + "/resources/videos/bcomm.mp4"} type="video/mp4" />
                    </video>
                  </div>
                </div>
                <div className={getContainerClass("bcommerce", "laptop")}>
                  <div className="relative w-full max-w-2xl group">
                    <div className="relative rounded-t-xl border-[4px] md:border-[8px] lg:border-[12px] border-zinc-900 bg-zinc-900 aspect-[16/10] overflow-hidden shadow-2xl">
                      <div className="absolute inset-0 bg-white flex flex-col">
                        <div className="absolute inset-0 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={basePath + "/resources/poster_images/bcomm_laptop.webp"}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-300 pointer-events-none"
                          />
                          <video
                            width={1920}
                            height={1200}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            poster={basePath + "/resources/poster_images/bcomm_laptop.webp"}
                            className="w-full h-full object-cover rounded-xl z-10"
                            onPlaying={(e) => e.currentTarget.previousElementSibling?.classList.add("opacity-0")}
                          >
                            <source src={basePath + "/resources/videos/bcomm_laptop.mp4"} type="video/mp4" />
                          </video>
                        </div>
                      </div>
                    </div>
                    <div className="relative h-4 bg-zinc-800 rounded-b-xl w-[105%] -left-[2.5%] shadow-xl"></div>
                    <div className="relative h-2 bg-zinc-700/50 rounded-b-2xl w-[80%] mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-only Explore Button */}
          <div className="pt-8 flex justify-center sm:hidden w-full">
            <Link
              href="/features/modern-bcommerce-ordering"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-800 transition-all hover:shadow-lg hover:scale-105 active:scale-95 duration-300"
            >
              <span>Explore More</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Invoice Creation Section */}
      <section id="invoice-creation" className="py-16 md:py-24 lg:py-32 px-6 md:px-16 lg:px-24 bg-gradient-to-tl from-[#E6ECFD] to-[#f4f7ff] border-b border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left Column: Media Container */}
            <div className="order-2 lg:order-1 h-full flex flex-col items-center justify-center reveal-on-scroll reveal-fade-in-left w-full">
              {renderToggleButtons("invoice")}
              <div className="grid w-full items-center">
                <div className={getContainerClass("invoice", "mobile")}>
                  <div className="w-full max-w-[280px] aspect-[9/19] bg-zinc-900 rounded-2xl border-[10px] border-zinc-900 shadow-2xl relative overflow-hidden group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={basePath + "/resources/poster_images/invoice.webp"}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-300 pointer-events-none"
                    />
                    <video
                      width={720}
                      height={1600}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      poster={basePath + "/resources/poster_images/invoice.webp"}
                      className="absolute inset-0 w-full h-full object-cover rounded-xl z-10"
                      onPlaying={(e) => e.currentTarget.previousElementSibling?.classList.add("opacity-0")}
                    >
                      <source src={basePath + "/resources/videos/invoice.mp4"} type="video/mp4" />
                    </video>
                  </div>
                </div>
                <div className={getContainerClass("invoice", "laptop")}>
                  <div className="relative w-full max-w-2xl group">
                    <div className="relative rounded-t-xl border-[4px] md:border-[8px] lg:border-[10px] border-zinc-900 bg-zinc-900 aspect-[16/10] overflow-hidden shadow-2xl">
                      <div className="absolute inset-0 bg-white flex flex-col">
                        <div className="absolute inset-0 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={basePath + "/resources/poster_images/invoice_laptop.webp"}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-300 pointer-events-none"
                          />
                          <video
                            width={1920}
                            height={1200}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            poster={basePath + "/resources/poster_images/invoice_laptop.webp"}
                            className="w-full h-full object-cover"
                            onPlaying={(e) => e.currentTarget.previousElementSibling?.classList.add("opacity-0")}
                          >
                            <source src={basePath + "/resources/videos/invoice_laptop.mp4"} type="video/mp4" />
                          </video>
                        </div>
                      </div>
                    </div>
                    <div className="relative h-4 bg-zinc-800 rounded-b-xl w-[105%] -left-[2.5%] shadow-xl"></div>
                    <div className="relative h-2 bg-zinc-700/50 rounded-b-2xl w-[80%] mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="order-1 lg:order-2 space-y-12 reveal-on-scroll reveal-fade-up">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2">
                  <div className="h-px w-8 bg-[#1f3a89]"></div>
                  <span className="text-[#1f3a89] font-bold headline-font uppercase tracking-widest text-sm">Mobile Billing</span>
                </div>
                <h2 className="headline-font text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface leading-tight">
                  Invoice Creation
                </h2>
                <h3 className="headline-font text-lg md:text-xl lg:text-2xl font-semibold text-primary">
                  Create invoices from anywhere. Post directly into Tally.
                </h3>
                <p className="text-on-surface-variant font-body text-base md:text-lg leading-relaxed max-w-2xl">
                  Stop waiting for office staff to generate invoices. Empower your sales and delivery teams to create invoices instantly from the field using mobile or desktop — with optional approval workflows before posting to Tally.
                </p>
                <p className="text-on-surface-variant font-body text-base md:text-lg leading-relaxed max-w-2xl">
                  Generate invoices immediately after delivery, reduce billing delays, and ensure accounting records stay synchronized in real time.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
                <div className="space-y-6">
                  <h4 className="headline-font font-bold text-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-brand-accent">receipt_long</span>
                    What you can do
                  </h4>
                  <ul className="space-y-4 font-body text-on-surface-variant">
                    {[
                      "Create sales invoices from mobile or desktop",
                      "Generate invoices immediately after delivery or order confirmation",
                      "Submit invoices for approval before posting to Tally",
                      "View assigned customers and customer-specific information",
                      "Scan products using barcode or QR codes",
                      "View stock availability while creating invoices",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="headline-font font-bold text-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-brand-accent">trending_up</span>
                    Why it matters
                  </h4>
                  <ul className="space-y-4 font-body text-on-surface-variant">
                    {[
                      "Faster billing and invoice generation",
                      "Reduced delays between fulfillment and revenue recognition",
                      "Less dependency on office staff",
                      "Better control through approval workflows",
                      "Eliminate duplicate entry by posting directly into Tally",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pt-4 hidden sm:block">
                <Link
                  href="/features/invoice-creation"
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-800 transition-all hover:shadow-lg hover:scale-105 active:scale-95 duration-300"
                >
                  <span>Explore More</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile-only Explore Button */}
          <div className="pt-8 flex justify-center sm:hidden w-full">
            <Link
              href="/features/invoice-creation"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-800 transition-all hover:shadow-lg hover:scale-105 active:scale-95 duration-300"
            >
              <span>Explore More</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Authorization Workflows Section */}
      <section id="authorization-workflows" className="py-16 md:py-24 lg:py-32 px-6 md:px-16 lg:px-24 bg-white border-y border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left Column: Content */}
            <div className="space-y-12 reveal-on-scroll reveal-fade-up">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2">
                  <div className="h-px w-8 bg-[#1f3a89]"></div>
                  <span className="text-[#1f3a89] font-bold headline-font uppercase tracking-widest text-sm">Workflow Engine</span>
                </div>
                <h2 className="headline-font text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface leading-tight">
                  Authorization Workflows
                </h2>
                <h3 className="headline-font text-lg md:text-xl lg:text-2xl font-semibold text-primary">
                  Keep approvals moving — no matter where your team is.
                </h3>
                <p className="text-on-surface-variant font-body text-base md:text-lg leading-relaxed max-w-2xl">
                  Streamline approvals for orders, expenses, and payments with mobile-ready workflows and complete visibility – Anywhere, Anytime!
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
                <div className="space-y-6">
                  <h4 className="headline-font font-bold text-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-brand-accent">check_circle</span>
                    What you can do
                  </h4>
                  <ul className="space-y-4 font-body text-on-surface-variant">
                    {[
                      "Approve or reject requests from anywhere",
                      "Configure multi-level approval hierarchies",
                      "Trigger approvals based on exceptions (credit limit exceeded/overdue bills)",
                      "Track status and view rejection reasons",
                      "Enable escalation when managers are unavailable",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="headline-font font-bold text-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-brand-accent">visibility</span>
                    Why it matters
                  </h4>
                  <ul className="space-y-4 font-body text-on-surface-variant">
                    {[
                      "Faster decision-making",
                      "Reduced operational bottlenecks",
                      "Full transparency and audit trails",
                      "Ensure high-value transactions are given the priority it demands",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pt-4 hidden sm:block">
                <Link
                  href="/features/authorization-workflows"
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-800 transition-all hover:shadow-lg hover:scale-105 active:scale-95 duration-300"
                >
                  <span>Explore More</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Media Container */}
            <div className="h-full flex flex-col items-center justify-center reveal-on-scroll reveal-fade-in-right w-full">
              {renderToggleButtons("workflows")}
              <div className="grid w-full items-center">
                <div className={getContainerClass("workflows", "mobile")}>
                  <div className="w-full max-w-[280px] aspect-[9/19] bg-zinc-900 rounded-2xl border-[10px] border-zinc-900 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-black overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={basePath + "/resources/poster_images/approvals.webp"}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-300 pointer-events-none"
                      />
                      <video
                        width={720}
                        height={1600}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        poster={basePath + "/resources/poster_images/approvals.webp"}
                        className="absolute inset-0 w-full h-full object-cover rounded-xl z-10"
                        onPlaying={(e) => e.currentTarget.previousElementSibling?.classList.add("opacity-0")}
                      >
                        <source src={basePath + "/resources/videos/approvals.mp4"} type="video/mp4" />
                      </video>
                    </div>
                  </div>
                </div>
                <div className={getContainerClass("workflows", "laptop")}>
                  <div className="relative w-full max-w-2xl group">
                    <div className="relative rounded-t-xl border-[4px] md:border-[8px] lg:border-[12px] border-zinc-900 bg-zinc-900 aspect-[16/10] overflow-hidden shadow-2xl">
                      <div className="absolute inset-0 bg-white flex flex-col">
                        <div className="absolute inset-0 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={basePath + "/resources/poster_images/approvals_laptop.webp"}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-300 pointer-events-none"
                          />
                          <video
                            width={1920}
                            height={1200}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            poster={basePath + "/resources/poster_images/approvals_laptop.webp"}
                            className="w-full h-full object-cover"
                            onPlaying={(e) => e.currentTarget.previousElementSibling?.classList.add("opacity-0")}
                          >
                            <source src={basePath + "/resources/videos/approvals_laptop.mp4"} type="video/mp4" />
                          </video>
                        </div>
                      </div>
                    </div>
                    <div className="relative h-4 bg-zinc-800 rounded-b-xl w-[105%] -left-[2.5%] shadow-xl"></div>
                    <div className="relative h-2 bg-zinc-700/50 rounded-b-2xl w-[80%] mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-only Explore Button */}
          <div className="pt-8 flex justify-center sm:hidden w-full">
            <Link
              href="/features/authorization-workflows"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-800 transition-all hover:shadow-lg hover:scale-105 active:scale-95 duration-300"
            >
              <span>Explore More</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Daily Ledger Reports Section */}
      <section id="daily-ledger-reports" className="py-16 md:py-24 lg:py-32 px-6 md:px-16 lg:px-24 bg-gradient-to-r from-[#f4f7ff] via-[#E6ECFD] to-[#f4f7ff] border-b border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left Column: Media Container */}
            <div className="order-2 lg:order-1 h-full flex flex-col items-center justify-center reveal-on-scroll reveal-fade-in-left w-full">
              {renderToggleButtons("ledgers")}
              <div className="grid w-full items-center">
                <div className={getContainerClass("ledgers", "mobile")}>
                  <div className="w-full max-w-[280px] aspect-[9/19] bg-black rounded-2xl border-[12px] border-zinc-900 shadow-2xl relative overflow-hidden group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={basePath + "/resources/poster_images/ledgers.webp"}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-300 pointer-events-none"
                    />
                    <video
                      width={720}
                      height={1600}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      poster={basePath + "/resources/poster_images/ledgers.webp"}
                      className="absolute inset-0 w-full h-full object-cover rounded-xl z-10"
                      onPlaying={(e) => e.currentTarget.previousElementSibling?.classList.add("opacity-0")}
                    >
                      <source src={basePath + "/resources/videos/ledgers.mp4"} type="video/mp4" />
                    </video>
                  </div>
                </div>
                <div className={getContainerClass("ledgers", "laptop")}>
                  <div className="relative w-full max-w-2xl group">
                    <div className="relative rounded-t-xl border-[4px] md:border-[8px] lg:border-[12px] border-zinc-900 bg-zinc-900 aspect-[16/10] overflow-hidden shadow-2xl">
                      <div className="absolute inset-0 bg-white flex flex-col">
                        <div className="absolute inset-0 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={basePath + "/resources/poster_images/ledgers_laptop.webp"}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-300 pointer-events-none"
                          />
                          <video
                            width={1920}
                            height={1200}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            poster={basePath + "/resources/poster_images/ledgers_laptop.webp"}
                            className="w-full h-full object-cover"
                            onPlaying={(e) => e.currentTarget.previousElementSibling?.classList.add("opacity-0")}
                          >
                            <source src={basePath + "/resources/videos/ledgers_laptop.mp4"} type="video/mp4" />
                          </video>
                        </div>
                      </div>
                    </div>
                    <div className="relative h-4 bg-zinc-800 rounded-b-xl w-[105%] -left-[2.5%] shadow-xl"></div>
                    <div className="relative h-2 bg-zinc-700/50 rounded-b-2xl w-[80%] mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="order-1 lg:order-2 space-y-12 reveal-on-scroll reveal-fade-up">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2">
                  <div className="h-px w-8 bg-[#1f3a89]"></div>
                  <span className="text-[#1f3a89] font-bold headline-font uppercase tracking-widest text-sm">Financial Intelligence</span>
                </div>
                <h2 className="headline-font text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface leading-tight">
                  Daily Ledger Reports
                </h2>
                <h3 className="headline-font text-lg md:text-xl lg:text-2xl font-semibold text-primary">
                  Access critical financial data anytime, without relying on your accounts team.
                </h3>
                <p className="text-on-surface-variant font-body text-base md:text-lg leading-relaxed max-w-2xl">
                  Give your teams secure, role-based access to ledgers, outstanding reports, and order tracking — directly from Tally.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
                <div className="space-y-6">
                  <h4 className="headline-font font-bold text-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-brand-accent">account_balance_wallet</span>
                    What you can do
                  </h4>
                  <ul className="space-y-4 font-body text-on-surface-variant">
                    {[
                      "View customer outstanding balances and aging",
                      "Track pending and fulfilled orders",
                      "Access bill-wise details and transaction history",
                      "Share invoices instantly",
                      "DataLynkr automatically uses the custom format you use for invoices in Tally",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="headline-font font-bold text-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-brand-accent">insights</span>
                    Why it matters
                  </h4>
                  <ul className="space-y-4 font-body text-on-surface-variant">
                    {[
                      "Faster, more informed sales decisions",
                      "Reduced dependency on finance teams",
                      "Improved customer conversations",
                      "Better visibility into pending and completed orders",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pt-4 hidden sm:block">
                <Link
                  href="/features/daily-ledger-reports"
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-800 transition-all hover:shadow-lg hover:scale-105 active:scale-95 duration-300"
                >
                  <span>Explore More</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile-only Explore Button */}
          <div className="pt-8 flex justify-center sm:hidden w-full">
            <Link
              href="/features/daily-ledger-reports"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-800 transition-all hover:shadow-lg hover:scale-105 active:scale-95 duration-300"
            >
              <span>Explore More</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Offline Transactions Section */}
      <section id="offline-transactions" className="py-16 md:py-24 lg:py-32 px-6 md:px-16 lg:px-24 bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left Column: Content */}
            <div className="space-y-12 reveal-on-scroll reveal-fade-up">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2">
                  <div className="h-px w-8 bg-[#1f3a89]"></div>
                  <span className="text-[#1f3a89] font-bold headline-font uppercase tracking-widest text-sm">Always-On Operations</span>
                </div>
                <h2 className="headline-font text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface leading-tight">
                  Offline Transactions
                </h2>
                <h3 className="headline-font text-lg md:text-xl lg:text-2xl font-semibold text-primary">
                  Keep your business moving — even without internet.
                </h3>
                <p className="text-on-surface-variant font-body text-base md:text-lg leading-relaxed max-w-2xl">
                  Field teams shouldn&apos;t have to stop working because connectivity is poor. DataLynkr allows users to continue capturing transactions while offline and automatically sync them to Tally once internet access is restored.
                </p>
                <p className="text-on-surface-variant font-body text-base md:text-lg leading-relaxed max-w-2xl">
                  Whether your team is traveling, operating in remote locations, or facing temporary network issues, business operations continue uninterrupted.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
                <div className="space-y-6">
                  <h4 className="headline-font font-bold text-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-brand-accent">cloud_off</span>
                    What you can do
                  </h4>
                  <ul className="space-y-4 font-body text-on-surface-variant">
                    {[
                      "Create transactions without internet connectivity",
                      "Automatically queue transactions on the device",
                      "Sync data automatically when connectivity returns",
                      "Continue operations in remote or low-network locations",
                      "Capture orders, invoices, collections, payments, and expenses offline",
                      "Clearly identify when the application is operating in offline mode",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="headline-font font-bold text-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-brand-accent">trending_up</span>
                    Why it matters
                  </h4>
                  <ul className="space-y-4 font-body text-on-surface-variant">
                    {[
                      "No lost transactions during network outages",
                      "Uninterrupted field operations",
                      "Faster customer servicing in remote locations",
                      "Eliminate manual re-entry after reconnecting",
                      "Greater reliability for sales, collections, and operational teams",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pt-4 hidden sm:block">
                <Link
                  href="/features/offline-transactions"
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-800 transition-all hover:shadow-lg hover:scale-105 active:scale-95 duration-300"
                >
                  <span>Explore More</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Media Container */}
            <div className="h-full flex flex-col items-center justify-center reveal-on-scroll reveal-fade-in-right w-full">
              {renderToggleButtons("offline")}
              <div className="grid w-full items-center">
                <div className={getContainerClass("offline", "mobile")}>
                  <div className="w-full max-w-[280px] aspect-[9/19] bg-zinc-900 rounded-2xl border-[10px] border-zinc-900 shadow-2xl relative overflow-hidden group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={basePath + "/resources/poster_images/offline.webp"}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-300 pointer-events-none"
                    />
                    <video
                      width={720}
                      height={1600}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      poster={basePath + "/resources/poster_images/offline.webp"}
                      className="absolute inset-0 w-full h-full object-cover rounded-xl z-10"
                      onPlaying={(e) => e.currentTarget.previousElementSibling?.classList.add("opacity-0")}
                    >
                      <source src={basePath + "/resources/videos/offline.mp4"} type="video/mp4" />
                    </video>
                  </div>
                </div>
                <div className={getContainerClass("offline", "laptop")}>
                  <div className="relative w-full max-w-2xl group">
                    <div className="relative rounded-t-xl border-[4px] md:border-[8px] lg:border-[12px] border-zinc-900 bg-zinc-900 aspect-[16/10] overflow-hidden shadow-2xl">
                      <div className="absolute inset-0 bg-white flex flex-col">
                        <div className="absolute inset-0 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={basePath + "/resources/poster_images/offline_laptop.webp"}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-300 pointer-events-none"
                          />
                          <video
                            width={1920}
                            height={1200}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            poster={basePath + "/resources/poster_images/offline_laptop.webp"}
                            className="w-full h-full object-cover"
                            onPlaying={(e) => e.currentTarget.previousElementSibling?.classList.add("opacity-0")}
                          >
                            <source src={basePath + "/resources/videos/offline_laptop.mp4"} type="video/mp4" />
                          </video>
                        </div>
                      </div>
                    </div>
                    <div className="relative h-4 bg-zinc-800 rounded-b-xl w-[105%] -left-[2.5%] shadow-xl"></div>
                    <div className="relative h-2 bg-zinc-700/50 rounded-b-2xl w-[80%] mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-only Explore Button */}
          <div className="pt-8 flex justify-center sm:hidden w-full">
            <Link
              href="/features/offline-transactions"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-800 transition-all hover:shadow-lg hover:scale-105 active:scale-95 duration-300"
            >
              <span>Explore More</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Dynamic Dashboards Section */}
      <section id="dynamic-dashboards" className="py-16 md:py-24 lg:py-32 px-6 md:px-16 lg:px-24 bg-gradient-to-bl from-[#f4f7ff] via-[#E6ECFD] to-[#f4f7ff] border-b border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left Column: Screen */}
            <div className="order-2 lg:order-1 flex items-center justify-center w-full reveal-on-scroll reveal-fade-in-left">
              <div className="relative w-full max-w-2xl group">
                <div className="relative rounded-t-xl border-[4px] md:border-[8px] lg:border-[12px] border-zinc-900 bg-zinc-900 aspect-[16/10] overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-white flex flex-col">
                    <div className="absolute inset-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={basePath + "/resources/poster_images/dash.webp"}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-300 pointer-events-none"
                      />
                      <video
                        width={1920}
                        height={1200}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        poster={basePath + "/resources/poster_images/dash.webp"}
                        className="w-full h-full object-cover"
                        onPlaying={(e) => e.currentTarget.previousElementSibling?.classList.add("opacity-0")}
                      >
                        <source src={basePath + "/resources/videos/dash.mp4"} type="video/mp4" />
                      </video>
                    </div>
                  </div>
                </div>
                <div className="relative h-4 bg-zinc-800 rounded-b-xl w-[105%] -left-[2.5%] shadow-xl"></div>
                <div className="relative h-2 bg-zinc-700/50 rounded-b-2xl w-[80%] mx-auto"></div>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="order-1 lg:order-2 space-y-12 reveal-on-scroll reveal-fade-up">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2">
                  <div className="h-px w-8 bg-[#1f3a89]"></div>
                  <span className="text-[#1f3a89] font-bold headline-font uppercase tracking-widest text-sm">Business Intelligence</span>
                </div>
                <h2 className="headline-font text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface leading-tight">
                  Dynamic Dashboards
                </h2>
                <h3 className="headline-font text-lg md:text-xl lg:text-2xl font-semibold text-primary">
                  Turn your Tally data into real-time business intelligence.
                </h3>
                <p className="text-on-surface-variant font-body text-base md:text-lg leading-relaxed max-w-2xl">
                  Get a complete, visual overview of your business with interactive dashboards that update instantly based on your selections.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
                <div className="space-y-6">
                  <h4 className="headline-font font-bold text-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-brand-accent">query_stats</span>
                    What you can do
                  </h4>
                  <ul className="space-y-4 font-body text-on-surface-variant">
                    {[
                      "Monitor sales, profitability, and inventory trends",
                      "Track receivables and cash flow in real time",
                      "Drill down by customer, product, region, or salesperson",
                      "Identify high-performing and underperforming areas",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="headline-font font-bold text-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-brand-accent">rocket_launch</span>
                    Why it matters
                  </h4>
                  <ul className="space-y-4 font-body text-on-surface-variant">
                    {[
                      "Make faster, data-driven decisions",
                      "Spot trends and risks early",
                      "Improve sales performance and inventory planning",
                      "Move from reactive reporting to proactive strategy",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pt-4 hidden sm:block">
                <Link
                  href="/features/dynamic-dashboards"
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-800 transition-all hover:shadow-lg hover:scale-105 active:scale-95 duration-300"
                >
                  <span>Explore More</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile-only Explore Button */}
          <div className="pt-8 flex justify-center sm:hidden w-full">
            <Link
              href="/features/dynamic-dashboards"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-800 transition-all hover:shadow-lg hover:scale-105 active:scale-95 duration-300"
            >
              <span>Explore More</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Payments & Collections Section */}
      <section id="payments-collections" className="py-16 md:py-24 lg:py-32 px-6 md:px-16 lg:px-24 bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left Column: Content */}
            <div className="space-y-12 reveal-on-scroll reveal-fade-up">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2">
                  <div className="h-px w-8 bg-[#1f3a89]"></div>
                  <span className="text-[#1f3a89] font-bold headline-font uppercase tracking-widest text-sm">Transaction Management</span>
                </div>
                <h2 className="headline-font text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface leading-tight">
                  Payments & Collections
                </h2>
                <h3 className="headline-font text-lg md:text-xl lg:text-2xl font-semibold text-primary">
                  Take Control of Cash Flow — From Anywhere
                </h3>
                <p className="text-on-surface-variant font-body text-base md:text-lg leading-relaxed max-w-2xl">
                  Capture, approve, and record every payment, expense, and collection directly into Tally — without delays, paperwork, or back-and-forth. Whether your team is in the field or at the office, ensure every financial transaction is tracked, verified, and updated in real time.
                </p>
                <p className="text-on-surface-variant font-body text-base md:text-lg leading-relaxed max-w-2xl">
                  Seamlessly submit and manage expense claims, vendor payments, and customer collections — all flowing through structured approval workflows before being finalized in Tally.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
                <div className="space-y-6">
                  <h4 className="headline-font font-bold text-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-brand-accent">payments</span>
                    What you can do
                  </h4>
                  <ul className="space-y-4 font-body text-on-surface-variant">
                    {[
                      "Submit expenses, payments, and collections from mobile or desktop",
                      "Attach bills and supporting documents",
                      "Send entries for approval before posting",
                      "Track status in real time",
                      "Record transactions in Tally after approval",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="headline-font font-bold text-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-brand-accent">trending_up</span>
                    Why it matters
                  </h4>
                  <ul className="space-y-4 font-body text-on-surface-variant">
                    {[
                      "Faster collections and better cash flow visibility",
                      "Reduced manual errors and missing documentation",
                      "Streamlined approvals with full control",
                      "Clear audit trail for every transaction",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pt-4 hidden sm:block">
                <Link
                  href="/features/payments-collections"
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-800 transition-all hover:shadow-lg hover:scale-105 active:scale-95 duration-300"
                >
                  <span>Explore More</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Media Container */}
            <div className="h-full flex flex-col items-center justify-center reveal-on-scroll reveal-fade-in-right w-full">
              {renderToggleButtons("payments")}
              <div className="grid w-full items-center">
                <div className={getContainerClass("payments", "mobile")}>
                  <div className="w-full max-w-[280px] aspect-[9/19] bg-zinc-900 rounded-2xl border-[10px] border-zinc-900 shadow-2xl relative overflow-hidden group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={basePath + "/resources/poster_images/collections.webp"}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-300 pointer-events-none"
                    />
                    <video
                      width={720}
                      height={1600}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      poster={basePath + "/resources/poster_images/collections.webp"}
                      className="absolute inset-0 w-full h-full object-cover rounded-xl z-10"
                      onPlaying={(e) => e.currentTarget.previousElementSibling?.classList.add("opacity-0")}
                    >
                      <source src={basePath + "/resources/videos/collections.mp4"} type="video/mp4" />
                    </video>
                  </div>
                </div>
                <div className={getContainerClass("payments", "laptop")}>
                  <div className="relative w-full max-w-2xl group">
                    <div className="relative rounded-t-xl border-[4px] md:border-[8px] lg:border-[12px] border-zinc-900 bg-zinc-900 aspect-[16/10] overflow-hidden shadow-2xl">
                      <div className="absolute inset-0 bg-white flex flex-col">
                        <div className="absolute inset-0 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={basePath + "/resources/poster_images/collections_laptop.webp"}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-300 pointer-events-none"
                          />
                          <video
                            width={1920}
                            height={1200}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            poster={basePath + "/resources/poster_images/collections_laptop.webp"}
                            className="w-full h-full object-cover"
                            onPlaying={(e) => e.currentTarget.previousElementSibling?.classList.add("opacity-0")}
                          >
                            <source src={basePath + "/resources/videos/collections_laptop.mp4"} type="video/mp4" />
                          </video>
                        </div>
                      </div>
                    </div>
                    <div className="relative h-4 bg-zinc-800 rounded-b-xl w-[105%] -left-[2.5%] shadow-xl"></div>
                    <div className="relative h-2 bg-zinc-700/50 rounded-b-2xl w-[80%] mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile-only Explore Button */}
          <div className="pt-8 flex justify-center sm:hidden w-full">
            <Link
              href="/features/payments-collections"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-800 transition-all hover:shadow-lg hover:scale-105 active:scale-95 duration-300"
            >
              <span>Explore More</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stock Summary Section */}
      <section id="stock-summary" className="py-16 md:py-24 lg:py-32 px-6 md:px-16 lg:px-24 bg-gradient-to-br from-[#E6ECFD] to-[#f4f7ff] border-b border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left Column: Media Container */}
            <div className="order-2 lg:order-1 h-full flex flex-col items-center justify-center reveal-on-scroll reveal-fade-in-left w-full">
              {renderToggleButtons("stock")}
              <div className="grid w-full items-center">
                <div className={getContainerClass("stock", "mobile")}>
                  <div className="w-full max-w-[280px] aspect-[9/19] bg-zinc-900 rounded-2xl border-[10px] border-zinc-900 shadow-2xl relative overflow-hidden group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={basePath + "/resources/poster_images/stock.webp"}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-300 pointer-events-none"
                    />
                    <video
                      width={720}
                      height={1600}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      poster={basePath + "/resources/poster_images/stock.webp"}
                      className="absolute inset-0 w-full h-full object-cover rounded-xl z-10"
                      onPlaying={(e) => e.currentTarget.previousElementSibling?.classList.add("opacity-0")}
                    >
                      <source src={basePath + "/resources/videos/stock.mp4"} type="video/mp4" />
                    </video>
                  </div>
                </div>
                <div className={getContainerClass("stock", "laptop")}>
                  <div className="relative w-full max-w-2xl group">
                    <div className="relative rounded-t-xl border-[4px] md:border-[8px] lg:border-[12px] border-zinc-900 bg-zinc-900 aspect-[16/10] overflow-hidden shadow-2xl">
                      <div className="absolute inset-0 bg-white flex flex-col">
                        <div className="absolute inset-0 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={basePath + "/resources/poster_images/stock_laptop.webp"}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-300 pointer-events-none"
                          />
                          <video
                            width={1920}
                            height={1200}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            poster={basePath + "/resources/poster_images/stock_laptop.webp"}
                            className="w-full h-full object-cover"
                            onPlaying={(e) => e.currentTarget.previousElementSibling?.classList.add("opacity-0")}
                          >
                            <source src={basePath + "/resources/videos/stock_laptop.mp4"} type="video/mp4" />
                          </video>
                        </div>
                      </div>
                    </div>
                    <div className="relative h-4 bg-zinc-800 rounded-b-xl w-[105%] -left-[2.5%] shadow-xl"></div>
                    <div className="relative h-2 bg-zinc-700/50 rounded-b-2xl w-[80%] mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="order-1 lg:order-2 space-y-12 reveal-on-scroll reveal-fade-up">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2">
                  <div className="h-px w-8 bg-[#1f3a89]"></div>
                  <span className="text-[#1f3a89] font-bold headline-font uppercase tracking-widest text-sm">Inventory Visibility</span>
                </div>
                <h2 className="headline-font text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface leading-tight">
                  Stock Summary
                </h2>
                <h3 className="headline-font text-lg md:text-xl lg:text-2xl font-semibold text-primary">
                  See your inventory position in real time — from anywhere.
                </h3>
                <p className="text-on-surface-variant font-body text-base md:text-lg leading-relaxed max-w-2xl">
                  Get an instant view of inventory quantities and values across stock groups, categories, items, and locations. Powered directly by live Tally data, Stock Summary helps teams make faster purchasing, sales, and inventory planning decisions.
                </p>
                <p className="text-on-surface-variant font-body text-base md:text-lg leading-relaxed max-w-2xl">
                  Monitor inventory movement, identify shortages early, and gain visibility across multiple godowns without being tied to the office.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
                <div className="space-y-6">
                  <h4 className="headline-font font-bold text-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-brand-accent">inventory_2</span>
                    What you can do
                  </h4>
                  <ul className="space-y-4 font-body text-on-surface-variant">
                    {[
                      "View stock quantities and values by group or category",
                      "Monitor inventory across multiple godowns and locations",
                      "Track incoming and outgoing stock movement",
                      "Identify low-stock items before shortages occur",
                      "Compare inventory levels across product groups",
                      "Access inventory insights from mobile or desktop",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="headline-font font-bold text-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-brand-accent">trending_up</span>
                    Why it matters
                  </h4>
                  <ul className="space-y-4 font-body text-on-surface-variant">
                    {[
                      "Improve inventory planning and purchasing decisions",
                      "Reduce stockouts and overstock situations",
                      "Support faster sales and order approvals",
                      "Gain real-time visibility into inventory health",
                      "Make better operational decisions using live Tally data",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pt-4 hidden sm:block">
                <Link
                  href="/features/stock-summary"
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-800 transition-all hover:shadow-lg hover:scale-105 active:scale-95 duration-300"
                >
                  <span>Explore More</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile-only Explore Button */}
          <div className="pt-8 flex justify-center sm:hidden w-full">
            <Link
              href="/features/stock-summary"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-800 transition-all hover:shadow-lg hover:scale-105 active:scale-95 duration-300"
            >
              <span>Explore More</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Custom Reports Section */}
      <section id="custom-reports" className="py-16 md:py-24 lg:py-32 px-6 md:px-16 lg:px-24 bg-white border-b border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Left Column: Content */}
            <div className="space-y-12 reveal-on-scroll reveal-fade-up">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2">
                  <div className="h-px w-8 bg-[#1f3a89]"></div>
                  <span className="text-[#1f3a89] font-bold headline-font uppercase tracking-widest text-sm">Reporting Engine</span>
                </div>
                <h2 className="headline-font text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface leading-tight">
                  Custom Reports
                </h2>
                <h3 className="headline-font text-lg md:text-xl lg:text-2xl font-semibold text-primary">
                  Build the Exact Report You Need — In Minutes
                </h3>
                <p className="text-on-surface-variant font-body text-base md:text-lg leading-relaxed max-w-2xl">
                  Create powerful, flexible reports tailored to your business — without Excel, without formulas, and without depending on support.
                </p>
                <p className="text-on-surface-variant font-body text-base md:text-lg leading-relaxed max-w-2xl">
                  With DataLynkr’s Custom Reports, you can design your own reports using a simple drag-and-drop interface, powered by live Tally data. Whether you’re analyzing sales, tracking inventory, or reviewing financials, get exactly the view you need — instantly.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
                <div className="space-y-6">
                  <h4 className="headline-font font-bold text-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-brand-accent">grid_view</span>
                    What you can do
                  </h4>
                  <ul className="space-y-4 font-body text-on-surface-variant">
                    {[
                      "Create reports using drag-and-drop",
                      "Arrange fields into rows and columns",
                      "Apply filters for focused analysis",
                      "Access live data — no exports needed",
                      "Save and reuse report formats",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="headline-font font-bold text-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-brand-accent">insights</span>
                    Why it matters
                  </h4>
                  <ul className="space-y-4 font-body text-on-surface-variant">
                    {[
                      "No dependency on Excel or support teams",
                      "Get instant answers to business questions",
                      "Flexible reporting tailored to your needs",
                      "Faster, data-driven decision-making",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-brand-accent font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pt-4 hidden sm:block">
                <Link
                  href="/features/custom-reports"
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-800 transition-all hover:shadow-lg hover:scale-105 active:scale-95 duration-300"
                >
                  <span>Explore More</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Laptop Mockup */}
            <div className="flex items-center justify-center w-full reveal-on-scroll reveal-fade-in-right">
              <div className="relative w-full max-w-2xl group">
                <div className="relative rounded-t-xl border-[4px] md:border-[8px] lg:border-[12px] border-zinc-900 bg-zinc-900 aspect-[16/10] overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-white flex flex-col">
                    <div className="absolute inset-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={basePath + "/resources/poster_images/dealer_growth.webp"}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-300 pointer-events-none"
                      />
                      <video
                        width={1920}
                        height={1200}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        poster={basePath + "/resources/poster_images/dealer_growth.webp"}
                        className="w-full h-full object-cover"
                        onPlaying={(e) => e.currentTarget.previousElementSibling?.classList.add("opacity-0")}
                      >
                        <source src={basePath + "/resources/videos/dealer_growth.mp4"} type="video/mp4" />
                      </video>
                    </div>
                  </div>
                </div>
                <div className="relative h-4 bg-zinc-800 rounded-b-xl w-[105%] -left-[2.5%] shadow-xl"></div>
                <div className="relative h-2 bg-zinc-700/50 rounded-b-2xl w-[80%] mx-auto"></div>
              </div>
            </div>
          </div>

          {/* Mobile-only Explore Button */}
          <div className="pt-8 flex justify-center sm:hidden w-full">
            <Link
              href="/features/custom-reports"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-zinc-800 transition-all hover:shadow-lg hover:scale-105 active:scale-95 duration-300"
            >
              <span>Explore More</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Second Analytics Section */}
      <section className="py-16 md:py-24 lg:py-32 px-6 md:px-16 lg:px-24 bg-gradient-to-br from-slate-900 via-[#0a142e] to-slate-900 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-20 items-start">
            <div className="md:w-1/3 reveal-on-scroll reveal-fade-up">
              <h2 className="headline-font text-3xl md:text-4xl font-bold text-white leading-tight">Lightning Quick</h2>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
              <div className="space-y-4 reveal-on-scroll reveal-fade-up delay-200">
                <div className="h-1 w-12 bg-white"></div>
                <h3 className="headline-font font-bold text-xl text-white">Real-time Sync</h3>
                <p className="text-white/80 font-body leading-relaxed">
                  Your Tally data is synchronized instantly, providing your sales team with accurate inventory and ledger balances the moment they need it.
                </p>
              </div>
              <div className="space-y-4 reveal-on-scroll reveal-fade-up delay-200">
                <div className="h-1 w-12 bg-white"></div>
                <h3 className="headline-font font-bold text-xl text-white">Zero Latency</h3>
                <p className="text-white/80 font-body leading-relaxed">
                  Built on architectural principles of speed. No more waiting for end-of-day reports. View pending orders and outstanding amounts instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Bento Grid */}
      <section className="py-16 md:py-24 lg:py-32 px-6 md:px-16 lg:px-24 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <span className="text-primary font-bold tracking-widest text-sm">ECOSYSTEM</span>
            <h2 className="headline-font text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface">
              Designed for <span className="text-primary">Your</span> Growth.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Row 1: Large Feature + Side Box */}
            <div className="md:col-span-8 bg-surface-container rounded-xl p-8 md:p-12 flex flex-col justify-between overflow-hidden relative group min-h-[300px] md:min-h-[400px]">
              <div className="relative z-10 space-y-4">
                <h3 className="headline-font text-3xl font-bold">Sales Intelligence</h3>
                <p className="max-w-md text-on-surface-variant">
                  Empower your field agents with customer outstandings, credit limit and purchase history directly during client meetings.
                </p>
              </div>
              <div className="absolute right-0 bottom-0 w-2/3 h-2/3 translate-x-1/4 translate-y-1/4 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <span className="material-symbols-outlined text-[300px]">monitoring</span>
              </div>
            </div>
            <div className="md:col-span-4 bg-[#1F3A89] rounded-xl p-8 md:p-12 flex flex-col justify-end text-white overflow-hidden relative min-h-[300px] md:min-h-[400px]">
              <div className="relative z-10 space-y-4">
                <h3 className="headline-font text-3xl font-bold">Secure Access</h3>
                <p className="opacity-80">No data gets stored outside your Tally or your devices!</p>
              </div>
              <div className="absolute top-10 left-10">
                <span className="material-symbols-outlined text-6xl opacity-20">verified_user</span>
              </div>
            </div>
            {/* Row 2: Medium Boxes */}
            <div className="md:col-span-4 bg-black rounded-xl p-8 md:p-12 flex flex-col justify-between text-white min-h-[250px] md:min-h-[300px]">
              <span className="material-symbols-outlined text-4xl text-white">devices</span>
              <h3 className="headline-font text-2xl font-bold">Cross-Platform Compatibility</h3>
            </div>
            <div className="md:col-span-4 bg-surface-container-highest rounded-xl p-8 md:p-12 flex flex-col justify-between text-on-surface min-h-[250px] md:min-h-[300px]">
              <span className="material-symbols-outlined text-4xl text-primary">auto_awesome</span>
              <h3 className="headline-font text-2xl font-bold">Predictive Insights</h3>
            </div>
            <a
              href="/resources/Brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="md:col-span-4 bg-zinc-900 rounded-xl p-8 md:p-12 flex flex-col justify-between text-white cursor-pointer hover:bg-zinc-800 transition-colors group min-h-[250px] md:min-h-[300px]"
            >
              <span className="material-symbols-outlined text-4xl group-hover:translate-x-2 transition-transform">trending_flat</span>
              <h3 className="headline-font text-2xl font-bold">View all Features</h3>
            </a>
            {/* Row 3: Full Width Bottom Box */}
            <div className="md:col-span-12 bg-surface-container-highest rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 min-h-[200px] md:min-h-[250px]">
              <div className="md:w-2/3">
                <h3 className="headline-font text-3xl font-bold">Simplified Workflow</h3>
                <p className="text-on-surface-variant mt-4">
                  Remove the friction between your sales floor and the accounting desk by automating routine approvals and data entry.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-end">
                <div className="w-32 h-32 rounded-full border-4 border-primary border-t-transparent animate-spin-slow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </>
  );
}
