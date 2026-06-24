import { useMemo } from "react";

import {
  useSalesReport,
  useTopProducts,
} from "@/hooks/useReports";

export default function SalesReportPage() {
  const {
    data: sales = [],
    isLoading,
  } = useSalesReport();

  const {
    data: items = [],
  } = useTopProducts();

  const summary =
    useMemo(() => {
      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      let todaySales = 0;
      let revenue = 0;
      let dues = 0;

      sales.forEach(
        (sale: any) => {
          revenue += Number(
            sale.total_amount
          );

          dues += Number(
            sale.due_amount
          );

          if (
            sale.sale_date?.startsWith(
              today
            )
          ) {
            todaySales +=
              Number(
                sale.total_amount
              );
          }
        }
      );

      return {
        todaySales,
        revenue,
        dues,
      };
    }, [sales]);

  const topProducts =
    useMemo(() => {
      const map =
        new Map();

      items.forEach(
        (item: any) => {
          const name =
            item.products?.name;

          const qty =
            Number(
              item.quantity
            );

          map.set(
            name,
            (map.get(name) || 0) +
              qty
          );
        }
      );

      return Array.from(
        map.entries()
      )
        .map(
          ([name, qty]) => ({
            name,
            qty,
          })
        )
        .sort(
          (a, b) =>
            b.qty - a.qty
        )
        .slice(0, 5);
    }, [items]);

  if (isLoading)
    return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Sales Report
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="border p-4 rounded">
          <div>
            Today's Sales
          </div>

          <div className="text-2xl font-bold">
            ₹
            {
              summary.todaySales
            }
          </div>
        </div>

        <div className="border p-4 rounded">
          <div>
            Revenue
          </div>

          <div className="text-2xl font-bold">
            ₹
            {
              summary.revenue
            }
          </div>
        </div>

        <div className="border p-4 rounded">
          <div>
            Outstanding Due
          </div>

          <div className="text-2xl font-bold">
            ₹
            {summary.dues}
          </div>
        </div>
      </div>

      <div className="border rounded p-4">
        <h2 className="font-bold mb-4">
          Top Products
        </h2>

        {topProducts.map(
          (product) => (
            <div
              key={product.name}
              className="flex justify-between py-2"
            >
              <span>
                {product.name}
              </span>

              <span>
                {product.qty}
              </span>
            </div>
          )
        )}
      </div>

      <div className="border rounded p-4">
        <h2 className="font-bold mb-4">
          Recent Sales
        </h2>

        <table className="w-full">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Due</th>
            </tr>
          </thead>

          <tbody>
            {sales
              .slice(0, 10)
              .map(
                (
                  sale: any
                ) => (
                  <tr
                    key={
                      sale.id
                    }
                  >
                    <td>
                      {
                        sale.invoice_number
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
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
}