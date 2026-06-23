import LoginClient from "./LoginClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Login",
  description:
    "Log in to your DataLynkr portal to securely access real-time Tally data, review dynamic dashboards, manage sales orders, approve workflows, and more.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return <LoginClient />;
}
