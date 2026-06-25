import { useQuery }
from "@tanstack/react-query";

import { auditService }
from "@/services/auditService";

export const useAuditLogs =
  () =>
    useQuery({
      queryKey: [
        "audit-logs",
      ],

      queryFn:
        auditService.getLogs,
    });