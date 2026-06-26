"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { usePathname } from "next/navigation";

interface SidebarContextType {
  isSidebarOpen: boolean;
  isFeaturesOpen: boolean;
  jsReady: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  toggleFeatures: () => void;
  isActive: (href: string) => boolean;
  isFeaturesActive: boolean;
  sidebarCheckboxRef: React.RefObject<HTMLInputElement | null>;
  featuresCheckboxRef: React.RefObject<HTMLInputElement | null>;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [jsReady, setJsReady] = useState(false);
  const pathname = usePathname();
  const sidebarCheckboxRef = useRef<HTMLInputElement>(null);
  const featuresCheckboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setJsReady(true);
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
    if (sidebarCheckboxRef.current) sidebarCheckboxRef.current.checked = false;
    if (featuresCheckboxRef.current) featuresCheckboxRef.current.checked = false;
  }, []);

  const toggleFeatures = useCallback(() => {
    setIsFeaturesOpen((prev) => !prev);
  }, []);

  const isFeaturesActive = pathname.startsWith("/features");

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname.startsWith(href);
    },
    [pathname],
  );

  // Auto-open features flyout when sidebar opens on a feature page
  useEffect(() => {
    if (isSidebarOpen && isFeaturesActive) {
      setIsFeaturesOpen(true);
    }
  }, [isSidebarOpen, isFeaturesActive]);

  // Keep checkboxes in sync with React state
  useEffect(() => {
    if (sidebarCheckboxRef.current)
      sidebarCheckboxRef.current.checked = isSidebarOpen;
  }, [isSidebarOpen]);

  useEffect(() => {
    if (featuresCheckboxRef.current)
      featuresCheckboxRef.current.checked = isFeaturesOpen;
  }, [isFeaturesOpen]);

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        isFeaturesOpen,
        jsReady,
        toggleSidebar,
        closeSidebar,
        toggleFeatures,
        isActive,
        isFeaturesActive,
        sidebarCheckboxRef,
        featuresCheckboxRef,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
