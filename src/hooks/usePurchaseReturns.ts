import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { purchaseReturnService } from "@/services/purchaseReturnService";

export const usePurchasesForReturn =
  () =>
    useQuery({
      queryKey: [
        "purchase-return-purchases",
      ],
      queryFn:
        purchaseReturnService.getPurchases,
    });

export const usePurchaseItemsForReturn =
(
  purchaseId: string
) =>
  useQuery({
    queryKey: [
      "purchase-items-return",
      purchaseId,
    ],

    enabled:
      !!purchaseId,

    queryFn: () =>
      purchaseReturnService.getPurchaseItems(
        purchaseId
      ),
  });

export const usePurchaseReturns =
  () =>
    useQuery({
      queryKey: [
        "purchase-returns",
      ],

      queryFn:
        purchaseReturnService.getReturns,
    });

export const useCreatePurchaseReturn =
  () => {
    const qc =
      useQueryClient();

    return useMutation({
      mutationFn:
        purchaseReturnService.createReturn,

      onSuccess: () => {
        qc.invalidateQueries({
          queryKey: [
            "inventory",
          ],
        });

        qc.invalidateQueries({
          queryKey: [
            "purchase-returns",
          ],
        });

        toast.success(
          "Purchase Return Saved"
        );
      },
    });
  };