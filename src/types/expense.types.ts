export interface Expense {
  id: string;
  tenant_id: string;

  category_id: string;

  expense_date: string;

  title: string;

  description: string | null;

  amount: number;

  payment_method:
    | "CASH"
    | "UPI"
    | "CARD"
    | "BANK_TRANSFER"
    | "CHEQUE";

  reference_number: string | null;

  created_at: string;
}

export interface ExpensePayload {
  category_id: string;

  expense_date: string;

  title: string;

  description?: string;

  amount: number;

  payment_method:
    | "CASH"
    | "UPI"
    | "CARD"
    | "BANK_TRANSFER"
    | "CHEQUE";

  reference_number?: string;
}
