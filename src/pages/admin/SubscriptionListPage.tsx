import { useSubscriptions } from "@/hooks/useSubscriptions";

export default function SubscriptionListPage() {
  const { data = [], isLoading } = useSubscriptions();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Subscriptions</h1>

      <div className="rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Tenant</th>
              <th className="text-left p-3">Plan</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Start Date</th>
              <th className="text-left p-3">End Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((subscription) => (
              <tr key={subscription.id} className="border-b">
                <td className="p-3">
                  {(subscription as any).tenants?.shop_name || "-"}
                </td>
                <td className="p-3">
                  {subscription.plans?.name || "-"}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      subscription.status === "active"
                        ? "bg-green-100 text-green-800"
                        : subscription.status === "trial"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {subscription.status}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(subscription.start_date).toLocaleDateString()}
                </td>
                <td className="p-3">
                  {subscription.end_date
                    ? new Date(subscription.end_date).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
