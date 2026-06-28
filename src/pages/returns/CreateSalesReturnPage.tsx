import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { useSalesHistory } from "@/hooks/useSales";

import {
  useCreateSalesReturn,
  useSaleItemsForReturn,
} from "@/hooks/useSalesReturns";

export default function CreateSalesReturnPage() {
  const { data: sales = [] } = useSalesHistory();

  const [saleId, setSaleId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");

  const { data: saleItems = [] } = useSaleItemsForReturn(saleId);

  const createReturn = useCreateSalesReturn();

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-3xl font-bold">Sales Return</h1>

      <div className="border rounded-lg p-4">
        <h3 className="font-semibold">Invoice Products</h3>

        {saleItems.map((item: any) => (
          <div key={item.product_id} className="flex justify-between">
            <span>{item.product_name}</span>

            <span>
              Sold:
              {item.sold_qty}
            </span>
          </div>
        ))}
      </div>

      <select
        className="w-full border p-3 rounded-lg"
        value={saleId}
        onChange={(e) => setSaleId(e.target.value)}
      >
        <option value="">Select Invoice</option>

        {sales.map((sale: any) => (
          <option key={sale.id} value={sale.id}>
            {sale.invoice_number}
          </option>
        ))}
      </select>

      <select value={productId} onChange={(e) => setProductId(e.target.value)}>
        <option value="">Select Product</option>

        {saleItems.map((item: any) => (
          <option key={item.product_id} value={item.product_id}>
            {item.product_name}
            {" | Sold: "}
            {item.sold_qty}
          </option>
        ))}
      </select>

      <Input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <Input
        placeholder="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />

      <Button
        onClick={() =>
          createReturn.mutate({
            sale_id: saleId,

            product_id: productId,

            quantity: Number(quantity),

            reason,
          })
        }
      >
        Save Return
      </Button>
    </div>
  );
}
