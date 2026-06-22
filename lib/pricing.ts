export type PricingSlab = {
  id: number;
  name: string;
  description: string;
  min_users: number;
  max_users: number;
  monthly_price: string;
  yearly_price: string;
  free_external_users_per_internal_user: number;
};

export type BankDetails = {
  company_name: string;
  account_holder_name: string;
  bank_name: string;
  account_number: string;
  ifsc_code: string;
  branch_name: string;
  upi_id: string;
};

export type PricingData = {
  plans: PricingSlab[];
  bankDetails: BankDetails | null;
};

const PRICING_SLABS_URL =
  process.env.CUSTOMER_PORTAL_PRICING_URL ??
  "https://itcatalystindia.com/Development/CustomerPortal_API/api/subscriptions/slabs/internal/public";

type ApiPricingSlab = PricingSlab & { is_active: number };

type ApiResponse = {
  success: boolean;
  data: ApiPricingSlab[];
  bank_details?: {
    company_name: string;
    account_holder_name: string;
    bank_name: string;
    account_number: string;
    ifsc_code: string;
    branch_name: string;
    upi_id: string;
    is_active: number;
  };
};

export function formatUserRange(minUsers: number, maxUsers: number): string {
  if (minUsers === maxUsers) {
    return `${minUsers} user${minUsers === 1 ? "" : "s"}`;
  }
  if (maxUsers >= 9999) {
    return `${minUsers}+ users`;
  }
  return `${minUsers}-${maxUsers} users`;
}

export function formatPrice(price: string): string {
  const value = Number.parseFloat(price);
  return value.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

export async function getPricingData(): Promise<PricingData> {
  try {
    const response = await fetch(PRICING_SLABS_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return { plans: [], bankDetails: null };
    }

    const data: ApiResponse = await response.json();

    if (!data.success) {
      return { plans: [], bankDetails: null };
    }

    const plans = data.data
      .filter((slab) => slab.is_active === 1)
      .map(({ id, name, description, min_users, max_users, monthly_price, yearly_price, free_external_users_per_internal_user }) => ({
        id,
        name,
        description,
        min_users,
        max_users,
        monthly_price,
        yearly_price,
        free_external_users_per_internal_user,
      }));

    const bank = data.bank_details;
    const bankDetails =
      bank?.is_active === 1
        ? {
            company_name: bank.company_name,
            account_holder_name: bank.account_holder_name,
            bank_name: bank.bank_name,
            account_number: bank.account_number,
            ifsc_code: bank.ifsc_code,
            branch_name: bank.branch_name,
            upi_id: bank.upi_id,
          }
        : null;

    return { plans, bankDetails };
  } catch {
    return { plans: [], bankDetails: null };
  }
}
