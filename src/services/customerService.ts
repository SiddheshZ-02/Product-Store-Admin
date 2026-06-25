import { supabase } from "@/lib/supabase";
import type { Customer, CustomerPayload } from "@/types/customer.types";



export const customerService = {
  async getCustomers(): Promise<Customer[]> {
    const { data, error } =
      await supabase
        .from("customers")
        .select("*")
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
    const { data, error } =
      await supabase
        .from("customers")
        .select("*")
        .eq("id", id)
        .single();

    if (error) throw error;

    return data;
  },

  async createCustomer(
    payload: CustomerPayload
  ) {
    const { data, error } =
      await supabase
        .from("customers")
        .insert(payload)
        .select()
        .single();

    if (error) throw error;

    return data;
  },

  async updateCustomer(
    id: string,
    payload: CustomerPayload
  ) {
    const { data, error } =
      await supabase
        .from("customers")
        .update(payload)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return data;
  },

  async deleteCustomer(
    id: string
  ) {
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
        .eq("id", id);

    if (error) throw error;
  },

  
  async getDueCustomers() {
  const { data, error } =
    await supabase.rpc(
      "get_due_customers"
    );

  if (error) throw error;

  return data;
},
};