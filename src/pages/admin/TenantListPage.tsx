import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  useTenants,
  useSuspendTenant,
  useActivateTenant,
  useDeleteTenant,
} from "@/hooks/useTenants";

export default function TenantListPage() {
  const { data = [], isLoading } = useTenants();
  const suspendTenant = useSuspendTenant();
  const activateTenant = useActivateTenant();
  const deleteTenant = useDeleteTenant();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tenants</h1>
        <Link to="/admin/tenants/create">
          <Button>Create Tenant</Button>
        </Link>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Shop</TableHead>
              <TableHead className="font-semibold">Owner</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Subscription</TableHead>
              <TableHead className="font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((tenant) => (
              <TableRow key={tenant.id}>
                <TableCell>{tenant.shop_name}</TableCell>
                <TableCell>{tenant.owner_name}</TableCell>
                <TableCell>{tenant.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={tenant.status === "active" ? "default" : "destructive"}
                  >
                    {tenant.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      tenant.subscription_status === "active"
                        ? "default"
                        : tenant.subscription_status === "trial"
                        ? "outline"
                        : "secondary"
                    }
                  >
                    {tenant.subscription_status}
                  </Badge>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Link to={`/admin/tenants/${tenant.id}/edit`}>
                    <Button variant="secondary" size="sm">
                      Edit
                    </Button>
                  </Link>
                  {tenant.status === "active" ? (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => suspendTenant.mutate(tenant.id)}
                    >
                      Suspend
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => activateTenant.mutate(tenant.id)}
                    >
                      Activate
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteTenant.mutate(tenant.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
