const DEFAULT_API_URL = "https://itcatalystindia.com/Development/CustomerPortal_API";

export function getApiBaseUrl(): string {
  if (typeof window === "undefined") return DEFAULT_API_URL;
  const host = window.location.hostname || "";
  const isLocal =
    host === "localhost" ||
    host === "127.0.0.1" ||
    host.startsWith("192.168.") ||
    host.startsWith("10.") ||
    host.startsWith("172.");
  return isLocal ? "" : DEFAULT_API_URL;
}

export async function apiPost(
  endpoint: string,
  payload?: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const res = await fetch(`${getApiBaseUrl()}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload || {}),
  });
  const text = await res.text();
  let data: Record<string, unknown> = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }
  if (!res.ok || data.error) {
    const msg = typeof data.error === "string" ? data.error.trim() : "";
    if (msg === "Invalid or expired token") {
      if (typeof window !== "undefined") {
        sessionStorage.clear();
        window.location.reload();
      }
      return {};
    }
    throw new Error(String(data.error || data.message || `Request failed: ${res.status}`));
  }
  return data;
}

export function navigateApp(pathname: string) {
  if (typeof window === "undefined") return;
  const url = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const target = window.top && window.top !== window ? window.top : window;
  target.location.href = url;
}

export function applyLoginResponse(data: Record<string, unknown>, redirectPath = "/admin-dashboard") {
  const details = data.user_type_details as Record<string, unknown> | undefined;
  const employee = data.employee as Record<string, unknown> | undefined;
  const partner = data.partner as Record<string, unknown> | undefined;

  sessionStorage.setItem("name", String(data.name || ""));
  sessionStorage.setItem("email", String(data.email || ""));
  sessionStorage.setItem("token", String(data.token || ""));
  if (details?.user_id != null) sessionStorage.setItem("userId", String(details.user_id));
  if (data.user_type) sessionStorage.setItem("user_type", String(data.user_type));
  if (employee?.code) sessionStorage.setItem("employee_code", String(employee.code));
  if (partner?.code) sessionStorage.setItem("partner_code", String(partner.code));

  try {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(
        {
          type: "datalynkr-auth",
          payload: {
            token: sessionStorage.getItem("token"),
            email: sessionStorage.getItem("email"),
            name: sessionStorage.getItem("name"),
            userId: sessionStorage.getItem("userId"),
            user_type: sessionStorage.getItem("user_type"),
            employee_code: sessionStorage.getItem("employee_code"),
            partner_code: sessionStorage.getItem("partner_code"),
          },
        },
        window.location.origin,
      );
    }
  } catch {
    /* ignore */
  }

  navigateApp(redirectPath);
}
