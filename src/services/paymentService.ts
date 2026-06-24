// src/services/paymentService.ts

import { supabase } from "@/lib/supabase";

export const paymentService = {
  async receiveCustomerPayment(
    payload: {
      p_sale_id: string;
      p_amount: number;
      p_payment_method:
        | "CASH"
        | "UPI"
        | "CARD"
        | "BANK_TRANSFER"
        | "CHEQUE";

      p_reference_number?: string;

      p_notes?: string;
    }
  ) {
    const { data, error } =
      await supabase.rpc(
        "receive_customer_payment",
        payload
      );

    if (error) throw error;

    return data;
  },

  async getCustomerDues() {
    const { data, error } =
      await supabase
        .from("sales")
        .select(`
          id,
          invoice_number,
          total_amount,
          paid_amount,
          due_amount,
          payment_status,
          customers(
            customer_name
          )
        `)
        .gt("due_amount", 0)
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    if (error) throw error;

    return data;
  },



  async paySupplier(payload: {
  p_purchase_id: string;
  p_amount: number;
  p_payment_method:
    | "CASH"
    | "UPI"
    | "CARD"
    | "BANK_TRANSFER"
    | "CHEQUE";

  p_reference_number?: string;
  p_notes?: string;
}) {
  const { data, error } =
    await supabase.rpc(
      "pay_supplier",
      payload
    );

  if (error) throw error;

  return data;
},

async getSupplierDues() {
  const { data, error } =
    await supabase
      .from("purchases")
      .select(`
        id,
        purchase_number,
        total_amount,
        paid_amount,
        due_amount,
        payment_status,
        suppliers(
          supplier_name
        )
      `)
      .gt("due_amount", 0)
      .order("created_at", {
        ascending: false,
      });

  if (error) throw error;

  return data;
},
};

