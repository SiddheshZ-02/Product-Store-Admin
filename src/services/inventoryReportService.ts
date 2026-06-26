import { supabase } from "@/lib/supabase";

export const inventoryReportService = {
  async getInventoryValuation() {
    const { data, error } =
      await supabase
        .from("inventory")
        .select(`
          quantity,
          products(
            id,
            name,
            cost_price,
            selling_price
          )
        `);

    if (error) throw error;

    return data;
  },
};