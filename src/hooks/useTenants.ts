import {
  useQuery,
} from "@tanstack/react-query";

import { tenantService } from "@/services/tenantService";

export const useTenants = () =>
  useQuery({
    queryKey: ["tenants"],

    queryFn:
      tenantService.getTenants,
  });