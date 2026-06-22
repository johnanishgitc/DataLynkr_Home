import type { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Log in to your DataLynkr portal to securely access real-time Tally data, review dynamic dashboards, manage sales orders, approve workflows, and more.",
};

export default function LoginPage() {
  return <LoginClient />;
}
