import RevenueChart from "@/components/charts/RevenueChart";
import DashboardCard from "@/components/dashboard/DashboardCard";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import LowStockCard from "@/components/dashboard/LowStockCard";
import PurchaseChart from "@/components/dashboard/PurchaseChart";
import RecentPurchasesCard from "@/components/dashboard/RecentPurchasesCard";
import RecentSalesCard from "@/components/dashboard/RecentSalesCard";
import TopProductsCard from "@/components/dashboard/TopProductsCard";
import CardSkeleton from "@/components/common/CardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

import {
  useDashboard,
  useDashboardCharts,
  useDashboardTopProducts,
  useLowStock,
  useRecentPurchases,
  useRecentSales,
} from "@/hooks/useDashboard";
import { getDateRange } from "@/utils/dateRange";

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-48 w-full" />
        </div>
        <div className="rounded-xl border bg-card p-5">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
      <div className="rounded-xl border bg-card p-5">
        <Skeleton className="h-6 w-32 mb-4" />
        <Skeleton className="h-48 w-full" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-48 w-full" />
        </div>
        <div className="rounded-xl border bg-card p-5">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { from, to } = getDateRange("30days");

  const { data: topProducts, isLoading: topProductsLoading } = useDashboardTopProducts();

  const { data: lowStockProducts, isLoading: lowStockLoading } = useLowStock();

  const { data: chartData, isLoading: chartsLoading } = useDashboardCharts(from, to);

  const { data: dashboardData, isLoading: dashboardLoading, error } = useDashboard();

  const { data: recentSales, isLoading: recentSalesLoading } = useRecentSales();

  const { data: recentPurchases, isLoading: recentPurchasesLoading } = useRecentPurchases();

  if (dashboardLoading || topProductsLoading || lowStockLoading || chartsLoading || recentSalesLoading || recentPurchasesLoading) {
    return <DashboardSkeleton />;
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
