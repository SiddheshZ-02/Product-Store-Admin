import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCategories } from "@/hooks/useCategories";
import { productSchema, type ProductFormData } from "@/types/productSchema";

// import {
//   productSchema,
//   ProductFormData,
// } from "@/types/productSchema";

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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            placeholder="Product Name"
            {...register("name")}
          />

          <p className="text-red-500 text-sm">
            {errors.name?.message}
          </p>
        </div>

        <div>
          <Input
            placeholder="SKU"
            {...register("sku")}
          />
        </div>
      </div>

      <div>
        <Select
          value={watch("category_id")}
          onValueChange={(value) =>
            setValue(
              "category_id",
              value
            )
          }
        >
          <SelectTrigger>
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
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Brand"
          {...register("brand")}
        />

        <Input
          placeholder="Barcode"
          {...register("barcode")}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          type="number"
          placeholder="Volume ML"
          {...register("volume_ml", { valueAsNumber: true })}
        />

        <Input
          type="number"
          placeholder="Alcohol %"
          {...register(
            "alcohol_percentage", { valueAsNumber: true }
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Liquor Type"
          {...register(
            "liquor_type"
          )}
        />

        <Input
          placeholder="Manufacturer"
          {...register(
            "manufacturer"
          )}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Input
          type="number"
          placeholder="Purchase Price"
          {...register(
            "purchase_price", { valueAsNumber: true }
          )}
        />

        <Input
          type="number"
          placeholder="Selling Price"
          {...register(
            "selling_price", { valueAsNumber: true }
          )}
        />

        <Input
          type="number"
          placeholder="MRP"
          {...register("mrp", { valueAsNumber: true })}
        />
      </div>

      <div>
        <Input
          type="number"
          placeholder="Minimum Stock"
          {...register(
            "min_stock", { valueAsNumber: true }
          )}
        />
      </div>

      <Textarea
        placeholder="Description"
        {...register(
          "description"
        )}
      />

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