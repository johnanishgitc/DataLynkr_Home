import { NextResponse } from "next/server";

const DEMO_REQUEST_URL =
  process.env.CUSTOMER_PORTAL_API_URL ??
  "https://itcatalystindia.com/Development/CustomerPortal_API/api/customer-engagement/demo-request";

type DemoRequestBody = {
  name: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  referred?: string;
  inquiryType: string;
  message: string;
};

export async function POST(request: Request) {
  let body: DemoRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 });
  }

  const { name, companyName, phoneNumber, email, inquiryType, message } = body;

  if (!name?.trim() || !companyName?.trim() || !phoneNumber?.trim() || !email?.trim() || !inquiryType?.trim() || !message?.trim()) {
    return NextResponse.json({ success: false, message: "All required fields must be filled" }, { status: 400 });
  }

  try {
    const response = await fetch(DEMO_REQUEST_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        companyName: companyName.trim(),
        phoneNumber: phoneNumber.trim(),
        email: email.trim(),
        referred: body.referred?.trim() ?? "",
        inquiryType: inquiryType.trim(),
        message: message.trim(),
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return NextResponse.json(
        { success: false, message: data.message ?? data.error?.message ?? "Failed to submit demo request" },
        { status: response.status || 500 },
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to reach the server. Please try again later." },
      { status: 502 },
    );
  }
}
