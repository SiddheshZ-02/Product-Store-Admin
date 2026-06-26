export interface SupplierPayment {
  id: string;

  supplier_id: string;

  payment_date: string;

  amount: number;

  payment_method: string;

  reference_number?: string;

  notes?: string;
}

export interface SupplierPaymentPayload {
  supplier_id: string;

  payment_date: string;

  amount: number;

  payment_method: string;

  reference_number?: string;

  notes?: string;
}