import { supabase } from "@/lib/supabase";
import type { Subscription, CreateSubscriptionPayload, UpdateSubscriptionPayload } from "@/types/subscription.types";

export const subscriptionService = {
  async getSubscriptions(): Promise<Subscription[]> {
    const { data, error } = await supabase
      .from("subscriptions")
      .select(`
        *,
        plans(
          name
        ),
        tenants(
          shop_name
        )
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async getSubscription(id: string): Promise<Subscription> {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async createSubscription(payload: CreateSubscriptionPayload): Promise<Subscription> {
    const { data, error } = await supabase
      .from("subscriptions")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateSubscription(id: string, payload: UpdateSubscriptionPayload): Promise<Subscription> {
    const { data, error } = await supabase
      .from("subscriptions")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
