import DashboardCard from "@/components/dashboard/DashboardCard";

import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const {
    data,
    isLoading,
    error,
  } = useDashboard();

  if (isLoading) {
    return (
      <div>
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Failed to load dashboard
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          WineERP Overview
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Products"
          value={data?.products ?? 0}
        />

        <DashboardCard
          title="Customers"
          value={data?.customers ?? 0}
        />

        <DashboardCard
          title="Suppliers"
          value={data?.suppliers ?? 0}
        />

        <DashboardCard
          title="Low Stock"
          value={data?.low_stock ?? 0}
        />

        <DashboardCard
          title="Today's Sales"
          value={`₹ ${
            data?.today_sales ?? 0
          }`}
        />

        <DashboardCard
          title="Today's Expenses"
          value={`₹ ${
            data?.today_expenses ?? 0
          }`}
        />

        <DashboardCard
          title="Customer Due"
          value={`₹ ${
            data?.customer_due ?? 0
          }`}
        />

        <DashboardCard
          title="Supplier Due"
          value={`₹ ${
            data?.supplier_due ?? 0
          }`}
        />
      </div>
    </div>
  );
}