export interface DashboardSummary {
  products: number;
  customers: number;
  suppliers: number;
  low_stock: number;

  today_sales: number;
  today_expenses: number;

  customer_due: number;
  supplier_due: number;
}