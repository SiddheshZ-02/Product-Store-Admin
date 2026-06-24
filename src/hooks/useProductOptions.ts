// src/hooks/useProductOptions.ts

import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/productService";

export const useProductOptions = () =>
  useQuery({
    queryKey: ["product-options"],
    queryFn: productService.getProducts,
  });