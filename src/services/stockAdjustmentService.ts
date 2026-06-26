import { supabase } from "@/lib/supabase";

export const stockAdjustmentService = {
  async createAdjustment(
    payload: {
      product_id: string;

      quantity: number;

      adjustment_type: string;

      reason?: string;
    }
  ) {
    const { data, error } =
      await supabase.rpc(
        "create_stock_adjustment",
        {
          p_product_id:
            payload.product_id,

          p_quantity:
            payload.quantity,

          p_adjustment_type:
            payload.adjustment_type,

          p_reason:
            payload.reason,
        }
      );

    if (error) throw error;

    return data;
  },

  async getAdjustments() {
    const { data, error } =
      await supabase
        .from(
          "stock_adjustments"
        )
        .select(`
          *,
          products(
            name
          )
        `)
        .order(
          "created_at",
          {
            ascending:
              false,
          }
        );

    if (error) throw error;

    return data;
  },
};