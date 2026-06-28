import { supabase } from "@/lib/supabase";
import type { Plan, CreatePlanPayload, UpdatePlanPayload } from "@/types/plan.types";

export const planService = {
  async getPlans(): Promise<Plan[]> {
    const { data, error } = await supabase
      .from("plans")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async getPlan(id: string): Promise<Plan> {
    const { data, error } = await supabase
      .from("plans")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async createPlan(payload: CreatePlanPayload): Promise<Plan> {
    const { data, error } = await supabase
      .from("plans")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updatePlan(id: string, payload: UpdatePlanPayload): Promise<Plan> {
    const { data, error } = await supabase
      .from("plans")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deletePlan(id: string): Promise<void> {
    const { error } = await supabase.from("plans").delete().eq("id", id);
    if (error) throw error;
  },
};
