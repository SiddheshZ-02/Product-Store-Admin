import { supabase } from "@/lib/supabase";

export const inventoryService = {
  async getInventoryReport() {
    const { data, error } =
      await supabase
        .from("inventory")
        .select(`
          quantity,

          products(
            id,
            name,
            purchase_price,
            selling_price,
            min_stock,

            categories(
              name
            )
          )
        `)
        .order("created_at", {
          ascending: false,
        });

    if (error) throw error;

    return data;
  },
};