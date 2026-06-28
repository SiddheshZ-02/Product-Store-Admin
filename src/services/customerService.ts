import { supabase } from "@/lib/supabase";
import type { Customer, CustomerPayload } from "@/types/customer.types";
import { useAuthStore } from "@/store/authStore";


export const customerService = {
  async getCustomers(): Promise<Customer[]> {
    const { profile } = useAuthStore.getState();
    if (!profile?.tenant_id) throw new Error("Tenant not found");

    const { data, error } =
      await supabase
        .from("customers")
        .select("*")
        .eq("tenant_id", profile.tenant_id)
        .is("deleted_at", null)
        .order("created_at", {
          ascending: false,
        });

    if (error) throw error;

    return data;
  },

  async getCustomerById(
    id: string
  ): Promise<Customer> {
    const { profile } = useAuthStore.getState();
    if (!profile?.tenant_id) throw new Error("Tenant not found");

    const { data, error } =
      await supabase
        .from("customers")
        .select("*")
        .eq("id", id)
        .eq("tenant_id", profile.tenant_id)
        .is("deleted_at", null)
        .single();

    if (error) throw error;

    return data;
  },

 async createCustomer(payload: CustomerPayload) {
    const { profile } = useAuthStore.getState();
    if (!profile?.tenant_id) throw new Error("Tenant not found");

    console.log("Customer Payload:", payload);

    const { data, error } = await supabase
      .from("customers")
      .insert({
        ...payload,
        tenant_id: profile.tenant_id,
      })
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async updateCustomer(
    id: string,
    payload: CustomerPayload
  ) {
    const { profile } = useAuthStore.getState();
    if (!profile?.tenant_id) throw new Error("Tenant not found");

    const { data, error } =
      await supabase
        .from("customers")
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

  async deleteCustomer(
    id: string
  ) {
    const { profile } = useAuthStore.getState();
    const {
      data: { user },
    } =
      await supabase.auth.getUser();

    const { error } =
      await supabase
        .from("customers")
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

  
  async getDueCustomers() {
    const { profile } = useAuthStore.getState();
    if (!profile?.tenant_id) throw new Error("Tenant not found");

    const { data, error } =
      await supabase.rpc(
        "get_due_customers",
        {
          p_tenant_id: profile.tenant_id
        }
      );

    if (error) throw error;

    return data;
  },
};