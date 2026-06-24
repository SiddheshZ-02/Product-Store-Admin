import { supabase } from "@/lib/supabase";
import type { CreatePurchasePayload } from "@/types/purchase.types";

export const purchaseService = {
  async createPurchase(
    payload: CreatePurchasePayload
  ) {
    const { data, error } =
      await supabase.rpc(
        "create_purchase",
        payload
      );

    if (error) throw error;

    return data;
  },

  async getPurchases() {
    const { data, error } =
      await supabase
        .from("purchases")
        .select(`
          *,
          suppliers(
            supplier_name
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