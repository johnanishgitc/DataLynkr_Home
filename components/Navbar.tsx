"use client";

import { useRef } from "react";
import Link from "next/link";
import Sidebar from "./Sidebar";
import { LogoSvg } from "./LogoSvg";
import { useHideNavOnScroll } from "@/hooks/useHideNavOnScroll";

interface NavbarProps {
  /** Whether to show the center logo + brand name */
  showCenterBrand?: boolean;
  /** Whether to show a right-side action (like Login button) */
  showLoginButton?: boolean;
  /** Login button destination */
  loginHref?: string;
  /** Whether to show only the home icon on the right side */
  showHomeIcon?: boolean;
  /** Hide the nav when scrolling down and reveal it when scrolling up */
  hideOnScroll?: boolean;
  /** Extra classes for the nav */
  className?: string;
}

export default function Navbar({
  showCenterBrand = false,
  showLoginButton = false,
  loginHref = "/login",
  showHomeIcon = true,
  hideOnScroll = false,
  className = "",
}: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  useHideNavOnScroll(hideOnScroll, navRef);

  return (
    <nav
      ref={navRef}
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl flex items-center justify-between px-6 md:px-10 lg:px-12 py-4 md:py-6 transition-transform duration-500 ease-in-out ${className}`}
    >
      <div className="flex items-center gap-4">
        <Sidebar />
      </div>

      {showCenterBrand && (
        <Link
          href="/"
          className="font-headline font-normal tracking-tight absolute left-1/2 -translate-x-1/2 flex items-center gap-3 cursor-pointer"
        >
          <div className="h-10 w-12 flex-shrink-0 flex items-center justify-center">
            <LogoSvg className="h-10 w-auto" />
          </div>
          <span className="text-2xl md:text-3xl lg:text-4xl font-normal tracking-tighter text-black">
            DataLynkr
          </span>
        </Link>
      )}

      <div className="flex items-center gap-4">
        {showLoginButton && (
          <Link
            href={loginHref}
            className="hidden md:inline-block bg-primary text-white px-6 py-2.5 rounded-full font-medium hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
          >
            Log In
          </Link>
        )}
        {showHomeIcon && (
          <Link
            href="/"
            className="flex items-center justify-center p-2.5 bg-transparent text-[#1F3A89] hover:bg-black/5 rounded-full transition-colors group focus:outline-none focus:ring-2 focus:ring-[#1f3a89] focus:ring-offset-2"
            title="Home"
          >
            <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">
              home
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
