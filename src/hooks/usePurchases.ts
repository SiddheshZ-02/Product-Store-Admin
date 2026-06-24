import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { purchaseService } from "@/services/purchaseService";

export const usePurchases =
  () =>
    useQuery({
      queryKey: [
        "purchases",
      ],

      queryFn:
        purchaseService.getPurchases,
    });

export const useCreatePurchase =
  () => {
    const qc =
      useQueryClient();

    return useMutation({
      mutationFn:
        purchaseService.createPurchase,

      onSuccess: () => {
        qc.invalidateQueries({
          queryKey: [
            "purchases",
          ],
        });

        qc.invalidateQueries({
          queryKey: [
            "inventory",
          ],
        });

        toast.success(
          "Purchase Created"
        );
      },
    });
  };