import {
  useState,
  useMemo,
} from "react";

import {
  useSuppliers,
  useSupplierPurchases,
  useSupplierPayments,
} from "@/hooks/useLedger";
import ExportExcelButton from "@/components/common/ExportExcelButton";
import ExportPdfButton from "@/components/common/ExportPdfButton";

export default function SupplierLedgerPage() {
  const [
    supplierId,
    setSupplierId,
  ] = useState("");

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
          (
            payment: any
          ) => ({
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
        (
          a,
          b
        ) =>
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

  let balance = 0;


  const pdfRows =
  transactions.map((row) => [
    row.date,
    row.type,
    row.amount,
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Supplier Ledger
      </h1>
      <ExportExcelButton
  data={transactions}
  fileName="supplier-ledger"
/>

<ExportPdfButton
  title="Supplier Ledger"
  fileName="supplier-ledger"
  columns={[
    "Date",
    "Type",
    "Amount",
  ]}
  rows={pdfRows}
/>
      <select
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
          (
            supplier: any
          ) => (
            <option
              key={
                supplier.id
              }
              value={
                supplier.id
              }
            >
              {
                supplier.supplier_name
              }
            </option>
          )
        )}
      </select>

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
                  key={
                    index
                  }
                >
                  <td>
                    {
                      row.date
                    }
                  </td>

                  <td>
                    {
                      row.type
                    }
                  </td>

                  <td>
                    ₹
                    {
                      row.amount
                    }
                  </td>

                  <td>
                    ₹
                    {balance}
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>

      <div className="border p-4 rounded">
        Outstanding Payable:

        <strong>
          ₹{balance}
        </strong>
      </div>
    </div>
  );
}