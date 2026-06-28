import { supabase } from "@/lib/supabase";
import type { Tenant, CreateTenantPayload } from "@/types/tenant.types";

export const tenantService = {
  async getTenants(): Promise<Tenant[]> {
    const { data, error } = await supabase
      .from("tenants")
      .select(`
            *,
            plans(
              name
            )
        `)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  

  async getTenant(id: string): Promise<Tenant> {
    const { data, error } = await supabase
      .from("tenants")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

async createTenant(
  payload: CreateTenantPayload
): Promise<Tenant> {
const { data, error } =
  await supabase.functions.invoke(
    "create-tenant",
    {
      body: payload,
    }
  );

console.log("DATA", data);
console.log("ERROR", error);

  if (error) {
    throw error;
  }

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.tenant;
},  

  async updateTenant(id: string, payload: Partial<Tenant>): Promise<Tenant> {
    const { data, error } = await supabase
      .from("tenants")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async suspendTenant(id: string): Promise<Tenant> {
    const { data, error } = await supabase
      .from("tenants")
      .update({ status: "suspended" })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async activateTenant(id: string): Promise<Tenant> {
    const { data, error } = await supabase
      .from("tenants")
      .update({ status: "active" })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteTenant(id: string): Promise<void> {
    const { error } = await supabase.from("tenants").delete().eq("id", id);
    if (error) throw error;
  },

  async resetTenantPassword(id: string, newPassword: string): Promise<void> {
    const { error } = await supabase.rpc("reset_tenant_password", {
      tenant_id: id,
      new_password: newPassword,
    });
    if (error) throw error;
  },
};
