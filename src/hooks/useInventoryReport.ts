
import { useQuery } from "@tanstack/react-query";

import { inventoryReportService } from "@/services/inventoryReportService";

export const useInventoryValuation =
  () =>
    useQuery({
      queryKey: [
        "inventory-valuation",
      ],

      queryFn:
        inventoryReportService.getInventoryValuation,
    });