import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { supplierPaymentService } from "@/services/supplierPaymentService";

export const useSupplierPayments =
  () =>
    useQuery({
      queryKey: [
        "supplier-payments",
      ],

      queryFn:
        supplierPaymentService.getPayments,
    });

export const useCreateSupplierPayment =
  () => {
    const qc =
      useQueryClient();

    return useMutation({
      mutationFn:
        supplierPaymentService.createPayment,

      onSuccess: () => {
        qc.invalidateQueries({
          queryKey: [
            "supplier-payments",
          ],
        });

        toast.success(
          "Supplier payment saved"
        );
      },
    });
  };

export const useDeleteSupplierPayment =
  () => {
    const qc =
      useQueryClient();

    return useMutation({
      mutationFn:
        supplierPaymentService.deletePayment,

      onSuccess: () => {
        qc.invalidateQueries({
          queryKey: [
            "supplier-payments",
          ],
        });

        toast.success(
          "Payment deleted"
        );
      },
    });
  };