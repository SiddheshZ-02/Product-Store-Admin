import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { stockAdjustmentService } from "@/services/stockAdjustmentService";

export const useAdjustments =
  () =>
    useQuery({
      queryKey: [
        "stock-adjustments",
      ],

      queryFn:
        stockAdjustmentService.getAdjustments,
    });

export const useCreateAdjustment =
  () => {
    const qc =
      useQueryClient();

    return useMutation({
      mutationFn:
        stockAdjustmentService.createAdjustment,

      onSuccess: () => {
        qc.invalidateQueries({
          queryKey: [
            "inventory",
          ],
        });

        qc.invalidateQueries({
          queryKey: [
            "stock-adjustments",
          ],
        });

        toast.success(
          "Stock adjusted"
        );
      },
    });
  };