import { useForm, type FieldValues } from "react-hook-form";
// import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { useProducts } from "@/hooks/useProducts";
import { useCreateAdjustment } from "@/hooks/useStockAdjustment";

const stockAdjustmentSchema = z.object({
  product_id: z.string().min(1, "Please select a product"),
  adjustment_type: z.enum(["INCREASE", "DECREASE", "DAMAGE", "EXPIRED"]),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  reason: z.string().min(1, "Reason is required"),
});

export default function StockAdjustmentPage() {
  const { data: products = [] } = useProducts();
  const adjustment = useCreateAdjustment();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(stockAdjustmentSchema),
    defaultValues: {
      product_id: "",
      adjustment_type: "DECREASE" as const,
      quantity: 1,
      reason: "",
    },
  });

  const onSubmit = (values: FieldValues) => {
    adjustment.mutate(values as any);
    reset();
  };

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-3xl font-bold">Stock Adjustment</h1>
        <p className="text-muted-foreground">Adjust inventory levels manually</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Select
            value={watch("product_id")}
            onValueChange={(value) => setValue("product_id", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Product" />
            </SelectTrigger>
            <SelectContent>
              {(products as any[]).map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.product_id && (
            <p className="text-red-500 text-sm">{(errors.product_id as any).message}</p>
          )}
        </div>

        <div>
          <Select
            value={watch("adjustment_type")}
            onValueChange={(value) => setValue("adjustment_type", value as never)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Adjustment Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INCREASE">Increase Stock</SelectItem>
              <SelectItem value="DECREASE">Decrease Stock</SelectItem>
              <SelectItem value="DAMAGE">Damaged Goods</SelectItem>
              <SelectItem value="EXPIRED">Expired Goods</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Input
            type="number"
            placeholder="Quantity"
            {...register("quantity", { valueAsNumber: true })}
          />
          {errors.quantity && (
            <p className="text-red-500 text-sm">{(errors.quantity as any).message}</p>
          )}
        </div>

        <div>
          <Textarea placeholder="Reason for adjustment" {...register("reason")} />
          {errors.reason && (
            <p className="text-red-500 text-sm">{(errors.reason as any).message}</p>
          )}
        </div>

        <Button type="submit" disabled={adjustment.isPending} className="w-full">
          {adjustment.isPending ? "Saving..." : "Save Adjustment"}
        </Button>
      </form>
    </div>
  );
}