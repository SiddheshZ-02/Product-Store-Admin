import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import TableSkeleton from "@/components/common/TableSkeleton";

import {
  useDeleteExpense,
  useExpenses,
} from "@/hooks/useExpenses";

import { Link } from "react-router-dom";

export default function ExpenseListPage() {
  const [search, setSearch] =
    useState("");

  const {
    data = [],
    isLoading,
  } = useExpenses();

  const deleteExpense =
    useDeleteExpense();

  const filtered =
    useMemo(() => {
      return data.filter(
        (expense: any) =>
          expense.title
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          expense.expense_categories?.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [data, search]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-10 w-40" />
        </div>
        <Skeleton className="h-10 w-full" />
        <TableSkeleton columns={6} />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Expenses
        </h1>

        <Link to="/expenses/create">
          <Button>
            Create Expense
          </Button>
        </Link>
      </div>

      <Input
        placeholder="Search expense..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />

      <div className="border rounded-lg overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="p-3 text-left">
                Date
              </th>

              <th className="p-3 text-left">
                Category
              </th>

              <th className="p-3 text-left">
                Title
              </th>

              <th className="p-3 text-left">
                Amount
              </th>

              <th className="p-3 text-left">
                Payment
              </th>

              <th className="p-3 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filtered.map(
              (expense: any) => (
                <tr
                  key={expense.id}
                  className="border-b"
                >
                  <td className="p-3">
                    {
                      expense.expense_date
                    }
                  </td>

                  <td className="p-3">
                    {
                      expense
                        .expense_categories
                        ?.name
                    }
                  </td>

                  <td className="p-3">
                    {expense.title}
                  </td>

                  <td className="p-3">
                    ₹
                    {Number(
                      expense.amount
                    ).toLocaleString()}
                  </td>

                  <td className="p-3">
                    {
                      expense.payment_method
                    }
                  </td>

                  <td className="p-3">

                    <div className="flex gap-2">

                      <Link
                        to={`/expenses/edit/${expense.id}`}
                      >
                        <Button
                          size="sm"
                          variant="outline"
                        >
                          Edit
                        </Button>
                      </Link>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          deleteExpense.mutate(
                            expense.id
                          )
                        }
                      >
                        Delete
                      </Button>

                    </div>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}