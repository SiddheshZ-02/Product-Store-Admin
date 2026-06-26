import {
  useSupplierPayments,
  useDeleteSupplierPayment,
} from "@/hooks/useSupplierPayments";

import { Button } from "@/components/ui/button";

export default function SupplierPaymentHistoryPage() {
  const {
    data = [],
    isLoading,
  } =
    useSupplierPayments();

  const deletePayment =
    useDeleteSupplierPayment();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Supplier Payments
      </h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Date</th>

            <th>Supplier</th>

            <th>Amount</th>

            <th>Method</th>

            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map(
            (payment: any) => (
              <tr
                key={payment.id}
              >
                <td>
                  {
                    payment.payment_date
                  }
                </td>

                <td>
                  {
                    payment.suppliers
                      ?.supplier_name
                  }
                </td>

                <td>
                  ₹
                  {Number(
                    payment.amount
                  ).toLocaleString()}
                </td>

                <td>
                  {
                    payment.payment_method
                  }
                </td>

                <td>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() =>
                      deletePayment.mutate(
                        payment.id
                      )
                    }
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}