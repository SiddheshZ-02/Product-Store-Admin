import { supabase } from "@/lib/supabase";

export const supplierService = {
  async getSuppliers() {
    const { data, error } =
      await supabase
        .from("suppliers")
        .select("*")
        .is("deleted_at", null)
        .order("created_at", {
          ascending: false,
        });

    if (error) throw error;

    return data;
  },

  async getSupplierById(
    id: string
  ) {
    const { data, error } =
      await supabase
        .from("suppliers")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;

    return data;
  },

  async createSupplier(
    payload: any
  ) {
    const { data, error } =
      await supabase
        .from("suppliers")
        .insert(payload)
        .select()
        .single();

    if (error) throw error;

    return data;
  },

  async updateSupplier(
    id: string,
    payload: any
  ) {
    const { data, error } =
      await supabase
        .from("suppliers")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return data;
  },

  async deleteSupplier(
    id: string
  ) {
    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    const { error } =
      await supabase
        .from("suppliers")
        .update({
          deleted_at:
            new Date().toISOString(),

          deleted_by:
            user?.id,
        })
        .eq("id", id);

    if (error) throw error;
  },
};