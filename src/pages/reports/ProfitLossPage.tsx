import { useMemo } from "react";

import { useProfitLoss }
  from "@/hooks/useReports";
import ExportExcelButton from "@/components/common/ExportExcelButton";
import ExportPdfButton from "@/components/common/ExportPdfButton";

export default function ProfitLossPage() {
  const {
    data,
    isLoading,
  } = useProfitLoss();

  const report =
    useMemo(() => {
      if (!data)
        return null;

      const revenue =
        data.sales.reduce(
          (
            total: number,
            sale: any
          ) =>
            total +
            Number(
              sale.total_amount
            ),
          0
        );

      const cogs =
        data.saleItems.reduce(
          (
            total: number,
            item: any
          ) =>
            total +
            Number(
              item.cost_price
            ) *
              Number(
                item.quantity
              ),
          0
        );

      const expenses =
        data.expenses.reduce(
          (
            total: number,
            expense: any
          ) =>
            total +
            Number(
              expense.amount
            ),
          0
        );

      const grossProfit =
        revenue - cogs;

      const netProfit =
        grossProfit -
        expenses;

      const margin =
        revenue > 0
          ? (
              (netProfit /
                revenue) *
              100
            ).toFixed(2)
          : 0;

      return {
        revenue,
        cogs,
        expenses,
        grossProfit,
        netProfit,
        margin,
      };
    }, [data]);

  if (
    isLoading ||
    !report
  ) {
    return (
      <div>
        Loading...
      </div>
    );
  }


const exportData = [
  {
    Revenue:
      report.revenue,

    COGS:
      report.cogs,

    Expenses:
      report.expenses,

    GrossProfit:
      report.grossProfit,

    NetProfit:
      report.netProfit,
  },
];

const pdfRows = [
  ["Revenue", report.revenue],
  ["COGS", report.cogs],
  ["Expenses", report.expenses],
  ["Gross Profit", report.grossProfit],
  ["Net Profit", report.netProfit],
  ["Margin %", report.margin],
];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Profit & Loss
      </h1>
      <ExportExcelButton
  data={exportData}
  fileName="profit-loss"
/>
<ExportPdfButton
  title="Profit & Loss Report"
  fileName="profit-loss"
  columns={[
    "Metric",
    "Value",
  ]}
  rows={pdfRows}
/>

      <div className="grid grid-cols-2 gap-4">

        <div className="border p-4 rounded">
          <h3>
            Revenue
          </h3>

          <p className="text-2xl font-bold">
            ₹
            {report.revenue.toLocaleString()}
          </p>
        </div>

        <div className="border p-4 rounded">
          <h3>
            Cost Of Goods Sold
          </h3>

          <p className="text-2xl font-bold">
            ₹
            {report.cogs.toLocaleString()}
          </p>
        </div>

        <div className="border p-4 rounded">
          <h3>
            Gross Profit
          </h3>

          <p className="text-2xl font-bold">
            ₹
            {report.grossProfit.toLocaleString()}
          </p>
        </div>

        <div className="border p-4 rounded">
          <h3>
            Expenses
          </h3>

          <p className="text-2xl font-bold">
            ₹
            {report.expenses.toLocaleString()}
          </p>
        </div>

        <div className="border p-4 rounded">
          <h3>
            Net Profit
          </h3>

          <p className="text-2xl font-bold">
            ₹
            {report.netProfit.toLocaleString()}
          </p>
        </div>

        <div className="border p-4 rounded">
          <h3>
            Profit Margin
          </h3>

          <p className="text-2xl font-bold">
            {report.margin}%
          </p>
        </div>

      </div>
    </div>
  );
}