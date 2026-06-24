import {
  useParams,
  useNavigate,
} from "react-router-dom";

import ProductForm from "@/components/forms/ProductForm";

import {
  useProduct,
  useUpdateProduct,
} from "@/hooks/useProducts";
import type { ProductFormData } from "@/types/productSchema";



export default function ProductEditPage() {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const {
    data,
    isLoading,
  } = useProduct(id!);

  const updateMutation =
    useUpdateProduct();

  const handleSubmit = async (
    values: ProductFormData
  ) => {
    await updateMutation.mutateAsync({
      id,
      payload: values,
    });

    navigate("/products");
  };

  if (isLoading) {
    return (
      <div>
        Loading Product...
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">
        Edit Product
      </h1>

      <ProductForm
        defaultValues={{
          name: data.name,
          category_id:
            data.category_id ?? "",

          sku: data.sku,

          barcode:
            data.barcode ?? "",

          brand:
            data.brand ?? "",

          description:
            data.description ?? "",

          volume_ml:
            data.volume_ml ?? 0,

          alcohol_percentage:
            data.alcohol_percentage ??
            0,

          liquor_type:
            data.liquor_type ??
            "",

          manufacturer:
            data.manufacturer ??
            "",

          purchase_price:
            data.purchase_price,

          selling_price:
            data.selling_price,

          mrp: data.mrp,

          min_stock:
            data.min_stock,
        }}
        onSubmit={
          handleSubmit
        }
        loading={
          updateMutation.isPending
        }
      />
    </div>
  );
}