import LoginClient from "../login/LoginClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Forgot Password",
  description: "Reset your DataLynkr account password.",
  path: "/forgot-password",
});

export default function ForgotPasswordPage() {
  return <LoginClient view="forgot_password" />;
}
