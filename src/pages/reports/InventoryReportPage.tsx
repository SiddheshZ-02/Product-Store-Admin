import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import TableSkeleton from "@/components/common/TableSkeleton";

import { useInventoryReport }
  from "@/hooks/useInventory";
import ExportExcelButton from "@/components/common/ExportExcelButton";
import ExportPdfButton from "@/components/common/ExportPdfButton";

function InventoryReportSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="border rounded-lg p-4">
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-8 w-32" />
          </div>
        ))}
      </div>
      <TableSkeleton columns={7} />
    </div>
  );
}

export default function InventoryReportPage() {
  const {
    data = [],
    isLoading,
  } = useInventoryReport();

  const summary =
    useMemo(() => {
      let totalStock = 0;
      let totalValue = 0;
      let lowStock = 0;

      data.forEach(
        (row: any) => {
          const qty =
            Number(
              row.quantity
            ) || 0;

          const cost =
            Number(
              row.products
                ?.purchase_price
            ) || 0;

          totalStock += qty;

          totalValue +=
            qty * cost;

          if (
            qty <=
            row.products
              ?.min_stock
          ) {
            lowStock++;
          }
        }
      );

      return {
        totalStock,
        totalValue,
        lowStock,
      };
    }, [data]);

    const exportData =
  data.map((item: any) => ({
    Product:
      item.products?.name,

    Category:
      item.products
        ?.categories?.name,

    Stock:
      item.quantity,

    PurchasePrice:
      item.products
        ?.purchase_price,

    SellingPrice:
      item.products
        ?.selling_price,
  }));


const pdfRows =
  data.map((item: any) => [
    item.products?.name,
    item.products?.categories?.name,
    item.quantity,
    item.products?.purchase_price,
    item.products?.selling_price,
  ]);


  if (isLoading)
    return <InventoryReportSkeleton />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Inventory Report
      </h1>

      {/* Summary */}
      <div className="flex gap-2">
        <ExportExcelButton
          data={exportData}
          fileName="inventory-report"
        />
        <ExportPdfButton
          title="Inventory Report"
          fileName="inventory-report"
          columns={[
            "Product",
            "Category",
            "Stock",
            "Purchase Price",
            "Selling Price",
          ]}
          rows={pdfRows}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="border rounded-lg p-4">
          <div>
            Total Units
          </div>

          <div className="text-2xl font-bold">
            {
              summary.totalStock
            }
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <div>
            Inventory Value
          </div>

          <div className="text-2xl font-bold">
            ₹
            {summary.totalValue.toLocaleString()}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <div>
            Low Stock Items
          </div>

          <div className="text-2xl font-bold">
            {
              summary.lowStock
            }
          </div>
        </div>
      </div>

      {/* Table */}

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Cost</th>
              <th className="p-3 text-left">Sell</th>
              <th className="p-3 text-left">Value</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map(
              (item: any) => {
                const qty =
                  Number(
                    item.quantity
                  );

                const cost =
                  Number(
                    item.products
                      ?.purchase_price
                  );

                const value =
                  qty * cost;

                const lowStock =
                  qty <=
                  item.products
                    ?.min_stock;

                return (
                  <tr
                    key={
                      item.products
                        ?.id
                    }
                    className="border-b"
                  >
                    <td className="p-3">
                      {
                        item.products
                          ?.name
                      }
                    </td>

                    <td className="p-3">
                      {
                        item.products
                          ?.categories
                          ?.name
                      }
                    </td>

                    <td className="p-3">{qty}</td>

                    <td className="p-3">
                      ₹{cost}
                    </td>

                    <td className="p-3">
                      ₹
                      {
                        item.products
                          ?.selling_price
                      }
                    </td>

                    <td className="p-3">
                      ₹{value}
                    </td>

                    <td className="p-3">
                      {lowStock
                        ? "⚠️ Low"
                        : "✅ OK"}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}