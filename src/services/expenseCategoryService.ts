import { supabase } from "@/lib/supabase";

export const expenseCategoryService = {
  async getCategories() {
    const { data, error } =
      await supabase
        .from("expense_categories")
        .select("*")
        .order(
          "category_name"
        );

    if (error) throw error;

    return data;
  },

  async createCategory(
    category_name: string
  ) {
    const { data, error } =
      await supabase
        .from(
          "expense_categories"
        )
        .insert({
          category_name,
        })
        .select()
        .single();

    if (error) throw error;

    return data;
  },
};