export interface Plan {
  id: string;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  trial_days: number;
  max_products: number | null;
  max_customers: number | null;
  max_suppliers: number | null;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface CreatePlanPayload {
  name: string;
  description?: string;
  price: number;
  currency: string;
  trial_days: number;
  max_products?: number;
  max_customers?: number;
  max_suppliers?: number;
}

export interface UpdatePlanPayload extends Partial<CreatePlanPayload> {
  status?: 'active' | 'inactive';
}
