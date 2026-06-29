import { Wix_Madefor_Display, Wix_Madefor_Text } from "next/font/google";

/** Self-hosted at build time — avoids Google Fonts on the critical request chain. */
export const wixDisplay = Wix_Madefor_Display({
  subsets: ["latin"],
  variable: "--font-wix-display",
  display: "swap",
});

export const wixText = Wix_Madefor_Text({
  subsets: ["latin"],
  variable: "--font-wix-text",
  display: "swap",
});

export const fontClassNames = `${wixDisplay.variable} ${wixText.variable}`;
