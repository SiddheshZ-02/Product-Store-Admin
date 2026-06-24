import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import {
  supplierSchema,
  type SupplierFormData,

} from "@/types/supplierSchema";

interface Props {
  defaultValues?: Partial<SupplierFormData>;

  loading?: boolean;

  onSubmit: (
    values: SupplierFormData
  ) => void;
}

export default function SupplierForm({
  defaultValues,
  loading,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
  } = useForm<SupplierFormData>({
    resolver:
      zodResolver(
        supplierSchema
      ),

    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <Input
        placeholder="Supplier Name"
        {...register(
          "supplier_name"
        )}
      />

      <Input
        placeholder="Contact Person"
        {...register(
          "contact_person"
        )}
      />

      <Input
        placeholder="Phone"
        {...register("phone")}
      />

      <Input
        placeholder="Email"
        {...register("email")}
      />

      <Input
        placeholder="GST Number"
        {...register(
          "gst_number"
        )}
      />

      <Textarea
        placeholder="Address"
        {...register(
          "address"
        )}
      />

      <Button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Saving..."
          : "Save Supplier"}
      </Button>
    </form>
  );
}