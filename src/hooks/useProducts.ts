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
    queryFn: () => productService.getProducts(),
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
      onError: (error: any) => {
        toast.error(error.message || "Failed to create product");
        console.error(error);
      }
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
      onError: (error: any) => {
        toast.error(error.message || "Failed to delete product");
        console.error(error);
      }
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
      onError: (error: any) => {
        toast.error(error.message || "Failed to update product");
        console.error(error);
      }
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