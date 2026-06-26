import { useAuthStore } from "@/store/authStore";
import { ROLES } from "@/constants/roles";

export function useRole() {
  const profile = useAuthStore((state) => state.profile);

  return {
    role: profile?.role,

    isSuperAdmin:
      profile?.role === ROLES.SUPER_ADMIN,

    isTenantOwner:
      profile?.role === ROLES.TENANT_OWNER,

    profile,
  };
}