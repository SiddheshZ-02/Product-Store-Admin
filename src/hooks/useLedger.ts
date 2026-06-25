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


export const useCustomerLedger =
(
  customerId: string
) =>
  useQuery({
    queryKey: [
      "customer-ledger",
      customerId,
    ],

    enabled:
      !!customerId,

    queryFn: () =>
      ledgerService.getCustomerLedger(
        customerId
      ),
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

    export const useSuppliers =
  () =>
    useQuery({
      queryKey: ["suppliers"],
      queryFn:
        ledgerService.getSuppliers,
    });

export const useSupplierPurchases =
  (supplierId?: string) =>
    useQuery({
      queryKey: [
        "supplier-purchases",
        supplierId,
      ],
      enabled: !!supplierId,
      queryFn: () =>
        ledgerService.getSupplierPurchases(
          supplierId!
        ),
    });

export const useSupplierPayments =
  (supplierId?: string) =>
    useQuery({
      queryKey: [
        "supplier-payments",
        supplierId,
      ],
      enabled: !!supplierId,
      queryFn: () =>
        ledgerService.getSupplierPayments(
          supplierId!
        ),
    });