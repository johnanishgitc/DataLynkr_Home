"use client";

import SiteLink from "./SiteLink";
import { LogoSvg } from "./LogoSvg";
import { useSidebar } from "./SidebarContext";

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

/**
 * Menu button — rendered inside the Navbar's <nav> element.
 * Uses a <label> so the CSS checkbox hack works without JS.
 */
export function SidebarTrigger() {
  const { jsReady, toggleSidebar, isSidebarOpen } = useSidebar();

  const triggerClassName = "relative flex items-center justify-center lg:gap-2 p-0 lg:px-4 lg:py-1.5 rounded-full border-0 lg:border-2 border-primary bg-transparent lg:bg-primary lg:hover:bg-primary/90 lg:hover:border-primary/90 text-[#0E172B] lg:text-white shadow-none lg:shadow-sm lg:hover:shadow-md hover:translate-y-0 lg:hover:-translate-y-0.5 transition-all duration-300 focus:outline-none group active:scale-95 cursor-pointer";

  const triggerChildren = (
    <>
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
    </>
  );

  if (!jsReady) {
    return (
      <label
        htmlFor="sidebar-toggle"
        id="menu-btn"
        aria-label="Open menu"
        className={triggerClassName}
      >
        {triggerChildren}
      </label>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleSidebar}
      id="menu-btn"
      aria-label="Open menu"
      className={triggerClassName}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleSidebar();
        }
      }}
    >
      {triggerChildren}
    </button>
  );
}

/**
 * Sidebar panel — rendered OUTSIDE the <nav> element at body level
 * so that position:fixed works correctly (nav's backdrop-filter creates
 * a containing block that breaks fixed positioning for descendants).
 *
 * Includes the hidden checkbox, overlay, sidebar drawer, and features flyout.
 * Without JS, the CSS checkbox hack drives open/close.
 */
export function SidebarPanel() {
  const {
    jsReady,
    isSidebarOpen,
    isFeaturesOpen,
    closeSidebar,
    toggleFeatures,
    isActive,
    isFeaturesActive,
    sidebarCheckboxRef,
    featuresCheckboxRef,
  } = useSidebar();

  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "/";
  const _ = pathname; // suppress unused warning; isActive uses context pathname

  return (
    <>
      {/* Hidden checkbox — CSS sibling selectors open/close the sidebar when JS is off */}
      <input
        type="checkbox"
        id="sidebar-toggle"
        ref={sidebarCheckboxRef}
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Sidebar Overlay — label so clicking it unchecks the checkbox (closes sidebar) without JS */}
      <label
        htmlFor={jsReady ? undefined : "sidebar-toggle"}
        id="sidebar-overlay"
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ease-in-out ${
          jsReady
            ? isSidebarOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={jsReady ? closeSidebar : undefined}
        aria-hidden="true"
      />

      {/* Sidebar Drawer */}
      <aside
        id="sidebar"
        className={`fixed top-0 left-0 w-[19.9rem] max-w-full h-full z-[70] bg-gradient-to-br from-[#1F3A89] to-[#0F1D44] text-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out overflow-visible ${
          jsReady
            ? isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "-translate-x-full"
        }`}
      >
        <div className="flex-1 flex flex-col h-full overflow-y-auto p-8 relative">
          <div className="pt-16 pb-8 flex items-center relative">
            <SiteLink
              href="/"
              className="absolute left-1/2 -translate-x-1/2 h-10 w-auto flex-shrink-0 block hover:opacity-80 transition-opacity"
              title="DataLynkr Home"
              onClick={jsReady ? closeSidebar : undefined}
            >
              <LogoSvg fillPrimary="white" fillAccent="rgb(239, 201, 79)" />
            </SiteLink>
          </div>

          <div className="flex-1 flex flex-col gap-6 font-medium text-lg headline-font mt-4">
            <SiteLink
              href="/"
              className={
                isActive("/")
                  ? "text-amber-400 transition-colors pointer-events-none"
                  : "hover:text-amber-200 transition-colors"
              }
              onClick={jsReady ? closeSidebar : undefined}
            >
              Home
            </SiteLink>

            {/* Features toggle */}
            {!jsReady && (
              <label
                htmlFor="features-flyout-toggle"
                className={`flex items-center justify-between w-full transition-colors text-left focus:outline-none cursor-pointer ${
                  isFeaturesActive ? "text-amber-400" : "hover:text-amber-200"
                }`}
              >
                <span>Features</span>
                <span
                  id="features-arrow"
                  className="material-symbols-outlined transition-transform duration-300 pointer-events-none"
                  style={{ transform: isFeaturesOpen || isFeaturesActive ? "rotate(90deg)" : "rotate(0deg)" }}
                >
                  keyboard_arrow_right
                </span>
              </label>
            )}
            {jsReady && (
              <button
                type="button"
                id="features-toggle-btn"
                className={`flex items-center justify-between w-full transition-colors text-left focus:outline-none cursor-pointer ${
                  isFeaturesActive ? "text-amber-400" : "hover:text-amber-200"
                }`}
                onClick={toggleFeatures}
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
            )}

            <SiteLink
              href="/about"
              className={
                isActive("/about")
                  ? "text-amber-400 transition-colors pointer-events-none"
                  : "hover:text-amber-200 transition-colors"
              }
              onClick={jsReady ? closeSidebar : undefined}
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
              onClick={jsReady ? closeSidebar : undefined}
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
              onClick={jsReady ? closeSidebar : undefined}
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
              onClick={jsReady ? closeSidebar : undefined}
            >
              Get Support
            </SiteLink>
          </div>
        </div>

        {/* Hidden checkbox for features flyout */}
        <input
          type="checkbox"
          id="features-flyout-toggle"
          ref={featuresCheckboxRef}
          aria-hidden="true"
          tabIndex={-1}
        />

        {/* Features Flyout Panel */}
        <div
          id="features-flyout"
          className={`absolute top-0 left-0 sm:left-full w-full sm:w-[19.9rem] h-full bg-gradient-to-br from-[#1F3A89] to-[#0F1D44] border-t sm:border-t-0 sm:border-l border-white/10 shadow-2xl flex flex-col p-8 transform transition-all duration-300 ease-in-out z-50 ${
            jsReady
              ? isFeaturesOpen
                ? "active"
                : "translate-x-full sm:translate-x-[-10px] opacity-0 pointer-events-none"
              : "translate-x-full sm:translate-x-[-10px] opacity-0 pointer-events-none"
          }`}
        >
          {!jsReady && (
            <label
              htmlFor="features-flyout-toggle"
              className="flex items-center gap-2 text-amber-400 hover:text-amber-200 transition-colors font-medium mb-6 sm:hidden focus:outline-none cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">
                arrow_back
              </span>
              <span>Back to Menu</span>
            </label>
          )}
          {jsReady && (
            <button
              type="button"
              id="features-back-btn"
              className="flex items-center gap-2 text-amber-400 hover:text-amber-200 transition-colors font-medium mb-6 sm:hidden focus:outline-none cursor-pointer bg-transparent border-0 p-0 text-left"
              onClick={toggleFeatures}
            >
              <span className="material-symbols-outlined text-lg">
                arrow_back
              </span>
              <span>Back to Menu</span>
            </button>
          )}
          <div className="hidden sm:block text-amber-400 font-bold mb-6 text-xl tracking-wide border-b border-white/10 pb-2">
            Features
          </div>
          <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-5 text-base font-normal">
            {featureLinks.map((feature) => {
              const featureActive = isActive(feature.href);
              return (
                <SiteLink
                  key={feature.href}
                  href={feature.href}
                  className={`transition-colors py-2 flex items-center justify-between group/item w-full ${
                    featureActive
                      ? "text-amber-400 pointer-events-none"
                      : "hover:text-amber-200"
                  }`}
                  onClick={jsReady ? closeSidebar : undefined}
                >
                  <span>{feature.label}</span>
                  <span
                    className={`material-symbols-outlined text-sm transition-opacity ${
                      featureActive
                        ? "opacity-100"
                        : "opacity-0 group-hover/item:opacity-100"
                    }`}
                  >
                    arrow_forward
                  </span>
                </SiteLink>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
