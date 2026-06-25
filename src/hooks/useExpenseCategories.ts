import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { expenseCategoryService }
from "@/services/expenseCategoryService";

export const useExpenseCategories =
  () =>
    useQuery({
      queryKey: [
        "expense-categories",
      ],

      queryFn:
        expenseCategoryService.getCategories,
    });

export const useCreateExpenseCategory =
  () => {
    const qc =
      useQueryClient();

    return useMutation({
      mutationFn:
        expenseCategoryService.createCategory,

      onSuccess: () => {
        qc.invalidateQueries({
          queryKey: [
            "expense-categories",
          ],
        });

        toast.success(
          "Category Created"
        );
      },
    });
  };