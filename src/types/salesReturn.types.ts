export interface SalesReturnItem {
  product_id: string;
  quantity: number;
  unit_price: number;
}

export interface CreateSalesReturnPayload {
  p_sale_id: string;

  p_notes?: string;

  p_items: SalesReturnItem[];
}