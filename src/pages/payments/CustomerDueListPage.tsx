import { Link } from "react-router-dom";

import { useCustomerDues } from "@/hooks/usePayments";

export default function CustomerDueListPage() {
  const {
    data = [],
    isLoading,
  } = useCustomerDues();

  if (isLoading)
    return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Customer Dues
      </h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Invoice</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Due</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {data.map(
            (sale: any) => (
              <tr key={sale.id}>
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
                  <Link
                    to={`/payments/customer/${sale.id}`}
                  >
                    Receive
                  </Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}