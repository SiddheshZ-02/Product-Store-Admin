import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { useProducts } from "@/hooks/useProducts";

import { useCreateAdjustment } from "@/hooks/useStockAdjustment";

export default function StockAdjustmentPage() {
  const {
    data: products = [],
  } =
    useProducts();

  const adjustment =
    useCreateAdjustment();

  const [
    productId,
    setProductId,
  ] = useState("");

  const [
    quantity,
    setQuantity,
  ] = useState("");

  const [
    adjustmentType,
    setAdjustmentType,
  ] = useState("DECREASE");

  const [reason, setReason] =
    useState("");

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-3xl font-bold">
        Stock Adjustment
      </h1>

      <select
        className="w-full border rounded-lg p-3"
        value={productId}
        onChange={(e) =>
          setProductId(
            e.target.value
          )
        }
      >
        <option value="">
          Select Product
        </option>

        {products.map(
          (product: any) => (
            <option
              key={product.id}
              value={
                product.id
              }
            >
              {product.name}
            </option>
          )
        )}
      </select>

      <select
        className="w-full border rounded-lg p-3"
        value={
          adjustmentType
        }
        onChange={(e) =>
          setAdjustmentType(
            e.target.value
          )
        }
      >
        <option value="INCREASE">
          Increase
        </option>

        <option value="DECREASE">
          Decrease
        </option>

        <option value="DAMAGE">
          Damage
        </option>

        <option value="EXPIRED">
          Expired
        </option>
      </select>

      <Input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) =>
          setQuantity(
            e.target.value
          )
        }
      />

      <Input
        placeholder="Reason"
        value={reason}
        onChange={(e) =>
          setReason(
            e.target.value
          )
        }
      />

      <Button
        onClick={() =>
          adjustment.mutate({
            product_id:
              productId,

            quantity:
              Number(
                quantity
              ),

            adjustment_type:
              adjustmentType,

            reason,
          })
        }
      >
        Save Adjustment
      </Button>
    </div>
  );
}