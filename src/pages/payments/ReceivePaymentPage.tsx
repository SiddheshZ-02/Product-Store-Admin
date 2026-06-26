import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { useCustomers } from "@/hooks/useCustomers";

import { useCreateCustomerPayment } from "@/hooks/useCustomerPayments";

export default function ReceivePaymentPage() {
  const { data: customers = [] } =
    useCustomers();

  const createPayment =
    useCreateCustomerPayment();

  const [customerId, setCustomerId] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("CASH");

  const [referenceNumber, setReferenceNumber] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const handleSubmit = () => {
    createPayment.mutate({
      customer_id:
        customerId,

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
        Receive Customer Payment
      </h1>

      <select
        className="w-full border rounded-lg p-3"
        value={customerId}
        onChange={(e) =>
          setCustomerId(
            e.target.value
          )
        }
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

      <Input
        placeholder="Amount"
        type="number"
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
        onClick={
          handleSubmit
        }
      >
        Save Payment
      </Button>
    </div>
  );
}