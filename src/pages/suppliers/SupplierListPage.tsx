import {
  useMemo,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import TableSkeleton from "@/components/common/TableSkeleton";

import {
  useSuppliers,
  useDeleteSupplier,
} from "@/hooks/useSuppliers";

export default function SupplierListPage() {
  const navigate =
    useNavigate();

  const [search, setSearch] =
    useState("");

  const { data = [], isLoading } =
    useSuppliers();

  const deleteMutation =
    useDeleteSupplier();

  const suppliers =
    useMemo(() => {
      return data.filter(
        (supplier) =>
          supplier.supplier_name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [data, search]);

  if (isLoading) {
    return (
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-40" />
        </div>
        <Skeleton className="h-10 w-80" />
        <TableSkeleton columns={4} />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Suppliers
        </h1>

        <Button asChild>
          <Link to="/suppliers/create">
            Add Supplier
          </Link>
        </Button>
      </div>

      <input
        className="border rounded-md p-2 w-80"
        placeholder="Search supplier..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />

      <div className="border rounded-lg">
        <table className="w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Phone</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {suppliers.map(
              (supplier) => (
                <tr
                  key={
                    supplier.id
                  }
                >
                  <td>
                    {
                      supplier.supplier_name
                    }
                  </td>

                  <td>
                    {
                      supplier.contact_person
                    }
                  </td>

                  <td>
                    {
                      supplier.phone
                    }
                  </td>

                  <td>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          navigate(
                            `/suppliers/${supplier.id}/edit`
                          )
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          deleteMutation.mutate(
                            supplier.id
                          )
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}