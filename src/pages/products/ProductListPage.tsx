import { useState, useMemo } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import ProductTable from "@/components/tables/ProductTable";

import { useProducts, useDeleteProduct } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";

export default function ProductListPage() {
  const navigate = useNavigate();

  const { data: categories = [] } = useCategories();

  const [search, setSearch] = useState("");

  const { data = [] } = useProducts();

  const deleteMutation = useDeleteProduct();

  const filtered = useMemo(() => {
    return data.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>

        <Button asChild>
          <Link to="/products/create">Add Product</Link>
        </Button>
      </div>

      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-md p-2 w-80"
      />

      <ProductTable
        products={filtered}
        categoryMap={categoryMap}
        onEdit={(id) => navigate(`/products/${id}/edit`)}
        onDelete={(id) => deleteMutation.mutate(id)}
      />
    </div>
  );
}
