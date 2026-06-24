import { supabase } from "@/lib/supabase";

export const expenseService = {
  async getExpenses() {
    const { data, error } =
      await supabase
        .from("expenses")
        .select(`
          *,
          expense_categories(
            name
          )
        `)
        .order("expense_date", {
          ascending: false,
        });

    if (error) throw error;

    return data;
  },

  async getExpenseById(
    id: string
  ) {
    const { data, error } =
      await supabase
        .from("expenses")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;

    return data;
  },

  async createExpense(
    payload: any
  ) {
    const { data, error } =
      await supabase
        .from("expenses")
        .insert(payload)
        .select()
        .single();

    if (error) throw error;

    return data;
  },

  async updateExpense(
    id: string,
    payload: any
  ) {
    const { data, error } =
      await supabase
        .from("expenses")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return data;
  },

  async deleteExpense(
    id: string
  ) {
    const { error } =
      await supabase
        .from("expenses")
        .delete()
        .eq("id", id);

    if (error) throw error;
  },

  async getCategories() {
    const { data, error } =
      await supabase
        .from(
          "expense_categories"
        )
        .select("*")
        .eq("is_active", true)
        .order("name");

    if (error) throw error;

    return data;
  },
};