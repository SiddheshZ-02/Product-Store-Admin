import { Link } from "react-router-dom";
import { useSupplierDues } from "@/hooks/usePayments";

export default function SupplierDueListPage() {
  const {
    data = [],
    isLoading,
  } = useSupplierDues();

  if (isLoading)
    return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Supplier Dues
      </h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Purchase No</th>
            <th>Supplier</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Due</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {data.map(
            (purchase: any) => (
              <tr key={purchase.id}>
                <td>
                  {
                    purchase.purchase_number
                  }
                </td>

                <td>
                  {
                    purchase.suppliers
                      ?.supplier_name
                  }
                </td>

                <td>
                  ₹
                  {
                    purchase.total_amount
                  }
                </td>

                <td>
                  ₹
                  {
                    purchase.paid_amount
                  }
                </td>

                <td>
                  ₹
                  {
                    purchase.due_amount
                  }
                </td>

                <td>
                  {
                    purchase.payment_status
                  }
                </td>

                <td>
                  <Link
                    to={`/payments/supplier/${purchase.id}`}
                  >
                    Pay
                  </Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}