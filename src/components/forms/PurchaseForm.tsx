import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { useSupplierOptions } from "@/hooks/useSupplierOptions";

import { useProductOptions } from "@/hooks/useProductOptions";

interface PurchaseFormValues {
  p_supplier_id: string;

  p_invoice_number: string;

  p_purchase_date: string;

  p_paid_amount: number;

  p_notes: string;

  p_items: {
    product_id: string;
    quantity: number;
    purchase_price: number;
  }[];
}

interface Props {
  loading?: boolean;

  onSubmit: (
    values: PurchaseFormValues
  ) => void;
}

export default function PurchaseForm({
  loading,
  onSubmit,
}: Props) {
  const { data: suppliers = [] } =
    useSupplierOptions();

  const { data: products = [] } =
    useProductOptions();

  const {
    register,
    control,
    watch,
    handleSubmit,
  } =
    useForm<PurchaseFormValues>({
      defaultValues: {
        p_purchase_date:
          new Date()
            .toISOString()
            .split("T")[0],

        p_paid_amount: 0,

        p_items: [
          {
            product_id: "",
            quantity: 1,
            purchase_price: 0,
          },
        ],
      },
    });

  const { fields, append, remove } =
    useFieldArray({
      control,
      name: "p_items",
    });

  const items =
    watch("p_items");

  const grandTotal =
    items.reduce(
      (sum, item) =>
        sum +
        Number(item.quantity || 0) *
          Number(
            item.purchase_price || 0
          ),
      0
    );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <select
        {...register(
          "p_supplier_id"
        )}
        className="border rounded-md p-2 w-full"
      >
        <option value="">
          Select Supplier
        </option>

        {suppliers.map(
          (supplier: any) => (
            <option
              key={supplier.id}
              value={supplier.id}
            >
              {
                supplier.supplier_name
              }
            </option>
          )
        )}
      </select>

      <Input
        placeholder="Invoice Number"
        {...register(
          "p_invoice_number"
        )}
      />

      <Input
        type="date"
        {...register(
          "p_purchase_date"
        )}
      />

      <div className="space-y-4">
        {fields.map(
          (field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-4 gap-3 border p-4 rounded-md"
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
                type="number"
                placeholder="Price"
                {...register(
                  `p_items.${index}.purchase_price`,
                  {
                    valueAsNumber:
                      true,
                  }
                )}
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
          )
        )}
      </div>

      <Button
        type="button"
        onClick={() =>
          append({
            product_id: "",
            quantity: 1,
            purchase_price: 0,
          })
        }
      >
        Add Product
      </Button>

      <div className="text-xl font-bold">
        Total ₹
        {grandTotal.toFixed(2)}
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

      <Textarea
        placeholder="Notes"
        {...register("p_notes")}
      />

      <Button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Creating..."
          : "Create Purchase"}
      </Button>
    </form>
  );
}