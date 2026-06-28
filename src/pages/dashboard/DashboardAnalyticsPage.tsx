import { useMemo, useState } from "react";
import { format, subDays } from "date-fns";

import { useDashboardCharts, useDashboardTopProducts } from "@/hooks/useDashboard";
import RevenueChart from "@/components/charts/RevenueChart";
import TopProductsChart from "@/components/charts/TopProductsChart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function DashboardAnalyticsPage() {
  const [dateRange, setDateRange] = useState({
    from: format(subDays(new Date(), 30), "yyyy-MM-dd"),
    to: format(new Date(), "yyyy-MM-dd"),
  });

  const { data: chartData, isLoading: chartsLoading } = useDashboardCharts(dateRange.from, dateRange.to);
  const { data: topProductsData, isLoading: topProductsLoading } = useDashboardTopProducts();

  const revenueData = useMemo(() => {
    if (!chartData) return [];
    return (chartData as any[]).map((item: any) => ({
      date: item.date,
      sales: Number(item.amount || item.sales),
    }));
  }, [chartData]);

  const topProducts = useMemo(() => {
    if (!topProductsData) return [];
    return (topProductsData as any[]).map((item: any) => ({
      name: item.name,
      qty: Number(item.qty || item.quantity),
    }));
  }, [topProductsData]);

  if (chartsLoading || topProductsLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart data={revenueData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <TopProductsChart data={topProducts} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}