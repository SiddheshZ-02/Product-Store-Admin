import { supabase } from "@/lib/supabase";

export const invoiceService = {
  async getInvoice(id: string) {
    const { data, error } =
      await supabase
        .from("sales")
        .select(`
          *,
          customers(
            customer_name,
            phone
          ),
          sale_items(
            quantity,
            unit_price,
            line_total,
            products(
              name
            )
          )
        `)
        .eq("id", id)
        .single();

    if (error) throw error;

    return data;
  },
};