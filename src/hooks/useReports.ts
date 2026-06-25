import { useQuery } from "@tanstack/react-query";
import { reportService } from "@/services/reportService";



export const useTopProducts =
  () =>
    useQuery({
      queryKey: ["top-products"],
      queryFn:
        reportService.getTopProducts,
    });
    
    export const useProfitLoss =
  () =>
    useQuery({
      queryKey: [
        "profit-loss",
      ],

      queryFn:
        reportService.getProfitLossData,
    });

export const useSalesReport = (
  from?: string,
  to?: string
) =>
  useQuery({
    queryKey: ["sales-report", from, to],
    enabled: !!from && !!to,
    queryFn: () =>
      reportService.getSalesReport(from, to),
  });

  
  export const usePurchaseReport =
(
  from?: string,
  to?: string
) =>
  useQuery({
    queryKey: [
      "purchase-report",
      from,
      to,
    ],

    enabled:
      !!from &&
      !!to,

    queryFn: () =>
      reportService.getPurchaseReport(
        from,
        to
      ),
  });