export interface Tenant {
  id: string;

  shop_name: string;

  owner_name: string;

  email: string;

  phone: string | null;

  status: string;

  subscription_status: string;

  trial_end_date: string | null;

  subscription_start: string | null;

  subscription_end: string | null;

  created_at: string;
}

export interface CreateTenantPayload {
  shop_name: string;

  owner_name: string;

  email: string;

  password: string;

  phone?: string;

  plan_id: string;
}