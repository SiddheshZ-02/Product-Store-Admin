import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";

export const categoryService = {
  async getCategories() {
    const { profile } = useAuthStore.getState();
    if (!profile?.tenant_id) throw new Error("Tenant not found");

    const { data, error } =
      await supabase
        .from("categories")
        .select("*")
        .eq("tenant_id", profile.tenant_id)
        .is("deleted_at", null)
        .order("name");

    if (error) throw error;

    return data;
  },
};