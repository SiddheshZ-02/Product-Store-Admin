import { supabase } from "@/lib/supabase";
import type { Product, ProductPayload } from "@/types/product.types";
import { useAuthStore } from "@/store/authStore";

export const productService = {
  async getProducts(search?: string) {
    const { profile } = useAuthStore.getState();
    if (!profile?.tenant_id) throw new Error("Tenant not found");

    let query = supabase
      .from("products")
      .select(`
        id,
        name,
        selling_price,
        sku,
        category_id,
        mrp,
        is_active,
        barcode,
        brand,
        description,
        volume_ml,
        alcohol_percentage,
        liquor_type,
        manufacturer,
        purchase_price,
        min_stock,
        inventory(
          quantity
        )
      `)
      .eq("tenant_id", profile.tenant_id)
      .is("deleted_at", null); // Filter out soft-deleted products

    // If search is provided and it's a string, use it
    if (search && typeof search === "string") {
      query = query.ilike("name", `%${search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data;
  },

  async getProductById(id: string): Promise<Product> {
    const { profile } = useAuthStore.getState();
    if (!profile?.tenant_id) throw new Error("Tenant not found");

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .eq("tenant_id", profile.tenant_id)
      .is("deleted_at", null)
      .single();

    if (error) throw error;

    return data;
  },

  async createProduct(payload: ProductPayload) {
    const { profile } = useAuthStore.getState();
    if (!profile?.tenant_id) throw new Error("Tenant not found");

    const { data, error } = await supabase
      .from("products")
      .insert({
        ...payload,
        tenant_id: profile.tenant_id,
      })
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  async updateProduct(id: string, payload: ProductPayload) {
    const { profile } = useAuthStore.getState();
    if (!profile?.tenant_id) throw new Error("Tenant not found");

    const { data, error } = await supabase
      .from("products")
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

  async deleteProduct(id: string) {
    const { profile } = useAuthStore.getState();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("products")
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: user?.id,
      })
      .eq("id", id)
      .eq("tenant_id", profile?.tenant_id);

    if (error) throw error;
  },
};
