import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { salesReturnService }
from "@/services/salesReturnService";

export const useSalesReturns =
  () =>
    useQuery({
      queryKey: [
        "sales-returns",
      ],

      queryFn:
        salesReturnService.getReturns,
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
            "sales-returns",
          ],
        });

        qc.invalidateQueries({
          queryKey: [
            "inventory",
          ],
        });

        qc.invalidateQueries({
          queryKey: [
            "sales",
          ],
        });

        toast.success(
          "Sales Return Created"
        );
      },
    });
  };