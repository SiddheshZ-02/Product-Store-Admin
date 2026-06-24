// src/components/forms/SalesForm.tsx

import { useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useCustomerOptions } from "@/hooks/useCustomerOptions";
import { useProductOptions } from "@/hooks/useProductOptions";

interface Props {
  loading?: boolean;
  onSubmit: (values: any) => void;
}

export default function SalesForm({
  loading,
  onSubmit,
}: Props) {
  const { data: customers = [] } =
    useCustomerOptions();

  const { data: products = [] } =
    useProductOptions();

  const {
    register,
    control,
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      p_paid_amount: 0,

      p_items: [
        {
          product_id: "",
          quantity: 1,
        },
      ],
    },
  });

  const { fields, append, remove } =
    useFieldArray({
      control,
      name: "p_items",
    });

  const items = watch("p_items");
  const paidAmount =
    Number(
      watch("p_paid_amount")
    ) || 0;

  const grandTotal = useMemo(() => {
    return items.reduce(
      (sum, item) => {
        const product =
          products.find(
            (p: any) =>
              p.id ===
              item.product_id
          );

        const price =
          Number(
            product?.selling_price
          ) || 0;

        return (
          sum +
          price *
            Number(
              item.quantity || 0
            )
        );
      },
      0
    );
  }, [items, products]);

  const dueAmount =
    grandTotal - paidAmount;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* CUSTOMER */}

      <select
        {...register(
          "p_customer_id"
        )}
        className="w-full border rounded-md p-3"
      >
        <option value="">
          Select Customer
        </option>

        {customers.map(
          (customer: any) => (
            <option
              key={customer.id}
              value={customer.id}
            >
              {
                customer.customer_name
              }
            </option>
          )
        )}
      </select>

      {/* ITEMS */}

      <div className="space-y-4">
        {fields.map(
          (field, index) => {
            const selected =
              products.find(
                (p: any) =>
                  p.id ===
                  items[index]
                    ?.product_id
              );

            const price =
              Number(
                selected?.selling_price
              ) || 0;

            const qty =
              Number(
                items[index]
                  ?.quantity
              ) || 0;

            const total =
              qty * price;

            return (
              <div
                key={field.id}
                className="grid grid-cols-5 gap-3 border rounded-md p-4"
              >
                <select
                  {...register(
                    `p_items.${index}.product_id`
                  )}
                  className="border rounded-md p-2"
                >
                  <option value="">
                    Product
                  </option>

                  {products.map(
                    (
                      product: any
                    ) => (
                      <option
                        key={
                          product.id
                        }
                        value={
                          product.id
                        }
                      >
                        {
                          product.name
                        }
                      </option>
                    )
                  )}
                </select>

                <Input
                  type="number"
                  placeholder="Qty"
                  {...register(
                    `p_items.${index}.quantity`,
                    {
                      valueAsNumber:
                        true,
                    }
                  )}
                />

                <Input
                  value={price}
                  disabled
                />

                <Input
                  value={total}
                  disabled
                />

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() =>
                    remove(index)
                  }
                >
                  Remove
                </Button>
              </div>
            );
          }
        )}
      </div>

      <Button
        type="button"
        onClick={() =>
          append({
            product_id: "",
            quantity: 1,
          })
        }
      >
        Add Product
      </Button>

      {/* TOTALS */}

      <div className="border rounded-lg p-4 space-y-2">
        <div>
          Grand Total :
          ₹{grandTotal}
        </div>

        <Input
          type="number"
          placeholder="Paid Amount"
          {...register(
            "p_paid_amount",
            {
              valueAsNumber:
                true,
            }
          )}
        />

        <div>
          Due Amount :
          ₹{dueAmount}
        </div>
      </div>

      <Textarea
        placeholder="Notes"
        {...register("p_notes")}
      />

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
      >
        {loading
          ? "Creating Sale..."
          : "Create Sale"}
      </Button>
    </form>
  );
}