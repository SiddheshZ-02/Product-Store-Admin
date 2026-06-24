import type { User } from "@supabase/supabase-js";

export interface Profile {
  id: string;
  tenant_id: string | null;
  email: string;
  full_name: string | null;
  role: "SUPER_ADMIN" | "TENANT_OWNER";
}

export interface AuthUser {
  user: User | null;
  profile: Profile | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}