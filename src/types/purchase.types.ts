export interface PurchaseItem {
  product_id: string;
  quantity: number;
  purchase_price: number;
}

export interface CreatePurchasePayload {
  p_supplier_id: string;

  p_invoice_number: string;

  p_purchase_date: string;

  p_paid_amount: number;

  p_notes?: string;

  p_items: PurchaseItem[];
}