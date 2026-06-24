import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { customerService } from "@/services/customerService";

export const useCustomers =
  () =>
    useQuery({
      queryKey: ["customers"],
      queryFn:
        customerService.getCustomers,
    });

export const useCustomer = (
  id: string
) =>
  useQuery({
    queryKey: [
      "customer",
      id,
    ],

    queryFn: () =>
      customerService.getCustomerById(
        id
      ),

    enabled: !!id,
  });

export const useCreateCustomer =
  () => {
    const qc =
      useQueryClient();

    return useMutation({
      mutationFn:
        customerService.createCustomer,

      onSuccess: () => {
        qc.invalidateQueries(
          {
            queryKey: [
              "customers",
            ],
          }
        );

        toast.success(
          "Customer created"
        );
      },
    });
  };

export const useUpdateCustomer =
  () => {
    const qc =
      useQueryClient();

    return useMutation({
      mutationFn: ({
        id,
        payload,
      }: any) =>
        customerService.updateCustomer(
          id,
          payload
        ),

      onSuccess: () => {
        qc.invalidateQueries(
          {
            queryKey: [
              "customers",
            ],
          }
        );

        toast.success(
          "Customer updated"
        );
      },
    });
  };

export const useDeleteCustomer =
  () => {
    const qc =
      useQueryClient();

    return useMutation({
      mutationFn:
        customerService.deleteCustomer,

      onSuccess: () => {
        qc.invalidateQueries(
          {
            queryKey: [
              "customers",
            ],
          }
        );

        toast.success(
          "Customer deleted"
        );
      },
    });
  };