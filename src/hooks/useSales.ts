import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { salesService } from "@/services/salesService";
import { getDateRange } from "@/utils/dateRange";


export const useSales = (from?: string, to?: string) => {
  const defaultRange = getDateRange("30days");
  const fromDate = from || defaultRange.from;
  const toDate = to || defaultRange.to;

  return useQuery({
    queryKey: ["sales", fromDate, toDate],
    queryFn: () => salesService.getSales(fromDate, toDate),
  });
};

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
      onError: (error: any) => {
        toast.error(error.message || "Failed to create sale");
        console.error(error);
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
