import {
  useCustomerPayments,
  useDeleteCustomerPayment,
} from "@/hooks/useCustomerPayments";

import { Button } from "@/components/ui/button";

export default function CustomerPaymentHistoryPage() {
  const {
    data = [],
    isLoading,
  } =
    useCustomerPayments();

  const deletePayment =
    useDeleteCustomerPayment();

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Customer Payments
      </h1>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3">
                Date
              </th>

              <th className="p-3">
                Customer
              </th>

              <th className="p-3">
                Amount
              </th>

              <th className="p-3">
                Method
              </th>

              <th className="p-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map(
              (
                payment: any
              ) => (
                <tr
                  key={
                    payment.id
                  }
                  className="border-b"
                >
                  <td className="p-3">
                    {
                      payment.payment_date
                    }
                  </td>

                  <td className="p-3">
                    {
                      payment
                        .customers
                        ?.customer_name
                    }
                  </td>

                  <td className="p-3">
                    ₹
                    {Number(
                      payment.amount
                    ).toLocaleString()}
                  </td>

                  <td className="p-3">
                    {
                      payment.payment_method
                    }
                  </td>

                  <td className="p-3">
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
    </div>
  );
}