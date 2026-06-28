import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCategories } from "@/hooks/useCategories";
import { productSchema, type ProductFormData } from "@/types/productSchema";

interface Props {
  defaultValues?: Partial<ProductFormData>;

  onSubmit: (
    values: ProductFormData
  ) => void;

  loading?: boolean;
}

export default function ProductForm({
  defaultValues,
  onSubmit,
  loading,
}: Props) {
  const { data: categories } =
    useCategories();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            placeholder="Product Name"
            {...register("name")}
          />

          {errors.name && (
            <p className="text-red-500 text-sm">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="sku">SKU *</Label>
          <Input
            id="sku"
            placeholder="SKU"
            {...register("sku")}
          />
          {errors.sku && (
            <p className="text-red-500 text-sm">
              {errors.sku.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category_id">Category *</Label>
        <Select
          value={watch("category_id")}
          onValueChange={(value) =>
            setValue(
              "category_id",
              value
            )
          }
        >
          <SelectTrigger id="category_id">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>

          <SelectContent>
            {categories?.map(
              (category) => (
                <SelectItem
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
        {errors.category_id && (
          <p className="text-red-500 text-sm">
            {errors.category_id.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            placeholder="Brand"
            {...register("brand")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="barcode">Barcode</Label>
          <Input
            id="barcode"
            placeholder="Barcode"
            {...register("barcode")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="volume_ml">Volume ML *</Label>
          <Input
            id="volume_ml"
            type="number"
            placeholder="Volume ML"
            {...register("volume_ml", { valueAsNumber: true })}
          />
          {errors.volume_ml && (
            <p className="text-red-500 text-sm">
              {errors.volume_ml.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="alcohol_percentage">Alcohol % *</Label>
          <Input
            id="alcohol_percentage"
            type="number"
            placeholder="Alcohol %"
            {...register(
              "alcohol_percentage", { valueAsNumber: true }
            )}
          />
          {errors.alcohol_percentage && (
            <p className="text-red-500 text-sm">
              {errors.alcohol_percentage.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="liquor_type">Liquor Type</Label>
          <Input
            id="liquor_type"
            placeholder="Liquor Type"
            {...register(
              "liquor_type"
            )}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="manufacturer">Manufacturer</Label>
          <Input
            id="manufacturer"
            placeholder="Manufacturer"
            {...register(
              "manufacturer"
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="purchase_price">Purchase Price *</Label>
          <Input
            id="purchase_price"
            type="number"
            step="0.01"
            placeholder="Purchase Price"
            {...register(
              "purchase_price", { valueAsNumber: true }
            )}
          />
          {errors.purchase_price && (
            <p className="text-red-500 text-sm">
              {errors.purchase_price.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="selling_price">Selling Price *</Label>
          <Input
            id="selling_price"
            type="number"
            step="0.01"
            placeholder="Selling Price"
            {...register(
              "selling_price", { valueAsNumber: true }
            )}
          />
          {errors.selling_price && (
            <p className="text-red-500 text-sm">
              {errors.selling_price.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="mrp">MRP *</Label>
          <Input
            id="mrp"
            type="number"
            step="0.01"
            placeholder="MRP"
            {...register("mrp", { valueAsNumber: true })}
          />
          {errors.mrp && (
            <p className="text-red-500 text-sm">
              {errors.mrp.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="min_stock">Minimum Stock *</Label>
        <Input
          id="min_stock"
          type="number"
          placeholder="Minimum Stock"
          {...register(
            "min_stock", { valueAsNumber: true }
          )}
        />
        {errors.min_stock && (
          <p className="text-red-500 text-sm">
            {errors.min_stock.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Description"
          {...register(
            "description"
          )}
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Product"}
      </Button>
    </form>
  );
}