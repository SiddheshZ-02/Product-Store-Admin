import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { salesReturnService } from "@/services/salesReturnService";

export const useSalesReturns =
  () =>
    useQuery({
      queryKey: [
        "sales-returns",
      ],

      queryFn:
        salesReturnService.getReturns,
    });

export const useSaleItemsForReturn =
(
  saleId: string
) =>
  useQuery({
    queryKey: [
      "sale-return-items",
      saleId,
    ],

    enabled: !!saleId,

    queryFn: () =>
      salesReturnService.getSaleItems(
        saleId
      ),
  });



export const useCreateSalesReturn =
  () => {
    const qc =
      useQueryClient();

    return useMutation({
      mutationFn:
        salesReturnService.createReturn,

      onSuccess: () => {
        qc.invalidateQueries({
          queryKey: [
            "inventory",
          ],
        });

        qc.invalidateQueries({
          queryKey: [
            "sales-returns",
          ],
        });

        toast.success(
          "Sales Return Saved"
        );
      },
    });
  };