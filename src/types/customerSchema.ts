import { z } from "zod";

export const customerSchema = z.object({
  customer_name: z
    .string()
    .min(2),

  phone: z
    .string()
    .optional(),

  email: z
    .email()
    .optional()
    .or(z.literal("")),

  address: z
    .string()
    .optional(),

  gst_number: z
    .string()
    .optional(),

  notes: z
    .string()
    .optional(),
});

export type CustomerFormData =
  z.infer<
    typeof customerSchema
  >;