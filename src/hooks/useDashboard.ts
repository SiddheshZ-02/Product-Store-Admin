import { useQuery } from "@tanstack/react-query";

import { dashboardService } from "@/services/dashboardService";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: dashboardService.getAnalytics,
  });
};

export const useDashboardCharts =
(
  from: string,
  to: string
) =>  
  useQuery({
    queryKey: [
      "dashboard-charts",
      from,
      to,
    ],

    queryFn: () =>
      dashboardService.getCharts(
        from,
        to
      ),
  });

 export const useDashboardTopProducts =
  () =>
    useQuery({
      queryKey: ["dashboard-top-products"],
      queryFn:
        dashboardService.getTopProducts,
    });

export const useLowStock =
  () =>
    useQuery({
      queryKey: [
        "low-stock",
      ],
      queryFn:
        dashboardService.getLowStock,
    });

    export const useRecentSales =
  () =>
    useQuery({
      queryKey: [
        "recent-sales",
      ],
      queryFn:
        dashboardService.getRecentSales,
    });

    export const useRecentPurchases =
  () =>
    useQuery({
      queryKey: [
        "recent-purchases",
      ],

      queryFn:
        dashboardService.getRecentPurchases,
    });