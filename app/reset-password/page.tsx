import ResetPasswordClient from "./ResetPasswordClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Reset Password",
  description: "Securely reset your DataLynkr portal password.",
  path: "/reset-password",
  noIndex: true,
});

export default function ResetPasswordPage() {
  return <ResetPasswordClient />;
}
