import { supabase } from "@/lib/supabase";

export const supplierLedgerService = {

  async getSuppliers() {

    const { data, error } =
      await supabase
        .from("suppliers")
        .select("*")
        .order("supplier_name");

    if (error) throw error;

    return data;
  },

  async getPurchases(
    supplierId: string
  ) {

    const { data, error } =
      await supabase
        .from("purchases")
        .select("*")
        .eq(
          "supplier_id",
          supplierId
        );

    if (error) throw error;

    return data;
  },

  async getPayments(
    supplierId: string
  ) {

    const { data, error } =
      await supabase
        .from(
          "supplier_payments"
        )
        .select("*")
        .eq(
          "supplier_id",
          supplierId
        );

    if (error) throw error;

    return data;
  },
};