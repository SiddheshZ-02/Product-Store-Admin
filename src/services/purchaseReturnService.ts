import { supabase } from "@/lib/supabase";

export const purchaseReturnService = {
  async getPurchases() {
    const { data, error } =
      await supabase
        .from("purchases")
        .select(`
          id,
          purchase_number
        `);

    if (error) throw error;

    return data;
  },

  async getPurchaseItems(
    purchaseId: string
  ) {
    const { data, error } =
      await supabase.rpc(
        "get_purchase_items_for_return",
        {
          p_purchase_id:
            purchaseId,
        }
      );

    if (error) throw error;

    return data;
  },

  async createReturn(
    payload: any
  ) {
    const { data, error } =
      await supabase.rpc(
        "create_purchase_return",
        {
          p_purchase_id:
            payload.purchase_id,

          p_product_id:
            payload.product_id,

          p_quantity:
            payload.quantity,

          p_reason:
            payload.reason,
        }
      );

    if (error) throw error;

    return data;
  },

  async getReturns() {
    const { data, error } =
      await supabase
        .from(
          "purchase_returns"
        )
        .select(`
          *,
          purchases(
            purchase_number
          ),
          products(
            name
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