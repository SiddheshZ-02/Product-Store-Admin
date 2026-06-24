import { useQuery } from "@tanstack/react-query";

import { inventoryService } from "@/services/inventoryService";

export const useInventoryReport =
  () =>
    useQuery({
      queryKey: ["inventory-report"],
      queryFn:
        inventoryService.getInventoryReport,
    });