import { useAdjustments } from "@/hooks/useStockAdjustment";

export default function AdjustmentHistoryPage() {
  const {
    data = [],
    isLoading,
  } =
    useAdjustments();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Adjustment History
      </h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Date</th>

            <th>Product</th>

            <th>Type</th>

            <th>Qty</th>

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
                    row.adjustment_date
                  }
                </td>

                <td>
                  {
                    row.products
                      ?.name
                  }
                </td>

                <td>
                  {
                    row.adjustment_type
                  }
                </td>

                <td>
                  {
                    row.quantity
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