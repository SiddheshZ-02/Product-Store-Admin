import { useNavigate } from "react-router-dom";

import SupplierForm from "@/components/forms/SupplierForm";

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
      <h1 className="text-3xl font-bold mb-6">
        Create Supplier
      </h1>

      <SupplierForm
        loading={
          mutation.isPending
        }
        onSubmit={async (
          values
        ) => {
          await mutation.mutateAsync(
            values
          );

          navigate(
            "/suppliers"
          );
        }}
      />
    </div>
  );
}