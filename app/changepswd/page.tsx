import type { Metadata } from "next";
import ChangePswdClient from "./ChangePswdClient";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Change Password",
  description: "Securely change your DataLynkr portal password.",
  alternates: { canonical: absoluteUrl("/changepswd") },
};

export default function ChangePasswordPage() {
  return <ChangePswdClient />;
}
