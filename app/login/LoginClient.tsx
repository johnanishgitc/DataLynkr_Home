"use client";

import { basePath } from "@/lib/site";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { LogoSvg } from "@/components/LogoSvg";

function LoginContent() {
  const searchParams = useSearchParams();

  // View state: "login" | "signup" | "forgot_password"
  const [view, setView] = useState<"login" | "signup" | "forgot_password">("login");
  
  // OTP states: 0 = Normal, 1 = Send OTP (Email only), 2 = Verify OTP (Email + OTP)
  const [otpStep, setOtpStep] = useState<0 | 1 | 2>(0);
  
  // Input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Signup fields
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupMobile, setSignupMobile] = useState("");
  const [signupCode, setSignupCode] = useState("");

  // Timers and Messages
  const [resendSeconds, setResendSeconds] = useState(0);
  const [resetSeconds, setResetSeconds] = useState(0);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const resendTimerRef = useRef<NodeJS.Timeout | null>(null);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Check URL parameters for initial signup view or query emails
  useEffect(() => {
    const isSignup = searchParams.get("signup") === "true";
    const emailParam = searchParams.get("email");

    if (isSignup) {
      setView("signup");
      if (emailParam) {
        setSignupEmail(emailParam);
      }
    }
  }, [searchParams]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (resendTimerRef.current) clearInterval(resendTimerRef.current);
      if (resetTimerRef.current) clearInterval(resetTimerRef.current);
    };
  }, []);

  // Handle Resend OTP Timer
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

  // Handle Reset Password Timer
  const startResetTimer = () => {
    setResetSeconds(60);
    if (resetTimerRef.current) clearInterval(resetTimerRef.current);
    resetTimerRef.current = setInterval(() => {
      setResetSeconds((prev) => {
        if (prev <= 1) {
          if (resetTimerRef.current) clearInterval(resetTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResetPassword = () => {
    if (!email) return;
    startResetTimer();
    setMessage({ type: "success", text: "New Password Sent to Email" });
    setTimeout(() => setMessage(null), 8000);
  };

  const handleSendOTP = () => {
    if (!email) return;
    setOtpStep(2);
    startResendTimer();
    setMessage({ type: "success", text: "OTP Sent to Email" });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleResendOTP = () => {
    if (resendSeconds > 0) return;
    startResendTimer();
    setMessage({ type: "success", text: "OTP Resent to Email" });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleVerifyOTP = () => {
    if (!otp) return;
    alert("OTP verified successfully!");
    resetToLogin();
  };

  const resetToLogin = () => {
    setOtpStep(0);
    setView("login");
    setMessage(null);
    setPassword("");
    setOtp("");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: "success", text: "Sign Up Successful! Check Your Email for the Password" });
  };

  const handleNormalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Logging in with email: ${email}`);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen h-full w-full bg-white">
      {/* Left Half: Illustration */}
      <div className="hidden lg:flex portrait:hidden lg:w-1/2 bg-gradient-to-br from-[#1F3A89] to-[#0F1D44] items-center justify-center p-12 relative overflow-hidden reveal-fade-in-left">
        {/* Decorative Theme Elements */}
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
            Empower every team with real-time access to Tally, from orders and approvals to payments,
            insights, and execution.
          </p>
        </div>
      </div>

      {/* Right Half: Form Content */}
      <div className="w-full lg:w-1/2 lg:portrait:w-full flex flex-col justify-center items-center bg-white px-6 md:px-16 lg:px-24 relative overflow-y-auto overflow-x-hidden min-h-screen pt-16 pb-40">
        {/* Header Return Home Link */}
        <div className="w-full absolute top-6 md:top-8 left-0 px-6 md:px-10 lg:px-16 flex justify-end items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-400 hover:text-primary transition-colors text-sm font-semibold ml-auto reveal-fade-up"
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
            Back to Website
          </Link>
        </div>

        <div className="w-full max-w-[400px] mx-auto space-y-12">
          {/* Logo and Brand Title */}
          <div className="flex flex-col items-center gap-4 md:gap-5">
            <Link href="/" className="flex h-20 md:h-24 w-auto flex-shrink-0 items-center justify-center reveal-scale-in delay-100">
              <LogoSvg className="h-20 md:h-24 w-auto" />
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tighter text-black headline-font reveal-fade-up delay-200">
              {view === "signup" ? "Sign Up" : "DataLynkr"}
            </h1>
          </div>

          {view === "signup" ? (
            /* Signup Form Flow */
            <form onSubmit={handleSignup} className="space-y-6 w-full mt-4">
              <div className="space-y-6 reveal-fade-up">
                {/* Name */}
                <div className="relative group">
                  <label className="absolute -top-2 left-3 inline-block bg-white px-1.5 text-xs font-semibold text-zinc-500 z-10 transition-colors group-focus-within:text-primary">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-[0.5rem] bg-surface-container/30 border border-zinc-200 focus-within:border-primary focus-within:ring-[1px] focus-within:ring-primary overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-sm">
                    <input
                      type="text"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                      placeholder="Full Name"
                      className="peer block w-full border-0 bg-transparent py-3.5 px-4 text-zinc-900 focus:ring-0 text-[15px] font-medium outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative group">
                  <label className="absolute -top-2 left-3 inline-block bg-white px-1.5 text-xs font-semibold text-zinc-500 z-10 transition-colors group-focus-within:text-primary">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-[0.5rem] bg-surface-container/30 border border-zinc-200 focus-within:border-primary focus-within:ring-[1px] focus-within:ring-primary overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-sm">
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
                  <div className="relative rounded-[0.5rem] bg-surface-container/30 border border-zinc-200 focus-within:border-primary focus-within:ring-[1px] focus-within:ring-primary overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-sm">
                    <input
                      type="tel"
                      value={signupMobile}
                      onChange={(e) => setSignupMobile(e.target.value)}
                      required
                      placeholder="Mobile Number"
                      className="peer block w-full border-0 bg-transparent py-3.5 px-4 text-zinc-900 focus:ring-0 text-[15px] font-medium outline-none"
                    />
                  </div>
                </div>

                {/* Employee/Partner Code */}
                <div className="relative group">
                  <label className="absolute -top-2 left-3 inline-block bg-white px-1.5 text-xs font-semibold text-zinc-500 z-10 transition-colors group-focus-within:text-primary">
                    Employee/Partner Code
                  </label>
                  <div className="relative rounded-[0.5rem] bg-surface-container/30 border border-zinc-200 focus-within:border-primary focus-within:ring-[1px] focus-within:ring-primary overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-sm">
                    <input
                      type="text"
                      value={signupCode}
                      onChange={(e) => setSignupCode(e.target.value)}
                      placeholder="Optional Code"
                      className="peer block w-full border-0 bg-transparent py-3.5 px-4 text-zinc-900 focus:ring-0 text-[15px] font-medium outline-none"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-[14px] px-4 rounded-[8px] shadow-sm tracking-wide text-[16px] font-bold text-white bg-gradient-to-r from-[#1F3A89] to-[#2546a3] hover:to-[#1F3A89] hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 active:scale-[0.98] cursor-pointer"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* Login & Forgot Password Form Flow */
            <form
              onSubmit={
                view === "forgot_password"
                  ? (e) => {
                      e.preventDefault();
                      handleResetPassword();
                    }
                  : otpStep === 1
                  ? (e) => {
                      e.preventDefault();
                      handleSendOTP();
                    }
                  : otpStep === 2
                  ? (e) => {
                      e.preventDefault();
                      handleVerifyOTP();
                    }
                  : handleNormalLogin
              }
              className="space-y-6 w-full mt-4"
            >
              <div className="space-y-6 reveal-fade-up">
                {/* Email Input */}
                <div className="relative group">
                  <label className="absolute -top-2 left-3 inline-block bg-white px-1.5 text-xs font-semibold text-zinc-500 z-10 transition-colors group-focus-within:text-primary">
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <div className="relative rounded-[0.5rem] bg-surface-container/30 border border-zinc-200 focus-within:border-primary focus-within:ring-[1px] focus-within:ring-primary overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-sm">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Email"
                      className="peer block w-full border-0 bg-transparent py-3.5 px-4 text-zinc-900 focus:ring-0 text-[15px] font-medium outline-none"
                    />
                  </div>
                </div>

                {/* Password Input (Hidden in OTP & Forgot Password Mode) */}
                {view === "login" && otpStep === 0 && (
                  <div className="relative group transition-all duration-300">
                    <label className="absolute -top-2 left-3 inline-block bg-white px-1.5 text-xs font-semibold text-zinc-500 z-10 transition-colors group-focus-within:text-primary">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-[0.5rem] bg-surface-container/30 border border-zinc-200 focus-within:border-primary focus-within:ring-[1px] focus-within:ring-primary overflow-hidden transition-all duration-300 flex items-center pr-3 hover:border-primary/30 hover:shadow-sm">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                        className="peer block w-full border-0 bg-transparent py-3.5 px-4 text-zinc-900 focus:ring-0 text-[15px] font-sans font-medium tracking-widest placeholder:tracking-normal outline-none"
                      />
                      <button
                        type="button"
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

                {/* OTP Input (Shown only in step 2 of OTP login) */}
                {view === "login" && otpStep === 2 && (
                  <div className="relative group reveal-fade-up">
                    <label className="absolute -top-2 left-3 inline-block bg-white px-1.5 text-xs font-semibold text-zinc-500 z-10 transition-colors group-focus-within:text-primary">
                      OTP <span className="text-red-500">*</span>
                    </label>
                    <div className="relative rounded-[0.5rem] bg-surface-container/30 border border-zinc-200 focus-within:border-primary focus-within:ring-[1px] focus-within:ring-primary overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-sm">
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

                {/* Dynamic Buttons Area */}
                <div className="space-y-3">
                  {/* Normal Login Mode */}
                  {view === "login" && otpStep === 0 && (
                    <>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-[14px] px-4 rounded-[8px] shadow-sm tracking-wide text-[16px] font-bold text-white bg-gradient-to-r from-[#1F3A89] to-[#2546a3] hover:to-[#1F3A89] hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 active:scale-[0.98] cursor-pointer"
                      >
                        Login
                      </button>
                      <button
                        type="button"
                        onClick={() => setOtpStep(1)}
                        className="w-full flex justify-center py-[14px] px-4 rounded-[8px] shadow-sm tracking-wide text-[16px] font-bold text-white bg-black hover:bg-zinc-800 hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 active:scale-[0.98] cursor-pointer"
                      >
                        Login with OTP
                      </button>
                    </>
                  )}

                  {/* Send OTP View */}
                  {view === "login" && otpStep === 1 && (
                    <button
                      type="submit"
                      className="w-full flex justify-center py-[14px] px-4 rounded-[8px] shadow-sm tracking-wide text-[16px] font-bold text-white bg-black hover:bg-zinc-800 hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 active:scale-[0.98] cursor-pointer"
                    >
                      Send OTP
                    </button>
                  )}

                  {/* Verify OTP View */}
                  {view === "login" && otpStep === 2 && (
                    <>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-[14px] px-4 rounded-[8px] shadow-sm tracking-wide text-[16px] font-bold text-white bg-[#1F3A89] hover:bg-[#15275e] hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1F3A89] transition-all duration-200 active:scale-[0.98] cursor-pointer"
                      >
                        Verify OTP
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

                  {/* Forgot Password Submit Button */}
                  {view === "forgot_password" && (
                    <button
                      type="submit"
                      disabled={resetSeconds > 0}
                      className={`w-full justify-center py-[14px] px-4 rounded-[8px] shadow-sm tracking-wide text-[16px] font-bold text-white transition-all duration-200 active:scale-[0.98] ${
                        resetSeconds > 0
                          ? "bg-zinc-400 cursor-not-allowed"
                          : "bg-black hover:bg-zinc-800 cursor-pointer"
                      }`}
                    >
                      {resetSeconds > 0 ? `Reset Password (${resetSeconds}s)` : "Reset Password"}
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

          {/* Links area */}
          <div className="flex flex-col items-center justify-center gap-3 pt-6 reveal-fade-up delay-400">
            {view === "login" && (
              <>
                <div className="text-[14px] text-zinc-500">
                  New to DataLynkr?
                  <button
                    onClick={() => {
                      setView("signup");
                      setMessage(null);
                    }}
                    className="font-bold text-[#1f3a89] hover:text-[#15275e] transition-colors ml-1 cursor-pointer"
                  >
                    Sign up
                  </button>
                </div>
                <button
                  onClick={() => {
                    setView("forgot_password");
                    setMessage(null);
                  }}
                  className="text-[13px] font-bold text-zinc-500 hover:text-zinc-700 transition-colors cursor-pointer"
                >
                  Forgot Password?
                </button>
              </>
            )}

            {view !== "login" && (
              <button
                onClick={resetToLogin}
                className="text-[13px] font-bold text-[#1f3a89] hover:text-[#15275e] transition-colors cursor-pointer"
              >
                Back to Login
              </button>
            )}
          </div>
        </div>

        {/* Footer (Absolute) */}
        <div className="w-full absolute bottom-8 left-0 flex flex-col items-center justify-center gap-2.5 text-[12px] text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span>©</span>
            <span className="font-bold">
              <span style={{ color: "#e46b0c" }}>IT</span>{" "}
              <span style={{ color: "black" }}>Catalyst</span>
            </span>
            <span>Software India Pvt Ltd. 2026.</span>
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

export default function LoginClient() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
