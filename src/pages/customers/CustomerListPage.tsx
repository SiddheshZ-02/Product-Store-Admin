import {
  useMemo,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { Button } from "@/components/ui/button";

import {
  useCustomers,
  useDeleteCustomer,
} from "@/hooks/useCustomers";

export default function CustomerListPage() {
  const navigate =
    useNavigate();

  const [search, setSearch] =
    useState("");

  const { data = [] } =
    useCustomers();

  const deleteMutation =
    useDeleteCustomer();

  const customers =
    useMemo(() => {
      return data.filter(
        (customer) =>
          customer.customer_name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [data, search]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Customers
        </h1>

        <Button asChild>
          <Link to="/customers/create">
            Add Customer
          </Link>
        </Button>
      </div>

      <input
        className="border rounded-md p-2 w-80"
        placeholder="Search customer..."
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
              <th>Phone</th>
              <th>Email</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {customers.map(
              (customer) => (
                <tr
                  key={
                    customer.id
                  }
                >
                  <td>
                    {
                      customer.customer_name
                    }
                  </td>

                  <td>
                    {
                      customer.phone
                    }
                  </td>

                  <td>
                    {
                      customer.email
                    }
                  </td>

                  <td>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          navigate(
                            `/customers/${customer.id}/edit`
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
                            customer.id
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