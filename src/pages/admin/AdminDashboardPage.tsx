import {
  Building2,
  CreditCard,
  Users,
  DollarSign,
} from "lucide-react";
import { useMemo } from "react";
import { useTenants } from "@/hooks/useTenants";
import { usePlans } from "@/hooks/usePlans";
import { useSubscriptions } from "@/hooks/useSubscriptions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AdminDashboardPage() {
  const { data: tenants = [], isLoading: tenantsLoading } = useTenants();
  const { data: plans = [], isLoading: plansLoading } = usePlans();
  const { data: subscriptions = [], isLoading: subscriptionsLoading } = useSubscriptions();

  const totalTenants = tenants.length;
  const activePlans = plans.filter((p: any) => p.status === "active").length;
  const activeTenants = tenants.filter((t: any) => t.status === "active").length;
  const monthlyRevenue = subscriptions.reduce((sum: number, sub: any) => sum + (sub.price || 0), 0);

  const tenantStatusData = useMemo(() => {
    const active = tenants.filter((t: any) => t.status === "active").length;
    const suspended = tenants.filter((t: any) => t.status === "suspended").length;
    const trial = tenants.filter((t: any) => t.subscription_status === "trial").length;
    const expired = tenants.filter((t: any) => t.subscription_status === "expired").length;
    
    return [
      { name: "Active", value: active },
      { name: "Suspended", value: suspended },
      { name: "Trial", value: trial },
      { name: "Expired", value: expired },
    ];
  }, [tenants]);

  const cards = [
    {
      title: "Total Tenants",
      value: totalTenants,
      icon: Building2,
    },
    {
      title: "Active Tenants",
      value: activeTenants,
      icon: Users,
    },
    {
      title: "Active Plans",
      value: activePlans,
      icon: CreditCard,
    },
    {
      title: "Monthly Revenue",
      value: `₹${monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
    },
  ];

  if (tenantsLoading || plansLoading || subscriptionsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Super Admin Dashboard
        </h1>

        <p className="text-muted-foreground">
          Manage your SaaS platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Card key={card.title}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {card.title}
                    </p>
                    <h2 className="text-3xl font-bold mt-2">
                      {card.value}
                    </h2>
                  </div>
                  <Icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tenant Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tenantStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {tenantStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plan Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={plans.map((plan: any) => ({
                  name: plan.name,
                  tenants: tenants.filter((t: any) => t.plan_id === plan.id).length,
                }))}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tenants" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}