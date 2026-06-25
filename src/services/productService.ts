import { supabase } from "@/lib/supabase";
import type { Product, ProductPayload } from "@/types/product.types";

export const productService = {
async getProducts(search?: string) {
  let query = supabase
    .from("products")
    .select(`
      id,
      name,
      selling_price,
      inventory(
        quantity
      )
    `);

  if (search) {
    query = query.ilike(
      "name",
      `%${search}%`
    );
  }

  const { data, error } =
    await query;

  if (error) throw error;

  return data;
},

  async getProductById(id: string): Promise<Product> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  },

  async createProduct(payload: ProductPayload) {
    const { data, error } = await supabase
      .from("products")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async updateProduct(id: string, payload: ProductPayload) {
    const { data, error } = await supabase
      .from("products")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async deleteProduct(id: string) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("products")
      .update({
        deleted_at: new Date().toISOString(),

        deleted_by: user?.id,
      })
      .eq("id", id);

    if (error) throw error;
  },
};
