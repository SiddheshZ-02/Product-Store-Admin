export interface SaleItem {
  product_id: string;
  quantity: number;
}

export interface CreateSalePayload {
  p_customer_id: string;

  p_paid_amount: number;

  p_notes?: string;

  p_items: SaleItem[];
}