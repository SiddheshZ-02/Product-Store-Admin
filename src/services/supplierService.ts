import { supabase } from "@/lib/supabase";
import type { SupplierPayload } from "@/types/supplier.types";
import { useAuthStore } from "@/store/authStore";

export const supplierService = {
  async getSuppliers() {
    const { profile } = useAuthStore.getState();
    if (!profile?.tenant_id) throw new Error("Tenant not found");

    const { data, error } =
      await supabase
        .from("suppliers")
        .select("*")
        .eq("tenant_id", profile.tenant_id)
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
    const { profile } = useAuthStore.getState();
    if (!profile?.tenant_id) throw new Error("Tenant not found");

    const { data, error } =
      await supabase
        .from("suppliers")
        .select("*")
        .eq("id", id)
        .eq("tenant_id", profile.tenant_id)
        .is("deleted_at", null)
        .single();

    if (error) throw error;

    return data;
  },

  async createSupplier(
    payload: SupplierPayload
  ) {
    const { profile } = useAuthStore.getState();
    if (!profile?.tenant_id) throw new Error("Tenant not found");

    const { data, error } =
      await supabase
        .from("suppliers")
        .insert({
          ...payload,
          tenant_id: profile.tenant_id,
        })
        .select()
        .single();

    if (error) throw error;

    return data;
  },

  async updateSupplier(
    id: string,
    payload: SupplierPayload
  ) {
    const { profile } = useAuthStore.getState();
    if (!profile?.tenant_id) throw new Error("Tenant not found");

    const { data, error } =
      await supabase
        .from("suppliers")
        .update({
          ...payload,
          tenant_id: profile.tenant_id,
        })
        .eq("id", id)
        .eq("tenant_id", profile.tenant_id)
        .is("deleted_at", null)
        .select()
        .single();

    if (error) throw error;

    return data;
  },

  async deleteSupplier(
    id: string
  ) {
    const { profile } = useAuthStore.getState();
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
        .eq("id", id)
        .eq("tenant_id", profile?.tenant_id);

    if (error) throw error;
  },
};