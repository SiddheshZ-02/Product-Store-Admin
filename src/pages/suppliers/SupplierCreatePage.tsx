import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import SupplierForm from "@/components/forms/SupplierForm";
import BackButton from "@/components/common/BackButton";

import {
  useCreateSupplier,
} from "@/hooks/useSuppliers";

export default function SupplierCreatePage() {
  const navigate =
    useNavigate();

  const mutation =
    useCreateSupplier();

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-2 mb-6">
        <BackButton to="/suppliers" />
        <h1 className="text-3xl font-bold">
          Create Supplier
        </h1>
      </div>

      <SupplierForm
        loading={
          mutation.isPending
        }
        onSubmit={async (
          values
        ) => {
          try {
            await mutation.mutateAsync(
              values
            );

            navigate(
              "/suppliers"
            );
          } catch (error: any) {
            toast.error(error.message || "Failed to create supplier");
            console.error(error);
          }
        }}
      />
    </div>
  );
}