import { useParams } from "react-router-dom";

import { useInvoice } from "@/hooks/useInvoice";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { downloadInvoicePdf } from "@/utils/invoicePdf";

export default function SaleInvoicePage() {
  const { id } = useParams();

  const { data, isLoading } = useInvoice(id || "");
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: data?.invoice_number,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Invoice Not Found</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={handlePrint}>Print Invoice</Button>
         <Button
    variant="outline"
    onClick={() =>
      downloadInvoicePdf(
        data
      )
    }
  >
    Download PDF
  </Button>
      </div>
      <div
        ref={invoiceRef}
        className="max-w-4xl mx-auto bg-white p-8 rounded-lg border"
      >
        <h1 className="text-3xl font-bold mb-6">Invoice</h1>

        <div className="mb-6">
          <p>
            Invoice:
            {data.invoice_number}
          </p>

          <p>
            Date:
            {data.sale_date}
          </p>
        </div>

        <div className="mb-6">
          <h2 className="font-semibold">Customer</h2>

          <p>{data.customers?.customer_name}</p>

          <p>{data.customers?.phone}</p>
        </div>

        <table className="w-full border">
          <thead>
            <tr>
              <th>Name</th>

              <th>Qty</th>

              <th>Rate</th>

              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {data.sale_items?.map((item: any, index: number) => (
              <tr key={index}>
                <td>{item.products?.name}</td>

                <td>{item.quantity}</td>

                <td>₹{item.unit_price}</td>

                <td>₹{item.line_total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6">
          <p>Total: ₹{data.total_amount}</p>

          <p>Paid: ₹{data.paid_amount}</p>

          <p>Due: ₹{data.due_amount}</p>
        </div>
      </div>
    </div>
  );
}
