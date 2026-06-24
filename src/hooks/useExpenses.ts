import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import { expenseService } from "@/services/expenseService";

export const useExpenses = () =>
  useQuery({
    queryKey: ["expenses"],
    queryFn:
      expenseService.getExpenses,
  });

export const useExpense = (
  id: string
) =>
  useQuery({
    queryKey: [
      "expense",
      id,
    ],

    queryFn: () =>
      expenseService.getExpenseById(
        id
      ),

    enabled: !!id,
  });

export const useExpenseCategories =
  () =>
    useQuery({
      queryKey: [
        "expense-categories",
      ],

      queryFn:
        expenseService.getCategories,
    });

export const useCreateExpense =
  () => {
    const qc =
      useQueryClient();

    return useMutation({
      mutationFn:
        expenseService.createExpense,

      onSuccess: () => {
        qc.invalidateQueries({
          queryKey: [
            "expenses",
          ],
        });

        toast.success(
          "Expense created"
        );
      },
    });
  };

export const useUpdateExpense =
  () => {
    const qc =
      useQueryClient();

    return useMutation({
      mutationFn: ({
        id,
        payload,
      }: any) =>
        expenseService.updateExpense(
          id,
          payload
        ),

      onSuccess: () => {
        qc.invalidateQueries({
          queryKey: [
            "expenses",
          ],
        });

        toast.success(
          "Expense updated"
        );
      },
    });
  };

export const useDeleteExpense =
  () => {
    const qc =
      useQueryClient();

    return useMutation({
      mutationFn:
        expenseService.deleteExpense,

      onSuccess: () => {
        qc.invalidateQueries({
          queryKey: [
            "expenses",
          ],
        });

        toast.success(
          "Expense deleted"
        );
      },
    });
  };