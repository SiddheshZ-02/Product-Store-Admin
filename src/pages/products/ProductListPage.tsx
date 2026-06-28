import { useState, useMemo } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import ProductTable from "@/components/tables/ProductTable";
import TableSkeleton from "@/components/common/TableSkeleton";

import { useProducts, useDeleteProduct } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import type { Product } from "@/types/product.types";

export default function ProductListPage() {
  const navigate = useNavigate();

  const { data: categories = [], isLoading: categoriesLoading } = useCategories();

  const [search, setSearch] = useState("");

  const { data = [], isLoading: productsLoading } = useProducts();

  const deleteMutation = useDeleteProduct();

  const filtered = useMemo(() => {
    return data.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product?.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  const categoryMap = Object.fromEntries(categories.map((c) => [c.id, c.name]));

  if (productsLoading || categoriesLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-10 w-80" />
        <TableSkeleton />
      </div>
    );
  }

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
        products={filtered as unknown as Product[]}
        categoryMap={categoryMap}
        onEdit={(id) => navigate(`/products/${id}/edit`)}
        onDelete={(id) => deleteMutation.mutate(id)}
      />
    </div>
  );
}
