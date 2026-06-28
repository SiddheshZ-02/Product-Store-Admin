import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePlans, useDeletePlan } from "@/hooks/usePlans";

export default function PlanListPage() {
  const { data = [], isLoading } = usePlans();
  const deletePlan = useDeletePlan();

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
        <h1 className="text-3xl font-bold">Plans</h1>
        <Link to="/admin/plans/create">
          <Button>Create Plan</Button>
        </Link>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Price</th>
              <th className="text-left p-3">Trial Days</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((plan) => (
              <tr key={plan.id} className="border-b">
                <td className="p-3">{plan.name}</td>
                <td className="p-3">
                  {plan.currency} {plan.price}
                </td>
                <td className="p-3">{plan.trial_days}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      plan.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {plan.status}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <Link to={`/admin/plans/${plan.id}/edit`}>
                    <Button variant="secondary" size="sm">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deletePlan.mutate(plan.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
