import { useQuery } from "@tanstack/react-query";
import { reportService } from "@/services/reportService";

export const useSalesReport =
  () =>
    useQuery({
      queryKey: ["sales-report"],
      queryFn:
        reportService.getSalesReport,
    });

export const useTopProducts =
  () =>
    useQuery({
      queryKey: ["top-products"],
      queryFn:
        reportService.getTopProducts,
    });