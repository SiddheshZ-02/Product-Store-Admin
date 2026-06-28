import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import TableSkeleton from "@/components/common/TableSkeleton";

import { useSupplierDues } from "@/hooks/usePayments";

export default function SupplierDueListPage() {
  const {
    data = [],
    isLoading,
  } = useSupplierDues();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <TableSkeleton columns={7} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Supplier Dues
      </h1>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="p-3 text-left">Purchase No</th>
              <th className="p-3 text-left">Supplier</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Paid</th>
              <th className="p-3 text-left">Due</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left"></th>
            </tr>
          </thead>

          <tbody>
            {data.map(
              (purchase: any) => (
                <tr key={purchase.id} className="border-b">
                  <td className="p-3">
                    {
                      purchase.purchase_number
                    }
                  </td>

                  <td className="p-3">
                    {
                      purchase.suppliers
                        ?.supplier_name
                    }
                  </td>

                  <td className="p-3">
                    ₹
                    {
                      purchase.total_amount
                    }
                  </td>

                  <td className="p-3">
                    ₹
                    {
                      purchase.paid_amount
                    }
                  </td>

                  <td className="p-3">
                    ₹
                    {
                      purchase.due_amount
                    }
                  </td>

                  <td className="p-3">
                    {
                      purchase.payment_status
                    }
                  </td>

                  <td className="p-3">
                    <Link
                      to={`/payments/supplier/${purchase.id}`}
                    >
                      <Button size="sm" variant="outline">
                        Pay
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