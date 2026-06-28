import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import ProductForm from "@/components/forms/ProductForm";
import BackButton from "@/components/common/BackButton";


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
    try {
      await createMutation.mutateAsync(
        values
      );

      navigate("/products");
    } catch (error: any) {
      toast.error(error.message || "Failed to create product");
      console.error(error);
    }
  };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center gap-2 mb-6">
        <BackButton to="/products" />
        <h1 className="text-3xl font-bold">
          Create Product
        </h1>
      </div>

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