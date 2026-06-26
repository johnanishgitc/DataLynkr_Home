"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FaqSection from "@/components/FaqSection";
import { SUPPORT_FAQ } from "@/lib/seo";

const API_BASE = "https://itcatalystindia.com/Development/CustomerPortal_API";
const S3_BASE_URL = "https://s3.ap-south-2.amazonaws.com/datalynkr.images";
const MAX_FILE_SIZE = 10 * 1024 * 1024;

type FormState = {
  name: string;
  companyName: string;
  registeredEmail: string;
  phoneNumber: string;
  description: string;
};

const initialFormState: FormState = {
  name: "",
  companyName: "",
  registeredEmail: "",
  phoneNumber: "",
  description: "",
};

export default function SupportClient() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [issueCategory, setIssueCategory] = useState("");
  const [priority, setPriority] = useState("Low");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ message: string; ticketNo?: string } | null>(null);
  const [navVisible, setNavVisible] = useState(true);

  const ticketFormRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll logic for navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const customerSupportBadge = document.getElementById("customer-support-badge");
      if (!customerSupportBadge) return;
      const badgeBottom = customerSupportBadge.getBoundingClientRect().bottom + window.scrollY;
      if (window.scrollY > badgeBottom) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategoryPillClick = (categoryText: string) => {
    setIssueCategory(categoryText);
    if (success) setSuccess(null);
    if (ticketFormRef.current) {
      ticketFormRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
    if (success) setSuccess(null);
  };

  const setFile = (file: File | null) => {
    if (file && file.size > MAX_FILE_SIZE) {
      setError("File must be 10MB or smaller.");
      return;
    }
    setSelectedFile(file);
    if (error) setError("");
    if (success) setSuccess(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      if (fileInputRef.current) {
        fileInputRef.current.files = e.dataTransfer.files;
      }
    }
  };

  const uploadAttachment = async (file: File) => {
    const fileType = file.type || "application/octet-stream";

    const uploadUrlResponse = await fetch(`${API_BASE}/api/images/support-ticket/upload-url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: file.name,
        fileType,
        type: "SupportTicket",
      }),
    });

    const uploadUrlData = await uploadUrlResponse.json();
    if (!uploadUrlResponse.ok || !uploadUrlData.uploadUrl || !uploadUrlData.key) {
      throw new Error(uploadUrlData.message ?? "Failed to prepare file upload.");
    }

    const s3Response = await fetch(uploadUrlData.uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": fileType },
      body: file,
    });

    if (!s3Response.ok) {
      throw new Error("Failed to upload file. Please try again.");
    }

    const confirmResponse = await fetch(`${API_BASE}/api/images/support-ticket/confirm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        s3Key: uploadUrlData.key,
        type: "SupportTicket",
        fileType,
      }),
    });

    const confirmData = await confirmResponse.json();
    if (!confirmResponse.ok || confirmData.status !== "success") {
      throw new Error(confirmData.message ?? "Failed to confirm file upload.");
    }

    return {
      s3Key: uploadUrlData.key as string,
      s3Url: `${S3_BASE_URL}/${uploadUrlData.key}`,
      fileName: file.name,
      mimeType: fileType,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(null);
    setIsSubmitting(true);

    try {
      let attachment: {
        s3Key: string;
        s3Url: string;
        fileName: string;
        mimeType: string;
      } | null = null;

      if (selectedFile) {
        attachment = await uploadAttachment(selectedFile);
      }

      const payload = {
        name: form.name,
        companyName: form.companyName,
        registeredEmail: form.registeredEmail,
        phoneNumber: form.phoneNumber,
        issueCategory,
        priority,
        description: form.description,
        ...(attachment ?? {}),
      };

      const response = await fetch(`${API_BASE}/api/customer-engagement/support-tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message ?? "Failed to submit your support ticket. Please try again.");
        return;
      }

      setSuccess({
        message: data.message ?? "Support ticket created successfully",
        ticketNo: data.data?.ticket_no,
      });
      setForm(initialFormState);
      setIssueCategory("");
      setPriority("Low");
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit your ticket. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryPills = [
    "Login Issues",
    "Order Placement",
    "Tally Data Sync",
    "Approval Workflow",
    "Dashboards & Reports",
    "User Permissions",
  ];

  return (
    <div className="bg-white text-on-surface antialiased overflow-x-hidden min-h-screen">
      {/* Navbar with smooth slide-up effect */}
      <Navbar
        showCenterBrand={true}
        showLoginButton={true}
        showHomeIcon={false}
        surfaceNav
        className={`transition-transform duration-300 ${navVisible ? "translate-y-0" : "-translate-y-full"}`}
      />

      <main>
        {/* HERO SECTION */}
        <section className="pt-32 md:pt-48 px-6 md:px-16 lg:px-24 pb-16 md:pb-24 bg-gradient-to-b from-surface-container to-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <span
                  id="customer-support-badge"
                  className="inline-block py-1 px-3 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  Customer Support
                </span>
                <h1 className="headline-font text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-primary">
                  We’re Here to Help — <span className="text-black">Anytime You Need It</span>
                </h1>
                <p className="text-lg md:text-xl text-[#5b403d] max-w-xl leading-relaxed">
                  Get quick support for your DataLynkr setup, users, workflows, or troubleshooting.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() =>
                    ticketFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-center hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-95 w-full sm:w-auto cursor-pointer"
                >
                  Raise a Support Ticket
                </button>
                <Link
                  href="/contact"
                  className="border-2 border-primary/20 text-primary px-8 py-4 rounded-xl font-bold text-center hover:bg-primary/5 transition-all active:scale-95 w-full sm:w-auto"
                >
                  Contact Support
                </Link>
              </div>
            </div>
            <div className="relative flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="shrink-0 size-[320px] sm:size-[380px] md:size-[440px] lg:size-[500px] mx-auto rounded-[50%] bg-primary/5 flex items-center justify-center p-8 border border-primary/10 relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-accent/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
                <span className="material-symbols-outlined support-hero-icon text-primary/20">
                  support_agent
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* QUICK ACTION CARDS */}
        <section className="px-6 md:px-16 lg:px-24 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <div
                className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-100 shadow-sm card-hover flex flex-col h-full animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                  <span className="material-symbols-outlined text-3xl">confirmation_number</span>
                </div>
                <h3 className="headline-font text-xl font-bold mb-3">Raise a Ticket</h3>
                <p className="text-[#5b403d] mb-6 flex-grow">
                  Submit your issue and our team will get back to you quickly.
                </p>
                <button
                  onClick={() =>
                    ticketFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="text-primary font-bold flex items-center gap-2 group text-left cursor-pointer"
                >
                  Create Ticket{" "}
                  <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </button>
              </div>
              {/* Card 2 */}
              <div
                className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-100 shadow-sm card-hover flex flex-col h-full animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 text-green-600">
                  <span className="material-symbols-outlined text-3xl">phone_in_talk</span>
                </div>
                <h3 className="headline-font text-xl font-bold mb-3">Call Support</h3>
                <p className="text-[#5b403d] mb-6 flex-grow">
                  Talk directly to our support team for urgent assistance.
                </p>
                <a href="tel:+919741911520" className="text-green-600 font-bold flex items-center gap-2 group">
                  Call Now{" "}
                  <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">
                    call
                  </span>
                </a>
              </div>
              {/* Card 3 */}
              <div
                className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-100 shadow-sm card-hover flex flex-col h-full animate-fade-in"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="w-14 h-14 bg-[#25D366]/10 rounded-xl flex items-center justify-center mb-6 text-[#25D366]">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.41 0 .011 5.399.007 12.042c0 2.123.555 4.197 1.613 6.041L0 24l6.105-1.602a11.832 11.832 0 005.937 1.583h.005c6.639 0 12.04-5.4 12.045-12.042a11.82 11.82 0 00-3.483-8.455" />
                  </svg>
                </div>
                <h3 className="headline-font text-xl font-bold mb-3">WhatsApp</h3>
                <p className="text-[#5b403d] mb-6 flex-grow">
                  Get quick help on WhatsApp and stay updated on the go.
                </p>
                <a href="https://wa.me/9741911520" className="text-[#25D366] font-bold flex items-center gap-2 group">
                  Chat Now{" "}
                  <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">
                    chat
                  </span>
                </a>
              </div>
              {/* Card 4 */}
              <div
                className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-100 shadow-sm card-hover flex flex-col h-full animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 text-amber-600">
                  <span className="material-symbols-outlined text-3xl">mail</span>
                </div>
                <h3 className="headline-font text-xl font-bold mb-3">Email Support</h3>
                <p className="text-[#5b403d] mb-6 flex-grow">
                  Write to us and we’ll respond within 24 hours.
                </p>
                <a href="mailto:support@datalynkr.com" className="text-amber-600 font-bold flex items-center gap-2 group">
                  Send Email{" "}
                  <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">
                    send
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ISSUE CATEGORY SECTION */}
        <section className="px-6 md:px-16 lg:px-24 py-16 bg-surface-container/30">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="headline-font text-3xl font-bold mb-10 text-slate-800">What do you need help with?</h2>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {categoryPills.map((category) => {
                const isActive = issueCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryPillClick(category)}
                    className={`px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base border rounded-full font-medium transition-all shadow-sm active:scale-95 cursor-pointer ${
                      isActive
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-on-surface border-slate-200 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* SUPPORT TICKET FORM */}
        <section id="ticket-form" ref={ticketFormRef} className="px-6 md:px-16 lg:px-24 py-16">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
              <div className="bg-primary p-6 md:p-8 text-white relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <h2 className="headline-font text-2xl md:text-3xl font-bold relative z-10">Submit a Support Ticket</h2>
                <p className="text-white/80 mt-2 relative z-10">Please provide the details below and we'll get right on it.</p>
              </div>
              <form className="p-6 lg:p-12 md:p-8 space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                    <p className="font-semibold">{success.message}</p>
                    {success.ticketNo && (
                      <p className="mt-1">
                        Ticket number: <span className="font-bold">{success.ticketNo}</span>
                      </p>
                    )}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Full Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all text-slate-900"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Company Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={form.companyName}
                      onChange={(e) => updateField("companyName", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all text-slate-900"
                      placeholder="Your Company"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Registered Email <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      required
                      value={form.registeredEmail}
                      onChange={(e) => updateField("registeredEmail", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all text-slate-900"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Phone Number <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      required
                      value={form.phoneNumber}
                      onChange={(e) => updateField("phoneNumber", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all text-slate-900"
                      placeholder="+91 XXXXXXXXXX"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Issue Category <span className="text-red-500">*</span></label>
                    <select
                      value={issueCategory}
                      onChange={(e) => {
                        setIssueCategory(e.target.value);
                        if (success) setSuccess(null);
                      }}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all text-slate-900 bg-white"
                    >
                      <option value="" disabled>Select Category</option>
                      <option value="Login Issues">Login Issues</option>
                      <option value="Order Placement">Order Placement</option>
                      <option value="Tally Data Sync">Tally Data Sync</option>
                      <option value="Approval Workflow">Approval Workflow</option>
                      <option value="Dashboards & Reports">Dashboards & Reports</option>
                      <option value="User Permissions">User Permissions</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Priority <span className="text-red-500">*</span></label>
                    <div className="flex gap-4 p-1 bg-slate-100 rounded-xl">
                      {["Low", "Medium", "High"].map((lvl) => {
                        const isSelected = priority === lvl;
                        return (
                          <button
                            type="button"
                            key={lvl}
                            onClick={() => {
                              setPriority(lvl);
                              if (success) setSuccess(null);
                            }}
                            className={`flex-1 text-center py-2 rounded-lg cursor-pointer font-bold text-xs transition-all duration-200 ${
                              isSelected
                                ? "bg-white text-slate-800 shadow-sm"
                                : "text-slate-500 hover:bg-white/50"
                            }`}
                          >
                            {lvl}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Description <span className="text-red-500">*</span></label>
                  <textarea
                    rows={4}
                    required
                    value={form.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all text-slate-900"
                    placeholder="Tell us more about the issue you're facing..."
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Upload Screenshot</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*,application/pdf"
                  />
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-primary/50 transition-all cursor-pointer group bg-slate-50/50"
                  >
                    <span className="material-symbols-outlined text-4xl text-slate-400 group-hover:text-primary transition-colors">
                      cloud_upload
                    </span>
                    <p className="text-sm text-slate-500 mt-2">
                      {selectedFile ? (
                        <>
                          Selected: <span className="text-primary font-bold">{selectedFile.name}</span>
                        </>
                      ) : (
                        <>
                          Drag and drop or <span className="text-primary font-bold underline">click to upload</span>
                        </>
                      )}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">PNG, JPG or PDF up to 10MB</p>
                  </div>
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-zinc-800 transition-all shadow-xl shadow-black/20 active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Ticket"}
                  </button>
                  <p className="text-center text-xs text-[#5b403d] mt-4">
                    Our team typically responds within <span className="font-bold text-primary">24 hours</span>.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* SUPPORT CONTACT INFO */}
        <section className="px-6 md:px-16 lg:px-24 py-16 bg-white border-y border-slate-100">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div className="space-y-3">
                <h4 className="font-bold text-primary text-sm uppercase tracking-widest">Email Support</h4>
                <a href="mailto:support@datalynkr.com" className="text-lg font-bold hover:text-primary transition-colors">
                  support@datalynkr.com
                </a>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-primary text-sm uppercase tracking-widest">Phone Support</h4>
                <p className="text-lg font-bold">+91-9741911520</p>
              </div>
              <div className="space-y-3">
                <h4 className="font-bold text-primary text-sm uppercase tracking-widest">Working Hours</h4>
                <p className="text-lg font-bold">Mon – Sat | 9 AM – 6 PM IST</p>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER CTA */}
        <section className="bg-primary px-6 md:px-16 lg:px-24 py-16 md:py-24 text-center text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="max-w-4xl mx-auto relative z-10 space-y-8">
            <div className="space-y-4">
              <h2 className="headline-font text-4xl md:text-5xl font-bold">Still need help?</h2>
              <p className="text-xl text-white/80">Our team is just a click away.</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button
                onClick={() =>
                  ticketFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all active:scale-95 shadow-2xl cursor-pointer"
              >
                Raise Ticket
              </button>
              <Link
                href="/contact"
                className="bg-brand-accent text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-brand-accent/90 transition-all active:scale-95 shadow-2xl text-center"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FaqSection
        items={SUPPORT_FAQ}
        title="Frequently Asked Questions"
        subtitle="Got questions about security or system functionality? We've got answers."
      />

      {/* Footer (Simplified as in support.html, converted to modern styling) */}
      <footer className="bg-slate-900 text-white/60 py-12 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-white text-2xl font-bold tracking-tighter">DataLynkr</div>
          <div className="flex gap-8 text-sm font-medium">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
          <div className="text-xs">© 2026 DataLynkr. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
