import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/lib/supabase";

export const useProductSearch =
(
  search: string
) =>
  useQuery({
    queryKey: [
      "product-search",
      search,
    ],

    enabled:
      search.length > 1,

    queryFn: async () => {
      const {
        data,
        error,
      } = await supabase
        .from("products")
        .select(`
          id,
          name,
          selling_price
        `)
        .ilike(
          "name",
          `%${search}%`
        );

      if (error)
        throw error;

      return data;
    },
  });