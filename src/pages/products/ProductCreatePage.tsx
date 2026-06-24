import { useNavigate } from "react-router-dom";

import ProductForm from "@/components/forms/ProductForm";


import {
  useCreateProduct,
} from "@/hooks/useProducts";
import type { ProductFormData } from "@/types/productSchema";

export default function ProductCreatePage() {
  const navigate =
    useNavigate();

  const createMutation =
    useCreateProduct();

  const handleSubmit = async (
    values: ProductFormData
  ) => {
    await createMutation.mutateAsync(
      values
    );

    navigate("/products");
  };

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">
        Create Product
      </h1>

      <ProductForm
        onSubmit={
          handleSubmit
        }
        loading={
          createMutation.isPending
        }
      />
    </div>
  );
}