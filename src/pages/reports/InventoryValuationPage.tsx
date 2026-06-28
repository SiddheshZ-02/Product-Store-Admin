import { useMemo } from "react";

import { useInventoryValuation } from "@/hooks/useInventoryReport";

export default function InventoryValuationPage() {
  const {
    data = [],
    isLoading,
  } =
    useInventoryValuation();

  const summary =
    useMemo(() => {

      let totalQty = 0;

      let totalCostValue = 0;

      let totalSaleValue = 0;

      data.forEach(
        (row: any) => {

          const qty =
            Number(
              row.quantity
            ) || 0;

          const cost =
            Number(
              row.products?.purchase_price
            ) || 0;

          const selling =
            Number(
              row.products?.selling_price
            ) || 0;

          totalQty += qty;

          totalCostValue +=
            qty * cost;

          totalSaleValue +=
            qty * selling;
        }
      );

      return {
        totalQty,
        totalCostValue,
        totalSaleValue,
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
        Inventory Valuation
      </h1>

      <div className="grid md:grid-cols-3 gap-4">

        <div className="border rounded-lg p-4">

          <p>
            Total Stock Qty
          </p>

          <h2 className="text-2xl font-bold">
            {summary.totalQty}
          </h2>

        </div>

        <div className="border rounded-lg p-4">

          <p>
            Inventory Cost Value
          </p>

          <h2 className="text-2xl font-bold">
            ₹
            {summary.totalCostValue.toLocaleString()}
          </h2>

        </div>

        <div className="border rounded-lg p-4">

          <p>
            Inventory Sale Value
          </p>

          <h2 className="text-2xl font-bold text-green-600">
            ₹
            {summary.totalSaleValue.toLocaleString()}
          </h2>

        </div>

      </div>

      <div className="border rounded-lg overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="p-3 text-left">
                Product
              </th>

              <th className="p-3 text-left">
                Qty
              </th>

              <th className="p-3 text-left">
                Cost Price
              </th>

              <th className="p-3 text-left">
                Selling Price
              </th>

              <th className="p-3 text-left">
                Cost Value
              </th>

              <th className="p-3 text-left">
                Sale Value
              </th>

            </tr>

          </thead>

          <tbody>

            {data.map(
              (row: any) => {

                const qty =
                  Number(
                    row.quantity
                  );

                const cost =
                  Number(
                    row.products?.purchase_price
                  );

                const selling =
                  Number(
                    row.products?.selling_price
                  );

                return (
                  <tr
                    key={
                      row.products?.id
                    }
                    className="border-b"
                  >

                    <td className="p-3">
                      {
                        row.products
                          ?.name
                      }
                    </td>

                    <td className="p-3">
                      {qty}
                    </td>

                    <td className="p-3">
                      ₹{cost}
                    </td>

                    <td className="p-3">
                      ₹{selling}
                    </td>

                    <td className="p-3">
                      ₹
                      {(
                        qty *
                        cost
                      ).toLocaleString()}
                    </td>

                    <td className="p-3">
                      ₹
                      {(
                        qty *
                        selling
                      ).toLocaleString()}
                    </td>

                  </tr>
                );
              }
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}