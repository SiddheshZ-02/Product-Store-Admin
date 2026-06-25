import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCustomers } from "@/hooks/useCustomers";
import { useCreateSale } from "@/hooks/useSales";

import { useCartStore } from "@/store/cartStore";

export default function CartSection() {
  const [customerId, setCustomerId] = useState("");

  const [paidAmount, setPaidAmount] = useState(0);

  const { items, increaseQty, decreaseQty, removeItem, clearCart } =
    useCartStore();

  const { data: customers = [] } = useCustomers();

  const createSale = useCreateSale();

  const subtotal = items.reduce(
    (sum, item) => sum + item.selling_price * item.quantity,
    0,
  );

  const dueAmount = Math.max(0, subtotal - paidAmount);

  useEffect(() => {
    if (createSale.isSuccess) {
      clearCart();

      setCustomerId("");

      setPaidAmount(0);
    }
  }, [createSale.isSuccess, clearCart]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Cart</h2>

      {items.length === 0 && (
        <div className="border rounded-lg p-6 text-center">Cart Empty</div>
      )}

      {items.map((item) => (
        <div key={item.product_id} className="border rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">{item.name}</p>

              <p className="text-sm text-muted-foreground">
                ₹{item.selling_price.toLocaleString()}
              </p>
            </div>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeItem(item.product_id)}
            >
              Remove
            </Button>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <Button size="sm" onClick={() => decreaseQty(item.product_id)}>
              -
            </Button>

            <span className="font-medium">{item.quantity}</span>

            <Button
              size="sm"
              disabled={item.quantity >= item.stock}
              onClick={() => increaseQty(item.product_id)}
            >
              +
            </Button>
          </div>

          <div className="mt-3 font-semibold">
            ₹{(item.quantity * item.selling_price).toLocaleString()}
          </div>
        </div>
      ))}

      <div className="border rounded-lg p-4 space-y-4">
        <Select value={customerId} onValueChange={setCustomerId}>
          <SelectTrigger>
            <SelectValue placeholder="Select Customer" />
          </SelectTrigger>

          <SelectContent>
            {customers.map((customer) => (
              <SelectItem key={customer.id} value={customer.id}>
                {customer.customer_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="number"
          placeholder="Paid Amount"
          value={paidAmount}
          onChange={(e) => setPaidAmount(Number(e.target.value))}
        />

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>

            <span className="font-medium">₹{subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Paid Amount</span>

            <span className="font-medium">₹{paidAmount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between">
            <span>Due Amount</span>

            <span className="font-bold">₹{dueAmount.toLocaleString()}</span>
          </div>
        </div>

<div className="border rounded-lg p-4 bg-muted">

  <h3 className="font-semibold mb-3">
    Invoice Preview
  </h3>

  <p>
    Invoice:
    INV-{Date.now()}
  </p>

  <p>
    Customer:
    {
      customers.find(
        (c) =>
          c.id === customerId
      )?.customer_name || "-"
    }
  </p>

  <p>
    Total:
    ₹{subtotal}
  </p>

  <p>
    Paid:
    ₹{paidAmount}
  </p>

  <p>
    Due:
    ₹{dueAmount}
  </p>

</div>

        <Button
          className="w-full"
          disabled={!customerId || items.length === 0 || createSale.isPending}
          onClick={() => {
            createSale.mutate({
              p_customer_id: customerId,

              p_items: items.map((item) => ({
                product_id: item.product_id,
                quantity: item.quantity,
              })),

              p_paid_amount: paidAmount,

              p_notes: null,
            });
          }}
        >
          {createSale.isPending ? "Creating Sale..." : "Create Sale"}
        </Button>
      </div>
    </div>
  );
}
