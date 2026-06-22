"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoSvg } from "@/components/LogoSvg";

export default function ChangePswdClient() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setSuccess(true);
  };

  return (
    <div className="bg-white text-on-surface antialiased min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Theme Elements */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[30rem] h-[30rem] bg-brand-accent opacity-[0.05] rounded-full blur-[100px] animate-float pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px] animate-float-delayed pointer-events-none"></div>

      <div className="w-full max-w-[400px] flex flex-col items-center reveal-fade-up">
        {/* Branding Header */}
        <div className="flex flex-col items-center gap-4 md:gap-6 mb-12">
          <Link
            href="/"
            className="flex h-20 md:h-24 w-auto items-center justify-center reveal-scale-in"
          >
            <LogoSvg className="h-20 md:h-24 w-auto" />
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tighter text-black headline-font reveal-fade-up">
            Change Password
          </h1>
        </div>

        {/* Form */}
        <form className="space-y-6 w-full" onSubmit={handleSubmit}>
          {/* Old Password */}
          <div className="relative group reveal-fade-up">
            <label className="absolute -top-2 left-3 inline-block bg-white px-1.5 text-xs font-semibold text-zinc-500 z-10 transition-colors group-focus-within:text-primary">
              Old Password <span className="text-red-500">*</span>
            </label>
            <div className="relative rounded-[0.5rem] bg-surface-container/30 border border-zinc-200 focus-within:border-primary focus-within:ring-[1px] focus-within:ring-primary overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-sm">
              <input
                type="password"
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="peer block w-full border-0 bg-transparent py-3.5 px-4 text-zinc-900 focus:ring-0 text-[15px] font-medium outline-none"
                placeholder="Old Password"
              />
            </div>
          </div>

          {/* New Password */}
          <div className="relative group reveal-fade-up">
            <label className="absolute -top-2 left-3 inline-block bg-white px-1.5 text-xs font-semibold text-zinc-500 z-10 transition-colors group-focus-within:text-primary">
              New Password <span className="text-red-500">*</span>
            </label>
            <div className="relative rounded-[0.5rem] bg-surface-container/30 border border-zinc-200 focus-within:border-primary focus-within:ring-[1px] focus-within:ring-primary overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-sm">
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="peer block w-full border-0 bg-transparent py-3.5 px-4 text-zinc-900 focus:ring-0 text-[15px] font-medium outline-none"
                placeholder="New Password"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative group reveal-fade-up">
            <label className="absolute -top-2 left-3 inline-block bg-white px-1.5 text-xs font-semibold text-zinc-500 z-10 transition-colors group-focus-within:text-primary">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative rounded-[0.5rem] bg-surface-container/30 border border-zinc-200 focus-within:border-primary focus-within:ring-[1px] focus-within:ring-primary overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-sm">
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (error) setError("");
                }}
                className="peer block w-full border-0 bg-transparent py-3.5 px-4 text-zinc-900 focus:ring-0 text-[15px] font-medium outline-none"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          {/* Save Button */}
          {!success && (
            <button
              type="submit"
              className="w-full flex justify-center py-[14px] px-4 rounded-[8px] shadow-sm tracking-wide text-[16px] font-bold text-white bg-black hover:bg-zinc-800 hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 active:scale-[0.98] reveal-fade-up cursor-pointer"
            >
              Change Password
            </button>
          )}

          {/* Error Message */}
          {error && (
            <div className="text-center text-[13px] font-bold text-red-700 bg-red-50 p-3 rounded-lg border border-red-200 shadow-sm mt-4 animate-in">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="text-center text-[13px] font-bold text-emerald-700 bg-emerald-50 p-3 rounded-lg border border-emerald-200 shadow-sm mt-4 animate-in">
              Password Changed Successfully!
            </div>
          )}
        </form>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 w-full text-center text-[12px] text-zinc-400 flex flex-col gap-1 left-0">
        <div className="flex items-center justify-center gap-1.5 px-6">
          <span>©</span>
          <span className="font-bold">
            <span style={{ color: "#e46b0c" }}>IT</span>{" "}
            <span style={{ color: "black" }}>Catalyst</span>
          </span>
          <span>Software India Pvt Ltd. 2026.</span>
        </div>
      </div>
    </div>
  );
}
