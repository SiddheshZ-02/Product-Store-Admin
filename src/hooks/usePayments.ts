// src/hooks/usePayments.ts

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { paymentService } from "@/services/paymentService";

export const useCustomerDues =
  () =>
    useQuery({
      queryKey: [
        "customer-dues",
      ],

      queryFn:
        paymentService.getCustomerDues,
    });

export const useReceivePayment =
  () => {
    const qc =
      useQueryClient();

    return useMutation({
      mutationFn:
        paymentService.receiveCustomerPayment,

      onSuccess: () => {
        qc.invalidateQueries({
          queryKey: [
            "customer-dues",
          ],
        });

        qc.invalidateQueries({
          queryKey: [
            "sales",
          ],
        });

        qc.invalidateQueries({
          queryKey: [
            "dashboard",
          ],
        });

        toast.success(
          "Payment Received"
        );
      },
    });
  };

  export const useSupplierDues =
  () =>
    useQuery({
      queryKey: [
        "supplier-dues",
      ],
      queryFn:
        paymentService.getSupplierDues,
    });

export const usePaySupplier =
  () => {
    const qc =
      useQueryClient();

    return useMutation({
      mutationFn:
        paymentService.paySupplier,

      onSuccess: () => {
        qc.invalidateQueries({
          queryKey: [
            "supplier-dues",
          ],
        });

        qc.invalidateQueries({
          queryKey: [
            "purchases",
          ],
        });

        qc.invalidateQueries({
          queryKey: [
            "dashboard",
          ],
        });

        toast.success(
          "Supplier Payment Saved"
        );
      },
    });
  };