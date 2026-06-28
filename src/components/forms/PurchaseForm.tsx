import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useSupplierOptions } from "@/hooks/useSupplierOptions";
import { useProductOptions } from "@/hooks/useProductOptions";

const purchaseItemSchema = z.object({
  product_id: z.string().min(1, "Please select a product"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  purchase_price: z.coerce.number().min(0, "Price must be positive"),
});

const purchaseFormSchema = z.object({
  p_supplier_id: z.string().min(1, "Please select a supplier"),
  p_invoice_number: z.string().min(1, "Invoice number is required"),
  p_purchase_date: z.string().min(1, "Purchase date is required"),
  p_paid_amount: z.coerce.number().min(0, "Paid amount must be positive"),
  p_notes: z.string().optional(),
  p_items: z.array(purchaseItemSchema).min(1, "At least one item is required"),
});

type PurchaseFormValues = z.infer<typeof purchaseFormSchema>;

interface Props {
  loading?: boolean;
  onSubmit: (values: PurchaseFormValues) => void;
}

export default function PurchaseForm({
  loading,
  onSubmit,
}: Props) {
  const { data: suppliers = [] } = useSupplierOptions();
  const { data: products = [] } = useProductOptions();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PurchaseFormValues>({
    resolver: zodResolver(purchaseFormSchema),
    defaultValues: {
      p_purchase_date: new Date().toISOString().split("T")[0],
      p_paid_amount: 0,
      p_notes: "",
      p_items: [
        {
          product_id: "",
          quantity: 1,
          purchase_price: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "p_items",
  });

  const items = watch("p_items");

  const grandTotal = items.reduce(
    (sum, item) => sum + Number(item.quantity || 0) * Number(item.purchase_price || 0),
    0
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Select
          value={watch("p_supplier_id")}
          onValueChange={(value) => setValue("p_supplier_id", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Supplier" />
          </SelectTrigger>
          <SelectContent>
            {suppliers.map((supplier: any) => (
              <SelectItem key={supplier.id} value={supplier.id}>
                {supplier.supplier_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.p_supplier_id && (
          <p className="text-red-500 text-sm">{errors.p_supplier_id.message}</p>
        )}
      </div>

      <div>
        <Input placeholder="Invoice Number" {...register("p_invoice_number")} />
        {errors.p_invoice_number && (
          <p className="text-red-500 text-sm">{errors.p_invoice_number.message}</p>
        )}
      </div>

      <div>
        <Input type="date" {...register("p_purchase_date")} />
        {errors.p_purchase_date && (
          <p className="text-red-500 text-sm">{errors.p_purchase_date.message}</p>
        )}
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-12 gap-3 border p-4 rounded-md">
            <div className="col-span-5">
              <Select
                value={watch(`p_items.${index}.product_id`)}
                onValueChange={(value) => setValue(`p_items.${index}.product_id`, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product: any) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.p_items?.[index]?.product_id && (
                <p className="text-red-500 text-sm">
                  {errors.p_items[index].product_id.message}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <Input
                type="number"
                placeholder="Qty"
                {...register(`p_items.${index}.quantity`, { valueAsNumber: true })}
              />
              {errors.p_items?.[index]?.quantity && (
                <p className="text-red-500 text-sm">
                  {errors.p_items[index].quantity.message}
                </p>
              )}
            </div>

            <div className="col-span-3">
              <Input
                type="number"
                placeholder="Price"
                step="0.01"
                {...register(`p_items.${index}.purchase_price`, { valueAsNumber: true })}
              />
              {errors.p_items?.[index]?.purchase_price && (
                <p className="text-red-500 text-sm">
                  {errors.p_items[index].purchase_price.message}
                </p>
              )}
            </div>

            <div className="col-span-2 flex items-end">
              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
                className="w-full"
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
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

      <div className="text-xl font-bold pt-4">
        Total: ₹{grandTotal.toFixed(2)}
      </div>

      <div>
        <Input
          type="number"
          placeholder="Paid Amount"
          step="0.01"
          {...register("p_paid_amount", { valueAsNumber: true })}
        />
        {errors.p_paid_amount && (
          <p className="text-red-500 text-sm">{errors.p_paid_amount.message}</p>
        )}
      </div>

      <div>
        <Textarea placeholder="Notes" {...register("p_notes")} />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating..." : "Create Purchase"}
      </Button>
    </form>
  );
}