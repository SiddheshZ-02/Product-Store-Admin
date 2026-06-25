import { useState } from "react";

import { Button }
from "@/components/ui/button";

import { Input }
from "@/components/ui/input";

import {
  useSalesHistory,
} from "@/hooks/useSales";

import {
  useCreateSalesReturn,
} from "@/hooks/useSalesReturn";

export default function SalesReturnPage() {

  const {
    data: sales = [],
  } = useSalesHistory();

  const createReturn =
    useCreateSalesReturn();

  const [saleId,
    setSaleId] =
    useState("");

  const [qty,
    setQty] =
    useState(1);

  const sale =
    sales.find(
      (s: any) =>
        s.id === saleId
    );

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Sales Return
      </h1>

      <select
        className="border p-2 rounded w-full"
        value={saleId}
        onChange={(e) =>
          setSaleId(
            e.target.value
          )
        }
      >
        <option value="">
          Select Sale
        </option>

        {sales.map(
          (sale: any) => (
            <option
              key={sale.id}
              value={sale.id}
            >
              {
                sale.invoice_number
              }
            </option>
          )
        )}
      </select>

      {sale?.sale_items?.map(
        (item: any) => (
          <div
            key={
              item.product_id
            }
            className="border rounded-lg p-4"
          >
            <p>
              {
                item.products
                  ?.name
              }
            </p>

            <Input
              type="number"
              value={qty}
              onChange={(e) =>
                setQty(
                  Number(
                    e.target.value
                  )
                )
              }
            />

            <Button
              onClick={() =>
                createReturn.mutate(
                  {
                    p_sale_id:
                      sale.id,

                    p_items: [
                      {
                        product_id:
                          item.product_id,

                        quantity:
                          qty,

                        unit_price:
                          item.unit_price,
                      },
                    ],
                  }
                )
              }
            >
              Return Item
            </Button>
          </div>
        )
      )}

    </div>
  );
}