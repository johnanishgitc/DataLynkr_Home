"use client";

import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import SiteLink from "./SiteLink";
import { usePathname, useRouter } from "next/navigation";
import { LogoSvg } from "./LogoSvg";

const featureLinks = [
  { href: "/features/sales-order-management", label: "Sales Order Management" },
  { href: "/features/extend-portal-customers", label: "Extend a Portal for Your Customers" },
  { href: "/features/modern-bcommerce-ordering", label: "Modern B-Commerce Ordering" },
  { href: "/features/invoice-creation", label: "Invoice Creation" },
  { href: "/features/authorization-workflows", label: "Authorization Workflows" },
  { href: "/features/daily-ledger-reports", label: "Daily Ledger Reports" },
  { href: "/features/offline-transactions", label: "Offline Transactions" },
  { href: "/features/dynamic-dashboards", label: "Dynamic Dashboards" },
  { href: "/features/payments-collections", label: "Payments & Collections" },
  { href: "/features/stock-summary", label: "Stock Summary" },
  { href: "/features/custom-reports", label: "Custom Reports" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About DataLynkr" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact Us" },
  { href: "/support", label: "Get Support" },
];

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => {
      if (prev) setIsFeaturesOpen(false);
      return !prev;
    });
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
    setIsFeaturesOpen(false);
  }, []);

  const navigateTo = useCallback(
    (href: string) => {
      closeSidebar();
      router.push(href);
    },
    [router, closeSidebar]
  );

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isFeaturesActive = pathname.startsWith("/features");

  useEffect(() => {
    if (isSidebarOpen && isFeaturesActive) {
      setIsFeaturesOpen(true);
    }
  }, [isSidebarOpen, isFeaturesActive]);

  return (
    <>
      {/* Menu Button - rendered separately for different navbars to pick up */}
      <button
        id="menu-btn"
        onClick={toggleSidebar}
        className="relative flex items-center justify-center lg:gap-2 p-0 lg:px-4 lg:py-1.5 rounded-full border-0 lg:border-2 border-primary bg-transparent lg:bg-primary lg:hover:bg-primary/90 lg:hover:border-primary/90 text-[#0E172B] lg:text-white shadow-none lg:shadow-sm lg:hover:shadow-md hover:translate-y-0 lg:hover:-translate-y-0.5 transition-all duration-300 focus:outline-none group active:scale-95"
      >
        {/* Mobile hamburger — visible only below lg breakpoint */}
        <svg
          className="block lg:hidden w-6 h-5 text-[#0E172B] hover:opacity-80 transition-opacity"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        {/* Desktop icon — visible only at lg and above */}
        <span
          id="menu-icon"
          className={`material-symbols-outlined text-xl transition-transform duration-300 ease-in-out group-hover:rotate-90 ${isSidebarOpen ? "rotate-90" : ""}`}
          style={{ display: "none" }}
          data-desktop-only="true"
        >
          segment
        </span>
        <span
          className="font-['Wix_Madefor_Display'] text-xs font-extrabold uppercase tracking-widest text-white"
          style={{ display: "none" }}
          data-desktop-only="true"
        >
          Menu
        </span>
      </button>

      {mounted && typeof document !== "undefined" && createPortal(
        <>
          {/* Sidebar Overlay */}
          <div
            id="sidebar-overlay"
            className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ease-in-out ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            onClick={closeSidebar}
          />

          {/* Sidebar */}
          <aside
            id="sidebar"
            className={`fixed top-0 left-0 w-[19.9rem] max-w-full h-full z-[70] bg-gradient-to-br from-[#1F3A89] to-[#0F1D44] text-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out overflow-visible ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="flex-1 flex flex-col h-full overflow-y-auto p-8 relative">
              <div className="pt-16 pb-8 flex items-center relative">
                <SiteLink
                  href="/"
                  className="absolute left-1/2 -translate-x-1/2 h-10 w-auto flex-shrink-0 block hover:opacity-80 transition-opacity"
                  title="DataLynkr Home"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo("/");
                  }}
                >
                  <LogoSvg fillPrimary="white" fillAccent="rgb(239, 201, 79)" />
                </SiteLink>
              </div>
              <div className="flex-1 flex flex-col gap-6 font-medium text-lg headline-font mt-4">
                <SiteLink
                  href="/"
                  className={
                    pathname === "/"
                      ? "text-amber-400 transition-colors pointer-events-none"
                      : "hover:text-amber-200 transition-colors"
                  }
                  onClick={(e) => {
                    if (pathname !== "/") {
                      e.preventDefault();
                      navigateTo("/");
                    } else {
                      closeSidebar();
                    }
                  }}
                >
                  Home
                </SiteLink>

                {/* Features toggle button */}
                <button
                  id="features-toggle-btn"
                  className={`flex items-center justify-between w-full transition-colors text-left focus:outline-none ${
                    isFeaturesActive ? "text-amber-400" : "hover:text-amber-200"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsFeaturesOpen((prev) => !prev);
                  }}
                >
                  <span>Features</span>
                  <span
                    id="features-arrow"
                    className="material-symbols-outlined transition-transform duration-300 pointer-events-none"
                    style={{ transform: isFeaturesOpen || isFeaturesActive ? "rotate(90deg)" : "rotate(0deg)" }}
                  >
                    keyboard_arrow_right
                  </span>
                </button>

                <SiteLink
                  href="/about"
                  className={
                    isActive("/about")
                      ? "text-amber-400 transition-colors pointer-events-none"
                      : "hover:text-amber-200 transition-colors"
                  }
                  onClick={(e) => {
                    if (!isActive("/about")) {
                      e.preventDefault();
                      navigateTo("/about");
                    } else {
                      closeSidebar();
                    }
                  }}
                >
                  About DataLynkr
                </SiteLink>

                <SiteLink
                  href="/pricing"
                  className={
                    isActive("/pricing")
                      ? "text-amber-400 transition-colors pointer-events-none"
                      : "hover:text-amber-200 transition-colors"
                  }
                  onClick={(e) => {
                    if (!isActive("/pricing")) {
                      e.preventDefault();
                      navigateTo("/pricing");
                    } else {
                      closeSidebar();
                    }
                  }}
                >
                  Pricing
                </SiteLink>

                <SiteLink
                  href="/contact"
                  className={
                    isActive("/contact")
                      ? "text-amber-400 transition-colors pointer-events-none"
                      : "hover:text-amber-200 transition-colors"
                  }
                  onClick={(e) => {
                    if (!isActive("/contact")) {
                      e.preventDefault();
                      navigateTo("/contact");
                    } else {
                      closeSidebar();
                    }
                  }}
                >
                  Contact Us
                </SiteLink>

                <SiteLink
                  href="/support"
                  className={
                    isActive("/support")
                      ? "text-amber-400 transition-colors pointer-events-none"
                      : "hover:text-amber-200 transition-colors"
                  }
                  onClick={(e) => {
                    if (!isActive("/support")) {
                      e.preventDefault();
                      navigateTo("/support");
                    } else {
                      closeSidebar();
                    }
                  }}
                >
                  Get Support
                </SiteLink>
              </div>
            </div>

            {/* Features Flyout Panel */}
            <div
              id="features-flyout"
              className={`absolute top-0 left-0 sm:left-full w-full sm:w-[19.9rem] h-full bg-gradient-to-br from-[#1F3A89] to-[#0F1D44] border-t sm:border-t-0 sm:border-l border-white/10 shadow-2xl flex flex-col p-8 transform transition-all duration-300 ease-in-out z-50 ${isFeaturesOpen ? "active" : "translate-x-full sm:translate-x-[-10px] opacity-0 pointer-events-none"}`}
            >
              <button
                id="features-back-btn"
                className="flex items-center gap-2 text-amber-400 hover:text-amber-200 transition-colors font-medium mb-6 sm:hidden focus:outline-none"
                onClick={() => setIsFeaturesOpen(false)}
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                <span>Back to Menu</span>
              </button>
              <div className="hidden sm:block text-amber-400 font-bold mb-6 text-xl tracking-wide border-b border-white/10 pb-2">
                Features
              </div>
              <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-5 text-base font-normal">
                {featureLinks.map((feature) => {
                  const featureActive = isActive(feature.href);
                  return (
                  <button
                    key={feature.href}
                    type="button"
                    className={`transition-colors py-2 flex items-center justify-between group/item text-left w-full ${
                      featureActive
                        ? "text-amber-400 pointer-events-none"
                        : "hover:text-amber-200"
                    }`}
                    onClick={() => {
                      if (featureActive) {
                        closeSidebar();
                      } else {
                        navigateTo(feature.href);
                      }
                    }}
                  >
                    <span>{feature.label}</span>
                    <span
                      className={`material-symbols-outlined text-sm transition-opacity ${
                        featureActive ? "opacity-100" : "opacity-0 group-hover/item:opacity-100"
                      }`}
                    >
                      arrow_forward
                    </span>
                  </button>
                  );
                })}
              </div>
            </div>
          </aside>
        </>,
        document.body
      )}
    </>
  );
}
