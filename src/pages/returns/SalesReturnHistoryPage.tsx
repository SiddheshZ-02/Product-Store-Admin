import { useSalesReturns } from "@/hooks/useSalesReturns";

export default function SalesReturnHistoryPage() {
  const {
    data = [],
    isLoading,
  } =
    useSalesReturns();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Sales Return History
      </h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Invoice</th>

            <th>Product</th>

            <th>Qty</th>

            <th>Amount</th>

            <th>Reason</th>
          </tr>
        </thead>

        <tbody>
          {data.map(
            (row: any) => (
              <tr
                key={row.id}
              >
                <td>
                  {
                    row.sales
                      ?.invoice_number
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
                  {row.return_amount}
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