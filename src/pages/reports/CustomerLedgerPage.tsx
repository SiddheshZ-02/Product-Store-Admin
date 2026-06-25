import { useState, useMemo } from "react";

import {
  useCustomers,
  useCustomerSales,
  useCustomerPayments,
} from "@/hooks/useLedger";

import ExportExcelButton from "@/components/common/ExportExcelButton";
import ExportPdfButton from "@/components/common/ExportPdfButton";

export default function CustomerLedgerPage() {
  const [customerId, setCustomerId] =
    useState("");

  const {
    data: customers = [],
  } = useCustomers();

  const {
    data: sales = [],
  } =
    useCustomerSales(
      customerId
    );

  const {
    data: payments = [],
  } =
    useCustomerPayments(
      customerId
    );

  const transactions =
    useMemo(() => {
      const saleRows =
        sales.map(
          (sale: any) => ({
            date:
              sale.sale_date,

            type:
              "SALE",

            amount:
              Number(
                sale.total_amount
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
        ...saleRows,
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
      sales,
      payments,
    ]);

  const totalSales =
    sales.reduce(
      (
        sum: number,
        sale: any
      ) =>
        sum +
        Number(
          sale.total_amount
        ),
      0
    );

  const totalPayments =
    payments.reduce(
      (
        sum: number,
        payment: any
      ) =>
        sum +
        Number(
          payment.amount
        ),
      0
    );

  const outstandingBalance =
    totalSales -
    totalPayments;

  const exportData =
    transactions.map(
      (row) => ({
        Date:
          row.date,
        Type:
          row.type,
        Amount:
          row.amount,
      })
    );

  const pdfRows =
    transactions.map(
      (row) => [
        row.date,
        row.type,
        row.amount,
      ]
    );

  let runningBalance = 0;

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            Customer Ledger
          </h1>

          <p className="text-muted-foreground">
            Customer transaction history
          </p>
        </div>

        <div className="flex gap-2">
          <ExportExcelButton
            data={exportData}
            fileName="customer-ledger"
          />

          <ExportPdfButton
            title="Customer Ledger"
            fileName="customer-ledger"
            columns={[
              "Date",
              "Type",
              "Amount",
            ]}
            rows={pdfRows}
          />
        </div>

      </div>

      {/* Customer Select */}

      <div>

        <select
          value={
            customerId
          }
          onChange={(e) =>
            setCustomerId(
              e.target.value
            )
          }
          className="border rounded-lg px-3 py-2 w-full max-w-sm"
        >
          <option value="">
            Select Customer
          </option>

          {customers.map(
            (
              customer: any
            ) => (
              <option
                key={
                  customer.id
                }
                value={
                  customer.id
                }
              >
                {
                  customer.customer_name
                }
              </option>
            )
          )}

        </select>

      </div>

      {/* Summary Cards */}

      <div className="grid gap-4 md:grid-cols-3">

        <div className="border rounded-lg p-4">

          <p className="text-sm text-muted-foreground">
            Total Sales
          </p>

          <h2 className="text-2xl font-bold">
            ₹
            {totalSales.toLocaleString()}
          </h2>

        </div>

        <div className="border rounded-lg p-4">

          <p className="text-sm text-muted-foreground">
            Total Payments
          </p>

          <h2 className="text-2xl font-bold">
            ₹
            {totalPayments.toLocaleString()}
          </h2>

        </div>

        <div className="border rounded-lg p-4">

          <p className="text-sm text-muted-foreground">
            Outstanding Balance
          </p>

          <h2 className="text-2xl font-bold">
            ₹
            {outstandingBalance.toLocaleString()}
          </h2>

        </div>

      </div>

      {/* Ledger Table */}

      <div className="border rounded-lg overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="border-b bg-muted/50">

              <th className="p-3 text-left">
                Date
              </th>

              <th className="p-3 text-left">
                Type
              </th>

              <th className="p-3 text-left">
                Amount
              </th>

              <th className="p-3 text-left">
                Running Balance
              </th>

            </tr>

          </thead>

          <tbody>

            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-8 text-center"
                >
                  No Transactions Found
                </td>
              </tr>
            ) : (
              transactions.map(
                (
                  row,
                  index
                ) => {

                  if (
                    row.type ===
                    "SALE"
                  ) {
                    runningBalance +=
                      row.amount;
                  } else {
                    runningBalance -=
                      row.amount;
                  }

                  return (
                    <tr
                      key={
                        index
                      }
                      className="border-b"
                    >

                      <td className="p-3">
                        {
                          row.date
                        }
                      </td>

                      <td className="p-3">
                        {
                          row.type
                        }
                      </td>

                      <td className="p-3">
                        ₹
                        {row.amount.toLocaleString()}
                      </td>

                      <td className="p-3 font-medium">
                        ₹
                        {runningBalance.toLocaleString()}
                      </td>

                    </tr>
                  );
                }
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}