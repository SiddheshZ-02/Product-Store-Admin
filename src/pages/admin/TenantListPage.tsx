import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { useTenants } from "@/hooks/useTenants";

export default function TenantListPage() {
  const {
    data = [],
    isLoading,
  } = useTenants();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between">

        <h1 className="text-3xl font-bold">
          Tenants
        </h1>

        <Link to="/admin/tenants/create">
          <Button>
            Create Tenant
          </Button>
        </Link>

      </div>

      <div className="rounded-lg border overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left p-3">
                Shop
              </th>

              <th className="text-left p-3">
                Owner
              </th>

              <th className="text-left p-3">
                Email
              </th>

              <th className="text-left p-3">
                Status
              </th>

              <th className="text-left p-3">
                Subscription
              </th>

            </tr>

          </thead>

          <tbody>

            {data.map((tenant) => (
              <tr
                key={tenant.id}
                className="border-b"
              >
                <td className="p-3">
                  {tenant.shop_name}
                </td>

                <td className="p-3">
                  {tenant.owner_name}
                </td>

                <td className="p-3">
                  {tenant.email}
                </td>

                <td className="p-3">
                  {tenant.status}
                </td>

                <td className="p-3">
                  {tenant.subscription_status}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}