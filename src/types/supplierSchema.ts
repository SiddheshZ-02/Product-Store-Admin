import { z } from "zod";

export const supplierSchema =
  z.object({
    supplier_name:
      z.string().min(2),

    contact_person:
      z.string().optional(),

    phone:
      z.string().optional(),

    email:
      z
        .email()
        .optional()
        .or(z.literal("")),

    gst_number:
      z.string().optional(),

    address:
      z.string().optional(),
  });

export type SupplierFormData =
  z.infer<
    typeof supplierSchema
  >;