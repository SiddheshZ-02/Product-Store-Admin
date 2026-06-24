import { z } from "zod";

export const productSchema =
  z.object({
    name: z.string().min(2),

    category_id:
      z.string().min(1),

    sku: z.string().min(1),

    barcode:
      z.string().optional(),

    brand:
      z.string().optional(),

    volume_ml:
      z.coerce.number(),

    alcohol_percentage:
      z.coerce.number(),

    liquor_type:
      z.string().optional(),

    manufacturer:
      z.string().optional(),

    purchase_price:
      z.coerce.number(),

    selling_price:
      z.coerce.number(),

    mrp:
      z.coerce.number(),

    min_stock:
      z.coerce.number(),

    description:
      z.string().optional(),
  });

export type ProductFormData =
  z.infer<
    typeof productSchema
  >;