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