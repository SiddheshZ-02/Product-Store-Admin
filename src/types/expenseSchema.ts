import { z } from "zod";

export const expenseSchema =
  z.object({
    category_id:
      z.string().min(1),

    expense_date:
      z.string().min(1),

    title:
      z.string().min(2),

    description:
      z.string().optional(),

    amount:
      z.coerce.number().min(1),

    payment_method:
      z.enum([
        "CASH",
        "UPI",
        "CARD",
        "BANK_TRANSFER",
        "CHEQUE",
      ]),

    reference_number:
      z.string().optional(),
  });

export type ExpenseFormData =
  z.infer<
    typeof expenseSchema
  >;