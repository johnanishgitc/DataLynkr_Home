"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type FormState = {
  name: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  referred: string;
  inquiryType: string;
  message: string;
};

const initialFormState: FormState = {
  name: "",
  companyName: "",
  phoneNumber: "",
  email: "",
  referred: "",
  inquiryType: "",
  message: "",
};

export default function ContactClient() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ message: string; ticketNo?: string } | null>(null);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
    if (success) setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("https://itcatalystindia.com/Development/CustomerPortal_API/api/customer-engagement/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message ?? "Failed to submit your request. Please try again.");
        return;
      }

      setSuccess({
        message: data.message ?? "Demo request created successfully",
        ticketNo: data.data?.ticket_no,
      });
      setForm(initialFormState);
    } catch {
      setError("Unable to submit your request. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-slate-900 antialiased min-h-screen flex flex-col pt-20">
      {/* Navbar */}
      <Navbar showHomeIcon={true} />

      {/* Main Content */}
      <main className="md:py-20 lg:py-24 px-6 md:px-10 lg:px-12 max-w-7xl mx-auto flex-grow flex flex-col justify-center w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left Side: Header & Info */}
          <div className="space-y-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="space-y-6">
              <h1 className="headline-font text-5xl md:text-7xl font-normal text-slate-900 tracking-tight">
                Talk to us
              </h1>
              <p className="text-xl md:text-2xl text-primary font-medium headline-font italic">
                “See DataLynkr in action”
              </p>
            </div>

            <div className="space-y-8 bg-[#E6ECFD] p-8 md:p-10 rounded-2xl border border-slate-200">
              <h2 className="headline-font text-2xl font-bold text-slate-900">
                Direct contact details
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary mt-1">mail</span>
                  <div>
                    <p className="font-bold text-slate-900">Email us</p>
                    <a href="mailto:sales@datalynkr.com" className="text-primary hover:underline">
                      sales@datalynkr.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary mt-1">phone_iphone</span>
                  <div>
                    <p className="font-bold text-slate-900">Call / WhatsApp</p>
                    <a href="tel:+919741911520" className="text-primary hover:underline">
                      +91 9741911520
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary mt-1">location_on</span>
                  <div>
                    <p className="font-bold text-slate-900">Office location</p>
                    <p className="text-slate-600">
                      278, MK, Puttalingiah Rd, Padmanabhanagar, Bengaluru, Karnataka 560070
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-200">
                <p className="text-slate-500 italic font-medium">
                  “Built by experts with 30+ years in Tally solutions”
                </p>
              </div>
            </div>
            <div className="mt-8 text-center lg:text-left">
              <p className="text-slate-600">
                Already a customer?{" "}
                <Link href="/support" className="text-primary font-bold hover:underline">
                  Visit Support
                </Link>
              </p>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div
            className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100 space-y-8 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <h3 className="headline-font text-2xl font-bold text-slate-900">Get a Free Demo</h3>

            {success && (
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-800">
                <p className="font-semibold">{success.message}</p>
                {success.ticketNo && (
                  <p className="mt-1 text-sm">Your reference number: {success.ticketNo}</p>
                )}
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                {error}
              </div>
            )}

            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  required
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all bg-slate-50 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Company name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Organization name"
                  required
                  value={form.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all bg-slate-50 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 ..."
                    required
                    value={form.phoneNumber}
                    onChange={(e) => updateField("phoneNumber", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all bg-slate-50 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="you@work.com"
                    required
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all bg-slate-50 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Were you Referred?
                </label>
                <input
                  type="text"
                  placeholder="Name of the Person and Company"
                  value={form.referred}
                  onChange={(e) => updateField("referred", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all bg-slate-50 placeholder-slate-400 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Inquiry type <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={form.inquiryType}
                  onChange={(e) => updateField("inquiryType", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all bg-slate-50 text-slate-900"
                >
                  <option value="" disabled>
                    Select inquiry type
                  </option>
                  <option value="Request demo">Request demo</option>
                  <option value="Pricing">Pricing</option>
                  <option value="Partnership">Partnership</option>
                  <option value="General query">General query</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="How can we help you?"
                  required
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all bg-slate-50 text-slate-900"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-[#1a3175] transform transition-all active:scale-[0.98] shadow-lg shadow-primary/20 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
