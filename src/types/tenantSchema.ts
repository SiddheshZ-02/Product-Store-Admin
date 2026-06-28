import { z } from "zod";

export const tenantSchema = z.object({
  shop_name: z.string().min(1, "Shop name is required"),
  owner_name: z.string().min(1, "Owner name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  phone: z.string().optional(),
  plan_id: z.string().min(1, "Plan is required"),
});

export type TenantFormData = z.infer<typeof tenantSchema>;
