import Link from "next/link";
import type { ComponentProps } from "react";

/** Static Apache export: prefetch HEAD requests fail on legacy route directories. */
export default function SiteLink(props: ComponentProps<typeof Link>) {
  return <Link prefetch={false} {...props} />;
}
