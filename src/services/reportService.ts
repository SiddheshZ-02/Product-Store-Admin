import { supabase } from "@/lib/supabase";

export const reportService = {
async getSalesReport(
  from?: string,
  to?: string
) {
  let query = supabase
    .from("sales")
    .select(`
      id,
      invoice_number,
      sale_date,
      total_amount,
      paid_amount,
      due_amount,
      payment_status,
      customer_id,
      customers!sales_customer_id_fkey (
        customer_name
      )
    `);

  if (from) {
    query = query.gte(
      "sale_date",
      from
    );
  }

  if (to) {
    query = query.lte(
      "sale_date",
      to
    );
  }

  const { data, error } =
    await query.order(
      "sale_date",
      {
        ascending: false,
      }
    );

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
  async getProfitLossData() {
  const [
    salesResult,
    saleItemsResult,
    expensesResult,
  ] = await Promise.all([
    supabase
      .from("sales")
      .select(`
        id,
        total_amount
      `),

    supabase
      .from("sale_items")
      .select(`
        quantity,
        cost_price
      `),

    supabase
      .from("expenses")
      .select(`
        amount
      `),
  ]);

  if (salesResult.error)
    throw salesResult.error;

  if (saleItemsResult.error)
    throw saleItemsResult.error;

  if (expensesResult.error)
    throw expensesResult.error;

  return {
    sales: salesResult.data,
    saleItems:
      saleItemsResult.data,
    expenses:
      expensesResult.data,
  };
},

async getPurchaseReport(
  from?: string,
  to?: string
) {
  let query = supabase
    .from("purchases")
    .select(`
      id,
      purchase_number,
      invoice_number,
      purchase_date,
      total_amount,
      paid_amount,
      due_amount,
      payment_status,
      suppliers!purchases_supplier_id_fkey (
        supplier_name
      )
    `);

  if (from) {
    query = query.gte(
      "purchase_date",
      from
    );
  }

  if (to) {
    query = query.lte(
      "purchase_date",
      to
    );
  }

  const { data, error } =
    await query.order(
      "purchase_date",
      {
        ascending: false,
      }
    );

  if (error) throw error;

  return data;
}
};