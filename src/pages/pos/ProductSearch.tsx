import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useProductSearch } from "@/hooks/useProductSearch";
import { useCartStore } from "@/store/cartStore";

export default function ProductSearch() {
  const [search, setSearch] =
    useState("");

  const { data = [] } =
    useProductSearch(search);

  const addItem =
    useCartStore(
      (state) =>
        state.addItem
    );

  return (
    <div className="space-y-4">

      <Input
        placeholder="Search Product..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />

      <div className="border rounded-lg overflow-hidden">

        {data.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No Products Found
          </div>
        )}

        {data.map(
          (product: any) => {

            const stock =
              product.inventory?.[0]
                ?.quantity || 0;

            const isOutOfStock =
              stock <= 0;

            const isLowStock =
              stock > 0 &&
              stock <= 10;

            return (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 border-b"
              >

                <div>

                  <p className="font-medium">
                    {product.name}
                  </p>

                  <div className="flex gap-2 mt-1">

                    <span className="text-sm text-muted-foreground">
                      ₹
                      {Number(
                        product.selling_price
                      ).toLocaleString()}
                    </span>

                    {isOutOfStock ? (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                        Out of Stock
                      </span>
                    ) : isLowStock ? (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                        Low Stock
                      </span>
                    ) : (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        In Stock
                      </span>
                    )}

                  </div>

                  <p className="text-sm text-muted-foreground mt-1">
                    Available:
                    {" "}
                    {stock}
                  </p>

                </div>

                <Button
                  disabled={
                    isOutOfStock
                  }
                  onClick={() =>
                    addItem({
                      product_id:
                        product.id,

                      name:
                        product.name,

                      selling_price:
                        product.selling_price,

                      quantity: 1,

                      stock,
                    })
                  }
                >
                  {isOutOfStock
                    ? "Out of Stock"
                    : "Add"}
                </Button>

              </div>
            );
          }
        )}

      </div>

    </div>
  );
}