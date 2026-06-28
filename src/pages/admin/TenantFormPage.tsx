import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useTenant,
  useCreateTenant,
  useUpdateTenant,
} from "@/hooks/useTenants";
import { usePlans } from "@/hooks/usePlans";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tenantSchema, type TenantFormData } from "@/types/tenantSchema";
import BackButton from "@/components/common/BackButton";

export default function TenantFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: plans = [] } = usePlans();
  const { data: existingTenant, isLoading: isLoadingTenant } = useTenant(id || "");
  const createTenant = useCreateTenant();
  const updateTenant = useUpdateTenant();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TenantFormData>({
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      shop_name: "",
      owner_name: "",
      email: "",
      password: "",
      phone: "",
      plan_id: "",
    },
  });

  useEffect(() => {
    if (existingTenant) {
      reset({
        shop_name: existingTenant.shop_name,
        owner_name: existingTenant.owner_name,
        email: existingTenant.email,
        phone: existingTenant.phone || "",
        plan_id: "", // plan_id might not be on tenant, so we'll skip it for edit
      });
    }
  }, [existingTenant, reset]);

  const onSubmit = async (data: TenantFormData) => {
    try {
      if (id) {
        // When editing, we don't need password or plan_id
        await updateTenant.mutateAsync({ id, payload: data });
        toast.success("Tenant updated successfully!");
      } else {
        const createPayload = {
          ...data,
          password: data.password!,
        };
        await createTenant.mutateAsync(createPayload);
        toast.success("Tenant created successfully!");
      }
      navigate("/admin/tenants");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong!");
      console.error(error);
    }
  };

  if (isLoadingTenant && id) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading tenant...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BackButton to="/admin/tenants" />
        <h1 className="text-3xl font-bold">
          {id ? "Edit Tenant" : "Create Tenant"}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-2xl">
        <div className="space-y-2">
          <Label htmlFor="shop_name">Shop Name *</Label>
          <Input
            id="shop_name"
            {...register("shop_name")}
          />
          {errors.shop_name && (
            <p className="text-red-500 text-sm">{errors.shop_name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="owner_name">Owner Name *</Label>
          <Input
            id="owner_name"
            {...register("owner_name")}
          />
          {errors.owner_name && (
            <p className="text-red-500 text-sm">{errors.owner_name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {!id && (
          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            {...register("phone")}
          />
        </div>

        {!id && (
          <div className="space-y-2">
            <Label htmlFor="plan_id">Plan *</Label>
            <Select
              value={watch("plan_id")}
              onValueChange={(value) => setValue("plan_id", value)}
            >
              <SelectTrigger id="plan_id">
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                {plans.map((plan) => (
                  <SelectItem key={plan.id} value={plan.id}>
                    {plan.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.plan_id && (
              <p className="text-red-500 text-sm">{errors.plan_id.message}</p>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <Button type="submit" disabled={isSubmitting || createTenant.isPending || updateTenant.isPending}>
            {isSubmitting || createTenant.isPending || updateTenant.isPending
              ? "Saving..."
              : "Save"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/admin/tenants")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
