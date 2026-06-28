import { supabase } from "@/lib/supabase";

export interface Settings {
  id: string;
  tenant_id: string;
  shop_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  gst_number?: string;
  currency?: string;
  invoice_prefix?: string;
  created_at: string;
  updated_at: string;
}

export const settingsService = {
  async getSettings(tenantId: string): Promise<Settings | null> {
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .eq("tenant_id", tenantId)
      .single();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    return data;
  },

  async updateSettings(
    tenantId: string,
    settings: Partial<Omit<Settings, "id" | "tenant_id" | "created_at" | "updated_at">>
  ): Promise<Settings> {
    const { data, error } = await supabase
      .from("settings")
      .upsert({
        tenant_id: tenantId,
        ...settings,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
