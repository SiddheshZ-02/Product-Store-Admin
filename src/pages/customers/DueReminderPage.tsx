import { Button } from "@/components/ui/button";

import { useDueCustomers } from "@/hooks/useCustomers";

import { openWhatsApp } from "@/utils/whatsapp";

import { dueReminderTemplate } from "@/utils/whatsappTemplates";
import { useState } from "react";

export default function DueReminderPage() {
  const [selected, setSelected] = useState<string[]>([]);

  const { data = [], isLoading } = useDueCustomers();

  const totalCustomers = data.length;

  const totalDue = data.reduce(
    (sum: number, customer: any) => sum + Number(customer.total_due || 0),
    0,
  );

  const selectedCustomers = selected.length;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Due Reminders</h1>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Total Customers</p>

          <h2 className="text-2xl font-bold">{totalCustomers}</h2>
        </div>

        <div className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Total Due Amount</p>

          <h2 className="text-2xl font-bold">₹{totalDue.toLocaleString()}</h2>
        </div>

        <div className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Selected Customers</p>

          <h2 className="text-2xl font-bold">{selectedCustomers}</h2>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="flex gap-2 mb-4">
          <Button
            onClick={() => {
              const customersToSend = data.filter((c: any) =>
                selected.includes(c.customer_id),
              );

              customersToSend.forEach((customer: any) => {
                openWhatsApp(
                  customer.phone,
                  dueReminderTemplate(
                    customer.customer_name,
                    customer.total_due,
                  ),
                );
              });
            }}
          >
            Send Selected
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              data.forEach((customer: any) => {
                openWhatsApp(
                  customer.phone,
                  dueReminderTemplate(
                    customer.customer_name,
                    customer.total_due,
                  ),
                );
              });
            }}
          >
            Send All
          </Button>
        </div>

        <table className="w-full">
          <thead>
            <tr>
              <th className="p-3">Select</th>
              <th className="p-3 text-left">Customer</th>

              <th className="p-3 text-left">Phone</th>

              <th className="p-3 text-left">Due</th>

              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-8">
                  No Due Customers Found
                </td>
              </tr>
            ) : (
              data.map((customer: any) => (
                <tr key={customer.customer_id}>
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(customer.customer_id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelected((prev) => [
                            ...prev,
                            customer.customer_id,
                          ]);
                        } else {
                          setSelected((prev) =>
                            prev.filter((id) => id !== customer.customer_id),
                          );
                        }
                      }}
                    />
                  </td>
                  <td className="p-3">{customer.customer_name}</td>

                  <td className="p-3">{customer.phone}</td>

                  <td className="p-3">
                    ₹{Number(customer.total_due).toLocaleString()}
                  </td>

                  <td className="p-3">
                    <Button
                      onClick={() =>
                        openWhatsApp(
                          customer.phone,
                          dueReminderTemplate(
                            customer.customer_name,
                            customer.total_due,
                          ),
                        )
                      }
                    >
                      Send Reminder
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
