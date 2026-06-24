import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { supplierService } from "@/services/supplierService";

export const useSuppliers = () =>
  useQuery({
    queryKey: ["suppliers"],
    queryFn:
      supplierService.getSuppliers,
  });

export const useSupplier = (
  id: string
) =>
  useQuery({
    queryKey: [
      "supplier",
      id,
    ],

    queryFn: () =>
      supplierService.getSupplierById(
        id
      ),

    enabled: !!id,
  });

export const useCreateSupplier =
  () => {
    const qc =
      useQueryClient();

    return useMutation({
      mutationFn:
        supplierService.createSupplier,

      onSuccess: () => {
        qc.invalidateQueries({
          queryKey: [
            "suppliers",
          ],
        });

        toast.success(
          "Supplier created"
        );
      },
    });
  };

export const useUpdateSupplier =
  () => {
    const qc =
      useQueryClient();

    return useMutation({
      mutationFn: ({
        id,
        payload,
      }: any) =>
        supplierService.updateSupplier(
          id,
          payload
        ),

      onSuccess: () => {
        qc.invalidateQueries({
          queryKey: [
            "suppliers",
          ],
        });

        toast.success(
          "Supplier updated"
        );
      },
    });
  };

export const useDeleteSupplier =
  () => {
    const qc =
      useQueryClient();

    return useMutation({
      mutationFn:
        supplierService.deleteSupplier,

      onSuccess: () => {
        qc.invalidateQueries({
          queryKey: [
            "suppliers",
          ],
        });

        toast.success(
          "Supplier deleted"
        );
      },
    });
  };