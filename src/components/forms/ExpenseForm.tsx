import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ExpenseFormProps {
  categories: any[];

  values: {
    category_id: string;
    expense_date: string;
    title: string;
    description: string;
    amount: string;
    payment_method: string;
    reference_number: string;
  };

  onChange: (
    field: string,
    value: string
  ) => void;

  onSubmit: () => void;

  loading?: boolean;

  buttonText?: string;
}

export default function ExpenseForm({
  categories,
  values,
  onChange,
  onSubmit,
  loading,
  buttonText = "Save Expense",
}: ExpenseFormProps) {
  return (
    <div className="space-y-4">
      {/* Category */}

      <div>
        <label className="text-sm font-medium">
          Category
        </label>

        <Select
          value={values.category_id}
          onValueChange={(value) =>
            onChange(
              "category_id",
              value
            )
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>

          <SelectContent>
            {categories.map(
              (category: any) => (
                <SelectItem
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Date */}

      <Input
        type="date"
        value={values.expense_date}
        onChange={(e) =>
          onChange(
            "expense_date",
            e.target.value
          )
        }
      />

      {/* Title */}

      <Input
        placeholder="Expense Title"
        value={values.title}
        onChange={(e) =>
          onChange(
            "title",
            e.target.value
          )
        }
      />

      {/* Description */}

      <Input
        placeholder="Description"
        value={values.description}
        onChange={(e) =>
          onChange(
            "description",
            e.target.value
          )
        }
      />

      {/* Amount */}

      <Input
        type="number"
        placeholder="Amount"
        value={values.amount}
        onChange={(e) =>
          onChange(
            "amount",
            e.target.value
          )
        }
      />

      {/* Payment */}

      <Select
        value={
          values.payment_method
        }
        onValueChange={(value) =>
          onChange(
            "payment_method",
            value
          )
        }
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="CASH">
            CASH
          </SelectItem>

          <SelectItem value="UPI">
            UPI
          </SelectItem>

          <SelectItem value="CARD">
            CARD
          </SelectItem>

          <SelectItem value="BANK_TRANSFER">
            BANK TRANSFER
          </SelectItem>

          <SelectItem value="CHEQUE">
            CHEQUE
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Ref Number */}

      <Input
        placeholder="Reference Number"
        value={
          values.reference_number
        }
        onChange={(e) =>
          onChange(
            "reference_number",
            e.target.value
          )
        }
      />

      <Button
        className="w-full"
        disabled={loading}
        onClick={onSubmit}
      >
        {loading
          ? "Saving..."
          : buttonText}
      </Button>
    </div>
  );
}