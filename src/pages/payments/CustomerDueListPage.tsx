import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import TableSkeleton from "@/components/common/TableSkeleton";

import { useCustomerDues } from "@/hooks/usePayments";

export default function CustomerDueListPage() {
  const {
    data = [],
    isLoading,
  } = useCustomerDues();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <TableSkeleton columns={6} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Customer Dues
      </h1>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="p-3 text-left">Invoice</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Paid</th>
              <th className="p-3 text-left">Due</th>
              <th className="p-3 text-left"></th>
            </tr>
          </thead>

          <tbody>
            {data.map(
              (sale: any) => (
                <tr key={sale.id} className="border-b">
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
                    ₹
                    {
                      sale.total_amount
                    }
                  </td>

                  <td className="p-3">
                    ₹
                    {
                      sale.paid_amount
                    }
                  </td>

                  <td className="p-3">
                    ₹
                    {
                      sale.due_amount
                    }
                  </td>

                  <td className="p-3">
                    <Link
                      to={`/payments/customer/${sale.id}`}
                    >
                      <Button size="sm" variant="outline">
                        Receive
                      </Button>
                    </Link>
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