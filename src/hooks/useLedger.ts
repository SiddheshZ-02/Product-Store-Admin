import { useQuery } from "@tanstack/react-query";

import { ledgerService }
from "@/services/ledgerService";

export const useCustomers =
  () =>
    useQuery({
      queryKey: ["customers"],
      queryFn:
        ledgerService.getCustomers,
    });

export const useCustomerSales =
  (customerId?: string) =>
    useQuery({
      queryKey: [
        "customer-sales",
        customerId,
      ],

      enabled:
        !!customerId,

      queryFn: () =>
        ledgerService.getCustomerSales(
          customerId!
        ),
    });

export const useCustomerPayments =
  (customerId?: string) =>
    useQuery({
      queryKey: [
        "customer-payments",
        customerId,
      ],

      enabled:
        !!customerId,

      queryFn: () =>
        ledgerService.getCustomerPayments(
          customerId!
        ),
    });