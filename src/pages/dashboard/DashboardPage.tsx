import RevenueChart from "@/components/charts/RevenueChart";
import DashboardCard from "@/components/dashboard/DashboardCard";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import LowStockCard from "@/components/dashboard/LowStockCard";
import PurchaseChart from "@/components/dashboard/PurchaseChart";
import RecentPurchasesCard from "@/components/dashboard/RecentPurchasesCard";
import RecentSalesCard from "@/components/dashboard/RecentSalesCard";
import TopProductsCard from "@/components/dashboard/TopProductsCard";

import {
  useDashboard,
  useDashboardCharts,
  useDashboardTopProducts,
  useLowStock,
  useRecentPurchases,
  useRecentSales,
} from "@/hooks/useDashboard";
import { getDateRange } from "@/utils/dateRange";

export default function DashboardPage() {
  const { from, to } = getDateRange("30days");

  const { data: topProducts } = useDashboardTopProducts();

  const { data: lowStockProducts } = useLowStock();

  const { data: chartData } = useDashboardCharts(from, to);

  const { data: dashboardData, isLoading, error } = useDashboard();

  const { data: recentSales } = useRecentSales();

  const { data: recentPurchases } = useRecentPurchases();

  if (isLoading) {
    return <div>Loading dashboard...</div>;
  }

  if (error) {
    return <div>Failed to load dashboard</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-muted-foreground">WineERP Overview</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard title="Products" value={dashboardData?.products ?? 0} />

        <DashboardCard
          title="Customers"
          value={dashboardData?.customers ?? 0}
        />

        <DashboardCard
          title="Suppliers"
          value={dashboardData?.suppliers ?? 0}
        />

        <DashboardCard
          title="Low Stock"
          value={dashboardData?.low_stock ?? 0}
        />

        <DashboardCard
          title="Today's Sales"
          value={`₹ ${dashboardData?.today_sales ?? 0}`}
        />

        <DashboardCard
          title="Today's Expenses"
          value={`₹ ${dashboardData?.today_expenses ?? 0}`}
        />

        <DashboardCard
          title="Customer Due"
          value={`₹ ${dashboardData?.customer_due ?? 0}`}
        />

        <DashboardCard
          title="Supplier Due"
          value={`₹ ${dashboardData?.supplier_due ?? 0}`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart data={chartData?.sales || []} />

        <PurchaseChart data={chartData?.purchases || []} />
      </div>

      <ExpenseChart data={chartData?.expenses || []} />
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentSalesCard data={recentSales || []} />

        <RecentPurchasesCard data={recentPurchases || []} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <TopProductsCard data={topProducts || []} />

        <LowStockCard data={lowStockProducts || []} />
      </div>
    </div>
  );
}
