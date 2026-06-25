import { Input } from "@/components/ui/input";

import {
  useMemo,
  useState,
} from "react";

import { useSalesHistory } from "@/hooks/useSales";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


export default function SalesHistoryPage() {

  const [search, setSearch] =
    useState("");


    const navigate =
  useNavigate();
  const {
    data = [],
    isLoading,
  } =
    useSalesHistory();

  const filtered =
    useMemo(() => {

      return data.filter(
        (sale: any) =>
          sale.invoice_number
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          sale.customers
            ?.customer_name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [data, search]);

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Sales History
        </h1>

      </div>

      <Input
        placeholder="Search Invoice or Customer..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />

      <div className="border rounded-lg overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="p-3 text-left">
                Invoice
              </th>

              <th className="p-3 text-left">
                Customer
              </th>

              <th className="p-3 text-left">
                Date
              </th>

              <th className="p-3 text-left">
                Total
              </th>

              <th className="p-3 text-left">
                Paid
              </th>

              <th className="p-3 text-left">
                Due
              </th>

              <th className="p-3 text-left">
                Status
              </th>
              <th className="p-3 text-left">
                Action
              </th>
          

            </tr>

          </thead>

          <tbody>

            {filtered.map(
              (sale: any) => (
                <tr
                  key={sale.id}
                  className="border-b"
                >

                  <td className="p-3">
                    {
                      sale.invoice_number
                    }
                  </td>

                  <td className="p-3">
                    {
                      sale.customers
                        ?.customer_name
                    }
                  </td>

                  <td className="p-3">
                    {sale.sale_date}
                  </td>

                  <td className="p-3">
                    ₹
                    {Number(
                      sale.total_amount
                    ).toLocaleString()}
                  </td>

                  <td className="p-3">
                    ₹
                    {Number(
                      sale.paid_amount
                    ).toLocaleString()}
                  </td>

                  <td className="p-3">
                    ₹
                    {Number(
                      sale.due_amount
                    ).toLocaleString()}
                  </td>

                  <td className="p-3">
                    {
                      sale.payment_status
                    }
                  </td>
                  <td>

  <Button
    onClick={() =>
      navigate(
        `/sales/${sale.id}`
      )
    }
  >
    View
  </Button>

</td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}