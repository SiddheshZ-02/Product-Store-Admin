import { supabase } from "@/lib/supabase";

export const categoryService = {
  async getCategories() {
    const { data, error } =
      await supabase
        .from("categories")
        .select("*")
        .is("deleted_at", null)
        .order("name");

    if (error) throw error;

    return data;
  },
};