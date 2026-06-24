// src/hooks/useCustomerOptions.ts

import { useQuery } from "@tanstack/react-query";
import { customerService } from "@/services/customerService";

export const useCustomerOptions =
  () =>
    useQuery({
      queryKey: [
        "customer-options",
      ],
      queryFn:
        customerService.getCustomers,
    });