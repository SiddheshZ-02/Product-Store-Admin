import { useState } from "react";


import {
  useCreateExpense,
  useExpenseCategories,
} from "@/hooks/useExpenses";
import ExpenseForm from "@/components/forms/ExpenseForm";

export default function CreateExpensePage() {
  const createExpense =
    useCreateExpense();

  const {
    data: categories = [],
  } =
    useExpenseCategories();

  const [values, setValues] =
    useState({
      category_id: "",
      expense_date:
        new Date()
          .toISOString()
          .split("T")[0],

      title: "",

      description: "",

      amount: "",

      payment_method:
        "CASH",

      reference_number:
        "",
    });

  const handleChange = (
    field: string,
    value: string
  ) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    createExpense.mutate(
      {
        category_id:
          values.category_id,

        expense_date:
          values.expense_date,

        title:
          values.title,

        description:
          values.description,

        amount: Number(
          values.amount
        ),

        payment_method:
          values.payment_method as any,

        reference_number:
          values.reference_number,
      },
      {
        onSuccess: () => {
          setValues({
            category_id: "",

            expense_date:
              new Date()
                .toISOString()
                .split("T")[0],

            title: "",

            description: "",

            amount: "",

            payment_method:
              "CASH",

            reference_number:
              "",
          });
        },
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Create Expense
        </h1>

        <p className="text-muted-foreground">
          Add new expense
        </p>

      </div>

      <ExpenseForm
        categories={categories}
        values={values}
        onChange={
          handleChange
        }
        onSubmit={
          handleSubmit
        }
        loading={
          createExpense.isPending
        }
        buttonText="Create Expense"
      />

    </div>
  );
}