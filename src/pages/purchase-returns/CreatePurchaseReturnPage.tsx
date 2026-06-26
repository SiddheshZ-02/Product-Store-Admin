import { useState } from "react";

import {
  usePurchasesForReturn,
  usePurchaseItemsForReturn,
  useCreatePurchaseReturn,
} from "@/hooks/usePurchaseReturns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreatePurchaseReturnPage() {
  const [purchaseId, setPurchaseId] =
    useState("");

  const [productId, setProductId] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const [reason, setReason] =
    useState("");

  const {
    data: purchases = [],
  } =
    usePurchasesForReturn();

  const {
    data: items = [],
  } =
    usePurchaseItemsForReturn(
      purchaseId
    );

  const createReturn =
    useCreatePurchaseReturn();

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Purchase Return
      </h1>

      <select
        value={purchaseId}
        onChange={(e) =>
          setPurchaseId(
            e.target.value
          )
        }
      >
        <option value="">
          Select Purchase
        </option>

        {purchases.map(
          (purchase: any) => (
            <option
              key={purchase.id}
              value={purchase.id}
            >
              {
                purchase.purchase_number
              }
            </option>
          )
        )}
      </select>

      <select
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

        {items.map(
          (item: any) => (
            <option
              key={
                item.product_id
              }
              value={
                item.product_id
              }
            >
              {
                item.product_name
              }
              {" | Qty "}
              {
                item.purchased_qty
              }
            </option>
          )
        )}
      </select>

      <Input
        type="number"
        value={quantity}
        onChange={(e) =>
          setQuantity(
            e.target.value
          )
        }
      />

      <Input
        value={reason}
        onChange={(e) =>
          setReason(
            e.target.value
          )
        }
      />

      <Button
        onClick={() =>
          createReturn.mutate({
            purchase_id:
              purchaseId,

            product_id:
              productId,

            quantity:
              Number(
                quantity
              ),

            reason,
          })
        }
      >
        Save Return
      </Button>

    </div>
  );
}