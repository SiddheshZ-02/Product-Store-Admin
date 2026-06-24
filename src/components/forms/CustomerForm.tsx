import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
      <Input
        placeholder="Customer Name"
        {...register("customer_name")}
      />

      <p className="text-sm text-red-500">
        {errors.customer_name?.message}
      </p>

      <Input
        placeholder="Phone Number"
        {...register("phone")}
      />

      <Input
        placeholder="Email"
        {...register("email")}
      />

      <Input
        placeholder="GST Number"
        {...register("gst_number")}
      />

      <Textarea
        placeholder="Address"
        {...register("address")}
      />

      <Textarea
        placeholder="Notes"
        {...register("notes")}
      />

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