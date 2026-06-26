import { supabase } from "@/lib/supabase";
import type { Tenant } from "@/types/tenant.types";


export const tenantService = {
  async getTenants(): Promise<Tenant[]> {
    const { data, error } =
      await supabase
        .from("tenants")
        .select(`
            *,
            plans(
              name
            )
        `)
        .order("created_at", {
          ascending: false,
        });

    if (error) throw error;

    return data;
  },
};