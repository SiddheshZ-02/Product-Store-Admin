import { useQuery } from "@tanstack/react-query";

import { dashboardService }
from "@/services/dashboardService";

export const useDashboardAnalytics =
  () =>
    useQuery({
      queryKey: [
        "dashboard-analytics",
      ],

      queryFn:
        dashboardService.getAnalytics,
    });