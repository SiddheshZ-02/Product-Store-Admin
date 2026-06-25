// src/pages/reports/SalesReportPage.tsx

import { useMemo, useState } from "react";

import DateFilterComponent from "@/components/common/DateFilter";

import { getDateRange } from "@/utils/dateRange";

import { usePurchaseReport } from "@/hooks/useReports";

import ExportExcelButton from "@/components/common/ExportExcelButton";

import ExportPdfButton from "@/components/common/ExportPdfButton";
import type { DateFilter } from "@/types/report";

export default function PurchaseReportPage() {
  const [filter, setFilter] = useState<DateFilter>({
    range: "30days",
  });

  const { from, to } =
    filter.range === "custom"
      ? {
          from: filter.from || "",
          to: filter.to || "",
        }
      : getDateRange(filter.range);

  const { data = [], isLoading } = usePurchaseReport(from, to);

  const summary = useMemo(() => {
    const totalSales = data.reduce(
      (sum: number, purchase: any) => sum + Number(purchase.total_amount),
      0,
    );

    const totalPaid = data.reduce(
      (sum: number, purchase: any) => sum + Number(purchase.paid_amount),
      0,
    );

    const totalDue = data.reduce(
      (sum: number, purchase: any) => sum + Number(purchase.due_amount),
      0,
    );

    return {
      totalSales,
      totalPaid,
      totalDue,
      invoices: data.length,
    };
  }, [data]);

  const excelData = data.map((purchase: any) => ({
    Invoice: purchase.invoice_number,
    Customer: purchase.customers?.customer_name || "-",
    Date: purchase.sale_date,
    Total: purchase.total_amount,
    Paid: purchase.paid_amount,
    Due: purchase.due_amount,
    Status: purchase.payment_status,
  }));

  const pdfRows = data.map((purchase: any) => [
    purchase.invoice_number,
    purchase.customers?.customer_name || "-",
    purchase.sale_date,
    purchase.total_amount,
    purchase.paid_amount,
    purchase.due_amount,
    purchase.payment_status,
  ]);


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Purchase Report</h1>

        <div className="flex gap-2">
          <ExportExcelButton data={excelData} fileName="Purchase-report" />

          <ExportPdfButton
            title="Purchase Report"
            fileName="Purchase-report"
            columns={[
              "Invoice",
              "Customer",
              "Date",
              "Total",
              "Paid",
              "Due",
              "Status",
            ]}
            rows={pdfRows}
          />
        </div>
      </div>

      <DateFilterComponent
        value={filter}
        onChange={(value) => setFilter(value)}
      />
      {isLoading && (
        <div className="border rounded-lg p-4">Loading Purchase Report...</div>
      )}

      {/* Summary Cards */}

      <div className="grid grid-cols-4 gap-4">
        <div className="border rounded-lg p-4">
          <p className="text-sm">Total Purchase</p>

          <h2 className="text-2xl font-bold">
            ₹{summary.totalSales.toLocaleString()}
          </h2>
        </div>

        <div className="border rounded-lg p-4">
          <p className="text-sm">Paid Amount</p>

          <h2 className="text-2xl font-bold">
            ₹{summary.totalPaid.toLocaleString()}
          </h2>
        </div>

        <div className="border rounded-lg p-4">
          <p className="text-sm">Due Amount</p>

          <h2 className="text-2xl font-bold">
            ₹{summary.totalDue.toLocaleString()}
          </h2>
        </div>

        <div className="border rounded-lg p-4">
          <p className="text-sm">Invoices</p>

          <h2 className="text-2xl font-bold">{summary.invoices}</h2>
        </div>
      </div>

      {/* Table */}

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Invoice</th>

              <th className="p-3 text-left">Customer</th>

              <th className="p-3 text-left">Date</th>

              <th className="p-3 text-left">Total</th>

              <th className="p-3 text-left">Paid</th>

              <th className="p-3 text-left">Due</th>

              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center p-8">
                  No Purchase Found
                </td>
              </tr>
            ) : (
              data.map((Purchase: any) => (
                <tr key={Purchase.id} className="border-b">
                  <td className="p-3">{Purchase.invoice_number}</td>

                  <td className="p-3">
                    {Purchase.customers?.customer_name || "-"}
                  </td>

                  <td className="p-3">{Purchase.sale_date}</td>

                  <td className="p-3">
                    ₹{Number(Purchase.total_amount).toLocaleString()}
                  </td>

                  <td className="p-3">
                    ₹{Number(Purchase.paid_amount).toLocaleString()}
                  </td>

                  <td className="p-3">
                    ₹{Number(Purchase.due_amount).toLocaleString()}
                  </td>

                  <td className="p-3">{Purchase.payment_status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
