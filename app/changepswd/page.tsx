import ChangePswdClient from "./ChangePswdClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Change Password",
  description: "Securely change your DataLynkr portal password.",
  path: "/changepswd",
  noIndex: true,
});

export default function ChangePasswordPage() {
  return <ChangePswdClient />;
}
