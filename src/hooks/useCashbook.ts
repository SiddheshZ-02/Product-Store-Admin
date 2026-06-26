import { useQuery } from "@tanstack/react-query";

import { cashbookService } from "@/services/cashbookService";

export const useCashbook = (
  from: string,
  to: string
) =>
  useQuery({
    queryKey: [
      "cashbook",
      from,
      to,
    ],

    enabled:
      !!from &&
      !!to,

    queryFn: () =>
      cashbookService.getCashbook(
        from,
        to
      ),
  });