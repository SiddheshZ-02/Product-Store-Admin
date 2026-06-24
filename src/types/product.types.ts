export interface Product {
  id: string;

  tenant_id: string;

  category_id: string | null;

  name: string;

  sku: string;

  barcode: string | null;

  brand: string | null;

  volume_ml: number | null;

  liquor_type: string | null;

  manufacturer: string | null;

  purchase_price: number;

  selling_price: number;

  mrp: number;

  min_stock: number;

  is_active: boolean;

  created_at: string;

  updated_at: string;

 description: string | null;

  alcohol_percentage: number | null;

}

export interface ProductPayload {
  category_id: string;

  name: string;

  sku: string;

  barcode?: string;

  brand?: string;

  description?: string;

  volume_ml?: number;

  alcohol_percentage?: number;

  liquor_type?: string;

  manufacturer?: string;

  purchase_price: number;

  selling_price: number;

  mrp: number;

  min_stock: number;
}
