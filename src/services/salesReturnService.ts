import { supabase } from "@/lib/supabase";

export const salesReturnService = {
  async createReturn(payload: {
    sale_id: string;
    product_id: string;
    quantity: number;
    reason?: string;
  }) {
    const { data, error } =
      await supabase.rpc(
        "create_sales_return",
        {
          p_sale_id:
            payload.sale_id,

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
        .from("sales_returns")
        .select(`
          *,
          sales(
            invoice_number
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
  
  async getSaleItems(
  saleId: string
) {
  const { data, error } =
    await supabase.rpc(
      "get_sale_items_for_return",
      {
        p_sale_id: saleId,
      }
    );

  if (error) throw error;

  return data;
},
};