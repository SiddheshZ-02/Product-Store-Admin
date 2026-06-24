import { supabase } from "@/lib/supabase";

export const reportService = {
  async getSalesReport() {
    const { data, error } =
      await supabase
        .from("sales")
        .select(`
          id,
          invoice_number,
          sale_date,
          total_amount,
          paid_amount,
          due_amount,
          payment_status,
          customer_id
        `);

    if (error) throw error;

    return data;
  },

  async getTopProducts() {
    const { data, error } =
      await supabase
        .from("sale_items")
        .select(`
          quantity,
          product_id,
          products(
            id,
            name
          )
        `);

    if (error) throw error;

    return data;
  },
};