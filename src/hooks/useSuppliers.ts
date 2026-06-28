import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { supplierService } from "@/services/supplierService";
import { supplierLedgerService } from "@/services/supplierLedgerService";

export const useSuppliers = () =>
  useQuery({
    queryKey: ["suppliers"],
    queryFn:
      supplierService.getSuppliers,
  });



export const useSupplierPurchases =
  (supplierId: string) =>
    useQuery({
      queryKey: [
        "supplier-purchases",
        supplierId,
      ],

      enabled: !!supplierId,

      queryFn: () =>
        supplierLedgerService.getPurchases(
          supplierId
        ),
    });

export const useSupplierPayments =
  (supplierId: string) =>
    useQuery({
      queryKey: [
        "supplier-payments",
        supplierId,
      ],

      enabled: !!supplierId,

      queryFn: () =>
        supplierLedgerService.getPayments(
          supplierId
        ),
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
      onError: (error: any) => {
        toast.error(error.message || "Failed to create supplier");
        console.error(error);
      }
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
      onError: (error: any) => {
        toast.error(error.message || "Failed to update supplier");
        console.error(error);
      }
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
      onError: (error: any) => {
        toast.error(error.message || "Failed to delete supplier");
        console.error(error);
      }
    });
  };