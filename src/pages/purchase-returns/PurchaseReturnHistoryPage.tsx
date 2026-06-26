import { Button } from "@/components/ui/button";
import { usePurchaseReturns } from "@/hooks/usePurchaseReturns";
import { Link } from "react-router-dom";

export default function PurchaseReturnHistoryPage() {
  const {
    data = [],
    isLoading,
  } =
    usePurchaseReturns();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">

    <div className="flex items-center justify-between">

  <h1 className="text-3xl font-bold">
    Purchase Returns
  </h1>

  <Link
    to="/purchase-returns/create"
  >
    <Button>
      Create Return
    </Button>
  </Link>

</div>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Purchase</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Amount</th>
            <th>Reason</th>
          </tr>
        </thead>

        <tbody>
          {data.map(
            (row: any) => (
              <tr key={row.id}>
                <td>
                  {
                    row.purchases
                      ?.purchase_number
                  }
                </td>

                <td>
                  {
                    row.products
                      ?.name
                  }
                </td>

                <td>
                  {row.quantity}
                </td>

                <td>
                  ₹
                  {
                    row.return_amount
                  }
                </td>

                <td>
                  {row.reason}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

    </div>
  );
}