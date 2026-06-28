import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePlan, useCreatePlan, useUpdatePlan } from "@/hooks/usePlans";
import { planSchema, type PlanFormData } from "@/types/planSchema";

export default function PlanFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: existingPlan, isLoading: planLoading } = usePlan(id || "");
  const createPlan = useCreatePlan();
  const updatePlan = useUpdatePlan();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PlanFormData>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      currency: "USD",
      trial_days: 14,
      max_products: null,
      max_customers: null,
      max_suppliers: null,
      status: "active",
    },
  });

  useEffect(() => {
    if (existingPlan) {
      reset({
        name: existingPlan.name,
        description: existingPlan.description || "",
        price: existingPlan.price,
        currency: existingPlan.currency,
        trial_days: existingPlan.trial_days,
        max_products: existingPlan.max_products,
        max_customers: existingPlan.max_customers,
        max_suppliers: existingPlan.max_suppliers,
        status: existingPlan.status,
      });
    }
  }, [existingPlan, reset]);

  const onSubmit = async (data: PlanFormData) => {
    const payload = {
      ...data,
      max_products: data.max_products === null ? undefined : data.max_products,
      max_customers: data.max_customers === null ? undefined : data.max_customers,
      max_suppliers: data.max_suppliers === null ? undefined : data.max_suppliers,
    };

    if (id) {
      await updatePlan.mutateAsync({ id, payload });
    } else {
      await createPlan.mutateAsync(payload);
    }
    navigate("/admin/plans");
  };

  if (planLoading && id) {
    return <div className="flex items-center justify-center h-96">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {id ? "Edit Plan" : "Create Plan"}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Plan Name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Plan Description"
            {...register("description")}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              placeholder="0"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="currency">Currency</Label>
            <Input
              id="currency"
              placeholder="USD"
              {...register("currency")}
            />
            {errors.currency && (
              <p className="text-red-500 text-sm mt-1">{errors.currency.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="trial_days">Trial Days</Label>
            <Input
              id="trial_days"
              type="number"
              placeholder="14"
              {...register("trial_days", { valueAsNumber: true })}
            />
            {errors.trial_days && (
              <p className="text-red-500 text-sm mt-1">{errors.trial_days.message}</p>
            )}
          </div>

          {id && (
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={watch("status")}
                onValueChange={(value) => setValue("status", value as "active" | "inactive")}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="max_products">Max Products</Label>
            <Input
              id="max_products"
              type="number"
              placeholder="Unlimited"
              {...register("max_products", {
                valueAsNumber: true,
                setValueAs: (value) => value === "" ? null : Number(value),
              })}
            />
          </div>

          <div>
            <Label htmlFor="max_customers">Max Customers</Label>
            <Input
              id="max_customers"
              type="number"
              placeholder="Unlimited"
              {...register("max_customers", {
                valueAsNumber: true,
                setValueAs: (value) => value === "" ? null : Number(value),
              })}
            />
          </div>

          <div>
            <Label htmlFor="max_suppliers">Max Suppliers</Label>
            <Input
              id="max_suppliers"
              type="number"
              placeholder="Unlimited"
              {...register("max_suppliers", {
                valueAsNumber: true,
                setValueAs: (value) => value === "" ? null : Number(value),
              })}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/admin/plans")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
