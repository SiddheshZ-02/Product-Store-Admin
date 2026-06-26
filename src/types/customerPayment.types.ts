export interface CustomerPayment {
  id: string;

  tenant_id: string;

  customer_id: string;

  payment_date: string;

  amount: number;

  payment_method: string;

  reference_number?: string;

  notes?: string;

  created_at: string;
}

export interface CustomerPaymentPayload {
  customer_id: string;

  payment_date: string;

  amount: number;

  payment_method: string;

  reference_number?: string;

  notes?: string;
}