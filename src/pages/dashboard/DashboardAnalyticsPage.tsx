import { useMemo } from "react";

import { useDashboardAnalytics }
from "@/hooks/useDashboardAnalytics";

import RevenueChart
from "@/components/charts/RevenueChart";

import TopProductsChart
from "@/components/charts/TopProductsChart";

export default function DashboardAnalyticsPage() {

  const {
    data,
    isLoading,
  } = useDashboardAnalytics();

  const chartData =
    useMemo(() => {

      if (!data)
        return [];

      return data.sales.map(
        (sale: any) => ({
          date:
            sale.sale_date,

          sales:
            Number(
              sale.total_amount
            ),
        })
      );

    }, [data]);

  const topProducts =
    useMemo(() => {

      if (!data)
        return [];

      const map =
        new Map();

      data.saleItems.forEach(
        (item: any) => {

          const name =
            item.products?.name;

          const qty =
            Number(
              item.quantity
            );

          map.set(
            name,
            (map.get(name) || 0)
              + qty
          );
        }
      );

      return Array
        .from(
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

    }, [data]);

  if (isLoading)
    return <div>Loading...</div>;

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <div className="border rounded-lg p-4">
          <h2 className="font-bold mb-4">
            Revenue Trend
          </h2>

          <RevenueChart
            data={chartData}
          />
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="font-bold mb-4">
            Top Products
          </h2>

          <TopProductsChart
            data={topProducts}
          />
        </div>

      </div>

    </div>
  );
}