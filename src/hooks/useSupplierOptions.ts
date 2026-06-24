// src/hooks/useSupplierOptions.ts

import { useQuery } from "@tanstack/react-query";
import { supplierService } from "@/services/supplierService";

export const useSupplierOptions = () =>
  useQuery({
    queryKey: ["supplier-options"],
    queryFn: supplierService.getSuppliers,
  });