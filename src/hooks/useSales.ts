import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { salesService } from "@/services/salesService";


export const useSales = (from = "", to = "") =>
  useQuery({
    queryKey: ["sales", from, to],
    queryFn: () => salesService.getSales(from, to),
  });

export const useCreateSale =
  () => {
    const qc =
      useQueryClient();

    return useMutation({
      mutationFn:
        salesService.createSale,

      onSuccess: () => {
        qc.invalidateQueries({
          queryKey: ["sales"],
        });

        qc.invalidateQueries({
          queryKey: [
            "inventory",
          ],
        });

        qc.invalidateQueries({
          queryKey: [
            "dashboard",
          ],
        });

        toast.success(
          "Sale Created"
        );
      },
    });    
  };

  
  export const useSalesHistory =
  () =>
    useQuery({
      queryKey: [
        "sales-history",
      ],

      queryFn:
        salesService.getSalesHistory,
    });
