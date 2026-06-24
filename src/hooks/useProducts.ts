import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { productService } from "@/services/productService";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn:
      productService.getProducts,
  });
};

export const useCreateProduct =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        productService.createProduct,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "products",
            ],
          }
        );

        toast.success(
          "Product created"
        );
      },
    });
  };

export const useDeleteProduct =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        productService.deleteProduct,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "products",
            ],
          }
        );

        toast.success(
          "Product deleted"
        );
      },
    });
  };
  export const useUpdateProduct =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: ({
        id,
        payload,
      }: any) =>
        productService.updateProduct(
          id,
          payload
        ),

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "products",
            ],
          }
        );

        toast.success(
          "Product updated"
        );
      },
    });
  };

  export const useProduct = (
  id: string
) => {
  return useQuery({
    queryKey: ["product", id],

    queryFn: () =>
      productService.getProductById(
        id
      ),

    enabled: !!id,
  });
};