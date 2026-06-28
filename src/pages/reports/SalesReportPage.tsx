// src/pages/reports/SalesReportPage.tsx

import { useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import TableSkeleton from "@/components/common/TableSkeleton";

import DateFilterComponent from "@/components/common/DateFilter";

import { getDateRange } from "@/utils/dateRange";

import { useSalesReport } from "@/hooks/useReports";

import ExportExcelButton from "@/components/common/ExportExcelButton";

import ExportPdfButton from "@/components/common/ExportPdfButton";
import type { DateFilter } from "@/types/report";
import { Button } from "@/components/ui/button";
import { openWhatsApp } from "@/utils/whatsapp";
import { invoiceTemplate } from "@/utils/whatsappTemplates";

function SalesReportSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
      <Skeleton className="h-10 w-full" />
      <div className="grid grid-cols-4 gap-4">
        {[1,2,3,4].map(i => (
          <div key={i} className="border rounded-lg p-4">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-32" />
          </div>
        ))}
      </div>
      <TableSkeleton columns={8} />
    </div>
  );
}

export default function SalesReportPage() {
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

  const { data = [], isLoading } = useSalesReport(from, to);

  const summary = useMemo(() => {
    const totalSales = data.reduce(
      (sum: number, sale: any) => sum + Number(sale.total_amount),
      0,
    );

    const totalPaid = data.reduce(
      (sum: number, sale: any) => sum + Number(sale.paid_amount),
      0,
    );

    const totalDue = data.reduce(
      (sum: number, sale: any) => sum + Number(sale.due_amount),
      0,
    );

    return {
      totalSales,
      totalPaid,
      totalDue,
      invoices: data.length,
    };
  }, [data]);

  const excelData = data.map((sale: any) => ({
    Invoice: sale.invoice_number,
    Customer: sale.customers?.customer_name || "-",
    Date: sale.sale_date,
    Total: sale.total_amount,
    Paid: sale.paid_amount,
    Due: sale.due_amount,
    Status: sale.payment_status,
  }));

  const pdfRows = data.map((sale: any) => [
    sale.invoice_number,
    sale.customers?.customer_name || "-",
    sale.sale_date,
    sale.total_amount,
    sale.paid_amount,
    sale.due_amount,
    sale.payment_status,
  ]);

  if (isLoading) {
    return <SalesReportSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Sales Report</h1>

        <div className="flex gap-2">
          <ExportExcelButton data={excelData} fileName="sales-report" />

          <ExportPdfButton
            title="Sales Report"
            fileName="sales-report"
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

      {/* Summary Cards */}

      <div className="grid grid-cols-4 gap-4">
        <div className="border rounded-lg p-4">
          <p className="text-sm">Total Sales</p>

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
              <th className="p-3 text-left">Whatsapp</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center p-8">
                  No Sales Found
                </td>
              </tr>
            ) : (
              data.map((sale: any) => (
                <tr key={sale.id} className="border-b">
                  <td className="p-3">{sale.invoice_number}</td>

                  <td className="p-3">
                    {sale.customers?.customer_name || "-"}
                  </td>

                  <td className="p-3">{sale.sale_date}</td>

                  <td className="p-3">
                    ₹{Number(sale.total_amount).toLocaleString()}
                  </td>

                  <td className="p-3">
                    ₹{Number(sale.paid_amount).toLocaleString()}
                  </td>

                  <td className="p-3">
                    ₹{Number(sale.due_amount).toLocaleString()}
                  </td>

                  <td className="p-3">{sale.payment_status}</td>
                  <td className="p-3">
                    {
                      <Button
                        variant="outline"
                        onClick={() => {
                          openWhatsApp(
                            sale.customers?.phone,
                            invoiceTemplate(
                              sale.customers?.customer_name,
                              sale.invoice_number,
                              sale.total_amount,
                            ),
                          );
                        }}
                      >
                        Send Invoice
                      </Button>
                    }
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
