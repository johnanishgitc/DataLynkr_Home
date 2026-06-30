import LoginClient from "../login/LoginClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Forgot Password",
  description: "Reset your DataLynkr account password.",
  path: "/forget-password",
});

export default function ForgetPasswordPage() {
  return <LoginClient view="forgot_password" />;
}
