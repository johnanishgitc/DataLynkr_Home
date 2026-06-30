import LoginClient from "./LoginClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Customer Login",
  description: "Login to your secure DataLynkr account.",
  path: "/login",
});

export default function LoginPage() {
  return <LoginClient view="login" />;
}
