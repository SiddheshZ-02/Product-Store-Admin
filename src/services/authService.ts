import { supabase } from "@/lib/supabase";
import type { LoginPayload } from "@/types/auth.types";


export const authService = {
  async login(payload: LoginPayload) {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });

    if (error) throw error;

    // Check tenant status
    if (data.user) {
      const profile = await this.getProfile(data.user.id);
      
      if (profile.role !== "SUPER_ADMIN" && profile.tenant_id) {
        const { data: tenant, error: tenantError } = await supabase
          .from("tenants")
          .select("status")
          .eq("id", profile.tenant_id)
          .single();

        if (tenantError) throw tenantError;
        
        if (tenant.status === "suspended") {
          // Logout the user
          await supabase.auth.signOut();
          throw new Error("Your account has been suspended. Please contact support.");
        }
      }
    }

    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  },

  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;

    return data;
  },

  async getCurrentUser() {
    const { data, error } =
      await supabase.auth.getUser();

    if (error) throw error;

    return data.user;
  },
};