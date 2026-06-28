import { create } from "zustand";
import { supabase } from "@/lib/supabase";

import { authService } from "@/services/authService";
import type { User } from "@supabase/supabase-js";
import type { Profile } from "@/types/auth.types";

interface AuthState {
  user: User | null;
  profile: Profile | null;

  loading: boolean;

  initialize: () => Promise<void>;

  setUser: (
    user: User | null,
    profile: Profile | null
  ) => void;

  logout: () => Promise<void>;
}

export const useAuthStore =
  create<AuthState>((set) => ({
    user: null,

    profile: null,

    loading: true,

    initialize: async () => {
      try {
        const user =
          await authService.getCurrentUser();

        if (!user) {
          set({
            user: null,
            profile: null,
            loading: false,
          });

          return;
        }

        const profile =
          await authService.getProfile(
            user.id
          );

        // Check tenant status
        if (profile.role !== "SUPER_ADMIN" && profile.tenant_id) {
          const { data: tenant, error: tenantError } = await supabase
            .from("tenants")
            .select("status")
            .eq("id", profile.tenant_id)
            .single();

          if (tenantError || tenant.status === "suspended") {
            await authService.logout();
            set({
              user: null,
              profile: null,
              loading: false,
            });
            return;
          }
        }

        set({
          user,
          profile,
          loading: false,
        });
      } catch {
        set({
          user: null,
          profile: null,
          loading: false,
        });
      }
    },

  setUser: (user, profile) =>
  set({
    user,
    profile,
    loading: false,
  }),
  
    logout: async () => {
      await authService.logout();

      set({
        user: null,
        profile: null,
      });
    },
  }));