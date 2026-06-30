import LoginClient from "../login/LoginClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Sign Up",
  description: "Create your DataLynkr account.",
  path: "/signup",
});

export default function SignupPage() {
  return <LoginClient view="signup" />;
}
