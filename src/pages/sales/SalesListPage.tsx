import { Link } from "react-router-dom";

import { useSales } from "@/hooks/useSales";

export default function SalesListPage() {
  const {
    data = [],
    isLoading,
  } = useSales();

  if (isLoading)
    return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Sales
        </h1>

        <Link to="/sales/create">
          <button className="border px-4 py-2 rounded">
            New Sale
          </button>
        </Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th>Invoice</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Due</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {data.map(
            (sale: any) => (
              <tr
                key={sale.id}
                className="border-b"
              >
                <td>
                  {
                    sale.invoice_number
                  }
                </td>

                <td>
                  {
                    sale.customers
                      ?.customer_name
                  }
                </td>

                <td>
                  ₹
                  {
                    sale.total_amount
                  }
                </td>

                <td>
                  ₹
                  {
                    sale.paid_amount
                  }
                </td>

                <td>
                  ₹
                  {
                    sale.due_amount
                  }
                </td>

                <td>
                  {
                    sale.payment_status
                  }
                </td>

                <td>
                  {new Date(
                    sale.sale_date
                  ).toLocaleDateString()}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}