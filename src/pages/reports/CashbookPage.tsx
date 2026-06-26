import { useMemo, useState } from "react";

import { useCashbook } from "@/hooks/useCashbook";

import { Input } from "@/components/ui/input";

export default function CashbookPage() {
  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const [from, setFrom] =
    useState(today);

  const [to, setTo] =
    useState(today);

  const {
    data = [],
    isLoading,
  } = useCashbook(
    from,
    to
  );

  const summary =
    useMemo(() => {
      const cashIn =
        data.reduce(
          (sum: number, row: any) =>
            sum +
            Number(
              row.cash_in || 0
            ),
          0
        );

      const cashOut =
        data.reduce(
          (sum: number, row: any) =>
            sum +
            Number(
              row.cash_out || 0
            ),
          0
        );

      return {
        cashIn,
        cashOut,

        balance:
          cashIn -
          cashOut,
      };
    }, [data]);

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Cashbook
      </h1>

      <div className="grid grid-cols-2 gap-4">

        <Input
          type="date"
          value={from}
          onChange={(e) =>
            setFrom(
              e.target.value
            )
          }
        />

        <Input
          type="date"
          value={to}
          onChange={(e) =>
            setTo(
              e.target.value
            )
          }
        />

      </div>

      <div className="grid md:grid-cols-3 gap-4">

        <div className="border rounded-lg p-4">
          <p>
            Cash In
          </p>

          <h2 className="text-2xl font-bold">
            ₹
            {summary.cashIn.toLocaleString()}
          </h2>
        </div>

        <div className="border rounded-lg p-4">
          <p>
            Cash Out
          </p>

          <h2 className="text-2xl font-bold">
            ₹
            {summary.cashOut.toLocaleString()}
          </h2>
        </div>

        <div className="border rounded-lg p-4">
          <p>
            Balance
          </p>

          <h2 className="text-2xl font-bold">
            ₹
            {summary.balance.toLocaleString()}
          </h2>
        </div>

      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Description</th>
            <th>Cash In</th>
            <th>Cash Out</th>
          </tr>
        </thead>

        <tbody>

          {data.map(
            (
              row: any,
              index
            ) => (
              <tr key={index}>
                <td>
                  {
                    row.txn_date
                  }
                </td>

                <td>
                  {
                    row.txn_type
                  }
                </td>

                <td>
                  {
                    row.description
                  }
                </td>

                <td>
                  ₹
                  {Number(
                    row.cash_in
                  ).toLocaleString()}
                </td>

                <td>
                  ₹
                  {Number(
                    row.cash_out
                  ).toLocaleString()}
                </td>
              </tr>
            )
          )}

        </tbody>
      </table>

    </div>
  );
}