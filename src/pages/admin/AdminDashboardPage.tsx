import {
  Building2,
  CreditCard,
  Users,
  DollarSign,
} from "lucide-react";

export default function AdminDashboardPage() {
  const cards = [
    {
      title: "Total Tenants",
      value: 0,
      icon: Building2,
    },
    {
      title: "Active Plans",
      value: 0,
      icon: CreditCard,
    },
    {
      title: "Total Users",
      value: 0,
      icon: Users,
    },
    {
      title: "Monthly Revenue",
      value: "₹0",
      icon: DollarSign,
    },
  ];

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

      <div className="grid grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-lg border p-6"
            >
              <div className="flex justify-between">
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
            </div>
          );
        })}
      </div>
    </div>
  );
}