import { supabase } from "@/lib/supabase";

import type {
  CreateSalesReturnPayload,
} from "@/types/salesReturn.types";

export const salesReturnService = {
  async createReturn(
    payload: CreateSalesReturnPayload
  ) {
    const { data, error } =
      await supabase.rpc(
        "create_sales_return",
        payload
      );

    if (error) throw error;

    return data;
  },

  async getReturns() {
    const { data, error } =
      await supabase
        .from("sales_returns")
        .select(`
          *,
          customers(
            customer_name
          )
        `)
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    if (error) throw error;

    return data;
  },
};