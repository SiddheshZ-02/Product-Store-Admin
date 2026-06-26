export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  TENANT_OWNER: "TENANT_OWNER",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];