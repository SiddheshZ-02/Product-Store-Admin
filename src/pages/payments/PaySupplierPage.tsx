import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { useSuppliers } from "@/hooks/useSuppliers";

import { useCreateSupplierPayment } from "@/hooks/useSupplierPayments";

export default function PaySupplierPage() {
  const { data: suppliers = [] } =
    useSuppliers();

  const createPayment =
    useCreateSupplierPayment();

  const [supplierId, setSupplierId] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("CASH");

  const [referenceNumber, setReferenceNumber] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const handleSave = () => {
    createPayment.mutate({
      supplier_id:
        supplierId,

      payment_date:
        new Date()
          .toISOString()
          .split("T")[0],

      amount:
        Number(amount),

      payment_method:
        paymentMethod,

      reference_number:
        referenceNumber,

      notes,
    });
  };

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-3xl font-bold">
        Pay Supplier
      </h1>

      <select
        className="w-full border rounded-lg p-3"
        value={supplierId}
        onChange={(e) =>
          setSupplierId(
            e.target.value
          )
        }
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
              {supplier.supplier_name}
            </option>
          )
        )}
      </select>

      <Input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) =>
          setAmount(
            e.target.value
          )
        }
      />

      <select
        className="w-full border rounded-lg p-3"
        value={paymentMethod}
        onChange={(e) =>
          setPaymentMethod(
            e.target.value
          )
        }
      >
        <option value="CASH">
          CASH
        </option>

        <option value="UPI">
          UPI
        </option>

        <option value="CARD">
          CARD
        </option>

        <option value="BANK_TRANSFER">
          BANK TRANSFER
        </option>
      </select>

      <Input
        placeholder="Reference Number"
        value={referenceNumber}
        onChange={(e) =>
          setReferenceNumber(
            e.target.value
          )
        }
      />

      <Input
        placeholder="Notes"
        value={notes}
        onChange={(e) =>
          setNotes(
            e.target.value
          )
        }
      />

      <Button
        onClick={handleSave}
      >
        Save Payment
      </Button>
    </div>
  );
}