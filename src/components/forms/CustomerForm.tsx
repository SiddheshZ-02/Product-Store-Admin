import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { customerSchema, type CustomerFormData } from "@/types/customerSchema";



interface Props {
  defaultValues?: Partial<CustomerFormData>;
  loading?: boolean;
  onSubmit: (
    values: CustomerFormData
  ) => void;
}

export default function CustomerForm({
  defaultValues,
  loading,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver:
      zodResolver(customerSchema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="space-y-2">
        <Label htmlFor="customer_name">Customer Name *</Label>
        <Input
          id="customer_name"
          placeholder="Customer Name"
          {...register("customer_name")}
        />

        {errors.customer_name && (
          <p className="text-sm text-red-500">
            {errors.customer_name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          placeholder="Phone Number"
          {...register("phone")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="gst_number">GST Number</Label>
        <Input
          id="gst_number"
          placeholder="GST Number"
          {...register("gst_number")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          placeholder="Address"
          {...register("address")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          placeholder="Notes"
          {...register("notes")}
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Customer"}
      </Button>
    </form>
  );
}