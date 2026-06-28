import {
  useParams,
  useNavigate,
} from "react-router-dom";
import { toast } from "sonner";

import SupplierForm from "@/components/forms/SupplierForm";
import BackButton from "@/components/common/BackButton";

import {
  useSupplier,
  useUpdateSupplier,
} from "@/hooks/useSuppliers";

export default function SupplierEditPage() {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const {
    data,
    isLoading,
  } = useSupplier(id!);

  const mutation =
    useUpdateSupplier();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  if (!data)
    return (
      <div className="flex items-center justify-center h-screen">
        Supplier not found
      </div>
    );

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-2 mb-6">
        <BackButton to="/suppliers" />
        <h1 className="text-3xl font-bold">
          Edit Supplier
        </h1>
      </div>

      <SupplierForm
        defaultValues={{
          supplier_name:
            data.supplier_name,

          contact_person:
            data.contact_person ??
            "",

          phone:
            data.phone ?? "",

          email:
            data.email ?? "",

          gst_number:
            data.gst_number ??
            "",

          address:
            data.address ??
            "",
        }}
        loading={
          mutation.isPending
        }
        onSubmit={async (
          values
        ) => {
          try {
            await mutation.mutateAsync(
              {
                id,
                payload:
                  values,
              }
            );

            navigate(
              "/suppliers"
            );
          } catch (error: any) {
            toast.error(error.message || "Failed to update supplier");
            console.error(error);
          }
        }}
      />
    </div>
  );
}