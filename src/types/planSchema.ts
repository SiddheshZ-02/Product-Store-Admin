import { z } from "zod";

export const planSchema = z.object({
  name: z.string().min(1, "Plan name is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be at least 0"),
  currency: z.string().min(1, "Currency is required"),
  trial_days: z.number().int().min(0, "Trial days must be at least 0"),
  max_products: z.number().int().positive().optional().nullable(),
  max_customers: z.number().int().positive().optional().nullable(),
  max_suppliers: z.number().int().positive().optional().nullable(),
  status: z.enum(["active", "inactive"]).default("active"),
});

export type PlanFormData = z.infer<typeof planSchema>;
