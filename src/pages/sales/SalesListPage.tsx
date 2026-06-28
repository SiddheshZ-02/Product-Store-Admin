import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import TableSkeleton from "@/components/common/TableSkeleton";

import { useSales } from "@/hooks/useSales";

export default function SalesListPage() {
  const {
    data = [],
    isLoading,
  } = useSales();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <TableSkeleton columns={7} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">
          Sales
        </h1>

        <Link to="/sales/create">
          <Button>
            New Sale
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Invoice</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Paid</th>
              <th className="p-3 text-left">Due</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {data.map(
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
                    {
                      sale.payment_status
                    }
                  </td>

                  <td className="p-3">
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
    </div>
  );
}