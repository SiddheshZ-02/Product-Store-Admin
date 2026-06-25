import { useQuery } from "@tanstack/react-query";

import { invoiceService } from "@/services/invoiceService";

export const useInvoice =
(
  id: string
) =>
  useQuery({
    queryKey: [
      "invoice",
      id,
    ],

    enabled: !!id,

    queryFn: () =>
      invoiceService.getInvoice(id),
  });