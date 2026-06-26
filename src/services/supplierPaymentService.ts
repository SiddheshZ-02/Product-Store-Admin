import { supabase } from "@/lib/supabase";

import type {
  SupplierPaymentPayload,
} from "@/types/supplierPayment.types";

export const supplierPaymentService = {
  async getPayments() {
    const { data, error } =
      await supabase
        .from("supplier_payments")
        .select(`
          *,
          suppliers(
            supplier_name,
            phone
          )
        `)
        .order("payment_date", {
          ascending: false,
        });

    if (error) throw error;

    return data;
  },

  async createPayment(
    payload: SupplierPaymentPayload
  ) {
    const { data, error } =
      await supabase
        .from("supplier_payments")
        .insert(payload)
        .select()
        .single();

    if (error) throw error;

    return data;
  },

  async deletePayment(
    id: string
  ) {
    const { error } =
      await supabase
        .from("supplier_payments")
        .delete()
        .eq("id", id);

    if (error) throw error;
  },
};