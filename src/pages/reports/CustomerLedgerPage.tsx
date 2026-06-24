import {
  useState,
  useMemo,
} from "react";

import {
  useCustomers,
  useCustomerSales,
  useCustomerPayments,
} from "@/hooks/useLedger";

export default function CustomerLedgerPage() {
  const [
    customerId,
    setCustomerId,
  ] = useState("");

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

            type: "SALE",

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

  let balance = 0;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Customer Ledger
      </h1>

      <select
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
                "SALE"
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

      <div className="border rounded-lg p-4">
        Outstanding Balance:

        <strong>
          ₹{balance}
        </strong>
      </div>
    </div>
  );
}