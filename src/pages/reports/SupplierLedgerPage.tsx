import { useSupplierPayments, useSupplierPurchases, useSuppliers } from "@/hooks/useSuppliers";
import { useMemo, useState } from "react";


export default function SupplierLedgerPage() {

  const [supplierId, setSupplierId] =
    useState("");

  const {
    data: suppliers = [],
  } = useSuppliers();

  const {
    data: purchases = [],
  } =
    useSupplierPurchases(
      supplierId
    );

  const {
    data: payments = [],
  } =
    useSupplierPayments(
      supplierId
    );

  const transactions =
    useMemo(() => {

      const purchaseRows =
        purchases.map(
          (purchase: any) => ({
            date:
              purchase.purchase_date,

            type:
              "PURCHASE",

            amount:
              Number(
                purchase.total_amount
              ),
          })
        );

      const paymentRows =
        payments.map(
          (payment: any) => ({
            date:
              payment.payment_date,

            type:
              "PAYMENT",

            amount:
              Number(
                payment.amount
              ),
          })
        );

      return [
        ...purchaseRows,
        ...paymentRows,
      ].sort(
        (a, b) =>
          new Date(
            a.date
          ).getTime() -
          new Date(
            b.date
          ).getTime()
      );
    }, [
      purchases,
      payments,
    ]);

  const totalPurchase =
    purchases.reduce(
      (
        sum: number,
        row: any
      ) =>
        sum +
        Number(
          row.total_amount
        ),
      0
    );

  const totalPaid =
    payments.reduce(
      (
        sum: number,
        row: any
      ) =>
        sum +
        Number(
          row.amount
        ),
      0
    );

  const due =
    totalPurchase -
    totalPaid;

  let balance = 0;

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Supplier Ledger
      </h1>

      <select
        value={supplierId}
        onChange={(e) =>
          setSupplierId(
            e.target.value
          )
        }
        className="border p-2 rounded"
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

      <div className="grid grid-cols-3 gap-4">

        <div className="border rounded-lg p-4">
          <p>Total Purchase</p>

          <h2 className="text-2xl font-bold">
            ₹
            {totalPurchase.toLocaleString()}
          </h2>
        </div>

        <div className="border rounded-lg p-4">
          <p>Total Paid</p>

          <h2 className="text-2xl font-bold">
            ₹
            {totalPaid.toLocaleString()}
          </h2>
        </div>

        <div className="border rounded-lg p-4">
          <p>Outstanding</p>

          <h2 className="text-2xl font-bold text-red-600">
            ₹
            {due.toLocaleString()}
          </h2>
        </div>

      </div>

      <table className="w-full border">

        <thead>

          <tr>

            <th>Date</th>

            <th>Type</th>

            <th>Amount</th>

            <th>Balance</th>

          </tr>

        </thead>

        <tbody>

          {transactions.map(
            (
              row,
              index
            ) => {

              if (
                row.type ===
                "PURCHASE"
              ) {
                balance +=
                  row.amount;
              } else {
                balance -=
                  row.amount;
              }

              return (
                <tr
                  key={index}
                >

                  <td>
                    {row.date}
                  </td>

                  <td>
                    {row.type}
                  </td>

                  <td>
                    ₹{row.amount}
                  </td>

                  <td>
                    ₹{balance}
                  </td>

                </tr>
              );
            }
          )}

        </tbody>

      </table>

    </div>
  );
}