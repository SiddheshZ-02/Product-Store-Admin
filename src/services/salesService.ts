import { supabase } from "@/lib/supabase";
import type { CreateSalePayload } from "@/types/sales.types";

export const salesService = {
  async createSale(payload: CreateSalePayload) {
    const { data, error } = await supabase.rpc("create_sale", payload);

    if (error) throw error;

    return data;
  },

  async getSales() {
    const { data, error } = await supabase
      .from("sales")
      .select(
        `
      id,
      invoice_number,
      sale_date,
      total_amount,
      paid_amount,
      due_amount,
      payment_status,
      customers (
        customer_name
      )
    `,
      )
      .order("created_at", {
        ascending: false,
      });

    if (error) throw error;

    return data;
  },
};
