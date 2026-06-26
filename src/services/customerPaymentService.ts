import { supabase } from "@/lib/supabase";

import type {
  CustomerPaymentPayload,
} from "@/types/customerPayment.types";

export const customerPaymentService = {
  async getPayments() {
    const { data, error } =
      await supabase
        .from("customer_payments")
        .select(`
          *,
          customers(
            customer_name,
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
    payload: CustomerPaymentPayload
  ) {
    const { data, error } =
      await supabase
        .from("customer_payments")
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
        .from("customer_payments")
        .delete()
        .eq("id", id);

    if (error) throw error;
  },
};