import { supabase } from "@/lib/supabase";

export const ledgerService = {
  async getCustomers() {
    const { data, error } =
      await supabase
        .from("customers")
        .select(`
          id,
          customer_name
        `)
        .order("customer_name");

    if (error) throw error;

    return data;
  },

   async getCustomerLedger(
    customerId: string
  ) {
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
          payment_status
        `)
        .eq(
          "customer_id",
          customerId
        )
        .order(
          "sale_date",
          {
            ascending: false,
          }
        );

    if (error) throw error;

    return data;
  },

  async getCustomerSales(
    customerId: string
  ) {
    const { data, error } =
      await supabase
        .from("sales")
        .select(`
          id,
          invoice_number,
          sale_date,
          total_amount,
          paid_amount,
          due_amount
        `)
        .eq(
          "customer_id",
          customerId
        )
        .order("sale_date");

    if (error) throw error;

    return data;
  },

  async getCustomerPayments(
    customerId: string
  ) {
    const { data, error } =
      await supabase
        .from("customer_payments")
        .select(`
          id,
          payment_date,
          amount,
          payment_method,
          reference_number
        `)
        .eq(
          "customer_id",
          customerId
        )
        .order(
          "payment_date"
        );

    if (error) throw error;

    return data;
  },

  async getSuppliers() {
  const { data, error } =
    await supabase
      .from("suppliers")
      .select(`
        id,
        supplier_name
      `)
      .order("supplier_name");

  if (error) throw error;

  return data;
},

async getSupplierPurchases(
  supplierId: string
) {
  const { data, error } =
    await supabase
      .from("purchases")
      .select(`
        id,
        purchase_number,
        purchase_date,
        total_amount,
        paid_amount,
        due_amount
      `)
      .eq("supplier_id", supplierId)
      .order("purchase_date");

  if (error) throw error;

  return data;
},

async getSupplierPayments(
  supplierId: string
) {
  const { data, error } =
    await supabase
      .from("supplier_payments")
      .select(`
        id,
        payment_date,
        amount,
        payment_method,
        reference_number
      `)
      .eq("supplier_id", supplierId)
      .order("payment_date");

  if (error) throw error;

  return data;
},
};