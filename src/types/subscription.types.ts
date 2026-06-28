export interface Subscription {
  price: number;
  id: string;
  tenant_id: string;
  plan_id: string;
  status: 'active' | 'expired' | 'cancelled' | 'trial';
  start_date: string;
  end_date: string | null;
  trial_end_date: string | null;
  created_at: string;
  updated_at: string;
  plans?: {
    name: string;
  };
}

export interface CreateSubscriptionPayload {
  tenant_id: string;
  plan_id: string;
}

export interface UpdateSubscriptionPayload {
  plan_id?: string;
  status?: 'active' | 'expired' | 'cancelled';
}
