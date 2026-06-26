import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { customerPaymentService } from "@/services/customerPaymentService";

export const useCustomerPayments =
  () =>
    useQuery({
      queryKey: [
        "customer-payments",
      ],

      queryFn:
        customerPaymentService.getPayments,
    });

export const useCreateCustomerPayment =
  () => {
    const qc =
      useQueryClient();

    return useMutation({
      mutationFn:
        customerPaymentService.createPayment,

      onSuccess: () => {
        qc.invalidateQueries({
          queryKey: [
            "customer-payments",
          ],
        });

        qc.invalidateQueries({
          queryKey: [
            "customer-ledger",
          ],
        });

        toast.success(
          "Payment received"
        );
      },
    });
  };

export const useDeleteCustomerPayment =
  () => {
    const qc =
      useQueryClient();

    return useMutation({
      mutationFn:
        customerPaymentService.deletePayment,

      onSuccess: () => {
        qc.invalidateQueries({
          queryKey: [
            "customer-payments",
          ],
        });

        toast.success(
          "Payment deleted"
        );
      },
    });
  };