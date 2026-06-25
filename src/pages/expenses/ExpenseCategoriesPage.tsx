import { useState } from "react";

import { Button }
from "@/components/ui/button";

import { Input }
from "@/components/ui/input";

import {
  useExpenseCategories,
  useCreateExpenseCategory,
}
from "@/hooks/useExpenseCategories";

export default function ExpenseCategoriesPage() {

  const [name, setName] =
    useState("");

  const {
    data = [],
  } =
    useExpenseCategories();

  const createCategory =
    useCreateExpenseCategory();

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Expense Categories
      </h1>

      <div className="flex gap-2">

        <Input
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          placeholder="Category Name"
        />

        <Button
          onClick={() => {
            createCategory.mutate(
              name
            );

            setName("");
          }}
        >
          Add
        </Button>

      </div>

      <div className="border rounded-lg">

        {data.map(
          (category: any) => (
            <div
              key={category.id}
              className="p-4 border-b"
            >
              {
                category.category_name
              }
            </div>
          )
        )}

      </div>

    </div>
  );
}