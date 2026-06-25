import { supabase } from "@/lib/supabase";
import type { CreateSalePayload } from "@/types/sales.types";

export const salesService = {
  async createSale(payload: CreateSalePayload) {
    const { data, error } = await supabase.rpc("create_sale", payload);

    if (error) throw error;

    return data;
  },
  async getSalesHistory() {
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
        customers!sales_customer_id_fkey(
          customer_name
        )
      `)
      .order("sale_date", {
        ascending: false,
      });

  if (error) throw error;

  return data;
},

  async getSales(from: string, to: string) {
    const { data, error } = await supabase
      .from("sales")
      .select("*")
      .gte("sale_date", from)
      .lte("sale_date", to)
      .order("sale_date", {
        ascending: false,
      });

    if (error) throw error;

    return data;
  },
};

export const reportService = {
  async getSalesReport(from: string, to: string) {
    const { data, error } = await supabase
      .from("sales")
      .select(
        `
          *,
          customers(
            customer_name
          )
        `,
      )
      .gte("sale_date", from)
      .lte("sale_date", to)
      .order("sale_date", {
        ascending: false,
      });

    if (error) throw error;

    return data;
  },


};


