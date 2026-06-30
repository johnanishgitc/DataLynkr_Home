"use client";

import { basePath, IT_CATALYST_URL } from "@/lib/site";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { LogoSvg } from "@/components/LogoSvg";

// ---------------------------------------------------------------------------
// API utilities
// ---------------------------------------------------------------------------

const DEFAULT_API_URL = "https://itcatalystindia.com/Development/CustomerPortal_API";

function getApiBaseUrl(): string {
  if (typeof window === "undefined") return DEFAULT_API_URL;
  const host = window.location.hostname || "";
  const isLocal =
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.startsWith("192.168.") ||
    host.startsWith("10.") ||
    host.startsWith("172.");
  return isLocal ? "" : DEFAULT_API_URL;
}

async function apiGet(endpoint: string): Promise<Record<string, unknown>> {
  const res = await fetch(`${getApiBaseUrl()}${endpoint}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const text = await res.text();
  let data: Record<string, unknown> = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }
  if (!res.ok || data.error) {
    throw new Error(String(data.error || data.message || `Request failed: ${res.status}`));
  }
  return data;
}

async function apiPost(
  endpoint: string,
  payload?: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const res = await fetch(`${getApiBaseUrl()}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload || {}),
  });
  const text = await res.text();
  let data: Record<string, unknown> = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }
  if (!res.ok || data.error) {
    const msg = typeof data.error === "string" ? data.error.trim() : "";
    if (msg === "Invalid or expired token") {
      if (typeof window !== "undefined") {
        sessionStorage.clear();
        window.location.reload();
      }
      return {};
    }
    throw new Error(String(data.error || data.message || `Request failed: ${res.status}`));
  }
  return data;
}

function navigateApp(pathname: string) {
  if (typeof window === "undefined") return;
  const url = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const target = window.top && window.top !== window ? window.top : window;
  target.location.href = url;
}

function downloadSetupWizard() {
  const link = document.createElement("a");
  link.href = `${basePath}/DataLynkr.exe`;
  link.download = "DataLynkr.exe";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CodeItem {
  type: "employee" | "partner";
  code: string;
  name: string;
}

interface RawEmployee {
  is_active?: number | boolean;
  employee_id?: string | number;
  name?: string;
  user_name?: string;
}

interface RawPartner {
  is_active?: number | boolean;
  referral_code?: string;
  partner_code?: string;
  code?: string;
  name?: string;
  user_name?: string;
}

// ---------------------------------------------------------------------------
// Employee/Partner Code Dropdown
// ---------------------------------------------------------------------------

function extractList(
  response: Record<string, unknown>,
  fallbackKey: string,
): unknown[] {
  if (Array.isArray(response)) return response as unknown[];
  if (Array.isArray((response as Record<string, unknown>)?.data))
    return (response as Record<string, unknown>).data as unknown[];
  if (Array.isArray((response as Record<string, unknown>)?.[fallbackKey]))
    return (response as Record<string, unknown>)[fallbackKey] as unknown[];
  return [];
}

function getPartnerCode(partner: RawPartner): string {
  return String(
    partner.referral_code ?? partner.partner_code ?? partner.code ?? "",
  ).trim();
}

function buildSuggestions(
  employees: RawEmployee[],
  partners: RawPartner[],
  searchTerm: string,
): { employees: CodeItem[]; partners: CodeItem[] } {
  const search = searchTerm.trim().toLowerCase();

  const empItems: CodeItem[] = [];
  employees.forEach((emp) => {
    if (emp.is_active === 0 || emp.is_active === false) return;
    const code = emp.employee_id != null ? String(emp.employee_id).trim() : "";
    const name = String(emp.name || emp.user_name || "").trim();
    if (!code) return;
    if (!search || code.toLowerCase().includes(search) || name.toLowerCase().includes(search)) {
      empItems.push({ type: "employee", code, name: name || code });
    }
  });

  const partItems: CodeItem[] = [];
  partners.forEach((partner) => {
    if (partner.is_active === 0 || partner.is_active === false) return;
    const code = getPartnerCode(partner);
    const name = String(partner.name || partner.user_name || "").trim();
    if (!code && !name) return;
    if (!search || (code && code.toLowerCase().includes(search)) || name.toLowerCase().includes(search)) {
      partItems.push({ type: "partner", code, name: name || code || "Partner" });
    }
  });

  return { employees: empItems.slice(0, 25), partners: partItems.slice(0, 25) };
}

interface CodeDropdownProps {
  value: string;
  onChange: (val: string) => void;
  onSelect: (item: CodeItem | null) => void;
}

function CodeDropdown({ value, onChange, onSelect }: CodeDropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"employee" | "partner">("employee");
  const [employees, setEmployees] = useState<RawEmployee[]>([]);
  const [partners, setPartners] = useState<RawPartner[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const blurTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  const fetchData = useCallback(async () => {
    if (loaded || loading) return;
    setLoading(true);
    try {
      const [empResult, partResult] = await Promise.allSettled([
        apiGet("/api/subscriptions/admin/employees/all?limit=500&offset=0"),
        apiGet("/api/subscriptions/admin/partners/all?limit=500&offset=0&is_active=true"),
      ]);
      if (empResult.status === "fulfilled") {
        setEmployees(extractList(empResult.value, "employees") as RawEmployee[]);
      }
      if (partResult.status === "fulfilled") {
        setPartners(extractList(partResult.value, "partners") as RawPartner[]);
      } else {
        try {
          const fallback = await apiGet("/api/subscriptions/admin/partners/all?limit=500&offset=0");
          setPartners(extractList(fallback, "partners") as RawPartner[]);
        } catch {
          /* ignore */
        }
      }
      setLoaded(true);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, [loaded, loading]);

  const positionDropdown = useCallback(() => {
    if (!inputRef.current) return;
    const rect = inputRef.current.getBoundingClientRect();
    setDropdownStyle({
      position: "fixed",
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
      zIndex: 99999,
    });
  }, []);

  const openDropdown = useCallback(() => {
    positionDropdown();
    setOpen(true);
  }, [positionDropdown]);

  const closeDropdown = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onResize = () => positionDropdown();
    const onScroll = () => positionDropdown();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [open, positionDropdown]);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (
        wrapperRef.current?.contains(e.target as Node) ||
        dropdownRef.current?.contains(e.target as Node)
      )
        return;
      closeDropdown();
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [closeDropdown]);

  const suggestions = buildSuggestions(employees, partners, value);
  const activeItems = activeTab === "partner" ? suggestions.partners : suggestions.employees;
  const totalCount = suggestions.employees.length + suggestions.partners.length;

  const effectiveTab: "employee" | "partner" =
    activeTab === "partner" && !suggestions.partners.length && suggestions.employees.length
      ? "employee"
      : activeTab === "employee" && !suggestions.employees.length && suggestions.partners.length
      ? "partner"
      : activeTab;

  const displayItems = effectiveTab === "partner" ? suggestions.partners : suggestions.employees;

  function handleSelect(item: CodeItem) {
    if (item.type === "partner" && !item.code) return;
    onChange(item.name);
    onSelect(item);
    closeDropdown();
  }

  return (
    <div className="relative group" ref={wrapperRef}>
      <label className="absolute -top-2 left-3 inline-block bg-white px-1.5 text-xs font-semibold text-zinc-500 z-10 transition-colors group-focus-within:text-primary">
        Employee/Partner Code
      </label>
      <div className="relative rounded-[0.5rem] bg-surface-container-low/50 border border-zinc-200 focus-within:border-primary focus-within:ring-[1px] focus-within:ring-primary transition-all duration-300 hover:border-primary/30 hover:shadow-sm">
        <input
          ref={inputRef}
          type="text"
          value={value}
          autoComplete="off"
          onChange={(e) => {
            onChange(e.target.value);
            onSelect(null);
          }}
          onFocus={() => {
            if (blurTimerRef.current) {
              clearTimeout(blurTimerRef.current);
              blurTimerRef.current = null;
            }
            fetchData().then(() => openDropdown());
          }}
          onBlur={(e) => {
            const related = e.relatedTarget as Node | null;
            if (dropdownRef.current?.contains(related)) return;
            blurTimerRef.current = setTimeout(closeDropdown, 150);
          }}
          placeholder="Search employee or partner"
          className="peer block w-full border-0 bg-transparent py-3.5 pl-4 pr-10 text-zinc-900 focus:ring-0 text-[15px] font-medium placeholder-zinc-400 outline-none group-hover:pl-5 transition-all duration-300"
        />
        <button
          type="button"
          tabIndex={-1}
          aria-label="Show employee and partner options"
          onMouseDown={(e) => {
            e.preventDefault();
            if (blurTimerRef.current) {
              clearTimeout(blurTimerRef.current);
              blurTimerRef.current = null;
            }
            fetchData().then(() => {
              if (open) closeDropdown();
              else openDropdown();
              inputRef.current?.focus();
            });
          }}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400 hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">expand_more</span>
        </button>
      </div>

      {open && (
        <div
          ref={dropdownRef}
          style={dropdownStyle}
          className="flex flex-col bg-white border border-zinc-200 rounded-lg shadow-2xl overflow-hidden"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (blurTimerRef.current) {
              clearTimeout(blurTimerRef.current);
              blurTimerRef.current = null;
            }
          }}
        >
          {/* Tabs */}
          <div className="flex flex-shrink-0 border-b border-zinc-200 bg-zinc-50 rounded-t-lg">
            {(["employee", "partner"] as const).map((tab) => {
              const count = tab === "employee" ? suggestions.employees.length : suggestions.partners.length;
              const label = tab === "employee" ? "Employees" : "Partners";
              const isActive = effectiveTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  className={`flex-1 px-3 py-2.5 text-[13px] font-semibold border-b-2 transition-colors ${
                    isActive
                      ? "text-[#1f3a89] bg-white border-[#1f3a89]"
                      : "text-zinc-500 border-transparent hover:text-[#1f3a89] hover:bg-zinc-100"
                  }`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveTab(tab);
                  }}
                >
                  {label} ({count})
                </button>
              );
            })}
          </div>

          {/* List */}
          <div className="overflow-y-auto" style={{ maxHeight: 220 }}>
            {loading && totalCount === 0 ? (
              <div className="px-3.5 py-3 text-[13px] text-zinc-500">Loading suggestions...</div>
            ) : displayItems.length === 0 ? (
              <div className="px-3.5 py-3 text-[13px] text-zinc-500">
                {effectiveTab === "employee" ? "No employees found" : "No partners found"}
              </div>
            ) : (
              displayItems.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  disabled={item.type === "partner" && !item.code}
                  className={`flex items-center justify-between gap-3 w-full px-3.5 py-2.5 text-left transition-colors ${
                    item.type === "partner" && !item.code
                      ? "opacity-55 cursor-not-allowed"
                      : "hover:bg-zinc-100 cursor-pointer"
                  }`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSelect(item);
                  }}
                >
                  <span className="text-[14px] font-semibold text-zinc-900">{item.name}</span>
                  <span className="text-[12px] text-zinc-500 whitespace-nowrap">
                    {item.type === "employee"
                      ? `ID: ${item.code}`
                      : item.code
                      ? `Code: ${item.code}`
                      : "No code"}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Login Form
// ---------------------------------------------------------------------------

type LoginView = "login" | "signup" | "forgot_password";

interface LoginContentProps {
  view: LoginView;
}

function LoginContent({ view }: LoginContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [otpStep, setOtpStep] = useState<0 | 1 | 2>(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupMobile, setSignupMobile] = useState("");
  const [signupCode, setSignupCode] = useState("");
  const [signupCodeSelection, setSignupCodeSelection] = useState<CodeItem | null>(null);

  const [resendSeconds, setResendSeconds] = useState(0);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  const resendTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (view !== "signup") return;
    const emailParam = searchParams.get("email");
    if (emailParam) setSignupEmail(emailParam);
  }, [searchParams, view]);

  useEffect(() => {
    if (view !== "login") return;
    if (searchParams.get("signup") === "true") {
      const emailParam = searchParams.get("email");
      const url = emailParam
        ? `/signup?email=${encodeURIComponent(emailParam)}`
        : "/signup";
      router.replace(url);
    }
  }, [searchParams, view, router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("token");
      const storedEmail = sessionStorage.getItem("email");
      if (token && storedEmail) navigateApp("/admin-dashboard");
    }
  }, []);

  useEffect(() => {
    return () => {
      if (resendTimerRef.current) clearInterval(resendTimerRef.current);
    };
  }, []);

  const startResendTimer = () => {
    setResendSeconds(60);
    if (resendTimerRef.current) clearInterval(resendTimerRef.current);
    resendTimerRef.current = setInterval(() => {
      setResendSeconds((prev) => {
        if (prev <= 1) {
          if (resendTimerRef.current) clearInterval(resendTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  function applyLoginResponse(data: Record<string, unknown>) {
    const details = data.user_type_details as Record<string, unknown> | undefined;
    const employee = data.employee as Record<string, unknown> | undefined;
    const partner = data.partner as Record<string, unknown> | undefined;

    sessionStorage.setItem("name", String(data.name || ""));
    sessionStorage.setItem("email", String(data.email || ""));
    sessionStorage.setItem("token", String(data.token || ""));
    if (details?.user_id != null) sessionStorage.setItem("userId", String(details.user_id));
    if (data.user_type) sessionStorage.setItem("user_type", String(data.user_type));
    if (employee?.code) sessionStorage.setItem("employee_code", String(employee.code));
    if (partner?.code) sessionStorage.setItem("partner_code", String(partner.code));

    try {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage(
          {
            type: "datalynkr-auth",
            payload: {
              token: sessionStorage.getItem("token"),
              email: sessionStorage.getItem("email"),
              name: sessionStorage.getItem("name"),
              userId: sessionStorage.getItem("userId"),
              user_type: sessionStorage.getItem("user_type"),
              employee_code: sessionStorage.getItem("employee_code"),
              partner_code: sessionStorage.getItem("partner_code"),
            },
          },
          window.location.origin,
        );
      }
    } catch {
      /* ignore */
    }

    navigateApp(data.is_first_login === 1 ? "/change-password" : "/admin-dashboard");
  }

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoginLoading(true);
    setMessage(null);
    try {
      const data = await apiPost("/api/login", { email, password });
      if (data?.token) {
        applyLoginResponse(data);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      setMessage({ type: "error", text: (err as Error).message || "Invalid email or password" });
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSendOTP = async () => {
    if (!email) return;
    setOtpLoading(true);
    setMessage(null);
    try {
      await apiPost("/api/login/send-otp", { email });
      setOtpStep(2);
      startResendTimer();
      setMessage({ type: "success", text: "OTP Sent to Email" });
    } catch (err) {
      setMessage({ type: "error", text: (err as Error).message || "Could not send OTP" });
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendSeconds > 0) return;
    setMessage(null);
    try {
      await apiPost("/api/login/send-otp", { email });
      startResendTimer();
      setMessage({ type: "success", text: "OTP Resent to Email" });
    } catch (err) {
      setMessage({ type: "error", text: (err as Error).message || "Could not resend OTP" });
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setMessage({ type: "error", text: "OTP must be 6 digits." });
      return;
    }
    setOtpLoading(true);
    setMessage(null);
    try {
      const data = await apiPost("/api/login/verify-otp", { email, otp });
      if (data?.token) {
        applyLoginResponse(data);
      } else {
        throw new Error("Invalid or expired OTP");
      }
    } catch (err) {
      setMessage({ type: "error", text: (err as Error).message || "OTP verification failed" });
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setResetLoading(true);
    setMessage(null);
    try {
      const data = await apiPost("/api/forget-password", { email });
      setMessage({ type: "success", text: String(data?.message || "New Password Sent to Email") });
      setTimeout(() => navigateApp("/login"), 3000);
    } catch (err) {
      setMessage({ type: "error", text: (err as Error).message || "Failed to reset password" });
    } finally {
      setResetLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true);
    setMessage(null);
    try {
      const payload: Record<string, unknown> = {
        name: signupName.trim(),
        email: signupEmail.trim(),
        mobileno: signupMobile.trim(),
      };
      if (signupCodeSelection) {
        if (signupCodeSelection.type === "employee") {
          payload.employee_id = signupCodeSelection.code;
        } else if (signupCodeSelection.type === "partner") {
          payload.referral_code = signupCodeSelection.code;
        }
      } else {
        const code = signupCode.trim();
        if (code) payload.employee_partner_code = code;
      }
      const data = await apiPost("/api/signup", payload);
      setMessage({
        type: "success",
        text: String(data?.message || "Sign Up Successful! Check Your Email for the Password"),
      });
      setTimeout(() => navigateApp("/login"), 3000);
    } catch (err) {
      setMessage({ type: "error", text: (err as Error).message || "Signup failed" });
    } finally {
      setSignupLoading(false);
    }
  };

  const backToLogin = () => {
    setOtpStep(0);
    setMessage(null);
    setPassword("");
    setOtp("");
    setShowPassword(false);
    if (view !== "login") {
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen h-full w-full bg-white">
      {/* Left Half: Illustration */}
      <div className="hidden lg:flex portrait:hidden lg:w-1/2 bg-gradient-to-br from-[#1F3A89] to-[#0F1D44] items-center justify-center p-12 relative overflow-hidden reveal-fade-in-left">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[30rem] h-[30rem] bg-brand-accent opacity-[0.08] rounded-full blur-[100px] animate-float pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[40rem] h-[40rem] bg-white opacity-[0.04] rounded-full blur-[120px] animate-float-delayed pointer-events-none"></div>

        <div className="max-w-xl text-center space-y-12 z-10 w-full flex flex-col items-center">
          <div className="w-full max-w-md aspect-square bg-[#0a183d]/40 backdrop-blur-sm border border-brand-accent rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden relative group reveal-scale-in delay-200">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            >
              <source src={basePath + "/resources/videos/illustration.mp4"} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <h2 className="headline-font text-5xl font-bold text-white leading-[1.1] reveal-fade-up delay-400">
            Take Tally Beyond <br />The Finance Team
          </h2>
          <p className="text-white/70 font-body text-lg max-w-sm mx-auto reveal-fade-up delay-500">
            Empower every team with real-time access to Tally, from orders and approvals to
            payments, insights, and execution.
          </p>
        </div>
      </div>

      {/* Right Half: Form Content */}
      <div className="w-full lg:w-1/2 lg:portrait:w-full flex flex-col justify-center items-center bg-white px-6 md:px-16 lg:px-24 relative overflow-y-auto overflow-x-hidden min-h-screen pt-16 pb-40">
        {/* Header */}
        <div className="w-full absolute top-6 md:top-8 left-0 px-6 md:px-10 lg:px-16 flex justify-end items-center gap-4">
          {view === "signup" && (
            <button
              type="button"
              onClick={downloadSetupWizard}
              className="flex items-center gap-2 text-emerald-700 hover:text-emerald-800 transition-colors text-sm font-semibold reveal-fade-up"
            >
              <span className="material-symbols-outlined text-[20px]">download</span>
              Download Setup Wizard
            </button>
          )}
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-400 hover:text-primary transition-colors text-sm font-semibold reveal-fade-up"
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
            Back to Website
          </Link>
        </div>

        <div className="w-full max-w-[400px] mx-auto space-y-12">
          {/* Logo and Brand Title */}
          <div className="flex flex-col items-center gap-4 md:gap-5">
            <Link
              href="/"
              className="flex h-20 md:h-24 w-auto flex-shrink-0 items-center justify-center reveal-scale-in delay-100"
            >
              <LogoSvg className="h-20 md:h-24 w-auto" />
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tighter text-black headline-font reveal-fade-up delay-200">
              {view === "signup" ? "Sign Up" : "DataLynkr"}
            </h1>
          </div>

          {view === "signup" ? (
            /* Signup Form */
            <form onSubmit={handleSignup} className="space-y-6 w-full mt-4">
              <div className="space-y-6 reveal-fade-up">
                {/* Name */}
                <div className="relative group">
                  <label className="absolute -top-2 left-3 inline-block bg-white px-1.5 text-xs font-semibold text-zinc-500 z-10 transition-colors group-focus-within:text-primary">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-[0.5rem] bg-surface-container-low/50 border border-zinc-200 focus-within:border-primary focus-within:ring-[1px] focus-within:ring-primary overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-sm">
                    <input
                      type="text"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                      placeholder="Full Name"
                      className="peer block w-full border-0 bg-transparent py-3.5 px-4 text-zinc-900 focus:ring-0 text-[15px] font-medium outline-none group-hover:pl-5 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative group">
                  <label className="absolute -top-2 left-3 inline-block bg-white px-1.5 text-xs font-semibold text-zinc-500 z-10 transition-colors group-focus-within:text-primary">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-[0.5rem] bg-surface-container-low/50 border border-zinc-200 focus-within:border-primary focus-within:ring-[1px] focus-within:ring-primary overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-sm">
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                      placeholder="Email Address"
                      className="peer block w-full border-0 bg-transparent py-3.5 px-4 text-zinc-900 focus:ring-0 text-[15px] font-medium outline-none"
                    />
                  </div>
                </div>

                {/* Mobile */}
                <div className="relative group">
                  <label className="absolute -top-2 left-3 inline-block bg-white px-1.5 text-xs font-semibold text-zinc-500 z-10 transition-colors group-focus-within:text-primary">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-[0.5rem] bg-surface-container-low/50 border border-zinc-200 focus-within:border-primary focus-within:ring-[1px] focus-within:ring-primary overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-sm">
                    <input
                      type="tel"
                      value={signupMobile}
                      onChange={(e) => setSignupMobile(e.target.value)}
                      required
                      placeholder="Mobile Number"
                      className="peer block w-full border-0 bg-transparent py-3.5 px-4 text-zinc-900 focus:ring-0 text-[15px] font-medium outline-none group-hover:pl-5 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Employee/Partner Code Dropdown */}
                <CodeDropdown
                  value={signupCode}
                  onChange={setSignupCode}
                  onSelect={setSignupCodeSelection}
                />

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={signupLoading}
                    className="w-full flex justify-center py-[14px] px-4 rounded-[8px] shadow-sm tracking-wide text-[16px] font-bold text-white bg-gradient-to-r from-[#1F3A89] to-[#2546a3] hover:to-[#1F3A89] hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {signupLoading ? "Signing up..." : "Sign Up"}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* Login / Forgot Password Form */
            <form
              onSubmit={
                view === "forgot_password"
                  ? handleResetPassword
                  : otpStep === 2
                  ? handleVerifyOTP
                  : otpStep === 1
                  ? (e) => { e.preventDefault(); handleSendOTP(); }
                  : handlePasswordLogin
              }
              className="space-y-6 w-full mt-4"
            >
              <div className="space-y-6 reveal-fade-up">
                {/* Email */}
                <div className="relative group reveal-fade-up">
                  <label className="absolute -top-2 left-3 inline-block bg-white px-1.5 text-xs font-semibold text-zinc-500 z-10 transition-colors group-focus-within:text-primary">
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-[0.5rem] bg-surface-container-low/50 border border-zinc-200 focus-within:border-primary focus-within:ring-[1px] focus-within:ring-primary overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-sm">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Email"
                      className="peer block w-full border-0 bg-transparent py-3.5 px-4 text-zinc-900 focus:ring-0 text-[15px] font-medium outline-none group-hover:pl-5 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Password (normal login only) */}
                {view === "login" && otpStep === 0 && (
                  <div className="relative group transition-all duration-300">
                    <label className="absolute -top-2 left-3 inline-block bg-white px-1.5 text-xs font-semibold text-zinc-500 z-10 transition-colors group-focus-within:text-primary">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-[0.5rem] bg-surface-container-low/50 border border-zinc-200 focus-within:border-primary focus-within:ring-[1px] focus-within:ring-primary overflow-hidden transition-all duration-300 flex items-center pr-3 hover:border-primary/30 hover:shadow-sm">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                        className="peer block w-full border-0 bg-transparent py-3.5 px-4 text-zinc-900 focus:ring-0 text-[15px] font-sans font-medium tracking-widest placeholder:tracking-normal outline-none group-hover:pl-5 transition-all duration-300"
                      />
                      <button
                        type="button"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        aria-pressed={showPassword}
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-zinc-400 hover:text-zinc-600 focus:outline-none flex items-center justify-center p-1.5 rounded-md hover:bg-zinc-100 transition-colors cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {showPassword ? "visibility_off" : "visibility"}
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {/* OTP Input (step 2) */}
                {view === "login" && otpStep === 2 && (
                  <div className="relative group reveal-fade-up">
                    <label className="absolute -top-2 left-3 inline-block bg-white px-1.5 text-xs font-semibold text-zinc-500 z-10 transition-colors group-focus-within:text-primary">
                      OTP <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-[0.5rem] bg-surface-container-low/50 border border-zinc-200 focus-within:border-primary focus-within:ring-[1px] focus-within:ring-primary overflow-hidden transition-all duration-200 hover:border-zinc-300">
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        placeholder="Enter 6 Digit OTP"
                        className="peer block w-full border-0 bg-transparent py-3.5 px-4 text-zinc-900 focus:ring-0 text-[15px] font-medium outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="space-y-3">
                  {/* Normal login */}
                  {view === "login" && otpStep === 0 && (
                    <>
                      <button
                        type="submit"
                        disabled={loginLoading}
                        className="w-full flex justify-center py-[14px] px-4 rounded-[8px] shadow-sm tracking-wide text-[16px] font-bold text-white bg-gradient-to-r from-[#1F3A89] to-[#2546a3] hover:to-[#1F3A89] hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {loginLoading ? "Logging in..." : "Login"}
                      </button>
                      <button
                        type="button"
                        onClick={() => { setOtpStep(1); setMessage(null); }}
                        className="w-full flex justify-center py-[14px] px-4 rounded-[8px] shadow-sm tracking-wide text-[16px] font-bold text-white bg-black hover:bg-zinc-800 hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 active:scale-[0.98] cursor-pointer"
                      >
                        Login with OTP
                      </button>
                    </>
                  )}

                  {/* OTP step 1 — send OTP */}
                  {view === "login" && otpStep === 1 && (
                    <button
                      type="submit"
                      disabled={otpLoading}
                      className="w-full flex justify-center py-[14px] px-4 rounded-[8px] shadow-sm tracking-wide text-[16px] font-bold text-white bg-black hover:bg-zinc-800 hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {otpLoading ? "Sending OTP..." : "Send OTP"}
                    </button>
                  )}

                  {/* OTP step 2 — verify + resend */}
                  {view === "login" && otpStep === 2 && (
                    <>
                      <button
                        type="submit"
                        disabled={otpLoading}
                        className="w-full flex justify-center py-[14px] px-4 rounded-[8px] shadow-sm tracking-wide text-[16px] font-bold text-white bg-gradient-to-r from-[#1F3A89] to-[#2546a3] hover:to-[#1F3A89] hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {otpLoading ? "Verifying..." : "Verify OTP"}
                      </button>
                      <button
                        type="button"
                        onClick={handleResendOTP}
                        disabled={resendSeconds > 0}
                        className={`w-full flex justify-center py-[14px] px-4 rounded-[8px] shadow-sm tracking-wide text-[16px] font-bold text-white transition-all duration-200 active:scale-[0.98] ${
                          resendSeconds > 0
                            ? "bg-zinc-400 cursor-not-allowed"
                            : "bg-black hover:bg-zinc-800 cursor-pointer"
                        }`}
                      >
                        {resendSeconds > 0 ? `Resend OTP (${resendSeconds}s)` : "Resend OTP"}
                      </button>
                    </>
                  )}

                  {/* Forgot password submit */}
                  {view === "forgot_password" && (
                    <button
                      type="submit"
                      disabled={resetLoading}
                      className="w-full flex justify-center py-[14px] px-4 rounded-[8px] shadow-sm tracking-wide text-[16px] font-bold text-white bg-black hover:bg-zinc-800 hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {resetLoading ? "Sending..." : "Reset Password"}
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}

          {/* Messages */}
          {message && (
            <div
              className={`text-center text-[13px] font-bold p-3 rounded-lg border shadow-sm mt-4 reveal-fade-up ${
                message.type === "success"
                  ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                  : "text-red-700 bg-red-50 border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Links */}
          <div className="flex flex-col items-center justify-center gap-3 pt-6 reveal-fade-up delay-400">
            {view === "login" && otpStep === 0 && (
              <>
                <div className="text-[14px] text-zinc-500">
                  New to DataLynkr?
                  <Link
                    href="/signup"
                    className="font-bold text-[#1f3a89] hover:text-[#15275e] transition-colors ml-1"
                  >
                    Sign up
                  </Link>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-[13px] font-bold text-zinc-500 hover:text-zinc-700 transition-colors"
                >
                  Forgot Password?
                </Link>
              </>
            )}

            {(view !== "login" || otpStep !== 0) && (
              <button
                type="button"
                onClick={backToLogin}
                className="text-[13px] font-bold text-[#1f3a89] hover:text-[#15275e] transition-colors cursor-pointer"
              >
                Back to Login
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="w-full absolute bottom-8 left-0 flex flex-col items-center justify-center gap-2.5 text-[12px] text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span>©</span>
            <a
              href={IT_CATALYST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <span className="font-bold">
                <span style={{ color: "#e46b0c" }}>IT</span>{" "}
                <span style={{ color: "black" }}>Catalyst</span>
              </span>{" "}
              <span>Software India Pvt Ltd.</span>
            </a>
            <span>2026.</span>
          </div>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-primary font-medium hover:text-[#15275e] transition-colors pb-1"
              target="_blank"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-primary font-medium hover:text-[#15275e] transition-colors pb-1"
              target="_blank"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LoginClientProps {
  view?: LoginView;
}

export default function LoginClient({ view = "login" }: LoginClientProps) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <LoginContent view={view} />
    </Suspense>
  );
}
