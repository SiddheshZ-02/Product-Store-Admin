import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import {
  useExpense,
  useExpenseCategories,
  useUpdateExpense,
} from "@/hooks/useExpenses";
import ExpenseForm from "@/components/forms/ExpenseForm";

export default function EditExpensePage() {
  const { id } = useParams();

  const navigate =
    useNavigate();

  const {
    data: expense,
    isLoading,
  } = useExpense(id || "");

  const {
    data: categories = [],
  } =
    useExpenseCategories();

  const updateExpense =
    useUpdateExpense();

  const [values, setValues] =
    useState({
      category_id: "",
      expense_date: "",
      title: "",
      description: "",
      amount: "",
      payment_method:
        "CASH",
      reference_number:
        "",
    });

  useEffect(() => {
    if (!expense) return;

    setValues({
      category_id:
        expense.category_id ||
        "",

      expense_date:
        expense.expense_date ||
        "",

      title:
        expense.title || "",

      description:
        expense.description ||
        "",

      amount: String(
        expense.amount || ""
      ),

      payment_method:
        expense.payment_method ||
        "CASH",

      reference_number:
        expense.reference_number ||
        "",
    });
  }, [expense]);

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
    updateExpense.mutate(
      {
        id,
        payload: {
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
            values.payment_method,

          reference_number:
            values.reference_number,
        },
      },
      {
        onSuccess: () => {
          navigate(
            "/expenses"
          );
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div>
        Loading Expense...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Edit Expense
        </h1>

        <p className="text-muted-foreground">
          Update Expense
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
          updateExpense.isPending
        }
        buttonText="Update Expense"
      />

    </div>
  );
}